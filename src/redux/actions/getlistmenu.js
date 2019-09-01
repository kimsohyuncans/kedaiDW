import * as type from '../types'
import axios from 'axios'

export const getlistmenu = () => ({
    type : type.GET_LIST_MENU,
    payload : axios.get('http://localhost:8080/api/v1/listmenu')
})