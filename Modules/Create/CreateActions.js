import { storeData, retrieveData } from '../../Services/storage';
// import { uid } from '../../Services/entity';

const key = 'relatives';

export const createRelative = data => retrieveData(key)
  .then((oldData = {}) => storeData(key, {
    ...oldData,
    stubUid: data,
  }));

export const retrieveAllRelatives = () => retrieveData(key);

export const retrieveRelative = aKey => retrieveData(aKey)
  .then((dict = {}) => dict[key]);

export default {
  createRelative,
  retrieveAllRelatives,
  retrieveRelative,
};
