// App .egp-app
import React, { Component } from 'react';
import EgpFormField from './EgpFormField';
import EgpStepID from '../constants/EgpStepID';
import Utility from '../services/Utility';
import Files from "react-butterfiles";

import jsonRestaurantData from '../assets/restaurant.json';
import RestaurantService from '../services/RestaurantService';

class EgpUploadForm extends Component {
  static ACTION_MESSAGE = 'message'
  static ACTION_UPLOAD = 'upload'

  static UPLOAD_TYPE_ADD = 'add'
  static UPLOAD_TYPE_REPLACE = 'replace'

  constructor(props) {
    super(props);
    //❌
    this.restaurantService = new RestaurantService(jsonRestaurantData);
    //console.log('restaurantService.getListByKanton:', this.restaurantService.getListByKanton("ZH"));
    this.state = {
      name: props.langValue.formName.value ? props.langValue.formName.value : props.formName ? props.formName : '',
      vorname: props.langValue.formVorname.value ? props.langValue.formVorname.value : props.formVorname ? props.formVorname : '',
      email: props.langValue.formEmail.value ? props.langValue.formEmail.value : props.formEmail ? props.formEmail : '',
      restaurant: props.langValue.formRestaurant.value ? props.langValue.formRestaurant.value : props.formRestaurant ? props.formRestaurant : '',
      message: props.langValue.formHelp.value ? props.langValue.formHelp.value : props.formHelp ? props.formHelp : '',
      uploadType: props.langValue.formUpload.type ? props.langValue.formUpload.type : props.type ? props.type : EgpUploadForm.UPLOAD_TYPE_REPLACE,
      //restaurantList: this.restaurantService.getList() || props.restaurantList ? props.restaurantList : [],
      restaurantList: this.restaurantService.getList() || props.restaurantList || [],
      minWidth: props.langValue.formUpload.minWidth ? props.langValue.formUpload.minWidth : props.minWidth ? props.minWidth : 1280,
      minHeight: props.langValue.formUpload.minHeight ? props.langValue.formUpload.minHeight : props.minHeight ? props.minHeight : 780,
      multiple: props.langValue.formUpload.multiple ? props.langValue.formUpload.multiple : props.multiple ? props.multiple : true,
      maxSize: props.langValue.formUpload.maxSize ? props.langValue.formUpload.maxSize : props.maxSize ? props.maxSize : '20mb',
      multipleMaxSize: props.langValue.formUpload.multipleMaxSize ? props.langValue.formUpload.multipleMaxSize : props.multipleMaxSize ? props.multipleMaxSize : '200mb',
      multipleMaxCount: props.langValue.formUpload.multipleMaxCount ? props.langValue.formUpload.multipleMaxCount : props.multipleMaxCount ? props.multipleMaxCount : 150,
      multipleMaxCountTo: props.langValue.formUpload.multipleMaxCountTo ? props.langValue.formUpload.multipleMaxCountTo : props.multipleMaxCountTo ? props.multipleMaxCountTo : 10,
      //acceptedFileTypes: ["application/pdf", "image/png", "image/tiff", "image/jpg", "image/jpeg"],
      acceptedFileTypes: props.langValue.formUpload.acceptedFileTypes ? props.langValue.formUpload.acceptedFileTypes : props.acceptedFileTypes ? props.acceptedFileTypes : ["image/png", "image/jpg", "image/jpeg"],
      formError: '',
      dropError: '',
      files: [],
      filesWrongSize: [],
      errors: [],
      dragging: false,
      uploading: false
    };
    this.filesInput = [];
    this.currentUploadIndex = -1;
    this.fieldRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.handleFilesError = this.handleFilesError.bind(this);
    //console.log("✅ EgpUploadForm", "constructor", "props", this.props);
  }

  getFormData() {
    const { name, vorname, email, restaurant, message } = this.state;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('vorname', vorname);
    formData.append('email', email);
    formData.append('restaurant', restaurant);
    formData.append('message', message);
    return formData;
  }

  getFormErrorByName(name) {
    const { formErrors } = this.props.langValue;
    //console.log("✅ getFormErrorByName", "name", name, "formErrors", formErrors);
    for (let i = 0, l = formErrors.length; i < l; i++) {
      if (formErrors[i].name === name) {
        return formErrors[i].value;
      }
    }
    return '';
  }

  isValidFiles() {
    const { name, vorname, email, restaurant, files } = this.state;
    //console.log('UploadForm', 'isValidFiles', 'restaurant:', restaurant);
    if (name.length && vorname.length && email.length && restaurant !== '' && restaurant !== 'default' && files.length > 0) {
      return true;
    }
    return false;
  }

  isValidMessage() {
    const { name, vorname, email, restaurant, message } = this.state;
    //console.log('UploadForm', 'isValidMessage', 'restaurant:', restaurant);
    if (name.length && vorname.length && email.length && restaurant !== '' && restaurant !== 'default' && message.length > 0) {
      return true;
    }
    return false;
  }

  updateProgress(file, event) {
    //console.log('EgpUploadForm', 'updateProgress', 'file', file.name, file.percentage);
    //console.log('EgpUploadForm', 'updateProgress', 'event', event);
    if (event.lengthComputable) {
      const { files } = this.state;
      const percentage = Math.round((event.loaded * 100) / event.total);
      //console.log('EgpUploadForm', 'updateProgress', 'percentage', percentage);
      file.percentage = percentage;
      this.setState({ files });
    }
  }

  transferComplete(file, event) {
    const { files } = this.state;
    //console.log('EgpUploadForm', 'transferComplete', 'file', file);
    //console.log('EgpUploadForm', 'transferComplete', 'event', event);
    // { id, name, size, percentage, width, height, type, src: { file, base64 }  }
    file.percentage = 100;
    this.setState({ files });
    setTimeout(() => {
      this.removeFileFromFiles(file, files);
      if (files.length === 0) {
        this.props.onChangeStep(EgpStepID.UPLOAD_SUCCESS);
        this.setState({ uploading: false });
      } else {
        this.nextFile();
      }
    }, 750);
    //this.removeFileFromFiles(file, files);
  }

  /**
   * has to be implemented inside 'uploadFile'
   * @param {*} file
   * @param {*} event
   */
  transferFailed(file, event) {
    //const { errors } = this.state;
    console.log('EgpUploadForm', 'transferFailed', 'file', file);
    //console.log('EgpUploadForm', 'transferFailed', 'event', event);
    file.percentage = 0;
    //errors: { file: { id, name, type, size, src }, id, index, type }
    //errors.push({ id: file.id, type: 'transfer-failed', file: file });
    this.setState({
      dropError: 'failed-upload'
    });
    //this.props.onChangeStep(EgpStepID.UPLOAD_FAILED);
  }

  /**
   * has to be implemented inside 'uploadFile'
   * @param {*} file
   * @param {*} event
   */
  transferCanceled(file, event) {
    console.log('EgpUploadForm', 'transferCanceled', 'file', file);
    //console.log('EgpUploadForm', 'transferCanceled', 'event', event);
    //setTimeout(() => this.removeFile(file, this.state.files), 150);
    this.removeFileFromFiles(file, this.state.files);
    this.setState({
      dropError: 'failed-upload'
    });
  }

  /**
   * @see submit
   * @param {Object} file
   */
  uploadFile(file) {
    const uri =  this.props.url;
    const xhr = new XMLHttpRequest();
    const formData = this.getFormData();
    formData.append('action', EgpUploadForm.ACTION_UPLOAD);
    formData.append('fileData', {
      name: file.name,
      size: file.size,
      width: file.width,
      height: file.height
    });
    formData.append('file', file.src.file);
    xhr.upload.addEventListener("progress", this.updateProgress.bind(this, file));
    xhr.upload.addEventListener("load", this.transferComplete.bind(this, file));
    xhr.upload.addEventListener("error", this.transferFailed.bind(this, file));
    xhr.upload.addEventListener("abort", this.transferCanceled.bind(this, file));
    console.log('EgpUploadForm', 'uploadFile', 'file', file);
    xhr.open("POST", uri, true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          // handle response.
          console.log('readyState 4 status 200:', xhr.responseText);
        } else {
          //TODO: check this
          this.setState({
            formError: 'server'
          });
        }
    };
    // Initiate a multipart/form-data upload
    xhr.send(formData);
  }

  nextFile() {
    const { files } = this.state;
    if (this.currentUploadIndex > -1) {
      const nextFile = files[this.currentUploadIndex];
      this.uploadFile(nextFile);
      this.currentUploadIndex--;
      this.setState({ files });
    }
  }

  submit(action) {
    //const testForm = new FormData(document.getElementById('upload-form'));
    const { files, filesWrongSize } = this.state;
    console.log('EgpUploadForm', 'submit', 'action', action);
    console.log('EgpUploadForm', 'submit', 'files', files);

    if (!this.props.debug) {
      this.setState({ uploading: true });
      if (action === EgpUploadForm.ACTION_MESSAGE) {
        const formData = this.getFormData();
        formData.append('action', EgpUploadForm.ACTION_MESSAGE);
        //fetch('./includes/service.php', {
        fetch(this.props.url, {
          method: 'POST', // or 'PUT'
          body: formData,
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          if (data.success) {
            this.props.onChangeStep(EgpStepID.MESSAGE_SENT);
          } else {
            this.setState({
              dropError: 'failed-message'
            });
          }
        })
        .catch((error) => {
          this.setState({
            formError: 'server'
          });
        });
      } else if (action === EgpUploadForm.ACTION_UPLOAD) {
        //
        for (let i = filesWrongSize.length - 1; i >= 0; i--) {
          this.removeFileFromWrong(filesWrongSize[i].file, filesWrongSize);
        }
        this.currentUploadIndex = files.length - 1;
        setTimeout(() => this.nextFile(), 100);
        /* for (let i = 0, l = files.length; i < l; i++) {
          console.log('EgpUploadForm', 'submit', 'files[' + i + ']', files[i]);
          this.uploadFile(files[i]);
        } */
      }
    } else {
      if (action === EgpUploadForm.ACTION_MESSAGE) {
        this.props.onChangeStep(EgpStepID.MESSAGE_SENT);
      } else if (action === EgpUploadForm.ACTION_UPLOAD) {
        this.props.onChangeStep(EgpStepID.UPLOAD_SUCCESS);
      }
    }
  }

  handleChange(name, value) {
    //console.log('UploadForm', 'handleChange', 'name:', name, 'value:', value);
    //let newVal = {};
    //newVal[name] = value;
    //this.setState(newVal);
    //Note how we used the ES6 computed property name syntax to update the state key
    this.setState({
      [name]: value,
      dropError: '',
      formError: ''
    });
  }

  handleFiles(files) {
    const { minWidth, minHeight, multipleMaxCountTo, uploadType } = this.state;
    //console.log('UploadForm', 'handleFiles', 'uploadType:', uploadType);
    //console.log('UploadForm', 'handleFiles', 'files:', files);
    //wrong size temp container
    let filesInput = [];
    const filesWrongSize = [];
    //remove wrong size from filesInput and trigger render via setState
    const validateFiles = () => {
      lengthInput = this.filesInput.length;
      for (let i = lengthInput - 1; i >= 0; i--) {
        let file = this.filesInput[i];
        if (file.width < minWidth || file.height < minHeight) {
          filesWrongSize.push({ file: this.filesInput.splice(i, 1)[0], type: 'WRONG DIMENSION' });
        }
      }
      //console.log('validateFiles', 'filesInput:', this.filesInput);
      //now we set files, wrong size array and reset form error to trigger new render state
      this.setState({
        files: this.filesInput,
        filesWrongSize: filesWrongSize,
        dropError: '',
        formError: ''
      });
    };
    //count image load
    let count = 0;
    //image load handler
    const onLoadImage = (e) => {
      const image = e.target;
      const index = image.index;
      this.filesInput[index].width = image.width;
      this.filesInput[index].height = image.height;
      this.filesInput[index].percentage = 0;
      this.filesInput[index].hasPreview = true;
      //console.log('UploadForm', 'handleFiles', 'image:', index);
      //console.log('UploadForm', 'handleFiles', 'this.filesInput[index]:', this.filesInput[index]);
      //after loading...
      if (count++ === lengthInput - 1) {
        validateFiles();
      }
    };
    let lengthInput = files.length;
    if (uploadType === EgpUploadForm.UPLOAD_TYPE_REPLACE) {
      //replace old files and trim array
      const end = lengthInput > multipleMaxCountTo ? multipleMaxCountTo - lengthInput : lengthInput;
      filesInput = files.slice(0, end);
    } else if (uploadType === EgpUploadForm.UPLOAD_TYPE_ADD) {
      //first add files to existing files
      files.forEach((file, index) => {
        //console.log('UploadForm', 'handleFiles', 'index:', index, 'file:', file.size, file.name);
        let insert = true;
        for (let i = 0, l = this.filesInput.length; i < l; i++) {
          let existingFile = this.filesInput[i];
          if (file.name === existingFile.name && file.size === existingFile.size) {
            insert = false;
            break;
          }
        }
        if (insert) {
          filesInput.push(file);
        }
      });
      //
      filesInput = this.filesInput.concat(filesInput);
      lengthInput = filesInput.length;
      const start = lengthInput > multipleMaxCountTo ? lengthInput - multipleMaxCountTo : 0;
      //console.log('UploadForm', 'handleFiles', 'start:', start);
      filesInput = filesInput.slice(start);
    }
    this.filesInput = filesInput;
    //load images
    this.filesInput.forEach((file, index) => {
      let image = new Image();
      image.src = file.src.base64;
      image.index = index;
      image.onload = onLoadImage;
      //console.log('UploadForm', 'handleFiles', 'file:', file);
    });
    //trigger render via setState
    this.setState({ files: this.filesInput, filesWrongSize });
    // for (let i = lengthInput - 1; i >= 0; i--) {}
    //files.forEach((file, index) => {});
  }

  handleFilesError(errors) {
    console.log('UploadForm', 'handleFilesError', 'errors:', errors);
    //let filesError = this.state.errors.concat(errors);
    //'drop-image'
    this.setState({
      dropError: 'drop-wrong'
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    //const id = event.nativeEvent.submitter.id; -> BAD ON MOBILE SAFARI AND CHROME!
    const { files, uploading } = this.state;
    const isValidMessage = this.isValidMessage();
    const isValidFiles = this.isValidFiles();
    console.log('UploadForm', 'handleSubmit', 'isValidMessage', isValidMessage)
    console.log('UploadForm', 'handleSubmit', 'isValidFiles', isValidFiles)
    if (!uploading) {
      console.log('UploadForm', 'handleSubmit', 'files.length:', files.length);
      if (files.length === 0 && isValidMessage) {
        //console.log('UploadForm', 'handleSubmit', 'message', this.state.message);
        this.submit(EgpUploadForm.ACTION_MESSAGE);
      } else if (files.length > 0 && isValidFiles) {
        this.submit(EgpUploadForm.ACTION_UPLOAD);
      } else {
        //error message goes here
        let formError = '', dropError = '';
        if (files.length === 0 && !isValidMessage) {
          formError = 'message';
        } else if (files.length > 0 && !isValidFiles) {
          formError = 'upload';
        }
        this.setState({ formError, dropError });
      }
    }
  }

  handleRemoveFile(file, event) {
    this.removeFileFromFiles(file, this.state.files);
    event.preventDefault();
  }

  handleRemoveWrongFile(file, event) {
    this.removeFileFromWrong(file, this.state.filesWrongSize);
    event.preventDefault();
  }

  removeFileFromWrong(file, files) {
    const length = files.length;
    //console.log('UploadForm', 'removeFileFromWrong', 'file:', file);
    //console.log('UploadForm', 'removeFileFromWrong', 'files:', files);
    for (let i = 0; i < length; i++) {
      let aFile = files[i].file;
      //console.log('UploadForm', 'removeFileFromWrong', 'aFile:', aFile);
      if (file.id === aFile.id) {
        files.splice(i, 1);
        break;
      }
    }
    this.setState({ filesWrongSize: files });
  }

  removeFileFromFiles(file, files) {
    const length = files.length;
    //console.log('UploadForm', 'removeFileFromFiles', 'file:', file);
    //console.log('UploadForm', 'removeFileFromFiles', 'length:', length);
    for (let i = 0; i < length; i++) {
      let aFile = files[i];
      //console.log('UploadForm', 'removeFileFromFiles', 'aFile:', aFile);
      if (file.id === aFile.id) {
        //console.log('UploadForm', 'removeFileFromFiles', 'name:', aFile.name);
        files.splice(i, 1);
        break;
      }
    }
    this.setState({ files });
  }

  render() {
    const { header, upload, help, formName, formVorname, formEmail, formRestaurant, formHelp, formUpload } = this.props.langValue;
    const { name, vorname, email, restaurant, message, files, filesWrongSize, acceptedFileTypes, maxSize, multiple, multipleMaxSize, multipleMaxCount, formError, dropError } = this.state;
    const formErrorMsg = formError !== '' ? this.getFormErrorByName(formError) : '';
    const dropErrorMsg = dropError !== '' ? this.getFormErrorByName(dropError) : '';
    const uploadLabelRows = upload.label.split('|');
    let uploadLabel;
    if (files.length > 0) {
      uploadLabel = <div>{uploadLabelRows[0]}<br />{uploadLabelRows[1]}</div>;
    } else {
      uploadLabel = <div>{uploadLabelRows[0]} {uploadLabelRows[1]}</div>;
    }
    //place default option from language.json as first entry
    const restaurantList = [formRestaurant.defaultOption, ...this.state.restaurantList];
    //console.log("render", "formRestaurant.defaultOption:", formRestaurant.defaultOption);
    //console.log("render", "restaurantList:", restaurantList);
    const allowedupload = this.isValidFiles();
    const allowedMessage = this.isValidMessage();
    const submitBtnClassnames = 'btn radius background-color-yellow font-bold color-white transition transition-color' + (allowedupload ? ' cursor-pointer' : ' cursor-not-allowed');
    const mailBtnClassnames = 'btn radius background-color-yellow font-bold color-white transition transition-color' + (allowedMessage ? ' cursor-pointer' : ' cursor-not-allowed');
    //
    const defaultFormFieldProps = {
      className: "col-12 col-sm-6",
      classList: Utility.classObj('form-control radius'),
      onChange: this.handleChange,
      hasFocus: false
    };
    const restaurantSelectClasses = this.state.restaurant === 'default' ? 'form-control radius default' : 'form-control radius';

    return (
      <form encType="multipart/form-data" onSubmit={this.handleSubmit} className="upload-form container justify-center items-start gutters-all color-white text-center min-height-320">
        <div className="col-12 col-sm-10">
          <h1>{header.title}</h1>
          <h3>{header.copy}</h3>
        </div>
        <div className="col-12 col-sm-10">
          <div className="container justify-center gutters-all">
            <EgpFormField
              type={formName.type}
              name={formName.name}
              value={name}
              placeholder={formName.placeholder}
              {...defaultFormFieldProps}
            />
            <EgpFormField
              type={formVorname.type}
              name={formVorname.name}
              value={vorname}
              placeholder={formVorname.placeholder}
              {...defaultFormFieldProps}
            />
            <EgpFormField
              type={formEmail.type}
              name={formEmail.name}
              value={email}
              placeholder={formEmail.placeholder}
              {...defaultFormFieldProps}
            />
            <EgpFormField
              type={formRestaurant.type}
              name={formRestaurant.name}
              options={restaurantList}
              className="col-12 col-sm-6"
              classList={Utility.classObj(restaurantSelectClasses)}
              placeholder={formRestaurant.placeholder}
              value={restaurant}
              onChange={this.handleChange}
              hasFocus={false}
            />
            <div className={'col-12 text-left'}>
              <h3><b>{upload.title}</b></h3>
              <h3>{upload.copy}</h3>
            </div>
            <div className={'col-12'}>
              <Files
                multiple={multiple}
                maxSize={maxSize}
                multipleMaxSize={multipleMaxSize}
                multipleMaxCount={multipleMaxCount}
                accept={acceptedFileTypes}
                convertToBase64={true}
                onSuccess={this.handleFiles}
                onError={this.handleFilesError}
              >
                {({ browseFiles, getDropZoneProps }) => {
                  //<div className="container upload justify-space-between items-stretch gutters-all">
                  return (
                    <>
                      <div className={'upload-grid-container' + (files.length > 0 || filesWrongSize.length > 0 ? ' multiple'  : '')}>
                        <div
                          onClick={browseFiles}
                          {...getDropZoneProps({
                            className: 'cursor-pointer drop-zone',
                            onDragEnter: () => this.setState({ dragging: true }),
                            onDragLeave: () => this.setState({ dragging: false }),
                            onDrop: () => this.setState({ dragging: false })
                          })}
                        >
                          <div className="upload-wrapper">
                            <div className="upload-icon"><span className="h"></span><span className="v"></span></div>
                            {uploadLabel}

                          </div>
                        </div>
                        {files.map((file, index) => {
                          //console.log("file:", file);

                          const style = {
                            background: 'url(' + file.src.base64 + ') 50% 50% / cover no-repeat'
                          };
                          return <div key={index} className={'cursor-pointer upload-image'} style={ style }>
                            <button onClick={this.handleRemoveFile.bind(this, file)} className="btn btn-xs background-color-green color-white opacity-90 hover-opacity-100 delete">X</button>
                            <div className="upload-progress">
                              <div className="progress-bar background-color-yellow progress-bar-striped progress-bar-animated" style={{ width: file.percentage + '%' }}></div>
                            </div>
                          </div>;
                        })}
                        {filesWrongSize.map((obj, index) => {
                          const file = obj.file;
                          //console.log("index:", index, "file:", file);
                          const style = {
                            background: 'url(' + file.src.base64 + ') 50% 50% / cover no-repeat'
                          };
                          return <div key={index} className={'cursor-pointer upload-image error'} style={ style }>
                            <button onClick={this.handleRemoveWrongFile.bind(this, file)} className="btn btn-xs background-color-red color-white opacity-90 hover-opacity-100 delete">X</button>
                          </div>;
                        })}
                      </div>
                      {dropErrorMsg !== '' &&
                        <div className="container items-stretch gutters-all">
                          <div className="col-12 background-color-red file-errors">
                            <div className="color-white"><b>
                              {dropErrorMsg}
                            </b></div>
                          </div>
                        </div>
                      }
                    </>
                  );
                }}
              </Files>
            </div>
            <div className={'col-12 text-left'}>
              <h3><b>{help.title}</b></h3>
              <h3>{help.copy}</h3>
            </div>
            <EgpFormField
              type={formHelp.type}
              name={formHelp.name}
              value={message}
              placeholder={formHelp.placeholder}
              {...defaultFormFieldProps}
              className={'col-12 no-padding-top text-left'}
            />
            {formErrorMsg !== '' && <div className="col-12 no-padding-top">
              <div className="color-white background-color-red form-errors"><b>{formErrorMsg}</b></div>
            </div>}
            {files.length === 0 && <div className="col-auto">
              <button id="mailBtn" type="submit" className={mailBtnClassnames + ' display-block'}>{formHelp.submit}</button>
            </div>}
            {files.length > 0 && <div className="col-auto">
              <button id="submitBtn" type="submit" className={submitBtnClassnames + ' display-block'}>{formUpload.submit}</button>
            </div>}
          </div>
        </div>
      </form>
    );
  }
}

export default EgpUploadForm;

//Utility.classObj(restaurantSelectClasses)

    // ref={this.fieldRef}
    //if (this.state.dragging) { uploadLabelClasses += ' focus'; }

    //let obj = { 'egp-step': true };
    //obj['egp-step-' + id] = true;
    //className={Utility.classSet(obj)}
    /* let obj = {
      'drop-zone': true,
      'cursor-pointer': true,
    }; */

  //background: #c21b17 url(img/back-btn.png) 0px 0px / contain no-repeat
                          /* <img src={file.src.base64} className="img-responsive" alt={file.name} />
                            <div className="progress-bar background-color-yellow progress-bar-striped progress-bar-animated" style={{ width: file.percentage + '%' }}></div> */

/* var formData = new FormData();
formData.append("username", "Groucho");
formData.append("accountnum", 123456); // number 123456 is immediately converted to a string "123456"
// HTML file input, chosen by user
formData.append("userfile", fileInputElement.files[0]); */
