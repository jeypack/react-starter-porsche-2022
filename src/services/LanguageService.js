class LanguageService {

  static _instance = null;
  static getInstance(data, currrentLanguage, defaultLanguage) {
    if (!LanguageService._instance) {
      LanguageService._instance = new LanguageService(data, currrentLanguage, defaultLanguage)
    }
    return LanguageService._instance;
  }

  constructor(data, currrentLanguage, defaultLanguage) {
    this.data = data || {};
    this.defaultLanguage = defaultLanguage ? defaultLanguage.toUpperCase() : "DE";
    this.currrentLanguage = currrentLanguage || this.defaultLanguage;
  }

  getString(key, language) {
    let lang = language || this.currrentLanguage;
    let langString = "'" + key + "' '" + lang + "' Lorem ipsum dolor";
    //console.log("getString", "key:", key, "lang:", lang);
    //console.log("getString", "this.data[key]:", this.data[key]);
    if (this.data[key] && this.data[key][lang]) {
      langString = this.data[key][lang];
    }
    return langString;
  }

  getLanguages() {
    let languages = this.data.languages || {};
    let returnArr = [];
    for (let key in languages) {
      //{ "DE": "de-CH", "EN": "en-CH" }
      let value = languages[key];
      returnArr.push({ id: key, value: value, label: key });
    }
    return returnArr;
  }

  setData(data) {
    this.data = data;
  }

  setLanguage(value) {
    this.currrentLanguage = value;
  }

  setDefault(value) {
    this.defaultLanguage = value;
  }

}

export default LanguageService;
