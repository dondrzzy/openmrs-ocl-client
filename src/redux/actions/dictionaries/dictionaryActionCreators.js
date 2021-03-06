import { notify } from 'react-notify-toast';
import {
  addDictionary,
  fetchOrganizations,
  isSuccess,
  isFetching,
  dictionaryIsSuccess,
  isErrored,
  fetchingVersions,
  dictionaryConceptsIsSuccess,
  realisingHeadSuccess,
  editDictionarySuccess,
} from './dictionaryActions';
import { filterPayload } from '../../reducers/util';
import api from './../../api';

/* eslint-disable */
export const createDictionary = data => dispatch =>
  api.dictionaries
    .createDictionary(data)
    .then(payload => dispatch(
      addDictionary(payload),
      notify.show(
        'Successfully added dictionary to your organization',
        'success', 6000,
      ),
    ))
    .catch(error =>
      notify.show(`${error.response.data.__all__[0]}`, 'error', 6000));

export const createDictionaryUser = data => dispatch =>
  api.dictionaries
    .createDictionaryUser(data)
    .then(payload => dispatch(
      addDictionary(payload),
      notify.show(
        'Successfully added your dictionary',
        'success', 6000,
      ),
    ))
    .catch(error =>
      notify.show(`${error.response.data.__all__[0]}`, 'error', 6000));

export const fetchingOrganizations = () => dispatch =>
  api.organizations
    .fetchOrganizations()
    .then(payload => dispatch(fetchOrganizations(payload)));

export const fetchDictionaries = () => (dispatch) => {
  dispatch(isFetching(true));
  return api.dictionaries
    .fetchingDictionaries()
    .then((payload) => {
      const result = filterPayload(payload);
      dispatch(isSuccess(result));
      dispatch(isFetching(false));
    })
    .catch((error) => {
      dispatch(isErrored(error.response.data));
      dispatch(isFetching(false));
    });
};

export const searchDictionaries = searchItem => (dispatch) => {
  dispatch(isFetching(true));
  return api.dictionaries
    .searchDictionaries(searchItem)
    .then((payload) => {
      dispatch(isSuccess(payload));
      dispatch(isFetching(false));
    })
    .catch(error => () => {
      dispatch(isErrored(error.payload.data));
      dispatch(isFetching(false));
    });
};

export const fetchDictionary = data => (dispatch) => {
  dispatch(isFetching(true));
  return api.dictionaries
    .fetchDictionary(data)
    .then(
      (payload) => {
      dispatch(dictionaryIsSuccess(payload));
      dispatch(isFetching(false));
    });
  };

export const fetchVersions = data => (dispatch) => {
  return api.dictionaries
    .fetchingVersions(data)
    .then(
      (payload) => {
      dispatch(fetchingVersions(payload));
    })
    .catch(error => () => {
      notify.show(`${error.response.data.__all__[0]}`, 'error', 6000);
    });
  };

export const fetchDictionaryConcepts = data => (dispatch) => {
  dispatch(isFetching(true));
  return api.dictionaries
    .fetchDictionaryConcepts(data)
    .then(
      (payload) => {
      dispatch(dictionaryConceptsIsSuccess(payload));
      dispatch(isFetching(false));
      })
      .catch((error) => {
        dispatch(isErrored(error.response.data));
        dispatch(isFetching(false));
      });
};

export const releaseHead = (url, data) => (dispatch) => {
  return api.dictionaries
    .realisingHeadVersion(url, data)
    .then(
      (payload) => {
        dispatch(realisingHeadSuccess(payload));
        dispatch(isFetching(false));
        notify.show(
          'Head Version Successfully Released',
          'success', 6000,
        );
      }
    )
    .catch(() => {
      dispatch(isFetching(false));
      notify.show("Network Error. Please try again later!", 'error', 6000);
      });
};
  export const editDictionary = (url, data) => dispatch => {
    return api.dictionaries
      .editDictionary(url, data)
      .then(payload => {
        notify.show(
          'Successfully updated dictionary',
          'success', 6000,
        );
        return dispatch(editDictionarySuccess(payload));
      })
      .catch(error => {
        notify.show(`${error.response.data.__all__[0]}`, 'error', 6000);
      })
    }

