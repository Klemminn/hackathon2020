import connector from './connector'

class ParticipantService {
  static async getParticipant (body: {
    email: string,
    name: string
  }) {
    const { data } = await connector.post('/participant/', body)
    return data
  }
}

export default ParticipantService
