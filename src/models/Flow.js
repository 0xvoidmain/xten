export default class Flow {
  static ACTIONS = {
    GET_START: 'get_start',
    BEGIN_CHOOSE_WORDS: 'begin_choose_words',
    CHOOSE_WORDS: 'choose_words',
    BEGIN_PRACTICE: 'begin_practice',
    PRACTICE: 'practice',
    NONE: 'none'
  }
  static schema = {
    name: 'Flow',
    properties: {
      message: 'string',
      action: 'string',
      wordsLearn: {
        type: 'list',
        objectType: 'Word'
      },
      wordsPractice: {
        type: 'list',
        objectType: 'Word'
      }
    }
  }

  static getInstance() {
    var { realm } = require('./index');
    var instances = realm.objects('Flow');
    return instances[0];
  }
}