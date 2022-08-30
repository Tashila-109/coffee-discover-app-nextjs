import { createApi } from 'unsplash-js';

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`;
};

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: 'coffee shop',
    perPage: 30,
  });

  const unsplashResults = photos.response?.results || [];
  return unsplashResults.map(result => result.urls['small']);
};

export const fetchCoffeeStores = async (latLong = '43.653833032607096%2C-79.37896808855945', limit = 6) => {
  const photos = await getListOfCoffeeStorePhotos();

  const options = {
    method: 'GET',
    headers: { Accept: 'application/json', Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_AUTH_TOKEN },
  };
  const response = await fetch(getUrlForCoffeeStores(latLong, 'coffee', limit), options);
  const data = await response.json();
  const transformedData =
    data?.results?.map((venue, idx) => {
      const neighborhood = venue.location.neighborhood;
      return {
        id: venue.fsq_id,
        address: venue.location.address || {},
        name: venue.name,
        neighbourhood: (neighborhood && neighborhood.length > 0 && neighborhood[0]) || venue.location.cross_street || '',
        imgUrl: photos.length > 0 ? photos[idx] : null,
      };
    }) || [];

  return transformedData;
};
