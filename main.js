
import db_with_coords from "./db_with_coords.json" assert { type: "json" };

window.addEventListener("load", onDocumentLoad);

function onDocumentLoad() {
  ymaps.ready(initYMaps)
}

function initYMaps() {
  var myMap = new ymaps.Map("map", {
    center: [55.76, 37.64],
    zoom: 5
  })
  
  prepareData()
  
  myMap.geoObjects
  .add(
    new ymaps.Placemark([55.684758, 37.738521], {
      balloonContent: 'цвет <strong>воды пляжа бонди</strong>'
    })
  );
}

function prepareData() {
  data = []
  for (var [key, value] of db_with_coords) {
    console.log(key + " = " + value);
  }
}

