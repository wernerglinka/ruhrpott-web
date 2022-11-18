const imageUrl = require('@sanity/image-url');
const queries = require('./queries');

async function getFootballClubs(client) {
  const allClubs = [];
  
  // fetch all pages from Sanity
  // get rawPages in Portable Text format
  const allRawClubs = client.fetch(queries.footballClubs);
  let clubs = await allRawClubs;
   
  let clubContent = {};
    
  clubs.map( club => {
    // build the city data object
    clubContent = {
      id: club._id,
      name: club.name,
      logo: {
        imageUrl: imageUrl(client).image(club.logo).url(),
        alt: club.logo.alt
      },
      link: {
        url: club.websiteLink.href,
        title: club.websiteLink.linkLabel,
        isExternal: club.isExternal
      }
    };

    // merge cityContent into the allCities array
    allClubs.push(clubContent);
  });

  return {footballClubs: allClubs};
}

module.exports = getFootballClubs;