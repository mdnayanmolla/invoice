const actions = {
  BRAND_ADD_BEGIN: 'BRAND_ADD_BEGIN',
  BRAND_ADD_SUCCESS: 'BRAND_ADD_SUCCESS',
  BRAND_ADD_ERR: 'BRAND_ADD_ERR',

  BRAND_READ_BEGIN: 'BRAND_READ_BEGIN',
  BRAND_READ_SUCCESS: 'BRAND_READ_SUCCESS',
  BRAND_READ_ERR: 'BRAND_READ_ERR',

  BRAND_UPDATE_BEGIN: 'BRAND_UPDATE_BEGIN',
  BRAND_UPDATE_SUCCESS: 'BRAND_UPDATE_SUCCESS',
  BRAND_UPDATE_ERR: 'BRAND_UPDATE_ERR',

  BRAND_DELETE_BEGIN: 'BRAND_DELETE_BEGIN',
  BRAND_DELETE_SUCCESS: 'BRAND_DELETE_SUCCESS',
  BRAND_DELETE_ERR: 'BRAND_DELETE_ERR',

  BRAND_SINGLE_DATA_BEGIN: 'BRAND_SINGLE_DATA_BEGIN',
  BRAND_SINGLE_DATA_SUCCESS: 'BRAND_SINGLE_DATA_SUCCESS',
  BRAND_SINGLE_DATA_ERR: 'BRAND_SINGLE_DATA_ERR',

  BRAND_UPLOAD_BEGIN: 'BRAND_UPLOAD_BEGIN',
  BRAND_UPLOAD_SUCCESS: 'BRAND_UPLOAD_SUCCESS',
  BRAND_UPLOAD_ERR: 'BRAND_UPLOAD_ERR',

  brandUploadBegin: () => {
    return {
      type: actions.BRAND_UPLOAD_BEGIN,
    };
  },

  brandUploadSuccess: (data) => {
    return {
      type: actions.BRAND_UPLOAD_SUCCESS,
      data,
    };
  },

  brandUploadErr: (err) => {
    return {
      type: actions.BRAND_UPLOAD_ERR,
      err,
    };
  },

  brandAddBegin: () => {
    return {
      type: actions.BRAND_ADD_BEGIN,
    };
  },

  brandAddSuccess: (data) => {
    return {
      type: actions.BRAND_ADD_SUCCESS,
      data,
    };
  },

  brandAddErr: (err) => {
    return {
      type: actions.BRAND_ADD_ERR,
      err,
    };
  },

  brandReadBegin: () => {
    return {
      type: actions.BRAND_READ_BEGIN,
    };
  },

  brandReadSuccess: (data) => {
    return {
      type: actions.BRAND_READ_SUCCESS,
      data,
    };
  },

  brandReadErr: (err) => {
    return {
      type: actions.BRAND_READ_ERR,
      err,
    };
  },

  brandUpdateBegin: () => {
    return {
      type: actions.BRAND_UPDATE_BEGIN,
    };
  },

  brandUpdateSuccess: (data) => {
    return {
      type: actions.BRAND_UPDATE_SUCCESS,
      data,
    };
  },

  brandUpdateErr: (err) => {
    return {
      type: actions.BRAND_UPDATE_ERR,
      err,
    };
  },

  brandDeleteBegin: () => {
    return {
      type: actions.BRAND_DELETE_BEGIN,
    };
  },

  brandDeleteSuccess: (data) => {
    return {
      type: actions.BRAND_DELETE_SUCCESS,
      data,
    };
  },

  brandDeleteErr: (err) => {
    return {
      type: actions.BRAND_DELETE_ERR,
      err,
    };
  },

  brandSingleDataBegin: () => {
    return {
      type: actions.BRAND_SINGLE_DATA_BEGIN,
    };
  },

  brandSingleDataSuccess: (data) => {
    return {
      type: actions.BRAND_SINGLE_DATA_SUCCESS,
      data,
    };
  },

  brandSingleDataErr: (err) => {
    return {
      type: actions.BRAND_SINGLE_DATA_ERR,
      err,
    };
  },
};

export default actions;
