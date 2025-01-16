// SPDX-License-Identifier: MIT
pragma solidity >=0.7.5;
pragma experimental ABIEncoderV2;


contract UsersInfo {
    string constant root = 'https://drive.google.com/drive/folders/1Y34t5cw33JcUv37jLiNElymWkulOeo-k?usp=share_link';

    struct User {
        uint age;
        string gender;
        string hairLength;
        string LRHandedness;
        string[12] sessions;
        string data_path;
    }
    
    mapping(string => User) private users;

    constructor() {
        users["1348773b"] = User(21, "m", "short", "R", ["S001", "S002", "S003", "0", "0", "0", "0", "0", "0", "0", "0", "0"], "https://drive.google.com/drive/u/0/folders/1okzMTxbs374l0F5b6t1Bsopzgm6QgwrL");
        users["6808dfab"] = User(25, "m", "very short", "R", ["S001", "S002", "S003", "0", "0", "0", "0", "0", "0", "0", "0", "0"], "https://drive.google.com/drive/u/0/folders/1okzMTxbs374l0F5b6t1Bsopzgm6QgwrL");
        users["0717b399"] = User(23, "m", "very short", "R", ["S001", "S002", "S003", "S004", "S005", "S006", "S007", "S008", "S009", "S010", "S011", "S012"], "https://drive.google.com/drive/u/0/folders/1okzMTxbs374l0F5b6t1Bsopzgm6QgwrL");
        users["a9223e93"] = User(23, "m", "short", "L", ["S001", "S002", "S003", "S004", "S005", "S006", "0", "0", "0", "0", "0", "0"], "https://drive.google.com/drive/u/0/folders/1okzMTxbs374l0F5b6t1Bsopzgm6QgwrL");
        users["cb383bfd"] = User(21, "m", "short", "R", ["S001", "S002", "S003", "S004", "0", "0", "0", "0", "0", "0", "0", "0"], "https://drive.google.com/drive/u/0/folders/1okzMTxbs374l0F5b6t1Bsopzgm6QgwrL");
        users["859cd943"] = User(21, "m", "short", "R", ["S001", "S002", "S003", "S004", "S005", "S006", "0", "0", "0", "0", "0", "0"], "https://drive.google.com/drive/u/0/folders/1okzMTxbs374l0F5b6t1Bsopzgm6QgwrL");
        users["dd84b405"] = User(23, "m", "short", "R", ["S001", "S002", "S003", "S004", "S005", "0", "0", "0", "0", "0", "0", "0"], "https://drive.google.com/drive/u/0/folders/1okzMTxbs374l0F5b6t1Bsopzgm6QgwrL");
        users["927ae543"] = User(22, "m", "short", "L", ["S001", "S002", "S003", "S004", "0", "0", "0", "0", "0", "0", "0", "0"], "https://drive.google.com/drive/u/0/folders/1okzMTxbs374l0F5b6t1Bsopzgm6QgwrL");
        users["4bc2006e"] = User(22, "m", "short", "R", ["S001", "S002", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], "https://drive.google.com/drive/u/0/folders/1okzMTxbs374l0F5b6t1Bsopzgm6QgwrL");
        users["4e7cac2d"] = User(23, "m", "short", "R", ["S001", "S002", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], "https://drive.google.com/drive/u/0/folders/1okzMTxbs374l0F5b6t1Bsopzgm6QgwrL");
        users["1cfd7bfa"] = User(38, "m", "short", "R", ["S001", "S002", "S003", "S004", "0", "0", "0", "0", "0", "0", "0", "0"], "https://drive.google.com/drive/u/0/folders/1okzMTxbs374l0F5b6t1Bsopzgm6QgwrL");
        users["8c70c0d3"] = User(21, "m", "short", "R", ["S001", "S002", "S003", "S004", "S005", "S006", "0", "0", "0", "0", "0", "0"], "https://drive.google.com/drive/u/0/folders/1okzMTxbs374l0F5b6t1Bsopzgm6QgwrL");
        users["771c0af6"] = User(28, "f", "long", "R", ["S001", "S002", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], "https://drive.google.com/drive/u/0/folders/1okzMTxbs374l0F5b6t1Bsopzgm6QgwrL");
    }
    
    function getUser(string memory _participantId) public view returns (uint, string memory, string memory, string memory, string[12] memory) {
        User storage user = users[_participantId];
        return (user.age, user.gender, user.hairLength, user.LRHandedness, user.sessions);
    }

    function getData(string memory _participantId) public view returns (string memory) {
        User storage user = users[_participantId];
        return (user.data_path);
    }

    function getRoot() public pure returns (string memory) {
        return root;
    }


}
