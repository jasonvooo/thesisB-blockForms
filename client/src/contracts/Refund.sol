pragma solidity ^0.4.24;

contract FormCreatorContract {

    address private contractOwner;
    // Form will be identified by Name
    mapping (string => FormGroup) private _formResponses;

    // Constructor look over how secure this is
    constructor () public {
        contractOwner = msg.sender;
    }

    struct Allowed {
        bool active;
    }

    struct FormGroup {
        bool active;
        // Address to responses
        mapping (address => Responder) responderMappings;
    }

    enum ResponseStatus {PENDING,ACCEPTED,REJECTED}

    struct Responder {
        bool active;
        uint8 count;
        mapping (uint8 => FormResponse) responses;

        ResponseStatus status;
        bool statusSet;
        uint statusSetDate;
    }

    struct FormResponse {
        uint date;
        string responseHash;
    }

  // Need to allow depositing ether to the contract
    function() public payable {
    }

    modifier refundGasCostActive(string formName, address addr) {
        require(_formResponses[formName].active
            && _formResponses[formName].responderMappings[addr].active
            && _formResponses[formName].responderMappings[addr].statusSet == false
        );
        uint remainingGasStart = gasleft();

        _;

        uint remainingGasEnd = gasleft();
        uint usedGas = remainingGasStart - remainingGasEnd;
        // Add intrinsic gas and transfer gas. Need to account for gas stipend as well.
        usedGas += 21000 + 9700;
        // Possibly need to check max gasprice and usedGas here to limit possibility for abuse.
        uint gasCost = usedGas * tx.gasprice;
        // Refund gas cost
        tx.origin.transfer(gasCost);
    }

    modifier ownerOnly {
        require(contractOwner == msg.sender);
        _;
    }

    // Owner creates form
    function addFormResponder(address responderAddress, string formName) external ownerOnly {
        // Require form exists in mapping and responder has not been created before

        if (!_formResponses[formName].active) {
            _formResponses[formName].active = true;
        }

        require(_formResponses[formName].active);

        // Revert if they already exist
        require(_formResponses[formName].responderMappings[responderAddress].active == false);

        // Owner has to invite the responder to be able to complete form
        Responder memory responder = Responder({
          active: true,
          count: 0,
          status: ResponseStatus.PENDING,
          statusSet: false,
          statusSetDate: 0
        });

        _formResponses[formName].responderMappings[responderAddress] = responder;
    }

    // Adds response hash
    function addFormResponse(string formName, string hash) external refundGasCostActive(formName, msg.sender) {

        _formResponses[formName].responderMappings[msg.sender].responses[_formResponses[formName].responderMappings[msg.sender].count] = FormResponse({
            date: now,
            responseHash: hash
        });
        _formResponses[formName].responderMappings[msg.sender].count++;
    }

    // Actions response
    function actionResponse(address addr, string formName, ResponseStatus status) external ownerOnly {

        require(_formResponses[formName].active
            && _formResponses[formName].responderMappings[addr].active
            && _formResponses[formName].responderMappings[addr].statusSet == false
        );

        _formResponses[formName].responderMappings[addr].status = status;
        _formResponses[formName].responderMappings[addr].statusSet = true;
        _formResponses[formName].responderMappings[addr].statusSetDate = now;
    }

    // Get response Hash and date
    function checkResponse(address addr, string formName, uint8 index) external view returns (uint, string) {
        require(_formResponses[formName].active && _formResponses[formName].responderMappings[addr].active);

        return (
            _formResponses[formName].responderMappings[addr].responses[index].date,
            _formResponses[formName].responderMappings[addr].responses[index].responseHash
        );
    }

    // Get status of total response
    function checkStatus(address addr, string formName) external view returns (uint8, bool, uint) {
        require(_formResponses[formName].active && _formResponses[formName].responderMappings[addr].active);

        return (
            uint8(_formResponses[formName].responderMappings[addr].status),
            _formResponses[formName].responderMappings[addr].statusSet,
            _formResponses[formName].responderMappings[addr].statusSetDate
        );
    }

}