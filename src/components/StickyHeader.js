// EgpHeader .egp-header
import React, { Component } from 'react';
import LanguageService from '../services/LanguageService';
import Utility from '../services/Utility';
import LanguageCols from './LanguageCols';
import Images from '../services/Images';
import './StickyHeader.scss';

//{this.props.children}

class StickyHeader extends Component {
  constructor(props) {
    super(props);
    //console.log("StickyHeader", "data:", this.props.data);
    //console.log("StickyHeader", "language:", this.props.language);
    //console.log("StickyHeader", "langList:", this.props.langList);
    this.langService = LanguageService.getInstance();

    this.state = { reduced: false, scrollPosition: 0, pointOfReduce: 100 };
    this.ticking = false;
    this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
    this.handleScrollEvent = this.handleScrollEvent.bind(this);
    this.handleScrollPosition = this.handleScrollPosition.bind(this);
    this.headerRef = React.createRef();
    this.headerReducedRef = React.createRef();
    //document.addEventListener('scroll', this.handleScrollEvent);
  }

  componentDidMount() {
    // get header height
    const current = this.headerRef.current;
    const headerBounds = current.getBoundingClientRect();
    const headerHeight = Math.ceil(headerBounds.height);
    this.setState({ pointOfReduce: headerHeight });

    document.addEventListener('scroll', this.handleScrollEvent);
    //console.log("StickyHeader", "componentDidMount", "current:", current);
    //console.log("StickyHeader", "componentDidMount", "headerBounds:", headerBounds);
  }

  /* componentDidUpdate(prevProps) {
    console.log("StickyHeader", "componentDidUpdate", "prevProps:", prevProps);
  } */

  handleScrollPosition() {
    const { scrollPosition, pointOfReduce, reduced } = this.state;
    const scrollY = window.scrollY;
    this.ticking = false;
    if (scrollY !== scrollPosition) {
      //console.log("StickyHeader", "handleScrollPosition", "scrollY:", scrollY);
      const isReduced = (scrollY > pointOfReduce);
      // && window.innerHeight < document.body.clientHeight
      if (reduced !== isReduced) {
        document.body.classList.toggle('reduced');
        setTimeout(() => {
          document.body.classList.toggle('anim-in');
        });
      }
      this.setState({ scrollPosition: scrollY, reduced: isReduced });
    }
  }

  handleScrollEvent() {
    //console.log("StickyHeader", "handleScrollEvent", "this.ticking:", this.ticking);
    if (!this.ticking) {
      window.requestAnimationFrame(this.handleScrollPosition);
      this.ticking = true;
    }
  }

  handleClickNav(item, index) {
    // second argument will always be the synthetic event
    console.log("handleClick ", "item:", item, "index:", index);
    //this.props.onChangeLanguage(item);
  }

  handleChangeLanguage(item) {
    // second argument will always be the synthetic event
    //console.log("handleChangeLanguage item:", item);
    this.props.onChangeLanguage(item);
  }

  render() {
    const { langList, language, data } = this.props;
    //const classNamesLangCols = 'col-auto col-xs-order-1 col-order-2 language cursor-pointer';
    const classNamesLangCols = 'col-auto hover-color-white language cursor-pointer';
    const classObjNavBtn = Utility.classObj('btn btn-sm hover-color-white background-color-darken hover-background-color-blue transition-background-color transition-fast');
    const h2 = this.langService.getString('header_title');
    //const label = this.langService.getString('header_label');
    //console.log("render", "classObjNavBtn:", classObjNavBtn);
    //<div className="col-auto align-self-top"><div className="small">{ label }</div></div>
    const logo = Images['porsche_logo'].src;
    return (
      this.state.reduced ?
        <header className="header container items-center gutters full-width reduced">
          <div className="col-12">
            <div className="container items-center content-end gutters-sm">
              <div className="col-2 col-xs-1"><img className="logo img-responsive" src={logo} alt={ h2 + ' Icon' } title={ h2 + ' Icon' } /></div>
              <div className="col-auto grow-1">
                <div className="container justify-center items-center gutters-sm">
                  {data.map((item, index) => {
                    let obj = { 'col-auto': true };
                    if (index === 0) {
                      obj['no-padding-left'] = true;
                    } else if (index === data.length - 1) {
                      //obj['grow-1'] = true;
                      obj['no-padding-right'] = true;
                    }
                    classObjNavBtn['selected'] = item.selected;
                    classObjNavBtn['btn-sm'] = false;
                    classObjNavBtn['btn-xs'] = true;
                    console.log("item:", item);

                    return <div key={index} className={Utility.classSet(obj)}>
                      <div className={Utility.classSet(classObjNavBtn)} onClick={this.handleClickNav.bind(this, item, index)}>{this.langService.getString(item.id)}</div>
                    </div>;
                  })}
                </div>
              </div>
              <div className="col-2">
                <div className="container justify-end gutters-sm">
                  <LanguageCols classList={Utility.classObj(classNamesLangCols)} language={language} langList={langList} onChangeLanguage={this.handleChangeLanguage} />
                </div>
              </div>
            </div>
          </div>
        </header>
        :
        <header ref={this.headerRef} className="header container full-width">
          <div className="col-12">
            <div className="container justify-end">
              <div className="col-auto">
                <div className="container language-box">
                  <LanguageCols classList={Utility.classObj(classNamesLangCols)} language={language} langList={langList} onChangeLanguage={this.handleChangeLanguage} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="container items-end justify-space-between gutters-sm full-width position-relative">
              <div className="col-auto grow-1 no-padding-left"><span className="line"></span></div>
              <div className="col-auto"><img className="logo img-responsive" src={logo} alt={ h2 + ' Icon' } title={ h2 + ' Icon' } /></div>
              <div className="col-auto grow-1 no-padding-right"><span className="line"></span></div>
            </div>
          </div>
          <div className="col-12">
            <div className="container justify-center items-center gutters-sm-all">
               {data.map((item, index) => {
                  let obj = { 'col-auto': true };
                  if (index === 0) {
                    obj['no-padding-left'] = true;
                  } else if (index === data.length - 1) {
                    obj['no-padding-right'] = true;
                  }
                  classObjNavBtn['selected'] = item.selected;
                  return <div key={index} className={Utility.classSet(obj)}>
                    <div className={Utility.classSet(classObjNavBtn)} onClick={this.handleClickNav.bind(this, item, index)}>{this.langService.getString(item.id)}</div>
                  </div>;
                })}
            </div>
          </div>
        </header>
    );
  }
}

export default StickyHeader;
