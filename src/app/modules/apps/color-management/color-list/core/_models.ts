import {ID, Response} from '../../../../../../_metronic/helpers'
export type User = {
  id?: ID
  get?: (key: string) => any
  code?: string
  image?: string
  image_url?: string
  name?: string
  email?: string
  initials?: {
    label: string
    state: string
  }
}

export type UsersQueryResponse = Response<Array<User>>

export const initialUser: User = {
  
  code: '',
}
