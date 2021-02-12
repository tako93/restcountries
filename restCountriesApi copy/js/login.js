window.COUNTRIES_TOKEN_KEY = "token";
class Storage { 
    constructor() {
        this.storage = localStorage;
    }
    store(key, value) {
        this.storage.setItem(key, JSON.stringify(value)) 
    }
    read(key) {
        return JSON.parse(this.storage.getItem(key));
    }
    delete(key) {
        this.storage.removeItem(key);
    }
    clear() {
        this.storage.clear();
    }
} 
window.StorageService = new Storage()


const sign = document.getElementById('sign'); 
 
sign.addEventListener('click', (event) => {
    event.preventDefault();
  const inputEmail = document.getElementById("inputEmail");
  const inputPassword = document.getElementById("inputPassword");
  const errors = [];

  if (inputEmail.value === "") {
    errors.push("enter email");
  }
  if (inputPassword.value === "") {
    errors.push("enter password");
  }

  if (errors.length) {
    console.error(errors);
    return;
  }

    if (inputEmail.value === 'tako.hi@country.go' && inputPassword.value === 'tako') {
        window.StorageService.store(window.COUNTRIES_TOKEN_KEY, 'FORTako')
    location.replace('index.html');
    } else {
      alert('no such user')
}
})
