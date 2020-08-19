import connector from "./connector";

class ParticipantService {
  static async getParticipant(body: { email: string; name: string }) {
    const { data } = await connector.post("/participant/", body);
    return data;
  }

  static async getParticipants() {
    const { data } = await connector.get("/participants/");

    return data;
  }

  static async getLeaderboard() {
    const { data } = await connector.get("/leaderboard/");
    return data;
  }
}

export default ParticipantService;
