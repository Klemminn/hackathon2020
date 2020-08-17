import connector from "./connector";

const titles = [
  {
    points: 0,
    title: "Nýgræðlingur"
  },
  {
    points: 100,
    title: "Nýgræðlingur"
  },
  {
    points: 500,
    title: "Græðlingur"
  },
  {
    points: 800,
    title: "Viðarvinur"
  },
  {
    points: 800,
    title: "Trjáaldur"
  },
  {
    points: 1200,
    title: "Trjáhvíslari"
  }
  ,
  {
    points: 2000,
    title: "Skóghirðir"
  }
  ,
  {
    points: 5000,
    title: "Entur"
  },
  {
    points: 10000,
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

  static getTitle(points : number){
    return ( titles.find(x=> x.points <= points) || titles[titles.length-1]).title;
  }
}

export default ParticipantService;
