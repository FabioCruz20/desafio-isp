import { initializeMapView } from "./map.js";
import { fetchCameras, fetchCounties } from "./fetch.js";
import { countCamerasInCounties, resetCamerasCounts, toPointGraphic, toPolygonGraphic } from "./geometry.js";
import { createCameraLayer } from "./point-layer.js";
import { createPolygonsFeatureLayer } from "./polygon-layer.js";

require([
  "esri/Map", 
  "esri/views/MapView",
  "esri/Graphic", 
  "esri/layers/FeatureLayer",
  "esri/layers/GraphicsLayer",
  "esri/geometry/geometryEngine",
  "esri/widgets/Legend"
], (
  Map, 
  MapView, 
  Graphic, 
  FeatureLayer, 
  GraphicsLayer, 
  GeometryEngine, 
  Legend
) => {

  async function main() {

    initializeHelpOpeningButton();
    initializeHelpClosingButton();

    const view = initializeMapView("viewDiv", Map, MapView, Legend);
    let countiesGraphics = await fetchCounties(f => toPolygonGraphic(f, Graphic));
    
    const btn = document.querySelector("#js-submit-filter");
    if (btn == null) {
      return;
    }

    enableFilterButton(btn);
    setFeedbackText("");

    btn.onclick = async (e) => {
      e.preventDefault();

      reset(countiesGraphics, view);
      let camerasGraphics = await fetchCameras(e.target.form, f => toPointGraphic(f, Graphic));      
      countiesGraphics = countCamerasInCounties(camerasGraphics, countiesGraphics, GeometryEngine);

      const nonZeroCountiesGraphics = countiesGraphics.filter(c => c.attributes["camerasCount"] > 0);
      if (nonZeroCountiesGraphics.length == 0) {
        setFeedbackText("Nenhum condado encontrado para esse filtro.");
        return;
      }
      
      const countiesLayer = createPolygonsFeatureLayer(nonZeroCountiesGraphics, FeatureLayer);
      const cameraLayer = createCameraLayer(camerasGraphics, FeatureLayer);
      view.map.add(countiesLayer);
      view.map.add(cameraLayer);
      setFeedbackText("");
    };
  }

  (async () => {
    await main();
  })();
});


function initializeHelpOpeningButton() {
  const btn = document.querySelector("#js-open-help");
  btn.onclick = (e) => {
    const modal = document.querySelector("#help-modal");
    modal.classList.remove("hidden");
  };
}


function initializeHelpClosingButton() {
  const btn = document.querySelector("#js-close-help");
  btn.onclick = (e) => {
    const modal = document.querySelector("#help-modal");
    modal.classList.add("hidden");
  }
}


function enableFilterButton(btn) {
  btn.removeAttribute("disabled");
  btn.classList.remove("bg-gray-500");
  btn.classList.add("bg-blue-500");
}


function reset(countiesGraphics, view) {
  setFeedbackText("Buscando dados...");
  resetCamerasCounts(countiesGraphics);
  view.map.removeAll();
}


function setFeedbackText(text) {
  document.querySelector("#js-feedback-msg").innerText = text;
}
