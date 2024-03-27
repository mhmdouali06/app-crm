import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../../_metronic/helpers'
import {User, UsersQueryResponse} from './_models'

const API_URL2 = `${process.env.REACT_APP_API_URL2}/api/colors`



const getColors = (query: string): Promise<UsersQueryResponse> => {
    return axios.get(`${API_URL2}?${query}`).then((d: AxiosResponse<UsersQueryResponse>) => d.data)
}



const getColorById = (id: ID): Promise<User | undefined> => {
  return axios
    .get(`${API_URL2}/${id}`)
    // .then((response: AxiosResponse<Response<any>>) => response.data)
    .then((response: Response<any>) => response.data)
}


const createColor = (category: any): Promise<User | undefined> => {
  return axios
    .post(`${API_URL2}`, category,{headers: {'Content-Type': 'multipart/form-data'}})
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}


const updateColor = (colors: any,id: ID): Promise<User | undefined> => {
  return axios
  .post(`${process.env.REACT_APP_API_URL2}/api/update_colors/${id}`, colors,{      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
})
  .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}




const deleteColor = (Id: ID): Promise<void> => {
  return axios.delete(`${API_URL2}/${Id}`).then(() => {})
}


const deleteSelectedColor = (categoryIds: Array<ID>): Promise<void> => {
  const requests = categoryIds.map((id) => axios.delete(`${API_URL2}/${id}`))
  return axios.all(requests).then(() => {})
}

export {deleteSelectedColor,getColors,createColor,deleteColor,getColorById,updateColor}
