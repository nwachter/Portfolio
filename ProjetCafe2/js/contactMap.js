window.onload = function () {
    //https://www.mapbox.com/mapbox-gljs 
    const mapContainer = document.getElementById('map');
    const apiKey = "pk.eyJ1IjoibndhY2h0ZXIiLCJhIjoiY2xucnIzMG9lMGs0eDJqcGNxa2Zhc3hweSJ9.0NxpsOLrEa1SkDwUkvigMA";
    //const geolocation = navigator.geolocation.getCurrentPosition(successLocation, errorLocation, { enableHighAccuracy: true });
    const maPosition = {latitude:43.3071402,
        longitude: -0.3623609};
    const center = {
        coords: {
            latitude: 43.2933,
            longitude: -0.369144
        }
    }


    function successLocation(center) {
       // console.log(center);
        setupMap([center.coords.longitude, center.coords.latitude]);

    }
   
    function errorLocation() {
        setupMap([-0.366667, 43.300000]);

    }
    function setupMap(center) {
        mapboxgl.accessToken = apiKey;
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: center, // starting position
            zoom: 16 // starting zoom
        });
       //Add controles de zoom et rotation
        map.addControl(new mapboxgl.NavigationControl());

                // Create a default Marker, colored black, rotated 45 degrees.
        const marker = new mapboxgl.Marker({ color: 'black', rotation: 45 })
            .setLngLat(center)
            .setPopup(new mapboxgl.Popup().setHTML("<h2>Sunset Café</h2><h3>18 Boulevard des Pyrénées</h3>"))
            .getPopup()
            .addTo(map);

    }

    successLocation(center);

   



}
