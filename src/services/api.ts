import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.codetabs.com/v1'
})