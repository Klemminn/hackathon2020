import connector from './connector'

class AuthService {
  static async login (params?: {
    email: string,
  }) {
    const { data } = await connector.get('/places/', { params })
    return data
  }
}

export default AuthService
