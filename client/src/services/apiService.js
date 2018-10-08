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
      LocalStorageService.setCurrentUserData(data);
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

  getForms: async (responder) => {

    const addr = LocalStorageService.getCurrentUser();

    if (!addr) {
      console.log('Unknown User', addr);
      return;
    }

    const query = responder ? 'responder' : 'owner';

    return fetch(`http://localhost:5000/forms?${query}=${addr}`)
    .then(async response => {
      if (response.status !== 200) {
        throw Error('Invalid Response');
      }
      return response.json();
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
        schema,
        name: schema.schema.title,
        test: false
      })
    })
    .then(response => {
      if (response.status !== 201) {
        throw Error('Invalid Response');
      }
      return response.json();
    }).catch(err => {

    });

  },

  addResponderForm: async (formId, payload) => {

    return fetch(`http://localhost:5000/forms/${formId}/responder`, {
      method: 'post',
      body: JSON.stringify({
        responderAddress: payload.address,
        responderEmail: payload.email
      })
    })
    .then(response => {
      if (response.status !== 200) {
        throw Error('Invalid Response');
      }
      return response.json();
    }).catch(err => {

    });

  },

  addResponseForm: async (formId, payload) => {

    const addr = LocalStorageService.getCurrentUser();

    if (!addr) {
      // TODO alert
      console.log('TOKEN UNDEFINED', addr);
      return;
    }

    return fetch(`http://localhost:5000/forms/${formId}/responder/${addr}/response`, {
      method: 'post',
      body: JSON.stringify(payload)
    })
    .then(response => {
      if (response.status !== 200) {
        throw Error('Invalid Response');
      }
      return response.json();
    }).catch(err => {

    });

  },

  actionResponseForm: async (formId, responderAddress, action) => {

    const addr = LocalStorageService.getCurrentUser();

    if (!addr) {
      // TODO alert
      console.log('TOKEN UNDEFINED', addr);
      return;
    }

    return fetch(`http://localhost:5000/forms/${formId}/responder/${responderAddress}/response/${action}`, {
      method: 'post'
    })
    .then(response => {
      if (response.status !== 200) {
        throw Error('Invalid Response');
      }
      return response.json();
    }).catch(err => {

    });

  },
};
