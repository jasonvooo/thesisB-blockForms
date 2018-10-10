import web3 from 'services/web3';

export const userBlockFormsByteCode = '0x608060405234801561001057600080fd5b5060008054600160a060020a03191633179055610d63806100326000396000f30060806040526004361061006c5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416636ced0a9381146100715780636e36a5a0146100a65780637f831a8214610158578063cdd04d50146101a3578063d4999ac2146101d0575b600080fd5b34801561007d57600080fd5b506100a460048035600160a060020a0316906024803590810191013560443560ff166101fc565b005b3480156100b257600080fd5b506100d960048035600160a060020a0316906024803590810191013560443560ff1661041b565b6040518083815260200180602001828103825283818151815260200191508051906020019080838360005b8381101561011c578181015183820152602001610104565b50505050905090810190601f1680156101495780820380516001836020036101000a031916815260200191505b50935050505060405180910390f35b34801561016457600080fd5b5061018560048035600160a060020a031690602480359081019101356105c9565b60408051938452911515602084015282820152519081900360600190f35b3480156101af57600080fd5b506100a460048035600160a060020a03169060248035908101910135610747565b3480156101dc57600080fd5b506100a46024600480358281019290820135918135918201910135610942565b600054600160a060020a0316331461021357600080fd5b60018383604051808383808284379091019485525050604051928390036020019092205460ff16915050801561028b575060018383604051808383808284379190910194855250506040805160209481900385019020600160a060020a038916600090815260019091019094529092205460ff169150505b80156102e2575060018383604051808383808284379190910194855250506040805160209481900385019020600160a060020a0389166000908152600190910190945290922060020154610100900460ff16159150505b15156102ed57600080fd5b8060018484604051808383808284378201915050925050509081526020016040518091039020600101600086600160a060020a0316600160a060020a0316815260200190815260200160002060020160006101000a81548160ff0219169083600281111561035757fe5b02179055506001808484604051808383808284378201915050925050509081526020016040518091039020600101600086600160a060020a0316600160a060020a0316815260200190815260200160002060020160016101000a81548160ff0219169083151502179055504260018484604051808383808284378201915050925050509081526020016040518091039020600101600086600160a060020a0316600160a060020a031681526020019081526020016000206003018190555050505050565b6000606060018585604051808383808284379091019485525050604051928390036020019092205460ff16915050801561048e57506001858560405180838380828437919091019485525050604080516020948190038501902033600090815260019091019094529092205460ff169150505b151561049957600080fd5b60018585604051808383808284379091019485525050604080519384900360209081018520600160a060020a038c1660009081526001918201835283812060ff8b168252820190925291902054939092508891508790808383808284379190910194855250506040805160209481900385018120600160a060020a038d1660009081526001918201875283812060ff8c168252820187528390208101805460029281161561010002600019011691909104601f8101879004870283018701909352828252949093508492508301828280156105b55780601f1061058a576101008083540402835291602001916105b5565b820191906000526020600020905b81548152906001019060200180831161059857829003601f168201915b505050505090509150915094509492505050565b600080600060018585604051808383808284379091019485525050604051928390036020019092205460ff169150508015610646575060018585604051808383808284379190910194855250506040805160209481900385019020600160a060020a038b16600090815260019091019094529092205460ff169150505b151561065157600080fd5b60018585604051808383808284379190910194855250506040805160209481900385019020600160a060020a038b166000908152600190910190945290922060029081015460ff16925082111590506106a657fe5b60018686604051808383808284379091019485525050604080519384900360209081018520600160a060020a038d16600090815260019182019092529190206002015460ff6101009091041693909250899150889080838380828437909101948552505060408051938490036020908101909420600160a060020a03909c1660009081526001909c0190935250509097206003015490979095509350505050565b61074f610c6d565b600054600160a060020a0316331461076657600080fd5b60018383604051808383808284379091019485525050604051928390036020019092205460ff16151591506107d0905057600180848460405180838380828437909101948552505060405192839003602001909220805493151560ff199094169390931790925550505b60018383604051808383808284379091019485525050604051928390036020019092205460ff1615159150610806905057600080fd5b60018383604051808383808284379190910194855250506040805160209481900385019020600160a060020a038916600090815260019091019094529092205460ff16159150610857905057600080fd5b6040805160a081018252600181526000602082018190529091820190815260200160001515815260200160008152509050806001848460405180838380828437909101948552505060408051938490036020908101909420600160a060020a038a16600090815260019182018652829020865181549688015160ff166101000261ff001991151560ff199889161791909116178155918601516002808401805494979296509450921691849081111561090c57fe5b021790555060608201516002820180549115156101000261ff001990921691909117905560809091015160039091015550505050565b3384848080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050506001816040518082805190602001908083835b602083106109a85780518252601f199092019160209182019101610989565b51815160209384036101000a600019018019909216911617905292019485525060405193849003019092205460ff169150508015610a6357506001816040518082805190602001908083835b60208310610a135780518252601f1990920191602091820191016109f4565b51815160209384036101000a600019018019909216911617905292019485525060408051948590038201909420600160a060020a03871660009081526001909101909152929092205460ff169150505b8015610afe57506001816040518082805190602001908083835b60208310610a9c5780518252601f199092019160209182019101610a7d565b518151600019602094850361010090810a91909101918216911992909216179091529390910195865260408051968790038201909620600160a060020a0389166000908152600191909101909152949094206002015460ff9190041615925050505b1515610b0957600080fd5b604080519081016040528042815260200185858080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505081525060018787604051808383808284378201915050925050509081526020016040518091039020600101600033600160a060020a0316600160a060020a031681526020019081526020016000206001016000600189896040518083838082843791909101948552505060408051602094819003850190203360009081526001918201865282812054610100900460ff16875286860197909752940190942085518155858301518051919550610c0894860193019150610c9c565b50905050600186866040518083838082843790910194855250506040805193849003602090810190942033600090815260019182019095529320805460ff61010080830482169096011690940261ff0019909416939093179092555050505050505050565b6040805160a0810182526000808252602082018190529091820190815260006020820181905260409091015290565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610cdd57805160ff1916838001178555610d0a565b82800160010185558215610d0a579182015b82811115610d0a578251825591602001919060010190610cef565b50610d16929150610d1a565b5090565b610d3491905b80821115610d165760008155600101610d20565b905600a165627a7a72305820eccbf0f74239adfb2c68dbe5bd3336159de2f2fc352c6fc0e793f8e5ae2322bc0029';

// TODO UPDATE
export const userBlockFormsAbi = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "addr",
        "type": "address"
      },
      {
        "name": "formName",
        "type": "string"
      },
      {
        "name": "status",
        "type": "uint8"
      }
    ],
    "name": "actionResponse",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "responderAddress",
        "type": "address"
      },
      {
        "name": "formName",
        "type": "string"
      }
    ],
    "name": "addFormResponder",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "formName",
        "type": "string"
      },
      {
        "name": "hash",
        "type": "string"
      }
    ],
    "name": "addFormResponse",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "addr",
        "type": "address"
      },
      {
        "name": "formName",
        "type": "string"
      },
      {
        "name": "index",
        "type": "uint8"
      }
    ],
    "name": "checkResponse",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "addr",
        "type": "address"
      },
      {
        "name": "formName",
        "type": "string"
      }
    ],
    "name": "checkStatus",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "bool"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

export const userBlockFormsContract = (address) => {
  return new web3.eth.Contract(userBlockFormsAbi, address);
};

// export default new web3.eth.Contract(userBlockFormsAbi, address);