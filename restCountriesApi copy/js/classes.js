class FetchCountries {
    async fetchData(path, endpoint) {
        try {
            const response = await fetch(`${path}${endpoint}`) // params - ის რასაც ვახორციელებთ(ამ შემთხვევაში login) და მისამართში იწერება endpoint - ჩვენ ვქმნით   // აქვე ვიძახებთ fetchRequest ფუნქციას და ვაწერთ .then-ებს ისე როგორც fetch-ის წესია 
            const result = await response.json()
            const render = renderCountriesList(result)
            return render;

        } catch (err) {
            console.error(err);
            return;
        }
    }
 
}



class CardBuilder {
    constructor(tagName = 'div') { // setup
        this.card = document.createElement(tagName)
        this.card.className = 'card mt-2 mb-2 col-4 p-2'
        this.card.style.width = '18rem'

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
        this.cardBody.className = 'card-body'
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
            // key = countriesName -- userId
            this.cardImage.dataset[key] = data[key]
        }
        //  console.log(data)
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



function navigateToProfile () {
  location.replace('countrie.html')
}

window.CURRENT_COUNTRY_KEY = 'current_key';

window.fetchCountries = new FetchCountries()

window.card = new CardBuilder()

window.StorageService = new Storage()

const countrieCode = StorageService.read(CURRENT_COUNTRY_KEY);

