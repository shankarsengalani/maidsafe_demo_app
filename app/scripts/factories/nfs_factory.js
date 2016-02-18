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
        authorization: 'Bearer ' + this.authToken
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
        authorization: 'Bearer ' + this.authToken
      }
    };
    (new this.Request(payload, callback)).send();
  };

  self.deleteDirectory = function(dirPath, isPathShared, callback) {
    var url = this.SERVER + 'nfs/directory/' + encodeURIComponent(dirPath) + '/' + (isPathShared || false);
    var payload = {
      url: url,
      method: 'DELETE',
      headers: {
        authorization: 'Bearer ' + this.authToken
      }
    };
    (new this.Request(payload, callback)).send();
  };

  self.deleteFile = function(filePath, isPathShared, callback) {
    var payload = {
      url: this.SERVER + 'nfs/file/' + encodeURIComponent(filePath) + '/' + (isPathShared || false),
      method: 'DELETE',
      headers: {
        authorization: 'Bearer ' + this.authToken
      }
    };
    (new this.Request(payload, callback)).send();
  };

  self.createFile = function(filePath, metadata, isPathShared, callback) {
    var url = this.SERVER + 'nfs/file';
    var payload = {
      url: url,
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + this.authToken
      },
      data: {
        filePath: filePath,
        metadata: metadata,
        isPathShared: isPathShared
      }
    };
    (new this.Request(payload, callback)).send();
  };

  self.modifyFileContent = function(filePath, isPathShared, dataAsUint, offset, callback) {
    offset = offset || 0;
    var payload = {
      url: this.SERVER + 'nfs/file/' + encodeURIComponent(filePath) + '/' + isPathShared + '?offset=' + offset,
      method: 'PUT',
      headers: {
        authorization: 'Bearer ' + this.authToken
      },
      data: dataAsUint
    };
    (new this.Request(payload, callback)).send();
  };
  return self;
} ]);
