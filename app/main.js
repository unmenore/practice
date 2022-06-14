
import dbWithCoords from "./db_with_coords.json" assert { type: "json" };

window.addEventListener("load", onDocumentLoad);
function onDocumentLoad() { ymaps.ready(initYMaps) }

function initYMaps() {
  let myMap = new ymaps.Map("map", {
    center: [55.76, 37.64],
    zoom: 5,
    controls: ['typeSelector', 'zoomControl', 'rulerControl'],
  })
  
  let powerStationList = prepareData()
  for (const powerStationId in powerStationList) {
    myMap.geoObjects.add(powerStationMark(powerStationList[powerStationId]));
  }
}

function powerStationMark(powerStationListItem){
  return new ymaps.GeoObject({
    geometry: {
      type: "Point",
      coordinates: powerStationListItem.coord,
    },
    properties: {
      iconContent: powerStationListItem.name,
    }
  }, {
    preset: 'islands#blackStretchyIcon',
  })
}
  
function prepareData() {
  let data = []
  
  for(const regionName in dbWithCoords) {
    for(const powerStationName in dbWithCoords[regionName]) {
      let item = dbWithCoords[regionName][powerStationName]
      
      if (typeof item.coord !== "undefined") {
        data.push({
          name: item.Name,
          coord: [item.coord.lat, item.coord.long],
        })
      }
    }
  }
  
  return data
}
  
  