var fs = require('fs');

var words = require('./wordlist3000.json');
var result = [];
var id = 0;
words.forEach(word => {
  try {
    var en = word.eng;
    var vi = word.vina;
    var wordClass = [];
    while(true) {
      var v = /\((.*?)\)/.exec(vi);
      if (v) {
        wordClass.push(v[1]);
        vi = vi.replace(v[0], '').trim();
      }
      else {
        break;
      }
    }

    vi = vi.split(';').map(e => e.trim()).filter(e => e);

    wordClass.forEach((e, i) => {
      if (vi[i]) {
        var ve = vi[i]
          .split(',')
          .map(e => e.trim())
          .filter(e => e)
          .map(e => e.split(' ').map(e => e.trim()).filter(e => e).join(' '))

        ve = ve.slice(0, Math.floor(ve.length / 2) + 1).join(',');

        result.push({
          id: id++,
          en: en,
          vi: ve,
          wordClass: e
        });
      }
    });
  }
  catch(ex) {

  }
});

fs.writeFileSync('./_wordlist3000.json', JSON.stringify(result, null, 4));