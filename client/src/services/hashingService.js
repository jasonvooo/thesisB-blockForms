import CryptoJS from 'crypto-js';

export const HashingService = {


  getHash: (data, password) => {
    return CryptoJS.HmacSHA256(JSON.stringify(data), '123').toString();
  },

  confirmEqual: () => {

  }

};