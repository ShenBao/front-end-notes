var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
function readFileList(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((item, index) => {
    var fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      var nextPath = path.join(dir, item);
      if (nextPath.includes('code') || nextPath.includes('img') || nextPath.includes('.git')) {
      } else {
        filesList.push({},{
          name: item,
          path: fullPath.replace(__dirname, '').replace(/\\/g, '/') + '/README.md'
        });
        readFileList(path.join(dir, item), filesList);
      }
    } else {
      var extname = path.extname(item)
      if (extname == '.md' && item != 'README.md') {
        var obj = {
          name: item.replace('.md', '').replace(/[0-9]/ig,'').replace('.','').replace(/\s*/g, ''),
          path: fullPath.replace(__dirname, '').replace(/\\/g, '/')
        }
        filesList.push(obj);
      }
    }
  });
  return filesList;
}
var filesList = [];
readFileList(__dirname, filesList);

console.log(__dirname);
console.log(__filename)
var n = __dirname + '.md';
console.log(n, path.__filename(n));


var str = '';
filesList.forEach((item, index) => {
  var { name, path } = item;
  if(!name) {
    str += `\n`;
    return;
  }
  path = encodeURIComponent(path);
  if (item.path.includes('README.md')) {
    str += `## [${name}](./${path})\n`;
  }  else {
    str += `1. [${name}](./${path})\n`;
  }
})

// console.log(str);

fs.writeFileSync('./README.txt', '')
fs.writeFile('./README.txt', str, { flag: 'a', encoding: 'utf-8', mode: '0666' }, function (err) {
  if (err) {
    console.log('error');
    throw err;
  }
  console.log('success');
});