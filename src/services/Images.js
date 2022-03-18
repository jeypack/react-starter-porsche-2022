import structureData from '../assets/data.json';
import layout from '../assets/layout.jpg';
import ews_new_berlin_6 from '../assets/EWS-NEW-BERLIN-6.jpg';
import porsche_logo from '../assets/porsche-marque-negative.png';
import porsche_car from '../assets/car.png';
import porsche_map from '../assets/map.png';
import porsche_911 from '../assets/porsche-911.png';

/* src require returns object with 'default' holding the path
const images = [
  { id: 'frank_gehry_0', src: require('../assets/frank-gehry-02.jpg') },
  { id: 'frank_gehry_1', src: require('../assets/frank-gehry-03.jpg') }
];
*/

const Images = {
  "porsche_logo": {
    id: "porsche_logo",
    src: porsche_logo
  },
  "porsche_map": {
    id: "porsche_map",
    src: porsche_map
  },
  "layout": {
    id: "layout",
    src: layout
  },
  "ews_new_berlin_6": {
    id: "ews_new_berlin_6",
    src: ews_new_berlin_6
  },
  "porsche_car": {
    id: "porsche_car",
    src: porsche_car
  },
  "porsche_911": {
    id: "porsche_911",
    src: porsche_911
  }
};

structureData.preload.forEach((value, index) => {
  const image = Images[value.id];
  console.log("index:", index, "image:", (image !== null), "value:", value);
  if (!image) {
    Images[value.id] = { id: value.id, src: value.src };
  }
});


export default Images;
