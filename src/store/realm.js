/*
import Realm from 'realm';
import { ListView } from 'realm/react-native';

const uuid = require('uuid');

class TodoItem {
  static get() { return realm.objects(TodoItem.schema.name); }

  static schema = {
    name: 'TodoItem',
    primaryKey: 'id',
    properties: {
      id: { type: 'string' },
      fullName: { type: 'string' },
      createdTimestamp: { type: 'date' },
    },
  }
}

const realm = new Realm({ schema: [TodoItem] });

export const todoItemDS = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });

export const getTodoItems = () => {
  const todoItems = TodoItem.get().sorted('createdTimestamp', true);
  return todoItems;
};

export const getTodoItem = (id) => {
  const todoItem = realm.objectForPrimaryKey(TodoItem, id);
  return todoItem;
};

export const updateTodoItem = (todoItem, { fullName }) => {
  realm.write(() => {
    try {
      todoItem.fullName = fullName;
    } catch (e) {
      console.warn(e);
    }
  });
};

export const createTodoItem = ({ fullName }) => {
  realm.write(() => {
    realm.create(TodoItem.schema.name, {
      id: uuid.v1(),
      fullName,
      createdTimestamp: new Date(),
    });
  });
};

export const deleteTodoItem = (todoItem) => {
  realm.write(() => {
    realm.delete(todoItem);
  });
};
*/