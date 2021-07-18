export function fetchCountries(name) {
  const url = `https://restcountries.eu/rest/v2/name/${name}?fields=name;population;flag;languages;capital;currencies`;
   return fetch(url).then(response => response.json());
    
    
}


