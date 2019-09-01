import * as type from '../types';

const initialState = {
    id : null,
    table_number : null,
    finished_time : null,
    subtotal : null,
    discount : null,
    service_charge : null,
    tax : null,
    total : null,
    is_paid : null,
    isError : false,
    isLoading : false,
    msg : 'everything its okay',
}

export default function transaction(state = initialState,action){
    switch(action.type){
        case type.SET_TABLE_NUMBER:
            return {
                ...state,
                table_number : action.payload
            }
        case type.SEND_TABLE_NUMBER:
            return {
                ...state,
                isLoading : true,
                msg : "trying sending data"
            }
        case type.SEND_TABLE_NUMBER_FULFILLED:
            return {
                ...state,
                isLoading: false,
                msg : action.payload.data,
                id : action.payload.data.output.id,
                table_number : action.payload.data.output.table_number
            }
        case type.SEND_TABLE_NUMBER_REJECTED:
            return {
                ...state,
                isLoading : false,
                msg : "server error",
                isError : true
            }
        default :
            return state
    }
}