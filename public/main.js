// Foursquare API Info
const clientId = 'DLCCZMEVAAKI34WEWMLY5XR4LN2J11CANFTKTD1GY5COYWXR';
const clientSecret = '513VUNXKZD3KZEUZK3WWOXKT2UIYWA05DMNL50B2RXVICHZP';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// APIXU Info
const openWeatherKey = 'b5e764e819b7db4e6984bff50a183510';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weather = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async () => {
  const city = $input.val();
  const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20191106`;

  try{
    const response = await fetch(urlToFetch);
      if (response.ok){
        const jsonResponse = await response.json(); 
        console.log(jsonResponse);
        const venues = [];
        jsonResponse.response.groups[0].items.forEach((item)=>{
          venues.push(item.venue);
        })
        console.log(venues);     
        return venues;   
      } else{
        throw new Error('Request failed!');
      }
    }catch(error){
      console.log(error.message);
    }
}

const getWeather = async () => {
  const urlToFetch = `${weatherUrl}?q=${$input.val()}&APPID=${openWeatherKey}&units=metric`;
  try{
    const response = await fetch(urlToFetch);
    if(response.ok){
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      return jsonResponse;
    } else{
        throw new Error('Request failed!');
    }
  }catch(error){
    console.log(error.message);
  }

}


// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:
    const venue = venues[index];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
    
    let venueContent = createVenueHTML(venue.name, venue.location,venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderWeather = (currentDay) => {
    let weatherContent = createWeatherHTML(currentDay);
    $weather.append(weatherContent);
  };


const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weather.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  console.log('antes del promise.all')
  /*Promise.all([getVenues(), getForecast()]).then((values)=>{
    return renderVenues(values[0]), renderWeather(values[1]);
  })*/
  getVenues().then((venues)=>{
    return renderVenues(venues);
  });
  getWeather().then((currentDay)=>{
    return renderWeather(currentDay);
  });
  return false;
}  


  


$submit.click(executeSearch);
