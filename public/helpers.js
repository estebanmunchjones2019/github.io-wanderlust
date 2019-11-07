const createVenueHTML = (name, location, iconSource) => {
    return `<h2>${name}</h2>
    <img class="venueimage" src="${iconSource}"/>
    <h3>Address:</h3>
    <p>${location.address}</p>
    <p>${location.city}</p>
    <p>${location.country}</p>`;
  }
  
  const createWeatherHTML = (currentDay) => {
    const urlIcon = `http://openweathermap.org/img/w/${currentDay.weather[0].icon}.png`;
    return `<h2> Current: ${currentDay.main.temp} °C</h2>
      <h2> High: ${currentDay.main.temp_max} °C</h2>
      <h2> Low: ${currentDay.main.temp_min} °C</h2>
      <h2> Weather: ${currentDay.weather[0].main}: ${currentDay.weather[0].description}</h2>
      <img src=${urlIcon} class="weathericon" />
      <h2>${weekDays[new Date().getDay()]}</h2>`;
  }