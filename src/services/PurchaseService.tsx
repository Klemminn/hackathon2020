import connector from './connector'

class PurchaseService {
  static async getTotalOffset () {
    const { data } = await connector.get('/totalOffset/')
    return data
  }
}

export default PurchaseService
