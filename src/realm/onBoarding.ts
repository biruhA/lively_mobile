import {Realm} from '@realm/react';

export class OnBoarding extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  hasOnBoarded!: boolean;
  rememberMe!: boolean;

  static generate(hasOnBoarded: boolean, rememberMe: boolean) {
    return {
      _id: new Realm.BSON.ObjectId(),
      hasOnBoarded,
      rememberMe,
    };
  }

  static schema = {
    name: 'OnBoarding',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      hasOnBoarded: {type: 'bool', default: true},
      rememberMe: {type: 'bool', default: false},
    },
  };
}
