// App .egp-app
import React, { Component } from 'react';
import EgpFormField from './EgpFormField';
import Utility from '../services/Utility';
import EgpStepID from '../constants/EgpStepID';

class EgpLoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      formError: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //console.log('EgpLoginForm', 'constructor', 'props', props);
  }

  getFormErrorByName(name) {
    const { formErrors } = this.props.langValue;
    for (let i = 0, l = formErrors.length; i < l; i++) {
      if (formErrors[i].name === name) {
        return formErrors[i].value;
      }
    }
    return '';
  }

  submit() {
    this.setState({ formError: '' });
    if (!this.props.debug) {
      const formData = new FormData();
      formData.append('action', 'login');
      formData.append('username', this.state.login);
      console.log('EgpLoginForm', 'submit', 'formData', formData);
      //fetch('./includes/service.php', {
      fetch(this.props.url, {
        method: 'POST', // or 'PUT'
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        if (data.success) {
          this.props.onChangeStep(EgpStepID.UPLOAD);
        } else {
          this.setState({
            formError: 'login',
            login: ''
          });
        }
      })
      .catch((error) => {
        this.setState({
          formError: 'server',
          login: ''
        });
      });
    } else {
      //local testing - uncomment above for LIVE
      if (this.state.login === 'jey') {
        this.props.onChangeStep(EgpStepID.UPLOAD);
      } else {
        this.setState({
          formError: 'login',
          login: ''
        });
      }
    }
  }

  handleChange(name, value) {
    //console.log('EgpLoginForm', 'handleChange', 'name:', name, 'value:', value);
    this.setState({ [name]: value, formError: '' });
  }

  handleSubmit(event) {
    //console.log('EgpLoginForm', 'handleSubmit', 'event:', event);
    const allowed = this.state.login.length > 2;
    if (allowed && this.state.login !== '') {
      this.submit();
    }
    event.preventDefault();
  }

  render() {
    // input value={this.state.login}
    const { label, type, name, placeholder } = this.props.langValue.form;
    const { formError } = this.state;
    const isActive = this.props.isActive;
    const allowed = this.state.login.length > 2;
    const submitBtnClassnames = 'btn radius background-color-yellow cursor-pointer font-bold color-white transition transition-color' + (allowed ? '' : ' cursor-not-allowed');
    const formErrorMsg = formError !== '' ? this.getFormErrorByName(formError) : '';
    //console.log('EgpLoginForm', 'render', 'formError:', formError);
    //console.log('EgpLoginForm', 'render', 'formErrorMsg:', formErrorMsg);
    // value={login.value}
    return (
      <form onSubmit={this.handleSubmit} className="login-form container justify-center items-center gutters-all min-height-320">
        <div className="col-auto">
          <div className="container justify-center gutters-sm-all">
            <div className="col-12 color-white text-center">
              <h4>{label}</h4>
            </div>
            <EgpFormField
              type={type}
              name={name}
              value={this.state.login}
              className="col-auto"
              classList={Utility.classObj('form-control radius')}
              placeholder={placeholder}
              onChange={this.handleChange}
              hasFocus={isActive}
            />
            <div className="col-auto">
              <button type="submit" className={submitBtnClassnames}>{ this.props.langValue.cta.label }</button>
            </div>
            <div className="col-12">
              <h4 className="login-nfo text-center">{formErrorMsg}</h4>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default EgpLoginForm;
