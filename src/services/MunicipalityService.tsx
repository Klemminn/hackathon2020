import connector from './connector'

class MunicipalityService {
  static async getMunicipalities () {
    const { data } = await connector.get('/municipalities/')
    return data
  }
}

export default MunicipalityService
