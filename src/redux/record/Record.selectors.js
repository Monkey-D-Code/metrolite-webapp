import {createSelector} from 'reselect';

const selectRecord = state => state.record;

export const selectSaleDate = createSelector(
    [selectRecord],
    record => record.sale_date,
)
export const selectPurchaseDate = createSelector(
    [selectRecord],
    record => record.purchase_date,
)
export const selectSaleRecords = createSelector(
    [selectRecord],
    record => record.sale_records,
)
export const selectSaleRecordsError = createSelector(
    [selectRecord],
    record => record.sale_records_error,
)
export const selectSaleRecordsLoading = createSelector(
    [selectRecord],
    record => record.sale_records_loading,
)
export const selectPurchaseRecords = createSelector(
    [selectRecord],
    record => record.purchase_records,
)
export const selectPurchaseRecordsError = createSelector(
    [selectRecord],
    record => record.purchase_records_error,
)
export const selectPurchaseRecordsLoading = createSelector(
    [selectRecord],
    record => record.purchase_records_loading,
)