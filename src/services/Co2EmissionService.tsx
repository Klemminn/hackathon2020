import connector from './connector'

let totalCo2: any
let co2EmissionTypes: any
class Co2EmissionService {
  static async getCo2EmissionTypes () {
    if (!co2EmissionTypes) {
      const { data } = await connector.get('/co2emissiontypes/')
      co2EmissionTypes = data
    }
    return co2EmissionTypes
  }

  static async getTotalCo2 () {
    if (!totalCo2) {
      const { data } = await connector.get('/totalCo2/')
      totalCo2 = data
    }
    return totalCo2
  }
}

export default Co2EmissionService
