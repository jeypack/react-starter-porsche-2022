// EgpHeader .egp-header
import React, { Component } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LanguageService from '../services/LanguageService';
import Utility from '../services/Utility';
import './SectionBackground.scss';

class SectionBackground extends Component {

  constructor(props) {
    super(props);
    //console.log("SectionBackground", "langList:", this.props.langList);
    //const name = Math.floor(Date.now() + (Math.random() * 100)).toString(16);
    const uniqueInt = Utility.getUniqueInt();
    this.state = { uniqueInt };
    this.langService = LanguageService.getInstance();
    gsap.registerPlugin(ScrollTrigger);
  }

  componentDidMount() {
    const { backgroundImage } = this.props;
    const trigger = document.querySelector(".section-bkg.section-bkg-" + this.state.uniqueInt);
    console.log("componentDidMount", "trigger", trigger);
    const bkgImage = trigger.querySelector(".image-background");
    console.log("componentDidMount", "bkgImage", bkgImage);
    const img = new Image();
    img.addEventListener('load', (e) => {
      console.log("componentDidMount", "e.target:", e.target.width, e.target.height);
      const imageHeight = window.innerWidth / e.target.width * e.target.height;
      console.log("componentDidMount", "imageHeight", imageHeight);
      gsap.to(bkgImage, {
        backgroundPosition: `50% ${-imageHeight}px`,
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          // when the top of the trigger hits the top of the viewport
          start: "top center",
          end: "bottom top",
          scrub: true
        }
      });
    });
    img.src = backgroundImage;
  }

  /* handleClick(item) {
    // second argument will always be the synthetic event
    console.log("handleClick item:", item);
    if (this.props.onChangeLanguage) {
      this.props.onChangeLanguage(item);
    }
  } */

  render() {
    const { backgroundImage } = this.props;
    const backgroundStyle = {
      backgroundImage: 'url(' + backgroundImage + ')'
    };
    const className = 'section-bkg section-bkg-' + this.state.uniqueInt;
    //classList['selected'] = (language === item.label);
    //const classSet = Utility.classSet(classList);
    return (
      <section className={className}>
        <div className="container full-width">
          <div className="col-12">
            <div className="image-background" style={backgroundStyle}></div>
          </div>
        </div>
      </section>
    );
  }
}

export default SectionBackground;
