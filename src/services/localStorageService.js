import { web3 } from 'services';

export const LocalStorageService = {
  // setSignedMessage: (message) => {
  //   localStorage.setItem('signedMessage', message);
  // },

  getSignedMessage: () => {
    return localStorage.getItem('signedMessage') || null;
  },

  setUserName: (name) => {
    localStorage.setItem('userName', name);
  },

  loadCurrentUser: async () => {
    const accounts = await web3.eth.getAccounts();

    if (!accounts) {
      console.error('Invalid Accounts');
    }

    localStorage.setItem('currentUser', accounts[0]);
  },

  getCurrentUser: () => {
    const currentUser = localStorage.getItem('currentUser');

    if (!currentUser) {
      LocalStorageService.loadCurrentUser();
      window.location.reload();
    }

    return currentUser || null;
  },

  isLoggedIn: () => {
    return localStorage.getItem('userName') != null;
  },

  clear: () => {
    localStorage.clear();
  }
};
