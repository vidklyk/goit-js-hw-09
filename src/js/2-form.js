let formData = {
  email: '',
  message: '',
};

const formEl = document.querySelector('.feedback-form');

const fillFormFields = () => {
  try {
    const formDataLS = localStorage.getItem('feedback-form-state');
    if (!formDataLS) {
      return;
    }
    const parsedData = JSON.parse(formDataLS);
    formData = parsedData;

    for (const key in parsedData) {
      formEl.elements[key].value = parsedData[key];
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
  formData = { email: '', message: '' };
  formEl.reset();
};

formEl.addEventListener('input', inputEvent);
formEl.addEventListener('submit', feedbackFormSubmit);
