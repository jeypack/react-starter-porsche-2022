// App .egp-app
import React, { Component } from 'react';
//import Utility from '../services/Utility';
import EgpStepID from '../constants/EgpStepID';

class EgpSection extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    //this.input = React.createRef();
    //console.log('EgpSection', 'constructor', 'props:', this.props);
  }

  /* componentDidUpdate(prevProps) {
    console.log('EgpSection', 'componentDidUpdate', 'props:', this.props.hasFocus);
    console.log('EgpSection', 'componentDidUpdate', 'prevProps.hasFocus:', prevProps.hasFocus);
  } */

  handleChange(event) {
    const { label, goto } = this.props.langValue.cta;
    const value = EgpStepID[goto];
    console.log('EgpSection', 'handleChange', 'label:', label, 'goto:', goto, 'value:', value);
    this.props.onChangeStep(value);
    //event.preventDefault();
  }

  render() {
    // input value={this.state.value} value={this.props.value}
    const { title, copy1, cta } = this.props.langValue;
    const className = 'container justify-center items-center gutters-all';
    const btnClassnames = 'btn radius background-color-yellow cursor-pointer font-bold color-white transition transition-color display-block';
    //const classSet = Utility.classSet(classList);
    //console.log('EgpSection', 'render', 'props:', this.props, 'title:', title);
    return (
      <div className={className}>
        <div className="col-12 text-center">
          <h1>{title}</h1>
          <h3>{copy1}</h3>
        </div>
        {cta.label ? (
          <div className="col-auto">
            <button className={btnClassnames} onClick={this.handleChange}>{cta.label}</button>
          </div>
        ) : ''}
      </div>
    );
  }
}

export default EgpSection;

/* var formData = new FormData();

formData.append("username", "Groucho");
formData.append("accountnum", 123456); // number 123456 is immediately converted to a string "123456"

// HTML file input, chosen by user
formData.append("userfile", fileInputElement.files[0]); */
