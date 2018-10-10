//using the infura.io node, otherwise ipfs requires you to run a daemon on your own computer/server. See IPFS.io docs
const IPFS = require('nano-ipfs-store');
const ipfs = IPFS.at("https://ipfs.infura.io:5001");

export default ipfs; 
