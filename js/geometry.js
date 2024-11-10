

function toPointGraphic(feature, Graphic) {
  const [ longitude, latitude ] = feature.geometry.coordinates;

  const point = {
    type: "point",
    longitude: longitude,
    latitude: latitude,
  };

  const simpleMarkerSymbol = {
    type: "simple-marker",
    color: "rgb(0, 0, 0)",
    outline: {
      color: [255, 255, 255], // White
      width: 1
    },
    size: "12px",
  };

  const graphic = new Graphic({
    geometry: point,
    symbol: simpleMarkerSymbol,
    attributes: feature.properties,
  });

  return graphic;
}


function toPolygonGraphic(feature, Graphic) {
  const polygon = {
    type: "polygon",
    rings: feature.geometry.coordinates,
  };

  const simpleFillSymbol = {
    type: "simple-fill",
    color: [255, 0, 79, 0.8],
    outline: {
      color: [255, 255, 255],
      width: 1,
    }
  };

  const polygonGraphic = new Graphic({
    geometry: polygon,
    symbol: simpleFillSymbol,
    attributes: feature.properties,
  });

  return polygonGraphic;
}


function countCamerasInCounties(camerasGraphics, countiesGraphics, GeometryEngine) {  
  camerasGraphics.forEach(camera => {
    
    for (let county of countiesGraphics) {
      if (!GeometryEngine.within(camera.geometry, county.geometry)) {
        continue;
      }

      if (county.attributes["camerasCount"] == null) {
        county.attributes["camerasCount"] = 0;
      }
      county.attributes["camerasCount"]++;
      break;
    }
  });

  return countiesGraphics;
}


function resetCamerasCounts(countiesGraphics) {
  countiesGraphics.forEach(f => {
    f.attributes["camerasCount"] = 0;
  })
}


export {
  toPointGraphic,
  toPolygonGraphic,
  countCamerasInCounties,
  resetCamerasCounts,
};
