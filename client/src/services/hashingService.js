import CryptoJS from 'crypto-js';
import { LocalStorageService } from './localStorageService';

export const HashingService = {


  getHash: (data, responderAddress) => {
    return CryptoJS.HmacSHA256(JSON.stringify(data), responderAddress || LocalStorageService.getCurrentUser()).toString();
  },

  confirmEqual: () => {

  }

};