
let forInfo = document.getElementById('info-container');


const {
    StorageService,
    fetchCountries
} = window; //ყოველ ჯერზე  window.-ის დაწერა რომ არ მოგვიწიოს

const {
    CURRENT_COUNTRY_KEY
} = window;


(async () => {
    const countrieCode = StorageService.read(CURRENT_COUNTRY_KEY); //stored is read
    const countrie = await fetchCountries.fetchData('https://restcountries.eu/rest', `/v2/alpha/${countrieCode}`); // data არის იუზერი. არის data იუზერ ცვლადით
})();

 function renderCountriesList (response) {
  countries = response
   if (countries) {
       console.log(countries);
     document.getElementById('name').innerHTML = countries.name;
     document.getElementById('capital').innerHTML = countries.capital;
     document.getElementById('dialing-code').innerHTML = ` ${countries.callingCodes[0]}`;
     document.getElementById('population').innerHTML = countries.population;
     document.getElementById('currencies').innerHTML = countries.currencies.filter(c => c.name).map(c => `${c.name}(${c.code})`).join(', ');
     document.getElementById('region').innerHTML = countries.region;
     document.getElementById('subregion').innerHTML = countries.subregion;
     document.getElementById('flag-container').src = countries.flag;
   }
 
  
}

protectedRoute()
