
import dbWithCoords from "./db_with_coords.json" assert { type: "json" };

const POWER_STATION_POINT_COLOR = {
  "ОДУ Северо-Запада": "#aa26dd",
  "ОДУ Центра": "#00aacb",
  "ОДУ Юга": "#23f8ac",
  "ОДУ Средней Волги": "#3abdac",
  "ОДУ Урала": "#ddee33",
  "ОДУ Сибири": "#aaccff",
  "ОДУ Востока": "#bb3090",
}

window.addEventListener("load", onDocumentLoad);
function onDocumentLoad() { ymaps.ready(initYMaps) }

// Initialize yandex map and load data from file
// 
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

// Build point mark for single power station
// 
function powerStationMark(powerStationListItem){
  return new ymaps.GeoObject({
    geometry: {
      type: "Point",
      coordinates: powerStationListItem.coord,
    },
    properties: {
      balloonContent: powerStationListItem.name,
    }
  }, {
    preset: 'islands#circleIcon',
    iconColor: powerStationListItem.iconColor,
  })
}


// Process source data.
// - extract name
// - extract coordinates
// - add color for point on the map
// 
function prepareData() {
  let data = []
 
  for(const regionName in dbWithCoords) {
    for(const powerStationName in dbWithCoords[regionName]) {
      let item = dbWithCoords[regionName][powerStationName]
      
      if (typeof item.coord !== "undefined") {
        data.push({
          name: item.Name,
          coord: [item.coord.lat, item.coord.long],
          iconColor: pointColor(regionName),
        })
      }
    }
  }
  
  return data
}

// Find color for provided region name. 
// Black color is default
// 
function pointColor(key) {
  let color = POWER_STATION_POINT_COLOR[key]

  if (typeof color === "undefined") {
    return '#000000'
  } else {
    return color
  }
}
  
  