import * as type from '../types';

const initialState = {
    id : null,
    table_number : null,
    finished_time : null,
    subtotal : 0,
    discount :0,
    service_charge :0,
    tax :0,
    total :0,
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
        case "subTotal":
            return {
                ...state,
                subtotal : action.subtotal,
                discount : action.discount,
                service_charge : action.service_charge,
                tax :action.tax,
                total : action.subtotal - action.discount + action.service_charge + action.tax
            }
        case "completeMyTf_FULFILLED":
            return{
                ...state,
                is_paid: true,
                msg : action.payload.data
            }
        case "completeMyTf_REJECTED":
            return {
                ...state,
                is_paid : false,
                msg : action.payload.data
            }
        case "time":
            return {
                ...state,
                finished_time : action.payload
            }
        default :
            return state
    }
}