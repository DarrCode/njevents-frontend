import { defineStore } from 'pinia'
import axios from '@axios'

export const useCustomerStore = defineStore('CustomerStore', {
  actions: {
    // 👉 Fetch users data
    getCustomers(params) {
      console.log('params', params)
  
      return axios.get(`customers?page=1&perPage=${params.perPage}`, { params }) 
    },

    // 👉 Add Customer
    addCustomer(customerData) {
      return new Promise((resolve, reject) => {
        axios.post('customers', {
          user: customerData,
        }).then(response => resolve(response))
          .catch(error => reject(error))
      })
    }, 

    // 👉 fetch single user
    fetchUser(id) {
      return new Promise((resolve, reject) => {
        axios.get(`/apps/users/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
  },
})
