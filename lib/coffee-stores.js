import { createApi } from 'unsplash-js';

const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`;
};

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: 'cat',
    page: 1,
    perPage: 10,
    color: 'green',
    orientation: 'portrait',
  });

  const unsplashResults = photos.response.results;
  return unsplashResults.map(result => result.urls['small']);
};

export const fetchCoffeeStores = async () => {
  const photos = await getListOfCoffeeStorePhotos();

  const options = {
    method: 'GET',
    headers: { Accept: 'application/json', Authorization: process.env.FOURSQUARE_AUTH_TOKEN },
  };
  const response = await fetch(getUrlForCoffeeStores('43.65267326999575,-79.39545615725015', 'coffee', 6), options);
  const data = await response.json();
  const transformedData =
    data?.results?.map((venue, idx) => {
      return {
        id: venue.fsq_id,
        address: venue.location.address || '',
        name: venue.name,
        neighbourhood: (neighbourhood && neighbourhood.length > 0 && neighbourhood[0]) || venue.location.cross_street || '',
        imgUrl: photos[idx],
      };
    }) || [];

  return transformedData;
};
