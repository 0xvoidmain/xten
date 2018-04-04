var fs = require('fs');
var json = require('./_wordlist3000.json');

fs.writeFileSync('./_wordlist3000.min.json', JSON.stringify(json));