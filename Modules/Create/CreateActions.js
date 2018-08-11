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
    });
};

export const retrieveAllRelatives = () => {
  return retrieveData(key);
};

export const retrieveRelative = (key) => {
  return retrieveData(key)
    .then((dict = {}) => {
      return dict[key];
    });
};

export default {
  createRelative,
  retrieveAllRelatives,
  retrieveRelative
}