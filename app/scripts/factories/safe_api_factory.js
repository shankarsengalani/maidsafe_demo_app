/**
 * SAFE Api factory
 */
window.maidsafeDemo.factory('safeApiFactory', [ '$http', '$q', 'nfsFactory', 'dnsFactory', function(http, $q, nfs, dns) {
  'use strict';
  var self = this;
  var TOKEN_KEY = 'MaidSafeDemoAppToken';
  self.SERVER = 'http://localhost:8100/';
  self.authToken = null;
  self.dnsList = null;

  var setAuthToken = function(token) {
    localStorage.setItem(TOKEN_KEY, token);
  };

  var symmetricKeys = {
    key: null,
    nonce: null
  };

  var sodium = require('libsodium-wrappers');

  self.getAuthToken = function() {
    return localStorage.getItem(TOKEN_KEY);
  };

  self.Request = function(payload, callback) {
    var encrypt = function() {
      if (!(payload.headers && payload.headers.authorization)) {
        return payload;
      }
      payload.headers['Content-Type'] = 'text/plain';
      try {
        // TODO query params decryption
        var query = payload.url.split('?');
        if (query[1]) {
          var encryptedQuery = new Buffer(sodium.crypto_secretbox_easy(query[1],
            symmetricKeys.nonce, symmetricKeys.key)).toString('base64');
          payload.url = query[0] + '?' + encodeURIComponent(encryptedQuery);
        }
        if (payload.data) {
          var data = payload.data;
          if (!(data instanceof Uint8Array)) {
            data = new Uint8Array(new Buffer(JSON.stringify(data)));
          }
          payload.data = new Buffer(sodium.crypto_secretbox_easy(data, symmetricKeys.nonce, symmetricKeys.key)).toString('base64');
        }
        return payload;
      } catch(e) {
        return callback(e);
      }
    };
    var decrypt = function(response) {
      if (!(payload.headers && payload.headers.authorization)) {
        return response.data;
      }
      try {
        var data = response.data;
        try {
            data = sodium.crypto_secretbox_open_easy(new Uint8Array(new Buffer(data, 'base64')), symmetricKeys.nonce, symmetricKeys.key);
            data = response.headers('file-name') ? new Buffer(data) : new Buffer(data).toString();
        } catch(e) {}
        return data;
      } catch(e) {
        return callback(e);
      }
    };
    var onSuccess = function(response) {
      if (!response) {
        return callback();
      }
      callback(null, decrypt(response), response.headers);
    };
    var onError = function(err) {
      err = decrypt(err);
      return callback(err);
    };
    this.send = function() {
      http(encrypt(payload)).then(onSuccess, onError);
    };
    return this;
  };

  // authorise application
  self.authorise = function(callback) {
    var assymKeys = sodium.crypto_box_keypair();
    var assymNonce = sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES);
    var publicKey = new Buffer(assymKeys.publicKey).toString('base64');
    var nonce = new Buffer(assymNonce).toString('base64');

    var onResponse = function(err, body, headers) {
      if (err) {
        return callback(err);
      }
      // self.authToken = body.token;
      setAuthToken(body.token);
      var cipher = new Uint8Array(new Buffer(body.encryptedKey, 'base64'));
      var publicKey = new Uint8Array(new Buffer(body.publicKey, 'base64'));
      var data = sodium.crypto_box_open_easy(cipher, assymNonce, publicKey, assymKeys.privateKey);
      symmetricKeys.key = data.slice(0, sodium.crypto_secretbox_KEYBYTES);
      symmetricKeys.nonce = data.slice(sodium.crypto_secretbox_KEYBYTES);
      callback(null, symmetricKeys);
    };

    var payload = {
      url: self.SERVER + 'auth',
      method: 'POST',
      data: {
        app: {
          name: 'Maidsafe Demo',
          id: 'demo.maidsafe.net',
          version: '0.0.1',
          vendor: 'MaidSafe'
        },
        permissions: [],
        publicKey: publicKey,
        nonce: nonce
      }
    };
    (new self.Request(payload, onResponse)).send();
  };
  return $.extend(self, nfs, dns);
} ]);
