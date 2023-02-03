import { types } from '../types/types'


export const authRducer = (state, { type, payload }) => {
    console.log("authRducer ",{ state })
    switch (type) {
        case types.login:
            return {
                ...state,
                ...payload.user,
                logged: true,
            }
        case types.changeInfo:
            return {
                ...state,
                ...payload.user,
                uid: payload.user.id,
                completeInfo: true,
                logged: true,
            }
        case types.logout:
            return {
                logged: false,
            }
        default:
            return state;
    }
}