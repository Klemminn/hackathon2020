import connector from './connector'

class PurchaseService {
  static async getTreesPlanted () {
    const { data } = await connector.get('/planted/')
    return data
  }
}

export default PurchaseService
