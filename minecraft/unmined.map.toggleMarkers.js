/*
 * This actually toggles ALL layers EXCEPT the tiles layer.
 * (I don't have a smart way of finding just "markers" layers... yet.)
 * It only "heuristically" detects the tiles layer by presence of "useInterimTilesOnError" or "preload".
 */
var markersShown = true;
var savedMarkers = [];
var markersToggleButton = null;
function toggleMarkers() {
	if(markersShown) hideMarkers(); else showMarkers();
	updateMarkersToggleButton();
}
function hideMarkers() {
	var olm = unmined.openlayersMap;
	var nonTileLayers = [];
	olm.getLayers().getArray().forEach(layer => {
		var keys = layer.getKeys();
		if(keys.includes("useInterimTilesOnError") || keys.includes("preload")) {
			/* Skip tiles */
			return;
		}
		nonTileLayers.push(layer);
	});
	savedMarkers = nonTileLayers;
	nonTileLayers.forEach(layer => {olm.removeLayer(layer);});
	markersShown = false;
}
function showMarkers() {
	var olm = unmined.openlayersMap;
	savedMarkers.forEach(layer => {olm.addLayer(layer);});
	savedMarkers = [];
	markersShown = true;
}
function newMarkersToggleButton() {
	markersToggleButton = document.createElement("button");
	markersToggleButton.addEventListener("click", toggleMarkers);
	markersToggleButton.style.position = "fixed";
	markersToggleButton.style.right = "8px";
	markersToggleButton.style.bottom = "8px";
	markersToggleButton.id = "markersToggleButton";
	document.body.appendChild(markersToggleButton);
	updateMarkersToggleButton();
}
function updateMarkersToggleButton() {
	markersToggleButton.innerText = (markersShown ? "Hide" : "Show") + " markers";
}
window.addEventListener("load", newMarkersToggleButton);
