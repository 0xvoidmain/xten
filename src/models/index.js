import Realm from 'realm';
import FlowModel from './Flow';
import UserModel from './User';
import WordModel from './Word';

export var realm = new Realm({schema: [
  FlowModel,
  UserModel,
  WordModel
]});

export var Flow = FlowModel;
export var User = UserModel;
export var Word = WordModel;