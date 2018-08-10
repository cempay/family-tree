import {storeData, retrieveData} from '../../Services/storage';
import {uid} from '../../Services/entity';

const key = 'relatives';

export const createRelative = (data) => {
  return retrieveData(key)
    .then((oldData = {}) => {
      return storeData(key, {
        ...oldData,
        [uid()]: data
      })
    })
    .then((result) => {
      return result;
    });
};

export const retrieveAllRelatives = () => {
  return retriveData(key);
};

export const retrieveRelative = (key) => {
  return retriveData(key)
    .then((dict = {}) => {
      return dict[key];
    });
};

export default {
  createRelative,
  retrieveAllRelatives,
  retrieveRelative
}