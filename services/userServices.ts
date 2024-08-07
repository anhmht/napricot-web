
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

interface UserService {
  getUsers: () => Promise<User[]>
  signIn: (email: string, password: string) => Promise<User | undefined>
}

export const $userService: UserService = {
  getUsers: () => getUsers(),
  signIn: (email, password) => signIn(email, password)
}
