export default class Word {
  static PRACTICE_LEVEL = {
    NONE: 0,
    BEGIN: 1,
    DAY: 2,
    DAY2: 3,
    DAY4: 4,
    WEEK: 5,
    WEEK_2: 6,
    WEEK_4: 7,
    MONTH: 8,
    MONTH_2: 9,
    MONTH_4: 10,
    YEAR: 11
  }

  static schema = {
    name: 'Word',
    primaryKey: 'id',
    properties: {
      id: 'int',
      en: 'string',
      vi: 'string',
      wordClass: { type: 'string', default: '' },
      category: { type: 'string', default: '' },
      enLength: { type: 'int', default: 0 },
      viLength: { type: 'int', default: 0 },
      level: { type: 'int', default: 0 },
      knew: { type: 'bool', default: false },
      practice: { type: 'int', default: 0 }
    }
  }

  nextPractice() {
    if (this.practice < Word.PRACTICE_LEVEL.YEAR) {
      this.practice += 1;
    }
  }

  resetPractice() {
    this.practice = Word.PRACTICE_LEVEL.BEGIN;
  }
};