
async function fetchCounties(featureMapper) {
  const url = "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_Census_Counties/FeatureServer/0/query?where=1=1&outFields=*&f=pgeojson";
  return await fetchFeatureCollection(url, featureMapper);
}


async function fetchCameras(form, featureMapper) {
  let query = getWhereParams(form);
  query = query == "" ? "1=1" : query;

  const cameraPointsBaseUrl = "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/Traffic_Cameras/FeatureServer/0/";
  return await fetchFeatureCollection(
    `${cameraPointsBaseUrl}/query?where=${query}&outFields=*&f=pgeojson`,
    featureMapper,
  );
}


async function fetchFeatureCollection(url, featureMapper) {  
  const result = await fetchFeatures(encodeURI(url), "GET");
  const featureCollection = JSON.parse(result);
  return featureCollection.features.map(featureMapper);
}


function getWhereParams(form) {
  let where = "";

  const formElems = Array.from(form.elements);
  formElems.forEach((elem, i) => {
    if (i == formElems.length - 1) {
      return;
    }
    if (elem.value == "") {
      return;
    }
    where += `${elem.name} = '${elem.value.trim().replace(/(\')/g, "''")}' AND `;
  });

  let trimmedWhere = where.replace(/(AND )$/g, "");
  return trimmedWhere;
}


function fetchFeatures(url, method, payload) {
  return new Promise((resolve) => {
    const xhttp = new XMLHttpRequest();

    xhttp.onload = function() {
      resolve(xhttp.response);
    }

    xhttp.open(method, url);
    xhttp.send();
  });
}

export {
  fetchCounties,
  fetchCameras,
};
