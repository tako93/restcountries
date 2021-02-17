let countriesList = document.getElementById('countries')
let search = document.getElementById('search')
let countries = []

const singOut = document.getElementById('out')
window.CURRENT_COUNTRY_KEY = 'current_key'
const { CURRENT_USER_KEY, USER_TOKEN_KEY } = window;

singOut.addEventListener('click', (event) => {
  window.StorageService.clear()
})

window.fetchCountries.fetchData('https://restcountries.eu/rest', '/v2/all')

function renderCountriesList (countries) {

  countries.forEach((countries) => {
    const card = new CardBuilder()
    
    card
      .addCardTitle(`${countries.name}`)
      .addCardText(`calling code:(+${countries.callingCodes})`)
      .addImage(countries.flag)
      .addCardId('id')
      .attachData({
        countriesID: countries.alpha3Code
      })
    countriesList.appendChild(card.render())

  })

}; 



// const {CURRENT_COUNTRY_KEY} = window

countriesList.addEventListener('click', ({ target }) => {
  if (target.tagName.toLowerCase().match('img')) { // თუ იმიჯს დაეჭირა
    const alpha3Code = target.dataset.countriesID; // გამოჩნდება დაჭერილი იმიჯის დათა
    if (alpha3Code) {
      window.StorageService.store(CURRENT_COUNTRY_KEY, alpha3Code) // დავსვი ახალი სთორიჯი

      console.log(alpha3Code)
      navigateToProfile(); // გადასვლა მოხდებაა იმ კონკრეტული ქვეყნის პროფილის გვერდზე    

    }
  }
})

protectedRoute()