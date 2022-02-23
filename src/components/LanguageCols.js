// EgpHeader .egp-header
import React, { Component } from 'react';
import Utility from '../services/Utility';
import './LanguageCols.scss';

class LanguageCols extends Component {

  /* constructor(props) {
    super(props);
    //console.log("LanguageCols", "langList:", this.props.langList);
    //this.state = { date: new Date() };
  } */

  handleClick(item) {
    // second argument will always be the synthetic event
    //console.log("handleClick item:", item);
    if (this.props.onChangeLanguage) {
      this.props.onChangeLanguage(item);
    }
  }

  render() {
    const { classList, language } = this.props;
    return (
      <>
        {this.props.langList.map((item) => {
          classList['selected'] = (language === item.label);
          const classSet = Utility.classSet(classList);
          //&console.log("render classSet:", classSet);
          return <div key={item.id} className={classSet} onClick={this.handleClick.bind(this, item)}>{item.label}</div>
        })}
      </>
    );
  }
}

export default LanguageCols;
