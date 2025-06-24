const map = L.map('map').setView([30.3168295, -97.9160072], 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let userMarker;

navigator.geolocation.watchPosition(
  position => {
    const { latitude, longitude } = position.coords;

    if (!userMarker) {
      userMarker = L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup("You're here!")
        .openPopup();
      map.setView([latitude, longitude], 15);
    } else {
      userMarker.setLatLng([latitude, longitude]);
    }
  },
  error => {
    console.error("Geolocation error:", error);
  },
  {
    enableHighAccuracy: true,
    maximumAge: 10000
  }
);

fetch('poi-data.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(poi => {
      L.marker([poi.lat, poi.lon]).addTo(map)
        .bindPopup(`<b>${poi.name}</b><br>${poi.description}`);
    });
  });

