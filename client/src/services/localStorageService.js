import { web3 } from 'services';

export const LocalStorageService = {

  setCurrentUserData: (data) => {
    localStorage.setItem('userName', data.name);
    localStorage.setItem('userContract', data.contractAddress);
  },

  getUserContractAddress: () => {
    return localStorage.getItem('userContract');
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

  isResponder: () => {
    return localStorage.getItem('userContract') == null;
  },


  clear: () => {
    localStorage.clear();
  }
};
