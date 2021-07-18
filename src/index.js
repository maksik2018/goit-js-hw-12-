import './css/styles.css';
import  "modern-normalize";
import countryList from './templates/countryList.hbs';
import country from './templates/countryCard.hbs'
import { fetchCountries } from './js/fetchCountries';
import getRefs from './js/getRefs';
import debounce from 'lodash.debounce';
import Notiflix from "notiflix";
const refs = getRefs();
const DEBOUNCE_DELAY = 300;

refs.searchCountry.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
    // event.preventDefault();
    refs.country.innerHTML = '';
    refs.countryList.innerHTML = '';
    const onLettersSearch = event.target.value;
    // console.log(onLettersSearch);

  fetchCountries(onLettersSearch)
    .then(renderCountryCard)
    .catch(error => { console.log(error) });
    }

function renderCountryCard (countries){
      if (countries.length === 1) {
        // refs.country.insertAdjacentHTML('beforeend', country(countries));
        refs.country.innerHTML = country(countries);
        // Notiflix.Notify.success('yr request is successfuly')//для примера, если запрос удачный
      } 
      else if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
      }
      
      else if (countries.length >= 2 && countries.length <= 10) {
        // refs.countryList.insertAdjacentHTML('afterbegin', countryList(countries));
        refs.country.innerHTML = countryList(countries);
       
  }
  else if (countries.status === 404) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }

}

//  console.log(fetchCountries());