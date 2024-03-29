// App .egp-app
import React, { Component } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
//import EgpStepFactory from './EgpStepFactory';
import StickyHeader from '../components/StickyHeader';
import SectionBackground from '../components/SectionBackground';
import SectionBlockStd from '../components/SectionBlockStd';
//import EgpStepID from '../constants/EgpStepID';
import LanguageService from '../services/LanguageService';
//import { authenticationService } from "../services/AuthenticationService";

import jsonLangData from '../assets/multi-language.json';
import structureData from '../assets/data.json';

import './App.scss';

import Images from '../services/Images';
//
class App extends Component {
  constructor() {
    super();
    //const currentStep = (authenticationService.currentUserValue) ? EgpStepID.UPLOAD : EgpStepID.LOGIN;
    //const currentStep = EgpStepID.LOGIN;
    //this.langService = new LanguageService(jsonLangData, 'EN');
    this.langService = LanguageService.getInstance();
    this.langService.setData(jsonLangData);
    this.langService.setLanguage('DE');
    this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
    this.handleChangeStep = this.handleChangeStep.bind(this);
    this.state = {
      currrentLanguage: this.langService.currrentLanguage
      //steps: [],
      //currentStep
    };

    gsap.registerPlugin(ScrollTrigger);

    console.log("Porsche Passion Day 2022", "v1.0.0", "14.02.2022", "✅");
    console.log("langService", this.langService);
    console.log("currrentLanguage", this.langService.currrentLanguage);
    console.log("getLanguages()", this.langService.getLanguages());
    console.log("getString('header_title')", this.langService.getString('header_title'));
    console.log("getString('unknown_id')", this.langService.getString('unknown_id'));
    console.log("structureData.main_nav", structureData.main_nav);

  }

  //componentDidMount() {}

  handleChangeLanguage(item) {
    console.info('handleChangeLanguage item:', item);
    this.langService.setLanguage(item.id);
    /* const key = item.label.toLowerCase();
    const newSteps = this.langService.getSteps(key);
    // this.setState((state, props) => ({
    //   currrentLanguage: item.label,
    //   steps: newSteps
    // })); */
    this.setState({
      currrentLanguage: this.langService.currrentLanguage
    });
  }

  handleChangeStep(step) {
    //console.info('handleChangeStep step:', step);
  }

  render() {
    const currrentLanguage = this.state.currrentLanguage;
    const langList = this.langService.getLanguages();
    //const { steps, currentStep } = this.state;
    //console.info('App render currentStep:', currentStep);
    //<EgpStepFactory debug={true} current={currentStep} steps={steps} onChangeStep={this.handleChangeStep}></EgpStepFactory>
    return (
      <>
        <StickyHeader language={currrentLanguage} data={structureData.main_nav} langList={langList} onChangeLanguage={this.handleChangeLanguage}></StickyHeader>
        <article id="start" className="right-center">

          <section>
            <div className="container items-center gutters-all">
              <div className="col-3 col-xs-1">
                <img className="img-responsive" src={Images['bob_round'].src} alt="Paragraph" title="Icon Paragraph" />
              </div>
              <div className="col-12 col-xs-11">
                <h2>{ this.langService.getString('start_section_1_headline') }</h2>
                <p className="">{ this.langService.getString('start_section_1_paragraph') }</p>
              </div>
            </div>
          </section>

          <SectionBackground backgroundImage={Images['csm_thema_buehne'].src}></SectionBackground>

          <section>
            <div className="container justify-center gutters-all">
              <div className="col-12">
                <h3>Risus commodo viverra maecenas accumsan</h3>
                <p className="">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>
              </div>
            </div>
          </section>
        </article>

        <article id="portfolio" className="position-relative size-50 left-center">

          <SectionBlockStd type={'image-right-mobile-top'} data={structureData.portfolio.section_1}></SectionBlockStd>

          <SectionBlockStd type={'image-left-mobile-top'} data={structureData.portfolio.section_1}></SectionBlockStd>

          <SectionBackground backgroundImage={Images['ews_new_berlin_6'].src}></SectionBackground>

        </article>

        <article id="quer" className="">
          <section className="diagonal">
            <div className="col-quer"></div>
            <div className="col-quer-content container gutters">
              <div className="col-12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
              </div>
            </div>
          </section>
        </article>

        <footer>
          <div className="container justify-space-between gutters-all text-center">
            <div className="col-12 col-xs-4 col-sm-4">
              <p>Created by JP &middot; &copy; 2022</p>
            </div>
            <div className="col-12 col-xs-4 col-sm-4">
              <nav className="container justify-space-between">
                <div className="col-6 col-xs-12 col-sm-6 col-lg-auto"><a href='#start'>Home</a></div>
                <div className="col-6 col-xs-12 col-sm-6 col-lg-auto"><a href='#portfolio'>Impressum</a></div>
                <div className="col-6 col-xs-12 col-sm-6 col-lg-auto"><a href='#portfolio'>Datenschutz</a></div>
                <div className="col-6 col-xs-12 col-sm-6 col-lg-auto"><a href='#portfolio'>Kontakt</a></div>
              </nav>
            </div>
            <div className="col-12 col-xs-4 col-sm-4">
              <p>Bobs Atelier</p>
            </div>
          </div>
        </footer>
      </>
    );
  }
}

export default App;

//rel="noopener noreferrer"
