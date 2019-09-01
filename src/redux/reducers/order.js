import * as type from '../types';

const initialState = {

    all_menu_id : null,
    transaction_id : null,
    isLoading : false,
    isError : false,
    msg : ''
}

export default function listorder(state = initialState,action){
    switch(action.type){
        case type.GET_LIST_ORDER:
            return {
                ...state,
                all_menu_id : action.payload,
            }
        case type.SEND_ORDER_FULFILLED:
            return {
                ...state,
                msg : action.payload.data,
            }
        case type.SEND_ORDER_REJECTED:
        return {
            ...state,
            msg : action.payload.data,
        }
            
        
        default :
            return state
    }
}