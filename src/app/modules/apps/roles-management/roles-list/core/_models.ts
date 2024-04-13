import {ID, Response} from '../../../../../../_metronic/helpers'
export type User = {
  id?: ID
  get?: (key: string) => any
  name?: string
  description?: string
  permissions?: any
  avatar?: string
  email?: string
  position?: string
  role?: string
  total?: number
  per_page?: number
  last_login?: string
  two_steps?: boolean
  joined_day?: string
  online?: boolean
  image_url?: string
  image?: string
  first_name?: string
  last_name?: string
  meta?: any
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
