
let countriesList = document.getElementById('countries');
let countries;
const singOut = document.getElementById('out');
window.CURRENT_COUNTRY_KEY = 'current_key';
singOut.addEventListener('click', (event) => {
  window.StorageService.clear()
})

window.fetchCountries.fetchData('https://restcountries.eu/rest', '/v2/all')


function renderCountriesList (response) {
  countries = response
  countries.forEach((countries) => {
    const card = new CardBuilder()
    card
      .addCardTitle(`${countries.name} (+${countries.callingCodes})`)
      .addImage(countries.flag)
      .addCardId('id')
      .attachData({
        countriesID: countries.alpha3Code 
      })
    countriesList.appendChild(card.render())
  })
}

 const {CURRENT_COUNTRY_KEY} = window



    countriesList.addEventListener('click', ({ target }) => {
    if (target.tagName.toLowerCase().match('img')) { // თუ იმიჯს დაეჭირა
      const alpha3Code  = target.dataset.countriesID; // გამოჩნდება დაჭერილი იმიჯის დათა
      if (alpha3Code ) {
        window.StorageService.store(CURRENT_COUNTRY_KEY, alpha3Code ) // დავსვით ახალი სთორიჯი
      
        console.log(alpha3Code)
        navigateToProfile(); // გადასვლა მოხდებაა იმ კონკრეტული დაწკაპული იუზერის პროფილის გვერდზე    

      }
    }
  })



