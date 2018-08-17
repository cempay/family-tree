import { SQLite } from 'expo';
import PouchDB from 'pouchdb-react-native';
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite';

const uuid = require('uuid');

const SQLiteAdapter = SQLiteAdapterFactory(SQLite);
PouchDB.plugin(SQLiteAdapter);
const db = new PouchDB('relatives.db', { adapter: 'react-native-sqlite' });

export default class PouchDBStore {
  constructor({ onRefresh }) {
    this.onRefresh = onRefresh;

    db.changes({
      since: 'now',
      live: true,
    }).on('change', this.getRelativeList);
  }

  createRelative = (item, onSuccess, onFailure) => {
    const data = {
      _id: uuid.v1(),
      ...item,
    };
    db.put(data, (err) => {
      if (err) {
        onFailure && onFailure(err);
      } else {
        onSuccess && onSuccess();
      }
    });
  };

  deleteRelative = (data) => {
    db.remove(data);
  };

  deleteAllRelatives = () => {
    db.destroy();
  };

  getRelativeList = () => {
    db.allDocs({ include_docs: true, descending: true }, (err, doc) => {
      this.onRefresh(doc.rows);
    });
  };
}
