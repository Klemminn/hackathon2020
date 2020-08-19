import React, { useState, useEffect } from 'react'
import ReactTooltip from 'react-tooltip'

import { Button, CurvedProgressBar, Co2Counter, MunicipalityProgress, InfoSection, Chart, DoughnutChart, ConfirmedModal, MunicipalitiesModal, PurchaseModal } from 'components'
import { Co2EmissionService, PurchaseService, MunicipalityService, OffsetAgentService, ParticipantService } from 'services'
import { Municipality, NewPurchase, LeaderBoardParticipant } from 'types'
import { FormatUtils } from 'utils'

import './Home.scss'

const Home = () => {
  const [openModal, setOpenModal] = useState("");
  const [totalOffset, setTotalOffset] = useState(0);
  const [totalCo2, setTotalCo2] = useState(0);
  const [newestPurchases, setNewestPurchases]: [NewPurchase[], any] = useState([]);
  const [leaderboard, setLeaderboard]: [LeaderBoardParticipant[], any] = useState([]);
  const [totalPopulation, setTotalPopulation] = useState(0);
  const [progress, setProgress] = useState(0);
  const [emissionTypes, setEmissionTypes]: [any[], any] = useState([]);
  const [offsetAgents, setOffsetAgents]: [any[], any] = useState([]);
  const [municipalities, setMunicipalities]: [Municipality[], any] = useState(
    []
  );

  const getAllProgress = () => {
    getProgress();
    getMunicipalities();
    getNewestPurchases();
    getLeaderboard();
  }

  useEffect(() => {
    getAllProgress();
    getTotalPopulation();
    getTotalCo2();
    getEmissionTypes();
    getOffsetAgents();
    // eslint-disable-next-line
  }, []);

  const getOffsetAgents = async () => {
    const agents = await OffsetAgentService.getOffsetAgents().catch(error =>
      console.log(error)
    );
    setOffsetAgents(agents);
  };

  const getNewestPurchases = async () => {
    const purchases = await PurchaseService.getNewestPurchases().catch(error =>
      console.log(error)
    );
    setNewestPurchases(purchases);
  };

  const getLeaderboard = async () => {
    const response = await ParticipantService.getLeaderboard().catch(error =>
      console.log(error)
    );
    setLeaderboard(response);
  };

  const getEmissionTypes = async () => {
    let types = await Co2EmissionService.getCo2EmissionTypes().catch(error =>
      console.log(error)
    );

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
          b.co2Offset / b.population - a.co2Offset / a.population
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
          <div
            className='tagline'
            data-tip={`Samkvæmt tölum Hagstofunnar er heildar útblástur frá heimilum landsmanna ${FormatUtils.thousandSeparator(totalCo2)} tonn, eða ${FormatUtils.round(totalCo2 / totalPopulation, 1)} tonn á hvern einstakling.`}
          >
            Kolefnisjöfnum heimili landsins
          </div>
          <div className="counter_and_logo_container">
            <Co2Counter className="co2counter" totalOffset={totalOffset} />
            <Button
              className='offset-yourself'
              onClick={() => setOpenModal('purchase')}
            >
              Jafnaðu þig
            </Button>
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
              <Button
                className='view-all-municipalities'
                onClick={() => setOpenModal('municipalities')}
              >
                Sjá öll
              </Button>
            </div>
          </div>
          <CurvedProgressBar progress={progress} />
        </div>

      </section>
      {/* <Button onClick={() => setOpenModal('leaderboard')}>
        Sjá stigatöflu
      </Button> */}
      <div className="leaderboard_container">
        <div className='participants'>

          <div className='title '>Nýjustu framlög</div>

          {newestPurchases.map((purchase: NewPurchase, index: number) => (
            <div className='purchase ' key={index}>
              <div className='participant'>{purchase.participantName}</div>
              <div className='municipality'>{purchase.municipalityName}</div>
              <div className='co2'>{FormatUtils.thousandSeparator(Math.round(10 * purchase.totalCo2) / 10)} tonn</div>
            </div>
          ))}

        </div>
      </div>

      <InfoSection title="Jöfnum okkur á loftlagsbreytingum!" text="Gerðu þitt í baráttunni með því að kolefnisjafna rekstur heimilisins. Skráðu þig inn í gegnum Facebook og kolefnisjafnaðu í gegnum sjóð að eigin vali. Jafnaðu þig á loftlagsbreytingum og losnaðu við flugviskubitið!"
        imagePath="/assets/travel.png" />

      <InfoSection title="Hvað er kolefnisjöfnun?"
        text="Kolefnisjöfnun snýst um að binda aftur þau kolefni sem losuð hafa verið út í andrúmsloftið. Til eru ýmsar aðferðir til þess, ein þeirra er að gróðursetja tré. Með því að binda kolefni vegur þú á móti losun gróðurhúsalofttegunda og tekur grænt skref inn í framtíðina."
        imagePath="/assets/seed.png" />

      <InfoSection title="Jafnaðu þig mest!"
        text="Við höldum utan um það hvaða bæjarfélög jafna sig hraðast. Þeir sem hafa mesta jafnaðargeðið birtast á topp fimm lista okkar, en þú sem einstaklingur birtist einnig í einstaklingskeppninni. Sýndu vinum og ættingjum þínum hversu jafnlyndur einstaklingur þú ert!"
        imagePath="/assets/hall.png" />
      <p className="icons_whodunnit">Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from  <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
        <div>Icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
      </p>
      <div className="leaderboard_container">
        <div className='participants'>

          <div className='title'>Kolefnishetjurnar</div>
          {leaderboard.map((p: LeaderBoardParticipant, index: number) => (
            <div className='purchase' key={index}>
              <div className='participant'>{p.name}</div>
              <div className='participant_title'>{p.title}</div>
              <div className='co2'>{FormatUtils.thousandSeparator(Math.round(10 * p.totalCo2) / 10)} tonn</div>
            </div>
          ))}


        </div>
      </div>

      <section className="chart_section">
        {!emissionTypes || emissionTypes.length === 0 ? null : (
          <Chart emissionData={emissionTypes} />
        )}

      </section>
      <section className="chart_section doughnut_chart">

        {!emissionTypes || emissionTypes.length === 0 ? null : (
          <DoughnutChart emissionData={emissionTypes} />
        )}
      </section>

      <InfoSection title="Útreikningar"
        text={"Við notum tölur Hagstofunnar <a href='https://px.hagstofa.is/pxis/pxweb/is/Umhverfi/Umhverfi__2_losunlofttegunda__2_losunlofttegunda_aea/UMH31110.px/?rxid=8f9a2427-1d09-41ab-98cf-f22be3cd9d9b'>um losun gróðurhúsalofttegunda</a> ásamt <a href ='http://px.hagstofa.is/pxen/pxweb/is/Ibuar/Ibuar__mannfjoldi__1_yfirlit__arsfjordungstolur/MAN10001.px/?rxid=f4a21b41-fb7a-45dc-9aec-62ae2d3cea5c'>mannfjöldatölum</a> til þess að reikna út hversu mikið meðal Íslendingurinn þyrfti að kolefnisjafna sig. Við miðum aðeins við losun heimilanna þegar prósenta kolefnisjöfnunar er reiknuð út. " +`Heildar útblástur CO2 frá heimilum landsmanna er ${FormatUtils.thousandSeparator(totalCo2)} tonn, eða ${FormatUtils.round(totalCo2 / totalPopulation, 1)} tonn á hvern einstakling.`}
        imagePath="/assets/math.png" />

      <MunicipalitiesModal
        municipalities={municipalities}
        isOpen={openModal === "municipalities"}
        toggle={() => setOpenModal("")}
        totalPopulation={totalPopulation}
        totalCo2={totalCo2}
      />
      <PurchaseModal
        isOpen={openModal === "purchase"}
        toggle={() => setOpenModal("")}
        offsetAgents={offsetAgents}
        emissionPerPerson={totalCo2 / totalPopulation}
        municipalities={municipalities}
        onSubmit={() => {
          getAllProgress()
          setOpenModal('confirmed')
        }}
      />
      <ConfirmedModal
        isOpen={openModal === "confirmed"}
        toggle={() => setOpenModal("")}
      />
      <ReactTooltip />
    </div>
  );
};

export default Home;
// Photo by Jon Flobrant on Unsplash
