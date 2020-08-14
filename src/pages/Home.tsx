import React from "react";
import { CurvedProgressBar, TreeCounter } from "components";
import { Co2EmissionService } from "services";
import "./Home.scss";

const Home = () => (
  <div className="home-page">
    <section className = "intro_section">
    <div className="counter_and_logo_outer_container">
      <div className ="counter_and_logo_container">
      <TreeCounter className="treecounter" totalTreesPlanted={5555} />
      <img className="logo" alt="Our logo" src="/assets/logo-200x200.png" />
      </div>
     
      <CurvedProgressBar
        emissionData={Co2EmissionService.getCo2EmissionData()}
        totalTreesPlanted={5555}
      />
    </div>
    </section>
  </div>
);

export default Home;
//Photo by Jon Flobrant on Unsplash