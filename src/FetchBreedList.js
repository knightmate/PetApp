async function fetchBreedList({ queryKey }) {
    const animal = queryKey[1];
  const url=`http://pets-v2.dev-apis.com/breeds?animal=${animal}`
    if (!animal) return [];
  
    const res = await fetch(url);
  
    if (!res.ok) {
      throw new Error(`breeds ${animal} fetch not ok`);
    }
  
    return res.json();
  }
  
  export default fetchBreedList;