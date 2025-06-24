navigator.geolocation.getCurrentPosition(position => {
  const {latitude, longitude} = position.coords;
  const map = L.map('map').setView([latitude, longitude], 15);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  L.marker([latitude,longitude]).addTo(map).bindPopup("You are here").openPopup();
  fetch('poi-data.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(poi => {
        L.marker([poi.lat, poi.lon]).addTo(map)
          .bindPopup(`<b>${poi.name}</b><br>${poi.description}`);
      });
    });
});
