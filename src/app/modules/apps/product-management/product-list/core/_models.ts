import {ID, Response} from '../../../../../../_metronic/helpers'
export type User = {
  id?: ID
  colors?: any
  categories?:any
  removeFiles?:any[]
  images?:any
  get?: (key: string) => any
  name?: string
  smallQuantity?: number
  smallPrice?: number
  mediumQuantity?: number
  mediumPrice?: number
  grandePrice?: number
  grandeQuantity?: number
  avatar?: string
  email?: string
  position?: string
  role?: string
  last_login?: string
  two_steps?: boolean
  joined_day?: string
  online?: boolean
  image_url?: string
  image?: string
  meta?: any
  category?:any
  description?: string
  variants?: any
  display?: string|boolean
  dsiplayBy?: string|boolean
  initials?: {
    label: string
    state: string
  }
}

export type UsersQueryResponse = Response<Array<User>>

export const initialUser: User = {
  avatar: 'avatars/300-6.jpg',
  position: 'Art Director',
  role: 'Administrator',
  
  name: '',
  email: '',
}
