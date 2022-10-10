import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

import UI from './config/ui.config';
import { validate } from './helpers/validate';
import { showInputError, removeInputError } from './views/form';
import { login } from './servises/auth.servise';
import { notify } from './views/notification';
import { getNews } from './servises/news.servise';

const { form, inputEmail, inputPassword } = UI;
const inputs = [inputEmail, inputPassword];

// Ewents

form.addEventListener('submit', (e) => {
  e.preventDefault();
  onSubmit();
})

inputs.forEach(el => el.addEventListener('focus', () => removeInputError(el)));


// Handlers

async function onSubmit() {
  const isValidForm = inputs.every((el) => {
    const isValidInput = validate(el);
    if (!isValidInput) {
      showInputError(el);
    }
    return isValidInput;
  });

  if (!isValidForm) return;

  try {
    await login(inputEmail.value, inputPassword.value);
    await getNews();
    form.reset();

    

    notify({ msg: 'Login success' , classname: 'alert-success' })

  } catch(err) {
    
    notify({msg: 'Login failed', className: 'alert-danger'});
  }

}

// denis.m.pcspace@gmail.com
// dmgame12345

