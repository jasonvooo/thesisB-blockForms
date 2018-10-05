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
    .then(async response => {
      if (response.status !== 200) {
        throw new Error();
      }
      return response.json();
    })
    .then(data => {
      LocalStorageService.setUserName(data.name);
      return data;
    });
  },

  updateUser: async (contractAddress) => {
    if (!contractAddress) {
      console.log('Invalid');
      return;
    }

    const addr = LocalStorageService.getCurrentUser();

    return fetch(`http://localhost:5000/user/${addr}`, {
      method: 'patch',
      body: JSON.stringify({
        contractAddress
      })
    })
    .then(async response => {
      if (response.status !== 200) {
        throw new Error();
      }
      return await response.json();
    })
    .then(data => {
      return data;
    });
  },

  getForms: async () => {

    const addr = LocalStorageService.getCurrentUser();

    if (!addr) {
      console.log('Unknown User', addr);
      return;
    }

    return fetch(`http://localhost:5000/forms?owner=${addr}`)
    .then(async response => {
      return await response.json()
    });
  },

  getForm: async (id) => {

    const addr = LocalStorageService.getCurrentUser();

    if (!addr) {
      // TODO alert
      console.log('Unknown User', addr);
      return;
    }

    return fetch(`http://localhost:5000/forms/${id}?owner=${addr}`)
    .then(response => {
      if (response.status !== 200) {
        throw Error('Invalid Response');
      }
      return response.json();
    }).then(data => {
      return data;
    }).catch(err => {

    });

  },


  postForm: async (schema) => {

    const addr = LocalStorageService.getCurrentUser();

    if (!addr) {
      // TODO alert
      console.log('TOKEN UNDEFINED', addr);
      return;
    }

    return fetch('http://localhost:5000/forms', {
      method: 'post',
      body: JSON.stringify({
        owner: addr,
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
