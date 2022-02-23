// EgpHeader .egp-header
import React, { Component } from 'react';
import LanguageService from '../services/LanguageService';
//import logo from '../assets/bob-round.png';
import logo from '../assets/gear-anim-02.svg';
import Utility from '../services/Utility';
import LanguageCols from './LanguageCols';
import './BobHeader.scss';

//{this.props.children}

class BobHeader extends Component {
  constructor(props) {
    super(props);
    //console.log("BobHeader", "data:", this.props.data);
    //console.log("BobHeader", "language:", this.props.language);
    //console.log("BobHeader", "langList:", this.props.langList);
    this.langService = LanguageService.getInstance();

    //this.state = { selected: -1 };
    this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
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
    const classObjNavBtn = Utility.classObj('btn btn-sm btn-outline hover-color-white background-color-darken hover-background-color-blue border-radius transition-background-color transition-fast');
    const h2 = this.langService.getString('header_title');
    const label = this.langService.getString('header_label');
    console.log("render", "classObjNavBtn:", classObjNavBtn);

    return (

      <header className="bob-header container gutters background-color-dark full-width">
        <div className="col-12">
          <div className="container items-center content-end gutters-sm-all">
            <div className="col-3 col-xs-2 col-sm-1"><img className="logo img-responsive" src={logo} alt={ h2 + ' Icon' } title={ h2 + ' Icon' } /></div>
            <div className="col-auto grow-1"><h2 className="no-margin">{ h2 }</h2></div>
            <div className="col-auto align-self-top"><div className="small">{ label }</div></div>
          </div>
        </div>
        <div className="col-12">
          <div className="container items-center gutters-sm-all">
            <div className="col-10">
              <div className="container gutters-sm-all">
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
            <div className="col-2">
              <div className="container gutters-sm-all">
                <LanguageCols classList={Utility.classObj(classNamesLangCols)} language={language} langList={langList} onChangeLanguage={this.handleChangeLanguage} />
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default BobHeader;
