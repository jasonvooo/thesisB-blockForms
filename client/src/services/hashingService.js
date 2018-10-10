import CryptoJS from 'crypto-js';
import { LocalStorageService } from './localStorageService';

export const HashingService = {


  getHash: (data) => {
    return CryptoJS.HmacSHA256(JSON.stringify(data), LocalStorageService.getCurrentUser()).toString();
  },

  confirmEqual: () => {

  }

};