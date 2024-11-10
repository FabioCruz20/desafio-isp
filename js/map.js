
function initializeMapView(container, Map, MapView, Legend) {
  const map = new Map({
    basemap: "gray-vector",
    layers: []
  });

  const view = new MapView({
    container: container,
    map: map,
    center: [-77.1793848, 38.8936387],
    zoom: 7
  });

  view.ui.add(
    new Legend({
      view: view,
    }),
    "bottom-left"
  );

  return view;
}


export {
  initializeMapView,
};
