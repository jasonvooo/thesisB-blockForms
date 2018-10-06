pragma solidity ^0.4.24;

contract FormCreatorContract {

    address private contractOwner;
    // Global Access for all responses for this form creator
    mapping (address => Allowed) private _globalAccess;
    // Form will be identified by Name, camelCased
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
        // FUTURE
        mapping (address => Allowed) formAccess;
        // Address to responses
        mapping (address => Responder) responderMappings;
    }

    struct Responder {
        bool active;
        uint count;
        // Manages Access Controls
        mapping (address => Allowed) responseAccess;
        mapping (uint => FormResponse) responses;
    }

    struct FormResponse {
        uint date;
        string responseHash;
    }

    modifier ownerOnly {
        require(contractOwner == msg.sender);
        _;
    }

    modifier checkAccessRights(address responder, string formName) {
        require(contractOwner == msg.sender
            || responder == msg.sender
            || _globalAccess[msg.sender].active
            || _formResponses[formName].formAccess[msg.sender].active
            || _formResponses[formName].responderMappings[responder].responseAccess[msg.sender].active
        );
        _;
    }


    // Owner creates form
    function addFormResponder(address responderAddress, string formName) external ownerOnly {
        // Require form exists in mapping and responder has not been created before

        if (!_formResponses[formName].active) {
            _formResponses[formName].active = true;
        }

        require(_formResponses[formName].active);

        // TODO revert if they already exist

        // Owner has to invite the responder to be able to complete form
        Responder memory responder = Responder({
          active: true,
          count: 0
        });

        _formResponses[formName].responderMappings[responderAddress] = responder;
    }

    // Adds response hash
    function addFormResponse(string formName, string hash) external returns (uint) {
        // Require form is valid and responder has been invited
        require(_formResponses[formName].active && _formResponses[formName].responderMappings[msg.sender].active);

        _formResponses[formName].responderMappings[msg.sender].count++;
        _formResponses[formName].responderMappings[msg.sender].responses[_formResponses[formName].responderMappings[msg.sender].count] = FormResponse({
            date: now,
            responseHash: hash
        });

        return now;
    }

    function checkResponse(address addr, string formName, uint index) external view checkAccessRights(addr, formName) returns (uint, string) {
        require(_formResponses[formName].active && _formResponses[formName].responderMappings[msg.sender].active);
        // Do check on permission of msg.sender

        return (
            _formResponses[formName].responderMappings[addr].responses[index].date,
            _formResponses[formName].responderMappings[addr].responses[index].responseHash
        );
    }

    function addGlobalAccess(address addr) external ownerOnly {
        _globalAccess[addr].active = true;
    }

    function revokeGlobalAccess(address addr)external ownerOnly {
        _globalAccess[addr].active = false;
    }

    function addFormLevelAccess(address addr, string formName) external ownerOnly {
        require(_formResponses[formName].active && _formResponses[formName].formAccess[addr].active);
        _formResponses[formName].formAccess[addr].active = true;
    }

    function revokeFormLevelAccess(address addr, string formName) external ownerOnly {
        require(_formResponses[formName].active && _formResponses[formName].formAccess[addr].active && _formResponses[formName].formAccess[addr].active);
        _formResponses[formName].formAccess[addr].active = false;
    }

    // TODO need to consider case if party removes access to it
    function addResponseAccess(address addr, string formName) external {
        require(contractOwner == msg.sender || addr == msg.sender);
        _formResponses[formName].responderMappings[addr].responseAccess[addr].active = true;
    }

    function revokeResponseAccess(address addr, string formName) external {
        require(contractOwner == msg.sender || addr == msg.sender);
        _formResponses[formName].responderMappings[addr].responseAccess[addr].active = false;
    }
}