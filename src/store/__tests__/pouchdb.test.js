import PouchDBStore from '../pouchdb';

test('works to be 1', () => {
  const onRefresh = () => {};
  const store = new PouchDBStore({ onRefresh });
  console.log(store);
  expect(1).toBe(1);
});
