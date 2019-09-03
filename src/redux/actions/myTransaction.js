import * as type from '../types'
import axios from 'axios'

export const setTableNumber = (value) => ({
    type : type.SET_TABLE_NUMBER,
    payload : value
})

export const sendTableNumber = (value) => ({
    type : type.SEND_TABLE_NUMBER,
    payload : axios.post("http://localhost:8080/api/v1/transactions",{
        table_number : value
    })
})

export const subTotal = (data) => ({
    
    type : 'subTotal',
    
    subtotal : data,
    discount : Math.floor(Math.random() * 5),
    service_charge : Math.floor(Math.random() * 20),
    tax : 7.50,
    
})

export const completeMyTf = (data) => ({
    type: 'completeMyTf',
    payload : axios.patch("http://localhost:8080/api/v1/complete_transaction",data)
})