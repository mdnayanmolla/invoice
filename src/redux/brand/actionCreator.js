import { notification } from 'antd';
import Cookies from 'js-cookie';
import { DataService } from '../../config/dataService/dataService';
import actions from './actions';

const addNotificationSuccess = (message) => {
  notification.success({
    message,
  });
};

const addNotificationError = (err) => {
  notification.error({
    message: err,
  });
};

const deleteNotificationSuccess = () => {
  notification.success({
    message: 'Your Record has been Deleted',
  });
};

const deleteNotificationError = (err) => {
  notification.error({
    message: err,
  });
};

const updateNotificationSuccess = (message = 'Your Record has been updated') => {
  notification.success({
    message,
  });
};

const updateNotificationError = (err) => {
  notification.error({
    message: err,
  });
};

const {
  brandAddBegin,
  brandAddSuccess,
  brandAddErr,

  brandReadBegin,
  brandReadSuccess,
  brandReadErr,

  brandUpdateBegin,
  brandUpdateSuccess,
  brandUpdateErr,

  brandDeleteBegin,
  brandDeleteSuccess,
  brandDeleteErr,

  brandSingleDataBegin,
  brandSingleDataSuccess,
  brandSingleDataErr,

  brandUploadBegin,
  brandUploadSuccess,
  brandUploadErr,
} = actions;

const brandDataSubmit = (data, callback) => {
  return async (dispatch) => {
    try {
      await dispatch(brandAddBegin());
      const response = await DataService.post('/brand', data);
      const token = Cookies.get('access_token');
      if (token) {
        await dispatch(brandAddSuccess(response.data.data));
        addNotificationSuccess(response.data.message);
        callback();
      } else {
        await dispatch(brandAddErr('No Unauthorize access'));
        addNotificationError('No Unauthorize access');
      }
    } catch (err) {
      await dispatch(brandAddErr(err));
      addNotificationError(err);
    }
  };
};

const brandDataRead = () => {
  return async (dispatch) => {
    try {
      await dispatch(brandReadBegin());
      const query = await DataService.get('/brand');
      const token = Cookies.get('access_token');
      if (token) {
        await dispatch(brandReadSuccess(query.data.data));
      } else {
        await dispatch(brandAddErr('No Unauthorize access'));
        addNotificationError('No Unauthorize access');
      }
    } catch (err) {
      await dispatch(brandReadErr(err));
    }
  };
};

const brandDataSearch = (searchItem) => {
  return async (dispatch) => {
    try {
      await dispatch(brandReadBegin());
      if (searchItem !== '') {
        const query = await DataService.get(`/data/search/${searchItem}`);
        await dispatch(brandReadSuccess(query.data.data));
      } else {
        try {
          const query = await DataService.get('/data/all');
          await dispatch(brandReadSuccess(query.data.data));
        } catch (err) {
          await dispatch(brandReadErr(err));
        }
      }
    } catch (err) {
      await dispatch(brandReadErr(err));
    }
  };
};

const brandDataUpdate = (id, data, callback) => {
  return async (dispatch) => {
    try {
      await dispatch(brandUpdateBegin());
      const response = await DataService.put(`/brand/${id}`, data);
      await dispatch(brandUpdateSuccess());
      updateNotificationSuccess(response.message);
      callback();
    } catch (err) {
      await dispatch(brandUpdateErr(err));
      updateNotificationError(err);
    }
  };
};

const brandDataDelete = ({ id, getData }) => {
  return async (dispatch) => {
    try {
      await dispatch(brandDeleteBegin());
      const data = await DataService.delete(`brand/${id}`);

      await dispatch(brandDeleteSuccess(data.data));
      await getData();
      deleteNotificationSuccess();
    } catch (err) {
      await dispatch(brandDeleteErr(err));
      deleteNotificationError(err);
    }
  };
};

const brandDataSingle = (id) => {
  return async (dispatch) => {
    try {
      await dispatch(brandSingleDataBegin());
      const query = await DataService.get(`/brand/${id}`);
      await dispatch(brandSingleDataSuccess(query.data.data));
    } catch (err) {
      await dispatch(brandSingleDataErr(err));
    }
  };
};

const brandFileUploder = (imageAsFile) => {
  const data = new FormData();
  data.append('image', imageAsFile);

  return async (dispatch) => {
    try {
      await dispatch(brandUploadBegin());
      const query = await DataService.post('/data/image/upload', data, { 'Content-Type': 'multipart/form-data' });

      dispatch(brandUploadSuccess(`${query.data}`));
    } catch (err) {
      await dispatch(brandUploadErr(err));
    }
  };
};

const brandFileClear = () => {
  return async (dispatch) => {
    try {
      await dispatch(brandUploadBegin());
      dispatch(brandUploadSuccess(null));
    } catch (err) {
      await dispatch(brandUploadErr(err));
    }
  };
};

export {
  brandDataDelete,
  brandDataRead,
  brandDataSearch,
  brandDataSingle,
  brandDataSubmit,
  brandDataUpdate,
  brandFileClear,
  brandFileUploder,
};
