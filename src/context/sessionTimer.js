import axios from 'axios'

import authConfig from 'src/configs/auth'


export const refreshToken = () => {
  const CREDENTIALS = window.localStorage.getItem("CREDENTIALS")
  const SAP_BASE_URL = process.env.NEXT_PUBLIC_SAP_BASE_URL

  const base64Data = localStorage.getItem('userData')

  const userdata = JSON.parse(atob(base64Data))

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${SAP_BASE_URL}/Login()`,
    headers: {
      Authorization: 'Basic ' + CREDENTIALS,
      'Content-Type': 'application/json'
    }
  }
  axios
    .request(config)
    .then(response => {
      window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.SessionId)
      window.localStorage.setItem(authConfig.TokenExpirationTimeout, response.data.SessionTimeout)
    })
    .catch(error => {
      console.log(error)
    })

  console.log('Function called after 30 minutes')
}
