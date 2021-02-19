let countriesList = document.getElementById('countries')
let countries = []
let search = document.getElementById('search')
const singOut = document.getElementById('out')
window.CURRENT_COUNTRY_KEY = 'current_key'
const { CURRENT_USER_KEY, USER_TOKEN_KEY } = window

singOut.addEventListener('click', (event) => {
  window.StorageService.clear()
})

// fetch and show countries

window.fetchCountries.fetchData('https://restcountries.eu/rest', '/v2/all') //fetch კლასის პარამეტრების შევსება

function renderCountriesList (countries) { // მონაცენთა რენდერი 
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
}

// search

function debounce (func, wait, immediate) {
  var timeout
  return function () {
    var context = this, args = arguments
    var later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

const searchFn = () => {
  countriesList.innerHTML = null

  window.fetchCountries.fetchData(`https://restcountries.eu/rest/v2/name/${search.value}?fullText=true`)

  renderCountriesList(countries)
  console.log(search.value)
}
var myEfficientFn = debounce(searchFn, 250)

search.addEventListener('keyup', myEfficientFn)

// show one countrie info
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
