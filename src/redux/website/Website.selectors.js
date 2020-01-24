import {createSelector} from 'reselect';


const selectWebsite = state => state.website;

export const selectMenuToggle = createSelector(
    [selectWebsite],
    website => website.menuSwitch,
)