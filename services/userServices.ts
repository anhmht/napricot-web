
const getUsers = async (): Promise<User[]> => {
  try {
    const data = await $api('/users', {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Njc0NzBmYzkxZTgzNDMzNzc3MTI3NDYiLCJlbWFpbCI6ImFuaG1odEBnbWFpbC5jb20iLCJpYXQiOjE3MTkwNTM4Mzd9.I0AzxndokVrZnnMnK7niAYoEeTAdQWNlRxJot869Jw4`
      }
    })
    return data.users as User[]
  } catch (error: any) {
    errorHandler(error)
  }
  return []
}


interface UserService {
  getUsers: () => Promise<User[]>
}

export const $userService: UserService = {
  getUsers: () => getUsers()
}