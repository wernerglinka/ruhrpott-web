const imageUrl = require('@sanity/image-url');
const queries = require('./queries');

async function getCities(client) {
  const allCities = [];
  
  // fetch all pages from Sanity
  // get rawPages in Portable Text format
  const allRawCities = client.fetch(queries.cities);
  let cities = await allRawCities;
   
  let cityContent = {};
    
  cities.map( city => {
    // build the city data object
    cityContent = {
      id: city._id,
      name: city.name,
      size: city.size,
      image: {
        imageUrl: imageUrl(client).image(city.image).url(),
        alt: city.image.alt,
        caption: city.image.caption,
        credits: city.image.credits
      },
      logo: {
        imageUrl: imageUrl(client).image(city.logo).url(),
        alt: city.logo.alt
      },
      wappen: {
        imageUrl: imageUrl(client).image(city.wappen).url(),
        alt: city.wappen.alt
      },
      link: {
        url: city.websiteLink.href,
        title: city.websiteLink.linkLabel,
        isExternal: city.isExternal
      }
    };

    // merge cityContent into the allCities array
    allCities.push(cityContent);
  });

  return {cities: allCities};
}

module.exports = getCities;