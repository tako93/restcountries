class FetchCountries {
    
    async fetchData(path, endpoint) {
        try {
            const response = await fetch(`${path}${endpoint}`) 
            const countries = await response.json()
            const render = renderCountriesList(countries)
            // const searchRender = searchRender(countries)
            return render;

        } catch (err) {
            console.error(err);
            return;
        }
    }

}

class reqRes {
  baseUrl = "https://reqres.in/api";


  constructor() {
    this.userToken = localStorage.getItem(window.USER_TOKEN_KEY);
    }
    
    async fetchRequest(params, options = {}) {
        return fetch(`${this.baseUrl}${params.endpoint}`, options);
    }


    async login(email, password, callback) {
       const params = {
            endpoint: '/login',
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            }),
        };

        try {
            const res = await this.fetchRequest(params, options);
            const result = await res.json();

        return result;

        } catch (err) {
            console.error("[reqres.login]", err);
            return;
        }

    }
 
    
}
window.ApiService = new reqRes();

class CardBuilder {
    constructor(tagName = 'div') { // setup
        this.card = document.createElement(tagName)
        this.card.className = 'card mx-3 col-auto shadow-lg mb-5 bg-body rounded-3'
        this.card.style.width = '15rem'
// mt-2 mb-2
        this.cardBody = null
        this.cardTitle = null
        this.cardImage = null
        this.cardText = null
        this.cardId = null
    }

    addImage(src) {
        this.cardImage = document.createElement('img')
        this.cardImage.className = 'card-img-top img-thumbnail'
        this.cardImage.style.cursor = 'pointer'
        this.cardImage.setAttribute('src', src)
        this.card.appendChild(this.cardImage)

        return this
    }

    addCardBody() {
        this.cardBody = document.createElement('div')
        this.cardBody.className = 'card-body '
        this.card.appendChild(this.cardBody)

        return this
    }

    addCardTitle(title) {
        if (!this.cardBody) {
            this.addCardBody()
        }
        this.cardTitle = document.createElement('h5')
        this.cardTitle.textContent = title

        this.cardBody.appendChild(this.cardTitle)
        return this
    }

    addCardText(text) {
        if (!this.cardBody) {
            this.addCardBody()
        }
        this.cardText = document.createElement('p')
        this.cardText.textContent = text
        this.cardBody.appendChild(this.cardText)

        return this
    }

    addCardId(id) {
        this.card.setAttribute('id', Math.random().toString(36).substr(2, 9)) // რანდომ აიდის დამატება თითოეულისთვის

        return this
    }

    stringify(data) {
        return JSON.stringify(data); // ***ესეც დრაი პრინციპის დასაცავად
    }
    attachData(data) {
        if (!this.cardImage) {
            return
        }

        for (let key of Object.keys(data)) {
           
            this.cardImage.dataset[key] = data[key]
        }
        
        return this
    }

    render() {
        return this.card
    }
}

class Storage { // კონსტრუქტორი ფუნქცია არის ფუნქცია რომელიც ინიციალიზაციის მომენტში ქმნის ობიექტს
    constructor() {
        this.storage = localStorage
    }
    store(key, value) {
        this.storage.setItem(key, JSON.stringify(value)) // ყოველ შენახვაზე სწორ ფორმატში რომ შეინახოს 
    }
    read(key) {
        return JSON.parse(this.storage.getItem(key))
    }
    delete(key) {
        this.storage.removeItem(key)
    }
    clear() {
        this.storage.clear()
    }
} // ლოქალ სთორიჯთან სამუშაოდ

window.StorageService = new Storage()

function navigateToProfile () {
  location.replace('countrie.html')
}

function navigateToLogin () {
  location.replace('login.html')
}

function navigateToIndex(token) {

    StorageService.store(window.USER_TOKEN_KEY, token);
    location.replace('index.html'); // თუ ეს ჩანაწერი მოიძებნება localStorage-ში მაშინვე გადადის dashboard.html-ზე 
}
function protectedRoute() {
  const userToken = StorageService.read(window.USER_TOKEN_KEY);

    if (!userToken) {
        console.log('out')
        navigateToLogin () 
  }
}


window.CURRENT_COUNTRY_KEY = 'current_key';
const countrieCode = StorageService.read(CURRENT_COUNTRY_KEY);


window.USER_TOKEN_KEY = "user_token";

window.fetchCountries = new FetchCountries()

window.card = new CardBuilder()









