const mapToken = window.mapToken;
mapboxgl.accessToken = mapToken;

const coordinates = window.geoData?.coordinates || [90.6547, 23.2250];

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/standard',
    projection: 'globe',
    zoom: 9,
    center: coordinates
});

map.addControl(new mapboxgl.NavigationControl());
map.scrollZoom.disable();

map.on('style.load', () => {
    map.setFog({});
});


const marker = new mapboxgl.Marker({ color: 'red' })
    .setLngLat(coordinates)  
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h4>${window.geoData ? "" : "Location"}</h4>
                      <p>Exact location will be provided after booking</p>`)
    )
    .addTo(map);