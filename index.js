#!/usr/bin/env node

var fs = require("fs"),
    util = require("util");
var mime = require("mime");
var file = process.argv[2];

checkFile(file);
pbcopy(base64Image(file));

function checkFile(src) {
  if (!fs.existsSync(src)) {
    console.log('Error: file not exist or filepath error');
    process.exit(1);
    return false;
  }
}

function base64Image(src) {
  var data = fs.readFileSync(src).toString("base64");
  return util.format("data:%s;charset=utf-8;base64,%s", mime.lookup(src), data);
}

function pbcopy(data) {
  var proc = require('child_process').spawn('pbcopy');
      proc.stdin.write(data); proc.stdin.end();
      console.log('Success: you can use [command + v] to paste');
}
