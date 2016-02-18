/**
 * DNS factory
 */
window.maidsafeDemo.factory('dnsFactory', [ function(Shared) {
  'use strict';
  var self = this;

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
