const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`;
};

export const fetchCoffeeStores = async () => {
  const options = {
    method: 'GET',
    headers: { Accept: 'application/json', Authorization: process.env.FOURSQUARE_AUTH_TOKEN },
  };
  const response = await fetch(getUrlForCoffeeStores('43.65267326999575,-79.39545615725015', 'coffee', 6), options);
  const data = await response.json();
  const transformedData =
    data?.results?.map(venue => {
      return {
        id: venue.fsq_id,
        ...venue,
      };
    }) || [];

  return transformedData;
};
