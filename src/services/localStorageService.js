export const LocalStorageService = {
  setSignedMessage: (message) => {
    localStorage.setItem('signedMessage', message);
  },

  getSignedMessage: () => {
    return localStorage.getItem('signedMessage') || null;
  },

  setUserName: (name) => {
    localStorage.setItem('userName', name);
  }
};
