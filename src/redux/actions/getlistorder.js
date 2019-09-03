import * as type from '../types'
import axios from 'axios'


export const myOrder = (data) => ({
    type : "myOrder",
    payload : axios.get('http://localhost:8080/api/v1/myOrder')
})

export const sendOrder = (data,id) => ({
    type : type.SEND_ORDER,
    payload : axios.post('http://localhost:8080/api/v1/order/',data),
})

export const changeStatus = (data) => ({
    type : 'changeStatus',
    payload : axios.patch("http://localhost:8080/api/v1/status",{
        status : 1,
        transaction_id : 5
    })
})