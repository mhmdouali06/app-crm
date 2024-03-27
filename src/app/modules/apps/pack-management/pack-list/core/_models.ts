import {ID, Response} from '../../../../../../_metronic/helpers'
export type User = {
  id?: ID
  removeFiles?:any[]
  images?:any
  promotion?: boolean|number
  get?: (key: string) => any
  name?: string
  sold?: number
  price?: number
  email?: string
  position?: string
  date_f?: string
  date_d?: string
  event?: any
  quantity?: number

  image_url?: string
  image?: string
  meta?: any
 
  description?: string
  initials?: {
    label: string
    state: string
  }
  
}

export type UsersQueryResponse = Response<Array<User>>

export const initialUser: User = {
  
  name: '',
  email: '',
}
