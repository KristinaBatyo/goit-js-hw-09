import Notiflix from 'notiflix';

const form = document.querySelector('.form');

const createPromise = (position, delay) => {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
    } else {
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }
  });
};

const onFormSub = el => {
  el.preventDefault();
  const step = el.currentTarget.elements.step.value;
  const delay = el.currentTarget.elements.delay.value;
  const amount = el.currentTarget.elements.amount.value;
  for (let i = 0; i < amount; i += 1) {
    setTimeout(() => {
      createPromise(i + 1, +delay + i * +step)
        .then(message => Notiflix.Notify.success(message))
        .catch(message => Notiflix.Notify.failure(message));
    }, +delay + i * +step);
  }
};

form.addEventListener('submit', onFormSub);

