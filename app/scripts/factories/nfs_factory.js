/**
 * Nfs factory
 */
window.maidsafeDemo.factory('nfsFactory', [ function(Shared) {
  'use strict';
  var self = this;

  // create new directory
  self.createDir = function(dirPath, isPrivate, userMetadata, isVersioned, isPathShared, callback) {
    var payload = {
      url: this.SERVER + 'nfs/directory',
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + this.getAuthToken()
      },
      data: {
        dirPath: dirPath,
        isPrivate: isPrivate,
        userMetadata: userMetadata,
        isVersioned: isVersioned,
        isPathShared: isPathShared
      }
    };
    (new this.Request(payload, callback)).send();
  };

  // get specific directory
  self.getDir = function(callback, dirPath, isPathShared) {
    dirPath = encodeURIComponent(dirPath);
    var URL = this.SERVER + 'nfs/directory/' + dirPath;
    if (typeof isPathShared === 'boolean') {
      URL += '/' + isPathShared
    }
    var payload = {
      url: URL,
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + this.getAuthToken()
      }
    };
    (new this.Request(payload, callback)).send();
  };
  return self;
} ]);
