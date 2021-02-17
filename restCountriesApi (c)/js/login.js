
const userToken = StorageService.read(window.USER_TOKEN_KEY);

if (userToken) {
  navigateToIndex(userToken);
}


const onSubmit = async (event) => {
  event.preventDefault();
  const inputEmail = document.getElementById('inputEmail');
  const inputPassword = document.getElementById('inputPassword');
  const loginForm = document.getElementById('loginForm');

  const errors = [];

  if (inputEmail.value === null) {
    errors.push('no email');
  }
  if (inputPassword.value === null) {
    errors.push('no password');
  }
  if (errors.length) {
    alert(errors);
    return;
  }

  const result = await window.ApiService.login(inputEmail.value, inputPassword.value) 

  if (result && result.token) {
    // StorageService.store(window.USER_TOKEN_KEY, result.token)
    navigateToIndex(result.token);
  }

};


loginForm.addEventListener('submit', onSubmit);
