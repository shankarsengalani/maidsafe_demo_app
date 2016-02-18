var temp = require('temp').track();
var fs = require('fs');
var util = require('util');

export let writeTempFile = function(title, content, filePath, callback) {
  var tempDirName = 'safe_uploader_template';
  var title = title;
  var content = content;
  filePath = __dirname + filePath;
  var fileName = 'index.html';
  try {
    var tempDirPath = temp.mkdirSync(tempDirName);
    var templateString = fs.readFileSync(filePath).toString();
    var tempFilePath = path.resolve(tempDirPath, fileName);
    fs.writeFileSync(tempFilePath,
        util.format(templateString, title, content));
    return callback(null, tempFilePath);
  } catch (e) {
    return callback(e);
  }
};
