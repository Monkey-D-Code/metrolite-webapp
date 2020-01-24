import {createSelector} from 'reselect';

const selectVendor = state => state.vendor;

export const selectAllVendors = createSelector(
    [selectVendor],
    vendor => vendor.all_vendors,
)
export const selectVendorsError = createSelector(
    [selectVendor],
    vendor => vendor.vendors_error,
)
export const selectLoadingVendors = createSelector(
    [selectVendor],
    vendor => vendor.loading_vendors,
)
export const selectSelectedVendor = createSelector(
    [selectVendor],
    vendor => vendor.selected_vendor,
)