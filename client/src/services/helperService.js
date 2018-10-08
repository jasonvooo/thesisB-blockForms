import web3 from './web3';

export const HelperService = {
  // TODO give user option to download
  download: (content, fileName, contentType) => {
    var a = document.createElement('a');
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  },

  // https://medium.com/pixelpoint/track-blockchain-transactions-like-a-boss-with-web3-js-c149045ca9bf
  getConfirmations: async (txHash) => {
    try {

      // Get transaction details
      const trx = await web3.eth.getTransaction(txHash);

      // Get current block number
      const currentBlock = await web3.eth.getBlockNumber();

      // When transaction is unconfirmed, its block number is null.
      // In this case we return 0 as number of confirmations
      return (trx && trx.blockNumber) ? currentBlock - trx.blockNumber: 0;
    }
    catch (error) {
      console.log(error);
    }
  },

  confirmedTransaction: async (txHash, confirmations = 10) => {

    // Get current number of confirmations and compare it with sought-for value
    const trxConfirmations = await HelperService.getConfirmations(txHash);
    console.log('Transaction with hash ' + txHash + ' has ' + trxConfirmations + ' confirmation(s)');

    if (trxConfirmations >= confirmations) {
      // Handle confirmation event according to your business logic
      console.log('Transaction with hash ' + txHash + ' has been successfully confirmed');

      return true;
    }

    return false;
  }

};