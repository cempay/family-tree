import i18n from 'i18next';
import en from '../../lang/en';
import ru from '../../lang/ru';
import reduxStore from '../store/createReduxStore';

const dispatch = reduxStore.dispatch;

// TODO Save language in pouchdb.
export const setLanguage = (language) => {
  i18n.init({
    lng: language,
    resources: {
      en,
      ru,
    },
  });

  dispatch({
    type: 'SET_LANGUAGE',
    payload: language,
  });
};
