import { getPercentileRange } from "./range.js";


function createPolygonsFeatureLayer(dataSource, FeatureLayer) {
  const graphicsLayer = new FeatureLayer({
    fields: [
      {
        name: "ObjectID",
        alias: "ObjectID",
        type: "oid"
      },
      {
        name: "NAME",
        alias: "NAME",
        type: "string"
      },
      {
        name: "STATE_NAME",
        alias: "STATE_NAME",
        type: "string"
      },
      {
        name: "STATE_ABBR",
        alias: "STATE_ABBR",
        type: "string"
      },
      {
        name: "STATE_FIPS",
        alias: "STATE_FIPS",
        type: "string"
      },
      {
        name: "COUNTY_FIPS",
        alias: "COUNTY_FIPS",
        type: "string"
      },
      {
        name: "FIPS",
        alias: "FIPS",
        type: "string"
      },
      {
        name: "POPULATION",
        alias: "POPULATION",
        type: "integer"
      },
      {
        name: "POP_SQMI",
        alias: "POP_SQMI",
        type: "double"
      },
      {
        name: "SQMI",
        alias: "SQMI",
        type: "double"
      },
      {
        name: "Shape__Area",
        alias: "Shape__Area",
        type: "double"
      },
      {
        name: "Shape__Length",
        alias: "Shape__Length",
        type: "double"
      },
      {
        name: "camerasCount",
        alias: "camerasCount",
        type: "integer",
      }
    ],
    renderer: createRenderer(dataSource),
    popupTemplate: createPopupTemplate(),
    source: dataSource,
  });
  return graphicsLayer;
}


function createPopupTemplate() {
  const popupTemplate = {
    title: "Contagem de câmeras no condado",
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "NAME",
            label: "Condado"
          },
          {
            fieldName: "STATE_NAME",
            label: "Estado"
          },
          {
            fieldName: "camerasCount",
            label: "Contagem de câmeras"
          }
        ]
      }
    ]
  };
  return popupTemplate;
}


function createRenderer(dataSource) {

  const [lower, upper] = getPercentileRange(dataSource.map(c => c.attributes["camerasCount"]));

  const renderer = {
    type: "simple",
    symbol: {
      type: "simple-fill",
      outline: {
        color: "lightgray",
        width: 0.5,
      },
    },
    label: "Contagem de câmeras por condado",
    visualVariables: [
      {
        type: "color",
        field: "camerasCount",
        stops: [
          {
            value: lower,
            color: "rgba(253, 253, 150, 0.5)",
            label: `${lower} (p-05)`,
          },
          {
            value: upper,
            color: "rgba(200, 40, 20, 0.8)",
            label: `${upper} (p-95)`
          }
        ]
      }
    ],
  };
  return renderer;
}

export {
  createPolygonsFeatureLayer,
}
