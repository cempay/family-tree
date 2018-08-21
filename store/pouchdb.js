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

  createRelative = (item) => {
    const data = {
      _id: uuid.v1(),
      ...item,
    };
    const result = db.put(data);

    return result;
  };

  updateRelative = item => db.put(item);

  deleteRelative = (data) => {
    return db.remove(data);
  };

  deleteAllRelatives = () => {
    db.allDocs({ include_docs: true, descending: true }, (err, response) => {
      const docsPromises = ((response || {}).rows || []).map(({ doc }) => this.deleteRelative(doc));
      return Promise.all(docsPromises).then(() => {
        this.onRefresh([]);
      });
    });
  };

  getRelativeList = () => {
    db.allDocs({ include_docs: true, descending: true }, (err, response) => {
      const docs = ((response || {}).rows || []).map(({ doc }) => doc);

      this.onRefresh(docs);
    });
  };
}
