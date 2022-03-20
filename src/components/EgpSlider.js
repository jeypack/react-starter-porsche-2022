import React, { Component } from "react";
import Slider from "react-slick";
import LanguageService from '../services/LanguageService';

import Images from '../services/Images';

// Import css files
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";

class EgpSlider extends Component {
  constructor(props) {
    super(props);
    console.log("EgpSlider", "data:", this.props.data);
    //console.log("EgpSlider", "language:", this.props.language);
    //console.log("EgpSlider", "langList:", this.props.langList);
    this.langService = LanguageService.getInstance();

    this.state = {
      className: "center",
      centerMode: true,
      dots: true,
      infinite: true,
      //centerPadding: "60px",
      slidesToShow: 1,
      speed: 500
    };
    //this.ticking = false;
    //this.handleScrollPosition = this.handleScrollPosition.bind(this);
    //this.headerReducedRef = React.createRef();
    //document.addEventListener('scroll', this.handleScrollEvent);
  }

  render() {
    const { data } = this.props;
    return (
      <Slider {...this.state}>
        {data.map((item, index) => {
          const { id, alt, title, h3, p } = item;
          //console.log("item:", item);
          // className={Utility.classSet(obj)} onClick={this.handleClickNav.bind(this, item, index)}
          //{this.langService.getString(item.alt)}
          return <div key={index}>
            <div className="container gutters-all justify-center items-center">
              <div className="col-12">
                <img className="img-responsive" src={Images[id].src} alt={alt} title={title}></img>
              </div>
              <div className="col-12 col-sm-10 col-md-8 col-lg-7 text-center">
                <h3>{this.langService.getString(h3)}</h3>
                <p>{this.langService.getString(p)}</p>
                <div className="btn btn-flex-center background-color-red color-white"><span className="icon arrow-right-white"></span>Jetzt anmelden</div>
              </div>
            </div>
          </div>;
        })}
      </Slider>
    );
  }
}

export default EgpSlider;
