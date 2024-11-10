
function createCamerasFeatureLayer(source, FeatureLayer) {

  return new FeatureLayer({
    fields: [
      {
        name: "FID",
        alias: "FID",
        type: "oid"
      },
      {
        name: "OBJECTID",
        alias: "OBJECTID",
        type: "integer"
      },
      {
        name: "location",
        alias: "location",
        type: "string"
      },
      {
        name: "county",
        alias: "county",
        type: "string"
      },
      {
        name: "feedID",
        alias: "feedID",
        type: "string"
      },
      {
        name: "url",
        alias: "url",
        type: "string"
      },
      {
        name: "iframe",
        alias: "iframe",
        type: "string"
      },
      {
        name: "lat",
        alias: "lat",
        type: "double"
      },
      {
        name: "long",
        alias: "long",
        type: "double"
      },
    ],
    source: source, 
    renderer: {
      label: "Câmeras",
      type: "simple",
      symbol: {
        type: "simple-marker",
        color: "#555",
        size: "6px",
      }
    },
    popupTemplate: {
      title: "Câmera",
      content: [
        {
          type: "fields",
          fieldInfos: [
            {
              fieldName: "FID",
              label: "FID",              
            },
            {
              fieldName: "OBJECTID",
              label: "OBJECTID",              
            },
            {
              fieldName: "location",
              label: "location",              
            },
            {
              fieldName: "county",
              label: "county",              
            },
            {
              fieldName: "feedID",
              label: "feedID",              
            },
            {
              fieldName: "url",
              label: "url",              
            },
            {
              fieldName: "iframe",
              label: "iframe",              
            },
            {
              fieldName: "lat",
              label: "lat",              
            },
            {
              fieldName: "long",
              label: "long",              
            },
          ]
        }
      ]
    }   
  });
}

export {
  createCamerasFeatureLayer as createCameraLayer,
};
