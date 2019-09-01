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