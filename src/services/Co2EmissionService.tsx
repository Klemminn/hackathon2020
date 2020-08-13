class Co2EmissionService {
  static co2TonnesPerTree: number = 0.1;
  static treesPerTonCo2: number = 10;
  static getCo2TonnesForTreeCount(treeCount: number) {
    return this.co2TonnesPerTree * treeCount;
  }

  static getTreeCountForCo2Tonnes(tonnesCo2: number) {
    return this.treesPerTonCo2 * tonnesCo2;
  }
  /**
   * Returns an array of emissiondata in tonnes of co2
   * Each entry in array has a label and value
   **/
  static getCo2EmissionData() {
    //harðkóðað 4 now
    return;
    [
      {
        label: "Flugsamgöngur",
        value: 1542.68
      },
      {
        label: "Landbúnaður og matvælaframleiðsla",
        value: 36.81
      },
      {
        label: "Heimili",
        value: 606.13
      },
      {
        label: "Flutningar á sjó og vatni",
        value: 493.68
      },
      {
        label: "Fiskveiðar og fiskeldi",
        value: 338.43
      },
      {
        label: "Veitustarfsemi og sorphirða",
        value: 15.92
      },
      {
        label: "Byggingastarfsemi og námugröftur",
        value: 203.02
      },
      {
        label: "Landflutningar og geymsla",
        value: 103.32
      },
      {
        label: "Verslun og þjónusta",
        value: 69.3
      },
      {
        label: "Framleiðsla á vörum og öðru",
        value: 30.1
      },
      {
        label: "Efnaframleiðsla",
        value: 153.04
      },
      {
        label: "Listir, íþróttir og afþreying",
        value: 4.4
      },
      {
        label: "Opinber þjónusta og heilbrigðismál",
        value: 12.6
      }
    ];
  }
}

export default Co2EmissionService;
