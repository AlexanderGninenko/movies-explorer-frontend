import React from "react";
import { Route, Switch, useHistory, withRouter } from "react-router-dom";
import AboutMe from "./AboutMe/AboutMe";
import AboutProject from "./AboutProject/AboutProject";
import Portfolio from "./Portfolio/Portfolio";
import Promo from "./Promo/Promo";
import Techs from "./Techs/Techs";

function Main() {
  return (
    <main className="main">
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  );
}

export default Main;
