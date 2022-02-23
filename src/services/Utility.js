/**
 * Utility
 */
class Utility {

  static __UNIQUE_INT = 0;

  static getUniqueInt() {
    return Utility.__UNIQUE_INT++;
  }

  /**
   * Static Utility Helper to transform a Utility.classObj into class names if property is true
   * @param {Object} props An object created via Utility.classObj
   * @returns A string with the given properties as class names
   */
  static classSet(props) {
    let list = [];
    for (let key in props) {
      if (props.hasOwnProperty(key) && props[key] === true) {
        list.push(key);
      }
    }
    return list.join(' ');
  }

  /**
   * Static Utility Helper for css class object creation to manipulate
   * @param {Object} props Strings are split into array first - each entry is set as a property with value true - Objects are returned by default without modification
   * @returns An object with each property set to true - can be transformed into class names via Utility.classSet
   */
  static classObj(props) {
    let obj = {};
    //console.log('classObj');
    if (typeof props === 'string') {
      props = props.split(' ');
      //console.log('classObj string');
    }
    if (Array.isArray(props)) {
      for (let i = 0; i < props.length; i++) {
        obj[props[i]] = true;
      }
      //console.log('classObj isArray');
    } else if (typeof props === 'object') {
      //console.log('classObj object');
      return props;
    }
    return obj;
  }
}

export default Utility;
