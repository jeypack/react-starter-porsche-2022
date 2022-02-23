import React, { Component } from 'react';
import { gsap } from "gsap";
import Utility from '../services/Utility';
import EgpTransition from '../constants/EgpTransition';
// import './App.scss';

class EgpStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      enter: false,
      leave: false
    };
    this.stepRef = React.createRef();
    // eslint-disable-next-line
    //this.handleChangeStep = this.handleChangeStep.bind(this);
    //console.log('EgpStep', 'constructor', 'this.props:', this.props);
  }

  transitionIn(currentID, lastID) {
    const { transition } = this.props;
    const current = this.stepRef.current;
    //console.log('EgpStep', 'transitionIn', 'transition:', transition, 'currentID:', currentID, 'lastID:', lastID);
    if (transition === EgpTransition.TRANSITION_STD) {
      if (lastID === -1) {
        this.transInFade(current);
      } else {
        this.transInScale(current);
      }
    } else if (transition === EgpTransition.TRANSITION_FWD) {
      if (lastID === -1) {
        this.transInFade(current);
      } else {
        if (currentID > lastID) {
          this.transInFromRight(current);
        } else if (currentID < lastID) {
          this.transInFromLeft(current);
        }
      }
    } else if (transition === EgpTransition.TRANSITION_SCALE) {
      this.transInScale(current);
    } else if (transition === EgpTransition.TRANSITION_FADE) {
      this.transInFade(current);
    }
  }

  transitionOut(currentID, lastID) {
    const { transition } = this.props;
    const current = this.stepRef.current;
    //console.log('EgpStep', 'transitionOut', 'transition:', transition, 'currentID:', currentID, 'lastID:', lastID);
    if (transition === EgpTransition.TRANSITION_STD) {
      if (lastID === -1) {
        this.transOutFade(current);
      } else {
        this.transOutScale(current);
      }
    } else if (transition === EgpTransition.TRANSITION_FWD) {
      if (lastID === -1) {
        this.transOutScale(current);
      } else {
        if (currentID > lastID) {
          this.transOutToLeft(current);
        } else if (currentID < lastID) {
          this.transOutToRight(current);
        }
      }
    } else if (transition === EgpTransition.TRANSITION_SCALE) {
      this.transOutScale(current);
    } else if (transition === EgpTransition.TRANSITION_FADE) {
      this.transOutFade(current);
    }
  }

  componentDidUpdate(prevProps) {
    const id = parseInt(this.props.id, 10);
    const lastID = prevProps.current;
    const currentID = this.props.current;
    const isActive = (id === currentID);
    const { visible, enter, leave } = this.state;
    //obj['egp-animate'] = (visible && (enter || leave));
    //obj['egp-hidden'] = (!visible);
    /* console.log('EgpStep', 'componentDidUpdate', 'id:', id, 'isActive:', isActive);
    console.log('EgpStep', 'componentDidUpdate', 'lastID:', lastID);
    console.log('EgpStep', 'componentDidUpdate', 'currentID:', currentID); */
    if (isActive && !visible && !enter && !leave) {
      // first step fade
      this.transitionIn(currentID, lastID);
    } else if (!isActive && visible && !enter && !leave) {
      // animate out to left
      this.transitionOut(currentID, lastID);
    }
  }

  transInFade(current) {
    const { ease, durationin } = this.props;
    gsap.fromTo(current, { opacity: 0 }, { opacity: 1, onStart: function () {
      this.setState({ visible: true, enter: true });
      current.classList.add('egp-animate');
    }, onComplete: function () {
      this.setState({ enter: false });
      current.classList.remove('egp-animate');
    }, callbackScope: this, ease: ease, duration: durationin, delay:  0.05 });
  }

  transOutFade(current) {
    const { ease, durationout } = this.props;
    gsap.fromTo(current, { opacity: 1 }, { opacity: 0, onStart: function () {
      this.setState({ visible: true, leave: true });
      current.classList.add('egp-animate');
    }, onComplete: function () {
      this.setState({ visible: false, leave: false });
      current.classList.remove('egp-animate');
    }, callbackScope: this, ease: ease, duration: durationout });
  }

  transInScale(current) {
    const { ease, durationin } = this.props;
    gsap.fromTo(current, { opacity: 0, scale: 0.75, rotation: -5 }, { opacity: 1, scale: 1, rotation: 0, onStart: function () {
      this.setState({ visible: true, enter: true });
      current.classList.add('egp-animate');
    }, onComplete: function () {
      this.setState({ enter: false });
      current.classList.remove('egp-animate');
    }, callbackScope: this, ease: ease, duration: durationin, delay:  0.05 });
  }

  transOutScale(current) {
    const { ease, durationout } = this.props;
    gsap.fromTo(current, { opacity: 1, scale: 1, rotation: 0 }, { opacity: 0, scale: 0.75, rotation: 5, onStart: function () {
      this.setState({ visible: true, leave: true });
      current.classList.add('egp-animate');
    }, onComplete: function () {
      this.setState({ visible: false, leave: false });
      current.classList.remove('egp-animate');
    }, callbackScope: this, ease: ease, duration: durationout });
  }

  transInFromLeft(current) {
    const { ease, durationin } = this.props;
    gsap.fromTo(current, { opacity: 0, x: '-100%' }, { opacity: 1, x: '0%', onStart: function () {
      this.setState({ visible: true, enter: true });
      current.classList.add('egp-animate');
    }, onComplete: function () {
      this.setState({ enter: false });
      current.classList.remove('egp-animate');
    }, callbackScope: this, ease: ease, duration: durationin });
  }

  transInFromRight(current) {
    const { ease, durationin } = this.props;
    gsap.fromTo(current, { opacity: 0, x: '100%' }, { opacity: 1, x: '0%', onStart: function () {
      this.setState({ visible: true, enter: true });
      current.classList.add('egp-animate');
    }, onComplete: function () {
      this.setState({ enter: false });
      current.classList.remove('egp-animate');
    }, callbackScope: this, ease: ease, duration: durationin });
  }

  transOutToLeft(current) {
    const { ease, durationout } = this.props;
    gsap.fromTo(current, { opacity: 1, x: '0%' }, { opacity: 0, x: '-100%', onStart: function () {
      this.setState({ visible: true, leave: true });
      current.classList.add('egp-animate');
    }, onComplete: function () {
      this.setState({ visible: false, leave: false });
      current.classList.remove('egp-animate');
    }, callbackScope: this, ease: ease, duration: durationout });
  }

  transOutToRight(current) {
    const { ease, durationout } = this.props;
    gsap.fromTo(current, { opacity: 1, x: '0%' }, { opacity: 0, x: '100%', onStart: function () {
      this.setState({ visible: true, leave: true });
      current.classList.add('egp-animate');
    }, onComplete: function () {
      this.setState({ visible: false, leave: false });
      current.classList.remove('egp-animate');
    }, callbackScope: this, ease: ease, duration: durationout });
  }

  render() {
    const { id, ...other } = this.props;
    // const { id, current } = this.props;
    //const { visible, enter, leave } = this.state;
    const { visible } = this.state;
    let obj = {
      'egp-step': true
    };
    obj['egp-step-' + id] = true;
    //obj['egp-animate'] = (visible && (enter || leave));
    obj['egp-hidden'] = (!visible);
    //const lastPart = (visible && (enter || leave)) ? ' egp-animate' : (!visible) ? ' egp-hidden' : '';
    //const className = 'egp-step egp-step-' + id + lastPart;
    //visible={this.state.visible ? 1 : 0}
    //{...other}
    return (
      <div
        id={id}
        className={Utility.classSet(obj)}
        {...other}
        ref={this.stepRef}
        >
        {this.props.children}
      </div>
    );
    //{React.cloneElement(this.props.children, { visible: visible })}
  }
}

export default EgpStep;

/* render={mouse => (
          <Component {...this.props} mouse={mouse} />
        )} */
