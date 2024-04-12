import axios from 'axios'

const config = {
  baseURL: import.meta.env.VITE_NEMON_INVO_TO_CASH_URL_API,
  headers: {
    'Content-type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*',
  },
}

const instance = axios.create(config) // Crea la instancia de axios

export default instance


// const config = {
//   baseURL: import.meta.env.VITE_NEMON_INVO_TO_CASH_URL_API,
//   headers: {
//     'Content-type': 'application/json',
//     'X-Requested-With': 'XMLHttpRequest',
//     'Access-Control-Allow-Origin': '*',
//   },
// }

// const axiosIns = axios.create({
//   // config,
//   baseURL: import.meta.env.VITE_NEMON_INVO_TO_CASH_URL_API,
//   headers: {
//     'Content-type': 'application/json',
//     'X-Requested-With': 'XMLHttpRequest',
//     'Access-Control-Allow-Origin': '*',
//   },

// // You can add your headers here
// // ================================
// // baseURL: 'https://some-domain.com/api/',
// // timeout: 1000,
// // headers: {'X-Custom-Header': 'foobar'}
// })


// // ℹ️ Add request interceptor to send the authorization header on each subsequent request after login
// axiosIns.interceptors.request.use(config => {
//   // Retrieve token from localStorage
//   const token = localStorage.getItem('accessToken')

//   // If token is found
//   if (token) {
//     // Get request headers and if headers is undefined assign blank object
//     config.headers = config.headers || {}

//     // Set authorization header
//     // ℹ️ JSON.parse will convert token to string
//     config.headers.Authorization = token ? `Bearer ${JSON.parse(token)}` : ''
//   }

//   // Return modified config
//   return config
// })
// export default axiosIns
