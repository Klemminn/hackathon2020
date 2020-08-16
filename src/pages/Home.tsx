import React, { useState, useEffect } from 'react'

import { Button, CurvedProgressBar, Co2Counter, LeaderboardModal, MunicipalityProgress,InfoSection, Chart } from 'components'
import { Co2EmissionService, PurchaseService, MunicipalityService } from 'services'
import { Municipality } from 'types'

import './Home.scss'

const Home = () => {
  const [openModal, setOpenModal] = useState("");
  const [totalOffset, setTotalOffset] = useState(0);
  const [totalCo2, setTotalCo2] = useState(0);
  const [totalPopulation, setTotalPopulation] = useState(0);
  const [progress, setProgress] = useState(0);
  const [emissionTypes, setEmissionTypes]: [any[], any] = useState([]);
  const [municipalities, setMunicipalities]: [Municipality[], any] = useState(
    []
  );

  useEffect(() => {
    getProgress();
    getMunicipalities();
    getTotalPopulation();
    getTotalCo2();
    getEmissionTypes();
    // eslint-disable-next-line
  }, []);

  const getEmissionTypes = async () => {
    let types = await Co2EmissionService.getCo2EmissionTypes().catch(error =>
      console.log(error)
    );
    console.log(types);
    setEmissionTypes(types);
  };

  const getProgress = async () => {
    const offset = await PurchaseService.getTotalOffset().catch(error =>
      console.log(error)
    );
    const co2Total = await Co2EmissionService.getTotalCo2().catch(error =>
      console.log(error)
    );
    let status = offset / co2Total;
    setTotalOffset(offset);
    if (status > 1) {
      status = 1;
    }
    setProgress(status);
  };

  const getTotalPopulation = async () => {
    const population = await MunicipalityService.getTotalPopulation().catch(
      error => console.log(error)
    );
    setTotalPopulation(population);
  };

  const getTotalCo2 = async () => {
    const co2 = await Co2EmissionService.getTotalCo2().catch(error =>
      console.log(error)
    );
    setTotalCo2(co2);
  };

  const getMunicipalities = async () => {
    try {
      const response = await MunicipalityService.getMunicipalities().catch(
        error => console.log(error)
      );
      response.sort(
        (a: Municipality, b: Municipality) =>
          b.co2Offset / a.population - a.co2Offset / b.population
      );
      setMunicipalities(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="home-page">
      <img className="logo" alt="Jöfnum okkur" src="/assets/logo-200x200.png" />
      <section className="intro_section">
        <div className="counter_and_logo_outer_container">
          <div className="counter_and_logo_container">
            <Co2Counter className="co2counter" totalOffset={totalOffset} />
            <Button className='offset-yourself'>Jafnaðu þig</Button>
            <div className="municipalities-progress">
              {municipalities.map((m, idx) =>
                idx >= 5 ? null : (
                  <MunicipalityProgress
                    key={m.id}
                    municipality={m}
                    totalPopulation={totalPopulation}
                    totalCo2={totalCo2}
                  />
                )
              )}
              <Button className='view-all-municipalities'>Sjá öll</Button>
            </div>
          </div>
          <CurvedProgressBar progress={progress} />
        </div>

      </section>
      {/* <Button onClick={() => setOpenModal('leaderboard')}>
        Sjá stigatöflu
      </Button> */}
      <LeaderboardModal
        isOpen={openModal === "leaderboard"}
        toggle={() => setOpenModal("")}
      />
      <InfoSection
        title = "Hvað er kolefnisjöfnun?"
        text = "Kolefnisjöfnun snýst um að binda aftur þau kolefni losuð hafa verið út í andrúmsloftið. Til eru ýmsar aðferðir til þess, en ein þeirra er að  gróðursetja tré."
      />

<InfoSection title = "Jafnaðu þig mest!"
                   text = "Við höldum utan um það hvaða bæjarfélög jafna sig hraðast. Þeir sem hafa mesta jafnaðargeðið birtast á topp fimm lista okkar, en þú sem einstaklingur birtist einnig í einstaklingskeppninni. Sýndu vinum og ættingjum þínum hversu jafnlyndur einstaklingur þú ert!"
                   imagePath="/assets/hall.png" />
      <p className = "icons_whodunnit">Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></p>
      <section className="chart_section">
        {!emissionTypes || emissionTypes.length === 0 ? null : (
          <Chart emissionData={emissionTypes} />
        )}
      </section>
    </div>
  );
};

export default Home;
// Photo by Jon Flobrant on Unsplash
