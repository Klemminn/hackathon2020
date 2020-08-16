import connector from './connector'

let totalCo2: number
class Co2EmissionService {
  static async getCo2EmissionTypes () {
    const { data } = await connector.get('/co2emissiontypes/')
    return data
  }

  static async getTotalCo2 () {
    if (totalCo2) {
      return totalCo2
    }
    const response = await this.getCo2EmissionTypes()
    totalCo2 = response.reduce((a: number, b: any) => a + b.co2, 0)
    return totalCo2
  }
}

export default Co2EmissionService
