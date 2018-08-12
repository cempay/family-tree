import { storeData, retrieveData } from '../../Services/storage';
import { uid } from '../../Services/entity';

const key = 'relatives';

export const createRelative = data => retrieveData(key)
  .then((oldData = {}) => storeData(key, {
    ...oldData,
    [uid()]: data,
  }));

export const retrieveAllRelatives = () => retrieveData(key);

export const retrieveRelative = key => retrieveData(key)
  .then((dict = {}) => dict[key]);

export default {
  createRelative,
  retrieveAllRelatives,
  retrieveRelative,
};
