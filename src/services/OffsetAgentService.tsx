import connector from './connector'

let offsetAgents: any
class OffsetAgentService {
  static async getOffsetAgents () {
    if (!offsetAgents) {
      const { data } = await connector.get('/offsetAgents/')
      offsetAgents = data
    }
    return offsetAgents
  }
}

export default OffsetAgentService
