/**
 * DNS factory
 */
window.maidsafeDemo.factory('dnsFactory', [ function(Shared) {
  'use strict';
  var self = this;

  self.createPublicId = function(longName, callback) {
    var payload = {
      url: this.SERVER + 'dns/' + longName,
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + this.authToken
      }
    };
    (new this.Request(payload, callback)).send();
  };

  // get dns list
  self.getDns = function(callback) {
    var payload = {
      url: this.SERVER + 'dns',
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + this.authToken
      }
    };
    (new this.Request(payload, callback)).send();
  };

  return self;
} ]);
