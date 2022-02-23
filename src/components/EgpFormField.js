// App .egp-app
import React, { Component } from 'react';
import Utility from '../services/Utility';

class EgpFormField extends Component {
  constructor(props) {
    super(props);
    //this.state = { value: this.props.value };
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.input = React.createRef();
    this.select = React.createRef();
  }

  componentDidUpdate(prevProps) {
    /* console.log('EgpFormField', 'name:', this.props.name);
    console.log('EgpFormField', 'componentDidUpdate', 'props:', this.props.hasFocus);
    console.log('EgpFormField', 'componentDidUpdate', 'prevProps.hasFocus:', prevProps.hasFocus); */
    var that = this;
    if (this.props.hasFocus) {
      setTimeout(function () {
        that.input.current.focus();
      });
    }
  }

  handleFocus(event) {
    console.log('handleFocus', 'event.target:', event.target);
    console.log('handleFocus', 'this.select.current:', this.select.current);
    this.select.current.focus();
    //let value = event.target.value;
    //this.setState({ value: value });
    //this.props.onChange(this.props.name, value);
  }

  handleChange(event) {
    let value = event.target.value;
    //this.setState({ value: value });
    this.props.onChange(this.props.name, value);
  }

  render() {
    // input value={this.state.value} value={this.props.value}
    const { className, classList, name, placeholder, type, value } = this.props;
    const classSet = Utility.classSet(classList);
    //const field =
    return (
      <div className={className}>
        {
          (type === 'select') ?
            (<>
              <select
                id={name}
                name={name}
                className={classSet}
                value={value}
                onChange={this.handleChange}
                ref={this.select}
              >
                {this.props.options.map((option, index) => {
                  return <option key={index} value={option.value}>{option.label}</option>;
                })}
              </select>
              <div className="icon"><span></span></div>
            </>)
            : (type === 'text'  || type === 'password'  || type === 'file') ?
              (<div className={classSet}>
                <input
                  type={type}
                  name={name}
                  value={value}
                  placeholder={placeholder}
                  onChange={this.handleChange}
                  ref={this.input}
                />
              </div>)
            : (type === 'textarea') ?
              (<div className={classSet}>
                <textarea
                  name={name}
                  value={value}
                  placeholder={placeholder}
                  onChange={this.handleChange}
                  ref={this.input}
                />
              </div>)
            : ''
        }
      </div>
    );
  }
}

export default EgpFormField;

/* var formData = new FormData();

formData.append("username", "Groucho");
formData.append("accountnum", 123456); // number 123456 is immediately converted to a string "123456"

// HTML file input, chosen by user
formData.append("userfile", fileInputElement.files[0]); */
