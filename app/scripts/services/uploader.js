import fs from 'fs';
import path from 'path';

let progress = {
  total: 0,
  completed: 0,
  failed: 0,
  failedFiles: [],
  onUpdate: function() {}
};

let computeDirectorySize = function(localPath) {
  let size = 0;
  let stat;
  let tempPath;
  let contents = fs.readdirSync(localPath);
  for i in contents {
    tempPath = localPath + contents[i];
    stat = fs.statSync(tempPath);
    if (stat.isDirectory()) {
      size += computeDirectorySize(tempPath);
    } else {
      size += stat.size;
    }
  }
  return size;
};


let updateProgressOnFailure = fuction(size, path) {
  progress.failed += size;
  progress.failedFiles.push(localPath);
  progress.onUpdate();
};

let FileCreationHanlder = function(fileName, localPath, networkParentDirPath) {
  let size = fs.statSync(localPath).size;
  let ContentUpdated(size) {
    this.onResponse = function(err) {
      if (err) {
        console.error(err);
        return updateProgressOnFailure(size, localPath);
      }
      progress.completed += size;
      progress.onUpdate();
    };
    return this.onResponse;
  };

  this.onResponse = function(err) {
    if (err) {
      console.error(err);
      return updateProgressOnFailure(size, localPath);
    }
    api.nfs.updateFileContent(networkParentDirPath + '/' + fileName,
      fs.readFileSync(localPath), 0, new ContentUpdated(size));
  };

  return this.onResponse;
};

let uploadFile = function(localPath, networkParentDirPath) {
  let fileName = fs.basename(localPath);
  let hanlder = new FileCreationHanlder(fileName, localPath, networkParentDirPath);
  api.nfs.createFile(networkParentDirPath + '/' + fileName, '', hanlder);
};

let DirectoryCreationHanler = function(isPrivate, localPath, networkParentDirPath) {
  this.onResponse = function(err) {
    if (err) {
      console.log(err);
      return updateProgressOnFailure(computeDirectorySize(localPath), localPath);
    }
    let stat;
    let tempPath;
    let contents = fs.readdirSync(localPath);
    for i in contents {
      tempPath = localPath + contents[i];
      stat = fs.statSync(tempPath);
      if (stat.isDirectory()) {
        uploadDirectory(isPrivate, tempPath, networkParentDirPath);
      } else {
        uploadFile(tempPath, networkParentDirPath);
      }
    }
  };
  this.onResponse;
};

let uploadDirectory = function(isPrivate, localPath, networkParentDirPath) {
  networkParentDirPath += ('/' + fs.basename(localPath));
  let hanlder = new DirectoryCreationHanler(isPrivate, localPath, networkParentDirPath)
  api.nfs.createDirectory(networkParentDirPath, null, false, isPrivate, hanlder);
};

export var upload = function(localPath, isPrivate, folderPath) {
  let stat = fs.statSync(localPath);
  if (stat.isDirectory()) {
    progress.total = computeDirectorySize(localPath);
    uploadDirectory(isPrivate, localPath, folderPath || path.basename(localPath));
  } else {
    progress.total = stat.size;
    uploadFile(localPath, folderPath || path.dirname(localPath));
  }
  return progress;
};
