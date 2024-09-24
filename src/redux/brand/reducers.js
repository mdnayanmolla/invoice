import actions from './actions';

const {
  BRAND_ADD_BEGIN,
  BRAND_ADD_SUCCESS,
  BRAND_ADD_ERR,

  BRAND_UPLOAD_BEGIN,
  BRAND_UPLOAD_SUCCESS,
  BRAND_UPLOAD_ERR,

  BRAND_READ_BEGIN,
  BRAND_READ_SUCCESS,
  BRAND_READ_ERR,

  BRAND_UPDATE_BEGIN,
  BRAND_UPDATE_SUCCESS,
  BRAND_UPDATE_ERR,

  BRAND_DELETE_BEGIN,
  BRAND_DELETE_SUCCESS,
  BRAND_DELETE_ERR,

  BRAND_SINGLE_DATA_BEGIN,
  BRAND_SINGLE_DATA_SUCCESS,
  BRAND_SINGLE_DATA_ERR,
} = actions;

const initialState = {
  data: [],
  url: null,
  fileLoading: false,
  loading: false,
  error: null,
};

const initialStateSingle = {
  data: null,
  loading: false,
  error: null,
};

const brandCrudReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case BRAND_UPLOAD_BEGIN:
      return {
        ...state,
        fileLoading: true,
      };

    case BRAND_UPLOAD_SUCCESS:
      return {
        ...state,
        url: data,
        error: false,
        fileLoading: false,
      };

    case BRAND_UPLOAD_ERR:
      return {
        ...state,
        error: err,
        fileLoading: false,
      };

    case BRAND_ADD_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case BRAND_ADD_SUCCESS:
      return {
        ...state,
        data,
        error: false,
        loading: false,
      };

    case BRAND_ADD_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case BRAND_READ_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case BRAND_READ_SUCCESS:
      return {
        ...state,
        data,
        error: false,
        loading: false,
      };

    case BRAND_READ_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case BRAND_DELETE_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case BRAND_DELETE_SUCCESS:
      return {
        ...state,
        error: false,
        data,
        loading: false,
      };

    case BRAND_DELETE_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case BRAND_UPDATE_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case BRAND_UPDATE_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
      };

    case BRAND_UPDATE_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    default:
      return state;
  }
};

const brandSingleCrudReducer = (state = initialStateSingle, action) => {
  const { type, data, err } = action;
  switch (type) {
    case BRAND_SINGLE_DATA_BEGIN:
      return {
        ...initialStateSingle,
        loading: true,
      };

    case BRAND_SINGLE_DATA_SUCCESS:
      return {
        ...initialStateSingle,
        data,
        error: false,
        loading: false,
      };

    case BRAND_SINGLE_DATA_ERR:
      return {
        ...initialStateSingle,
        error: err,
        loading: false,
      };

    default:
      return state;
  }
};

export { brandCrudReducer, brandSingleCrudReducer };
