import { types } from "../types/types";
export const authReducer = (state = {}, { payload, type }) => {
    switch (type) {
    case types.login:
        return {
            ...state,
            logged: true,
            user: payload
        };
    case types.logout:
        return { logged: false };
    default:
        return state;
    }
};
