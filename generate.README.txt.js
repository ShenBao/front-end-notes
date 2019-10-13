var fs = require ('fs');
var path = require ('path');

var repName = 'front-end-notes';
var basePath = 'https://github.com/ShenBao/front-end-notes/blob/master';
basePath = '';

function readFileList (dir, filesList = []) {
  const files = fs.readdirSync (dir);
  files.forEach ((item, index) => {
    var fullPath = path.join (dir, item);
    const stat = fs.statSync (fullPath);
    if (stat.isDirectory ()) {
      var nextPath = path.join (dir, item);
      if (
        nextPath.includes ('code') ||
        nextPath.includes ('img') ||
        nextPath.includes ('.git')
      ) {
      } else {
        filesList.push (
          {},
          {
            name: item,
            path: fullPath.replace (__dirname, '').replace (/\\/g, '/') +
              '/README.md',
          }
        );
        readFileList (path.join (dir, item), filesList);
      }
    } else {
      var extname = path.extname (item);
      if (extname == '.md' && item != 'README.md') {
        // var name = item.replace('.md', '').replace(/[0-9]/ig,'').replace('.','').replace(/\s*/g, '')
        var name = item.replace ('.md', '');
        var arr = name.split ('.');
        if (/^[0-9]+[\s\S]*$/.test (item)) {
          arr.shift ();
        }
        name = arr.join ().replace (/(^\s*)|(\s*$)/g, '');
        var itemPath = fullPath.replace (__dirname, '').replace (/\\/g, '/');
        var obj = {
          name: name,
          path: itemPath,
        };
        filesList.push (obj);
      }
    }
  });
  return filesList;
}
var filesList = [];
readFileList (__dirname, filesList);

var str = '';
filesList.forEach ((item, index) => {
  var {name, path} = item;
  if (!name) {
    str += `\n`;
    return;
  }
  var enPath = encodeURIComponent (path);
  if (item.path.includes ('README.md')) {
    console.log (``);
    str += `## [${name}](${basePath}${enPath})\n\n`;
  } else {
    str += `1. [${name}](${basePath}${enPath})\n`;
  }
  console.log (`[${name}](${basePath}${path})`);
});

fs.writeFileSync ('./README.txt', `# ${repName}\n`);
fs.writeFile (
  './README.txt',
  str,
  {flag: 'a', encoding: 'utf-8', mode: '0666'},
  function (err) {
    if (err) {
      console.log ('error');
      throw err;
    }
    console.log ('success');
  }
);
