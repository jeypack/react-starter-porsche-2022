// EgpHeader .egp-header
import React, { Component } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LanguageService from '../services/LanguageService';
import Utility from '../services/Utility';
import './SectionBlockStd.scss';

import Images from '../services/Images';

class SectionBlockStd extends Component {

  constructor(props) {
    super(props);
    //console.log("SectionBlockStd", "langList:", this.props.langList);
    //const name = Math.floor(Date.now() + (Math.random() * 100)).toString(16);
    const uniqueInt = Utility.getUniqueInt();
    this.state = { uniqueInt };
    this.langService = LanguageService.getInstance();
    gsap.registerPlugin(ScrollTrigger);
  }

  componentDidMount() {
    const trigger = '.section-block-std.section-block-std' + this.state.uniqueInt;
    const target = trigger + ' .scroll-target';
    gsap.from(target, {
      scrollTrigger: {
        trigger: trigger,
        //start: "top center",
        start: "top bottom",
        end: "bottom top",
        toggleActions: "restart pause resume pause"
      },
      opacity: 0,
      x: 40,
      duration: 1.2,
      ease: "power1"
    });
  }

  /* handleClick(item) {
    // second argument will always be the synthetic event
    console.log("handleClick item:", item);
    if (this.props.onChangeLanguage) {
      this.props.onChangeLanguage(item);
    }
  } */

  render() {
    const { headline, paragraph, list, paragraph_small_1, image_1, paragraph_small_2 } = this.props.data;
    console.log("render", "this.props.type:", this.props.type);
    const imageSrc = Images[image_1.id].src;

    const className = 'section-block-std section-block-std' + this.state.uniqueInt;
    const classObjOrder5 = Utility.classObj('col-12 col-sm-5');
    //standard is: image-left-mobile-top
    //classObjOrder5['col-order-2'] = this.props.type === 'image-right-mobile-top';
    const classObjOrder7 = Utility.classObj('col-12 col-sm-7');
    classObjOrder7['col-sm-order-2'] = this.props.type === 'image-right-mobile-top';
    return (
      <section className={className}>
        <div className="container gutters-all">

          <div className={Utility.classSet(classObjOrder7)}>
            <img className="scroll-target img-responsive" src={imageSrc} alt={image_1.alt} title={image_1.title} />
            <p className='small'>{this.langService.getString(paragraph_small_2.id)}</p>
          </div>

          <div className={Utility.classSet(classObjOrder5)}>
            <div className="container gutters-all dir-column nowrap justify-center items-center full-height">
              <div className="row-auto">
                <h3>{this.langService.getString(headline.id)}</h3>
                <p>{this.langService.getString(paragraph.id)}</p>
              </div>
              <div className="row-auto">
                <ul className="icon-list">
                  {list.map((item, index) => {
                    return <li key={index}><a href={item.href} rel="noreferrer" target="_blank">{this.langService.getString(item.id)}</a></li>
                  })}
                </ul>
              </div>
              <div className="row-auto">
                <p className='small'>{this.langService.getString(paragraph_small_1.id)}</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    );
  }
}

export default SectionBlockStd;

//const backgroundStyle = { backgroundImage: 'url(' + backgroundImage + ')' };
/*
{this.props.langList.map((item) => {
          classList['selected'] = (language === item.label);
          const classSet = Utility.classSet(classList);
          //&console.log("render classSet:", classSet);
          return <div key={item.id} className={classSet} onClick={this.handleClick.bind(this, item)}>{item.label}</div>
        })}
 */
