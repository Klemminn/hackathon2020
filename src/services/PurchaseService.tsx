import connector from './connector'

import { Purchase } from 'types'

class PurchaseService {
  static async getTotalOffset () {
    const { data } = await connector.get('/totalOffset/')
    return data
  }

  static async createPurchase (body: Purchase) {
    const { data } = await connector.post('/purchase/', body)
    return data
  }
}

export default PurchaseService
