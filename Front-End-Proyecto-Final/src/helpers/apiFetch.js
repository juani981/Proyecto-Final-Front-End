export const getData = async (baseURL='https://pokeapi.co/api/v2', endpoint='pokemon/ditto') => {
  try {
    const response = await fetch(`${baseURL}/${endpoint}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching API:', error);
    throw error;
  }
};