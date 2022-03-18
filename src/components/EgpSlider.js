import React, { Component } from "react";
import Slider from "react-slick";

import Images from '../services/Images';

// Import css files
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";

class EgpSlider extends Component {
  constructor(props) {
    super(props);
    //console.log("EgpSlider", "data:", this.props.data);
    //console.log("EgpSlider", "language:", this.props.language);
    //console.log("EgpSlider", "langList:", this.props.langList);
    //this.langService = LanguageService.getInstance();

    this.state = {
      className: "center",
      centerMode: true,
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
    return (
      <Slider {...this.state}>
        <div>
          <img className="img-responsive" src={Images['porsche_911'].src} alt=""></img>
        </div>
        <div>
          <img className="img-responsive" src={Images['porsche_911'].src} alt=""></img>
        </div>
        <div>
          <img className="img-responsive" src={Images['porsche_911'].src} alt=""></img>
        </div>
        <div>
          <img className="img-responsive" src={Images['porsche_911'].src} alt=""></img>
        </div>
        <div>
          <img className="img-responsive" src={Images['porsche_911'].src} alt=""></img>
        </div>
        <div>
          <img className="img-responsive" src={Images['porsche_911'].src} alt=""></img>
        </div>
      </Slider>
    );
  }
}

export default EgpSlider;
