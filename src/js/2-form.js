let formData = {
  email: '',
  message: '',
};

const formEl = document.querySelector('.feedback-form');

const fillFormFields = () => {
  try {
    if (localStorage.length === 0) {
      return;
    }
    const formDataLS = JSON.parse(localStorage.getItem('feedback-form-state'));
    formData = formDataLS;
    console.log(formDataLS);

    for (const key in formDataLS) {
      formEl.elements[key].value = formDataLS[key];
    }
  } catch (err) {
    console.log(err);
  }
};
fillFormFields();

const inputEvent = event => {
  const { target: formFieldEl } = event;
  const fieldValue = formFieldEl.value;
  const fieldName = formFieldEl.name;
  formData[fieldName] = fieldValue;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  console.log(formData);
};

const feedbackFormSubmit = event => {
  event.preventDefault();
  const email = formEl.elements.email.value.trim();
  const message = formEl.elements.message.value.trim();
  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }
  console.log({ email, message });
  localStorage.removeItem('feedback-form-state');
  formEl.reset();
};

formEl.addEventListener('input', inputEvent);
formEl.addEventListener('submit', feedbackFormSubmit);
