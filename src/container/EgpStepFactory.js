import React, { Component } from 'react';
import EgpStep from '../components/EgpStep';
import EgpLoginForm from '../components/EgpLoginForm';
import EgpUploadForm from '../components/EgpUploadForm';
import EgpSection from '../components/EgpSection';
import EgpTransition from '../constants/EgpTransition';
// import './EgpStepFactory.scss';

class EgpStepFactory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: -1,
      durationin: 0.5,
      durationout: 0.25,
      ease: 'power1',
      transition: EgpTransition.TRANSITION_STD
    };
    this.handleChangeStep = this.handleChangeStep.bind(this);
    //console.log('EgpStepFactory', 'constructor', 'this.props:', this.props);
  }

  componentDidMount() {
    //console.log('EgpStepFactory', 'componentDidMount set initial step 0');
    this.setState({ step: this.props.current });
  }

  createComp(name, defaults) {
    //✅
    if (name === 'LoginForm') {
      return <EgpLoginForm debug={this.props.debug} url='./includes/service.php' {...defaults} />;
    } else if (name === 'UploadForm') {
      return <EgpUploadForm debug={this.props.debug} url='./includes/service.php' {...defaults} />;
    } else if (name === 'Section') {
      return <EgpSection debug={this.props.debug} {...defaults} />;
    }
    return <div className="unknown-comp">Error: comp is undefined.</div>;
  }

  handleChangeStep(value) {
    //console.log('EgpStepFactory handleChangeStep', 'this.state:', this.state);
    //console.log('EgpStepFactory handleChangeStep', 'step:', value);
    this.setState({ step: value });
    this.props.onChangeStep(value);
  }

  render() {
    const { step, ...other } = this.state;
    const { steps } = this.props;
    return (
      <div className="egp-step-container">
        {steps.map((item, index) => {
          const defaults = {
            langValue: item,
            isActive: (step === index),
            onChangeStep: this.handleChangeStep,
          };
          const stepComp = this.createComp(item.comp, defaults);
          return (
            <EgpStep
              key={index}
              id={index}
              current={step}
              {...other}
            >
              {stepComp}
            </EgpStep>);
        })}
      </div>
    );
  }
}

export default EgpStepFactory;
