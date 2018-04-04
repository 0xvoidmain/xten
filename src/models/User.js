export default class User {
  static schema ={
    name: 'User',
    properties: {
      name: 'string',
      numberOfWordsPerDay: 'int'
    }
  }

  static getInstance() {
    var { realm } = require('./index');
    var instances = realm.objects('User');
    return instances[0];
  }
}