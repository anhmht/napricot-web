const getUsers = async (): Promise<User[]> => {
  try {
    const data = await $api('/users')
    return data.users as User[]
  } catch (error: any) {
    console.log(error)
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

const verifyCode = async (
  code: string,
  email: string
): Promise<User | undefined> => {
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

const forgotPassword = async (email: string): Promise<void> => {
  try {
    await $api('/users/send-reset-password-link', {
      method: 'POST',
      body: { email }
    })
    return
  } catch (error: any) {
    throw errorHandler(error)
  }
}

const resetPassword = async (
  password: string,
  token: string
): Promise<void> => {
  try {
    await $api('/users/reset-password', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: { password }
    })
    return
  } catch (error: any) {
    throw errorHandler(error)
  }
}

interface UserService {
  getUsers: () => Promise<User[]>
  register: (user: User) => Promise<User | undefined>
  verifyCode: (code: string, email: string) => Promise<User | undefined>
  resendCode: (email: string) => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (password: string, token: string) => Promise<void>
}

export const $userService: UserService = {
  getUsers: () => getUsers(),
  register: (user) => register(user),
  verifyCode: (code, email) => verifyCode(code, email),
  resendCode: (email) => resendCode(email),
  forgotPassword: (email) => forgotPassword(email),
  resetPassword: (password, token) => resetPassword(password, token)
}
