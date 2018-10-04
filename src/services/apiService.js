import { LocalStorageService } from './localStorageService';

export const ApiService = {

  register: async (payload) => {

    if (!payload.address) {
      console.log('Invalid Address');
      return;
    }

    return fetch('http://localhost:5000/register', {
      method: 'post',
      body: JSON.stringify(payload)
    })
    .then(async response => {
      console.log(response);
      if (response.status !== 201) {
        throw new Error();
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      return data;
    });
  },

  login: async (password) => {
    if (!password) {
      console.log('Invalid');
      return;
    }

    const addr = LocalStorageService.getCurrentUser();

    return fetch(`http://localhost:5000/login/${addr}`, {
      method: 'post',
      body: JSON.stringify({
        password
      })
    })
    .then(response => response.json())
    .then(data => {
      LocalStorageService.setUserName(data.name);
      return data;
    });
  },

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
