import * as type from '../types';

const initialState = {
    data : ["data kosong"],
    isLoading : true,
    isError : false,
}

export default function listmenu(state = initialState,action){
    switch(action.type){
        case type.GET_LIST_MENU:
            return {
                ...state,
                data : action.payload,
                isLoading : true
            }
        case type.GET_LIST_MENU_FULFILLED:
            return {
                ...state,
                isLoading : false,
                data : action.payload.data
            }
        case type.GET_LIST_MENU_REJECTED:
        return {
            ...state,
            isError : true,
            isLoading : false,
            data : "server error mohon refresh"
        }
        default :
            return state
    }
}