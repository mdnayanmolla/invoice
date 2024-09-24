import { combineReducers } from 'redux';
import authReducer from './authentication/reducers';
import { brandCrudReducer, brandSingleCrudReducer } from './brand/reducers';
import { axiosCrudReducer, axiosSingleCrudReducer } from './crud/axios/reducers';
import dataTable from './data-filter/reducers';
import { headerSearchReducer } from './headerSearch/reducers';
import { readNotificationReducer } from './notification/reducers';
import orderReducer from './orders/reducers';
import { productReducer, SingleProductReducer } from './product/reducers';
import { sellersReducer } from './sellers/reducers';
import ChangeLayoutMode from './themeLayout/reducers';
import themeUsersReducer from './themeUsers/reducers';

const rootReducers = combineReducers({
  themeUsers: themeUsersReducer,
  headerSearchData: headerSearchReducer,
  notification: readNotificationReducer,
  orders: orderReducer,
  sellers: sellersReducer,
  auth: authReducer,
  products: productReducer,
  product: SingleProductReducer,
  // projects: projectReducer,
  // project: SingleProjectReducer,
  ChangeLayoutMode,
  AxiosCrud: axiosCrudReducer,
  dataTable,
  SingleAxiosCrud: axiosSingleCrudReducer,

  //TODO new work start section
  BrandCrud: brandCrudReducer,
  SingleBrandCrud: brandSingleCrudReducer,
});

export default rootReducers;
