navigator.geolocation.getCurrentPosition(position => {
  //const {latitude, longitude} = position.coords;
  const latitude = 30.557598;
  const longitude = -98.373195;
  const map = L.map('map').setView([latitude, longitude], 15);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  L.marker([latitude,longitude]).addTo(map).bindPopup("You are here").openPopup();
  fetch('poi-data.json')
    .then(response => resonse.json())
    .then(data => {
      data.forEach(poi => {
        L.marker([poi.lat, poi.lon]).addTo(map)
          .bindPopup(`<b>${poi.name}</b><br>${poi.description}`);
      });
    });
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
  .then(() => console.log('SW registered'))
  .catch(err => console.error('SW failed:', err));
}
