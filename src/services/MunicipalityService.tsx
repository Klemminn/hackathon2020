import connector from './connector'

let totalPopulation: any

class MunicipalityService {
  static async getMunicipalities () {
    const { data } = await connector.get('/municipalities/')
    return data
  }

  static async getTotalPopulation () {
    if (!totalPopulation) {
      const { data } = await connector.get('/population/')
      totalPopulation = data
    }
    return totalPopulation
  }
}

export default MunicipalityService
