// Use new ES6 modules syntax for everything.
// import os from 'os'; // native node.js module
import { remote } from 'electron'; // native electron module
// import jetpack from 'fs-jetpack'; // module loaded from npm
import * as tempFile from './api/controllers/write_temp_file';

window.tempFile = tempFile;
window.closeApp = function() {
  remote.getCurrentWindow().close();
};
