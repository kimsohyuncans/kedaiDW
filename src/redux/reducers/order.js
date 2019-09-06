import * as type from '../types';


const initialState = {

    data : null,
    transaction_id : null,
    isLoading : false,
    isError : false,
    msg : '',
    isSent : false
}

export default function listorder(state = initialState,action){
    switch(action.type){
        case "myOrder":
        return {
            ...state,
            msg : action.payload
        }
        case type.SEND_ORDER:
            return{
                ...state,
                data : null,
                msg : 'sending your orders',
                isLoading : true,
            }
        case type.SEND_ORDER_FULFILLED:
            return {
                ...state,
                data : action.payload.data,
                msg : 'success orders',
                isLoading : false,
                myOrder : action.myOrder
            }
        case type.SEND_ORDER_REJECTED:
        return {    
            ...state,
            data : action.payload.data,
            msg : 'error while ordering',
            isError : true,
            isLoading : false
        }
        
        case "changeStatus_FULFILLED":
            return{
                data : action.payload.data,
                msg : 'success change status',
                isLoading : false,
                isError : false,
                isSent : true

        }
        case "changeStatus_REJECTED":
            return{
                
                data : action.payload,
                msg : 'ERROR BGST',
                isLoading : false,
                isError : false,
                isSent : true

        }
            
        
        default :
            return state
    }
}