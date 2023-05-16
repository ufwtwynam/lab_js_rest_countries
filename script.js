console.log("Testing, testing, 1 2 3 ...")

async function getCountriesData() {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    return data;
  }

  let countriesData = [];

async function setUp() {
  // get the data from the RESTCountries API
  countriesData = await getCountriesData();

  // remove the original <p> element
  const p = document.querySelector('#countriesList p');
  p.remove();

  // populate the <ul> with country information
  populateCountriesList(countriesData);

  // add a form to our HTML
  const form = document.createElement('form');
  form.addEventListener('submit', filterCountries);
  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', 'Enter a country name');
  const submit = document.createElement('input');
  submit.setAttribute('type', 'submit');
  submit.setAttribute('value', 'Filter');
  form.appendChild(input);
  form.appendChild(submit);
  const countriesContainer = document.querySelector('#countriesContainer');
  countriesContainer.insertBefore(form, countriesContainer.firstChild);
}

function populateCountriesList(countries) {
  const countriesList = document.querySelector('#countriesList');
  countries.forEach(country => {
    const li = document.createElement('li');
    const name = document.createElement('h2');
    name.textContent = country.name.common;
    const population = document.createElement('p');
    population.textContent = `Population: ${country.population}`;
    li.appendChild(name);
    li.appendChild(population);
    countriesList.appendChild(li);
  });
}

function filterCountries(event) {
  event.preventDefault();
  const input = document.querySelector('input[type="text"]');
  const filter = input.value.toLowerCase();
  const filteredCountries = countriesData.filter(country =>
    country.name.common.toLowerCase().includes(filter)
  );
  populateCountriesList(filteredCountries);
}

window.addEventListener('load', setUp);
