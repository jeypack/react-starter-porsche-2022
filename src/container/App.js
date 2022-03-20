// App .egp-app
import React, { Component } from 'react';
//import { gsap } from "gsap";
//import { ScrollTrigger } from "gsap/ScrollTrigger";
//import EgpStepFactory from './EgpStepFactory';
import StickyHeader from '../components/StickyHeader';
import SectionBackground from '../components/SectionBackground';
import EgpSlider from '../components/EgpSlider';
//import SectionBlockStd from '../components/SectionBlockStd';
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

    //gsap.registerPlugin(ScrollTrigger);

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

        <section id="start" className="background-color-blue">
          <div className="container justify-center gutters">
            <div className="col-auto text-center">
              <h3 className="">{ this.langService.getString("start_h3") }</h3>
              <h4 className="">{ this.langService.getString("start_h4") }</h4>
            </div>
          </div>
        </section>

        <article id="quer" className="quer">
          <section className="diagonal">
            <div className="col-quer"></div>
            <div className="col-quer-content container">
              <div className="col-12">
                <img className="car img-responsive" src={Images['porsche_car'].src} alt=""></img>
                <div className="container gutters">
                  <div className="col-12">
                    <div className="passion-day-headline">PASSION DAY 2022</div>
                  </div>
                  <div className="col-12 col-sm-8 col-md-7 col-lg-6">
                    <p className="">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.</p>
                    <div className="btn btn-flex-center background-color-white color-dark"><span className="icon arrow-right-grey"></span>Jetzt anmelden</div>
                  </div>
                </div>

              </div>
            </div>
          </section>
        </article>

        <article id="slider" className="position-relative">
          <section className="">
            <div className="container justify-center items-center full-width">
              <div className="col-9">
                <EgpSlider data={structureData.slider}></EgpSlider>
              </div>
            </div>
          </section>
        </article>

        <article id="portfolio" className="position-relative bkg-size-50 left-center">
          <SectionBackground backgroundImage={Images['ews_new_berlin_6'].src}></SectionBackground>
        </article>

        <article id="" className="position-relative bkg-size-50 bkg-left-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
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
