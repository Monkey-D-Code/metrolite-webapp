import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// importing reducers
import accountsReducer from './accounts/accounts.reducer';
import  websiteReducer from './website/Website.reducer';
import outletReducer from './outlet/Outlet.reducer';
import menuReducer from './menu/Menu.reducer';
import itemReducer from './item/Item.reducer';
import vendorReducer from './vendor/Vendor.reducer';
import productReducer from './product/Product.reducer';
import recordReducer from './record/Record.reducer';

const persistConfig = {
    key : 'root',
    storage,
    whitelist : ['accounts'],
}

const rootReducer = combineReducers({
    accounts : accountsReducer,
    website : websiteReducer,
    outlet : outletReducer,
    menu : menuReducer,
    item : itemReducer,
    vendor : vendorReducer,
    product : productReducer,
    record : recordReducer,
});

export default persistReducer(persistConfig,rootReducer);
