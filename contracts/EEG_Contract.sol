// SPDX-License-Identifier: MIT

pragma solidity >=0.7.3;

contract EEG_Contract {
    struct SubjectData {
        string personalData;
        string eegData;
    }

    mapping(address => bool) public projectAdmins;
    mapping(address => bool) public researchers;
    mapping(address => SubjectData) public subjects;

    modifier onlyProjectAdmin() {
        require(ProjectAdmins[msg.sender], "Only super admins can call this function.");
        _;
    }

    modifier onlyResearcher() {
        require(researchers[msg.sender], "Only researchers can call this function.");
        _;
    }

    modifier onlySubject(address subjectAddress) {
        require(msg.sender == subjectAddress, "Only the subject can call this function.");
        _;
    }

    function addProjectAdmin(address adminAddress) public onlyProjectAdmin {
        projectAdmins[adminAddress] = true;
    }

    function removeProjectAdmin(address adminAddress) public onlyProjectAdmin {
        projectAdmins[adminAddress] = false;
    }

    function addResearcher(address researcherAddress) public onlyProjectAdmin {
        researchers[researcherAddress] = true;
    }

    function removeResearcher(address researcherAddress) public onlyProjectAdmin {
        researchers[researcherAddress] = false;
    }

    function storeSubjectData(address subjectAddress, string memory personalData, string memory eegData) public onlyProjectAdmin {
        subjects[subjectAddress] = SubjectData(personalData, eegData);
    }

    function getPersonalData(address subjectAddress) public view onlySubject(subjectAddress) returns (string memory) {
        return subjects[subjectAddress].personalData;
    }

    function getEEGData(address subjectAddress) public view onlyResearcher returns (string memory) {
        return subjects[subjectAddress].eegData;
    }

    function getFullData(address subjectAddress) public view onlyProjectAdmin returns (string memory personalData, string memory eegData) {
        return (subjects[subjectAddress].personalData, subjects[subjectAddress].eegData);
    }
}
