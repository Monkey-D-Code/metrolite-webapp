import {createSelector} from 'reselect';

const selectAccounts = state => state.accounts;

export const selectActiveUser = createSelector(
    [selectAccounts],
    accounts => accounts.activeUser,
);

export const selectIsAuthenticated = createSelector(
    [selectAccounts],
    accounts => accounts.activeUser ? true : false,
)

export const selectUserError = createSelector(
    [selectAccounts],
    accounts => accounts.userError,
)
export const selectLoadingUser = createSelector(
    [selectAccounts],
    accounts => accounts.loadingUser,
)
export const selectTokenError = createSelector(
    [selectAccounts],
    accounts => accounts.tokenError,
)