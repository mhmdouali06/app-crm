import axios from 'axios'

const API_ROUTE = process.env.REACT_APP_API_URL2

interface CallApiOptions {
  route: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  body?: any
}

export function UseCallApi() {
  const callApi = async ({
    route,
    method,
    body,
  }: CallApiOptions) => {
    let dataToSend: any = body
    const r = `${API_ROUTE}/${route}`
    const config: any = {}

    try {
      let response: any

      if (method === 'POST') {
        
        response = await axios.post(r, dataToSend, config)
      } else if (method === 'GET') {
        response = await axios.get(r, config)
      } else if (method === 'DELETE') {
        response = await axios.delete(r, config)
      } else if (method === 'PUT') {
        response = await axios.put(r, dataToSend, config)
      } else if (method === 'PATCH') {
        response = await axios.patch(r, dataToSend, config)
      }

      return response.data
    } catch (error) {
      throw error
    }
  }

  return callApi
}
