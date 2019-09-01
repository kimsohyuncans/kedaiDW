import * as type from '../types'
import axios from 'axios'

export const getlistorder = (listorder,tf_id) => ({
    type : type.GET_LIST_ORDER,
    payload : {
        listorder,
        tf_id
    }
})

export const sendorder = (data) => ({
    type : type.SEND_ORDER,
    payload : axios.post('http://localhost:8080/api/v1/order',data)
})