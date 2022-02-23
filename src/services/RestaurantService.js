class RestaurantService {

  constructor(json) {
    this.json = json;
  }

  getLabel(item) {
    /* [ "street": "Bahnhofstrasse 5+7",
      "plz": 5000,
      "city": "Aarau",
      "short": "AG", ... ] */
    return item.street + ', ' + item.plz + ' ' + item.city;
  }

  getValue(item) {
    return item.short + ',' + item.street + ', ' + item.plz + ' ' + item.city;
  }

  getList() {
    let list = [];
    const length = this.json.length;
    for (let item, i = 0; i < length; i++) {
      item = this.json[i];
      //list.push({ label: this.getLabel(item), value: this.getValue(item) });
      list.push({ label: item.label, value: item.label });
    }
    return list;
  }

  getListByKanton(kanton) {
    const list = [];
    const length = this.json.length;
    for (let item, i = 0; i < length; i++) {
      item = this.json[i];
      //console.log("getListByKanton:", i, item);
      if (item.short === kanton) {
        list.push({ label: this.getLabel(item), value: this.getValue(item) });
      }
    }
    return list;
  }

}

export default RestaurantService;
