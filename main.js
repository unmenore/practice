
import db_with_coords from "./db_with_coords.json" assert { type: "json" };

window.addEventListener("load", onDocumentLoad);
function onDocumentLoad() { ymaps.ready(initYMaps) }

function initYMaps() {
  let myMap = new ymaps.Map("map", {
    center: [55.76, 37.64],
    zoom: 5
  })
  
  let nppList = prepareData()
  for (const nppId in nppList) {
    myMap.geoObjects.add(nppMark(nppList[nppId]));
  }
}

function nppMark(nppListItem){
  return new ymaps.Placemark([nppListItem[1], nppListItem[2]], {
    balloonContent: nppListItem[0]
  })
}
  
function prepareData() {
  let data = []
  
  for(const regionName in db_with_coords) {
    for(const nppName in db_with_coords[regionName]) {
      let item = db_with_coords[regionName][nppName]
      
      if (typeof item.coord !== "undefined") {
        data.push([
          item.Name,
          item.coord.lat,
          item.coord.long,
        ])
      }
    }
  }
  
  return data
}
  
  