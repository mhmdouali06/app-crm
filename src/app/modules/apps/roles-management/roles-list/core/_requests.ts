import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../../_metronic/helpers'
import {User, UsersQueryResponse} from './_models'

const API_URL2 = `${process.env.REACT_APP_API_URL2}/api/roles`

const getRoles = (query: string): Promise<UsersQueryResponse> => {
  return axios.get(`${API_URL2}?${query}`).then((d: AxiosResponse<UsersQueryResponse>) => d.data)
}
const getPermissions = (query: string): Promise<UsersQueryResponse> => {
  return axios
    .get(`${process.env.REACT_APP_API_URL2}/api/permissions?${query}`)
    .then((d: AxiosResponse<UsersQueryResponse>) => d.data)
}

const getRoleById = (id: ID): Promise<User | undefined> => {
  return (
    axios
      .get(`${API_URL2}/${id}`)
      // .then((response: AxiosResponse<Response<any>>) => response.data)
      .then((response: Response<any>) => response.data)
  )
}

const createRole = (category: any): Promise<User | undefined> => {
  return axios
    .post(`${API_URL2}`, category, {headers: {'Content-Type': 'multipart/form-data'}})
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const updateRole = (category: any, id: ID): Promise<User | undefined> => {
  return axios
    .post(`${process.env.REACT_APP_API_URL2}/api/update_role/${id}`, category, {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    })
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const deleteRole = (Id: ID): Promise<void> => {
  return axios.delete(`${API_URL2}/${Id}`).then(() => {})
}

const deleteSelectedRole = (categoryIds: Array<ID>): Promise<void> => {
  const requests = categoryIds.map((id) => axios.delete(`${API_URL2}/${id}`))
  return axios.all(requests).then(() => {})
}

export {
  deleteSelectedRole,
  getRoles,
  createRole,
  deleteRole,
  getRoleById,
  updateRole,
  getPermissions,
}
