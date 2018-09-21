import { LocalStorageService } from './localStorageService';
import { HashingService } from './hashingService';

export const ApiService = {

  getForms: async () => {

    const message = LocalStorageService.getSignedMessage();

    if (!message) {
      // TODO alert
      console.log('TOKEN UNDEFINED', message);
      return;
    }

    return fetch(`http://localhost:5000/forms?owner=${message}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data[0].schema;
    }).catch(err => {

    });

  },

  postForm: async (schema) => {

    const message = LocalStorageService.getSignedMessage();

    if (!message) {
      // TODO alert
      console.log('TOKEN UNDEFINED', message);
      return;
    }

    return fetch('http://localhost:5000/forms', {
      method: 'post',
      body: JSON.stringify({
        owner: message,
        schema
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    }).catch(err => {

    });

  },
};
