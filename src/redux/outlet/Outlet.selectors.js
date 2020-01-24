import {createSelector} from 'reselect';

const selectOutlet = state => state.outlet;
const selectAccounts = state => state.accounts;

export const selectAllOutlets = createSelector(
    [selectOutlet],
    outlet => outlet.all_outlets,
)
export const selectLoadingOutlets = createSelector(
    [selectOutlet],
    outlet => outlet.loading_outlets,
)
export const selectOutletsError = createSelector(
    [selectOutlet],
    outlet => outlet.outlets_error,
)
export const selectActiveOutlet = createSelector(
    [selectOutlet],
    outlet => outlet.active_outlet,
)
export const selectUserOutlet = createSelector(
    [selectOutlet,selectAccounts],
    (outlet,accounts) => {
        const {all_outlets} = outlet;
        const {activeUser} = accounts;
        if(all_outlets && activeUser){
            const key = all_outlets.find(i=>i.id===activeUser.outlet);
            
            if(!key) return null;
            return key
        }
        return null;
    },
)


export const selectSingleOutlet = createSelector(
    [selectOutlet],
    outlet => outlet.single_outlet,
)
export const selectOutletError = createSelector(
    [selectOutlet],
    outlet => outlet.outlet_error,
)
export const selectLoadingOutlet = createSelector(
    [selectOutlet],
    outlet => outlet.loading_outlet,
)
