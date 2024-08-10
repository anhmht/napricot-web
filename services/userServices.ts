
const getUsers = async (): Promise<User[]> => {
  try {
    const data = await $api('/users', {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Njc0NzBmYzkxZTgzNDMzNzc3MTI3NDYiLCJlbWFpbCI6ImFuaG1odEBnbWFpbC5jb20iLCJpYXQiOjE3MTkwNTM4Mzd9.I0AzxndokVrZnnMnK7niAYoEeTAdQWNlRxJot869Jw4`
      }
    })
    return data.users as User[]
  } catch (error: any) {
    console.log(error);
  }
  return []
}

const register = async (user: User): Promise<User | undefined> => {
  try {
    const data = await $api('/users/register', {
      method: 'POST',
      body: user
    })
    return data as User
  } catch (error: any) {
    throw errorHandler(error)
  }
}

const signIn = async (email: string, password: string): Promise<User | undefined> => {
  try {
    const data = await $api('/login', {
      method: 'POST',
      body: { email, password }
    })
    return data.user as User
  } catch (error: any) {
    throw errorHandler(error)
  }
}

const verifyCode = async (code: string, email: string): Promise<User | undefined> => {
  try {
    const data = await $api('/users/verify', {
      method: 'POST',
      body: { code, email }
    })
    return data as User
  } catch (error: any) {
    throw errorHandler(error)
  }
}

const resendCode = async (email: string): Promise<void> => {
  try {
    await $api('/users/resend', {
      method: 'POST',
      body: { email }
    })
    return
  } catch (error: any) {
    throw errorHandler(error)
  }
}

const getMe = async (): Promise<User | undefined> => {
  try {
    const data = await $api('/users/me')
    return data as User
  } catch (error: any) {
    throw errorHandler(error)
  }
}

const signOut = async (): Promise<void> => {
  try {
    const store = useMainStore()
    store.setCurrentUser(undefined)
    window.localStorage.removeItem('user')
    navigateTo('/')
    return
  } catch (error: any) {
    throw errorHandler(error)
  }
}

interface UserService {
  getUsers: () => Promise<User[]>
  signIn: (email: string, password: string) => Promise<User | undefined>
  register: (user: User) => Promise<User | undefined>
  verifyCode: (code: string, email: string) => Promise<User | undefined>
  resendCode: (email: string) => Promise<void>
  getMe: () => Promise<User | undefined>
  signOut: () => Promise<void>
}

export const $userService: UserService = {
  getUsers: () => getUsers(),
  signIn: (email, password) => signIn(email, password),
  register: (user) => register(user),
  verifyCode: (code, email) => verifyCode(code, email),
  resendCode: (email) => resendCode(email),
  getMe: () => getMe(),
  signOut: () => signOut()
}
