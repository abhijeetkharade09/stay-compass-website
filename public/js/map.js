// Set your LocationIQ key
locationiq.key = mapToken;

// Only initialize map if coordinates exist
if (listingCoordinates && listingCoordinates.length === 2) {
    var map = new maplibregl.Map({
        container: 'map',
        style: locationiq.getLayer("Streets"), // Correct way with LocationIQ JS
        center: listingCoordinates,
        zoom: 9
    });

    // Marker
    var el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'url(https://tiles.locationiq.com/static/images/marker50px.png)';
    el.style.width = '50px';
    el.style.height = '50px';

    // Popup
    var popup = new maplibregl.Popup({ offset: 25 }).setText(listingMessage);

    new maplibregl.Marker(el)
        .setLngLat(listingCoordinates)
        .setPopup(popup)
        .addTo(map);
}
