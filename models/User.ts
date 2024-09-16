export interface User {
  email?: string
  name?: string
  password?: string
  token?: string
  roles?: ROLE[]
}

export enum ROLE {
  ADMIN = 'admin',
  USER = 'user',
  SUPER_ADMIN = 'superadmin'
}
