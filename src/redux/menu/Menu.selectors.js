import {createSelector} from 'reselect';

const selectMenu = state => state.menu;


export const selectAllMenus = createSelector(
    [selectMenu],
    menu =>menu.all_menus,
)
export const selectMenusError = createSelector(
    [selectMenu],
    menu =>menu.menus_error,
)
export const selectLoadingMenus = createSelector(
    [selectMenu],
    menu =>menu.loading_menus,
)
export const selectActiveMenu = createSelector(
    [selectMenu],
    menu =>menu.activeMenu,
)