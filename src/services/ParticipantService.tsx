import connector from "./connector";

const titles = [
  {
    points: 0,
    title: "Nýgræðlingur"
  },
 
  {
    points: 5,
    title: "Græðlingur"
  },
  {
    points: 10,
    title: "Viðarvinur"
  },
  {
    points: 20,
    title: "Trjáaldur"
  },
  {
    points: 30,
    title: "Trjáhvíslari"
  }
  ,
  {
    points: 40,
    title: "Skóghirðir"
  }
  ,
  {
    points: 50,
    title: "Entur"
  },
  {
    points: 100,
    title: "Landvættur"
  }
];

class ParticipantService {
  static async getParticipant(body: { email: string; name: string }) {
    const { data } = await connector.post("/participant/", body);

    data.title = this.getTitle(data.co2Offset);

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

  static getTitle(points : number){
    return ( titles.find(x=> x.points >= points) || titles[titles.length-1]).title;
  }
}

export default ParticipantService;
