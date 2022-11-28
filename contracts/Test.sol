// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract Test {
    struct User {
        address userAddress;
        uint64 userId;
    }

    struct Game {
        uint64 gameId;
        uint64 startAt;
        uint64 finishAt;
        uint256 prize;
        uint256 joinFee;
        uint256 joinFeeAmount;
        uint256 betFee;
        uint256 betFeeAmount; //베팅 단위
        GameStatus gameStatus;
        bool winner;
        //bet betList[];                                              //추가
        //player playerList[10];                                      //
    }

    struct bet {
        //
        address userAddress;
        bool team;
        uint64 betAmount;
    }

    struct player {
        //
        address playerAddress;
        bool team;
    }

    enum GameStatus {
        Open,
        Settled,
        OnAir,
        Closed
    }

    uint cut = 0; //수수료

    event Registration(address eos, uint256 _gameId);
    event MakeGame(uint256 _gameId, uint256 _startAt, uint256 _finishAt);
    event StartGame(uint256 _gameId);
    event CancelGame(uint256 _gameId);
    event CloseJoin(uint256 _gameId);
    event FinishGame(uint256 _gameId);

    mapping(uint64 => address) gameMaker;
    //0 ~ 4 : 1 team, 5 ~ 9 : 2 team
    mapping(uint64 => address[10]) gamePlayer;
    mapping(uint64 => address[]) gameBettor;
    //mapping (uint64 => address[]) gameBettor;
    //mapping (uint64 => gameBettor[]) betTeam;
    mapping(uint64 => address[]) betTeam1;
    mapping(uint64 => address[]) betTeam2;
    //mapping (address => uint64[]) betOption;
    //mapping (uint64 => mapping(uint64 => address[])) gameBettor;
    mapping(uint64 => Game) gameList; //존재하는 게임

    User[] users;
    Game[] games; //모든 게임

    modifier gameOpen(uint256 _gameId) {
        require(gameList[uint64(_gameId)].gameStatus == GameStatus.Open);
        _;
    }
    modifier gameSettled(uint256 _gameId) {
        require(gameList[uint64(_gameId)].gameStatus == GameStatus.Settled);
        _;
    }
    modifier gameOnAir(uint256 _gameId) {
        require(gameList[uint64(_gameId)].gameStatus == GameStatus.OnAir);
        _;
    }
    modifier gameClosed(uint256 _gameId) {
        require(gameList[uint64(_gameId)].gameStatus == GameStatus.Closed);
        _;
    }

    modifier isMaker(uint256 gameId) {
        require(msg.sender == gameMaker[uint64(gameId)]);
        _;
    }

    modifier isPlayer(uint256 gameId) {
        bool inPlayer = false;

        for (uint i = 0; i < 10; i++) {
            if (msg.sender == gamePlayer[uint64(gameId)][i]) {
                inPlayer = true;
            }
        }
        require(inPlayer);
        _;
    }

    modifier isMember() {
        require(searchUser(msg.sender));
        _;
    }

    modifier canBetting(uint256 gameId) {
        require(msg.sender != gameMaker[uint64(gameId)]);
        require(searchPlayerIndex(msg.sender, gameId) > 10);
        _;
    }

    function registration(uint256 _userId) public {
        require(_userId == uint256(uint64(_userId)));

        User memory _user = User({
            userAddress: msg.sender,
            userId: uint64(_userId)
        });
        users.push(_user); //만약 탈퇴기능을 만든다면 .. push 수정
        emit Registration(msg.sender, _userId);
    }

    function makeGame(
        uint256 _gameId,
        uint256 _startAt,
        uint256 _finishAt,
        uint _joinFeeAmount,
        uint _betFeeAmount
    ) public payable isMember {
        require(_gameId == uint256(uint64(_gameId)));
        require(_startAt == uint256(uint64(_startAt)));
        require(_finishAt == uint256(uint64(_finishAt)));

        Game memory _game = Game({
            gameId: uint64(_gameId),
            startAt: uint64(_startAt), //게임 첫 제작땐 0을 값으로 설정하는것은?
            finishAt: uint64(_finishAt),
            prize: msg.value,
            joinFeeAmount: _joinFeeAmount, //참가비 설정
            joinFee: 0,
            betFee: 0,
            betFeeAmount: _betFeeAmount,
            gameStatus: GameStatus.Open,
            winner: false
        });

        games.push(_game); //이 게임은 존재했던 모든 게임리스트 (게임 전적 검색에 활용 가능?)
        gameList[uint64(_gameId)] = _game; //이 게임은 현재 존재하는 게임리스트로?(참가 ~ 경기중 까지만, 게임이 끝나면 삭제)
        gameMaker[uint64(_gameId)] = msg.sender;
        emit MakeGame(_gameId, _startAt, _finishAt);
    }

    //penalty
    function cancelGame(
        uint256 _gameId
    ) public isMaker(_gameId) gameOpen(_gameId) {
        uint _prize = calcCut(gameList[uint64(_gameId)].prize);
        gameList[uint64(_gameId)].prize = 0;

        uint _joinFeeAmount = calcCut(gameList[uint64(_gameId)].joinFeeAmount);
        gameList[uint64(_gameId)].joinFee = 0;
        gameList[uint64(_gameId)].joinFeeAmount = 0;

        payable(msg.sender).transfer(_prize);
        for (uint i = 0; i < 10; i++) {
            if (gamePlayer[uint64(_gameId)][i] != address(0))
                payable(gamePlayer[uint64(_gameId)][i]).transfer(
                    _joinFeeAmount
                );
        }
        // bettor에게 수수료 제외한 betFee 돌려주기
        uint _betFeeAmount = calcCut(gameList[uint64(_gameId)].betFeeAmount);
        for (uint i = 0; i < betTeam1[uint64(_gameId)].length; i++) {
            //만약 push를 쓴다고 하면 반대로 length는 쓰면 안됨
            if (betTeam1[uint64(_gameId)][i] != address(0))
                payable(betTeam1[uint64(_gameId)][i]).transfer(_betFeeAmount);
        }
        for (uint i = 0; i < betTeam2[uint64(_gameId)].length; i++) {
            //
            if (betTeam1[uint64(_gameId)][i] != address(0))
                payable(betTeam2[uint64(_gameId)][i]).transfer(_betFeeAmount);
        }

        delete gameMaker[uint64(_gameId)];
        delete gamePlayer[uint64(_gameId)];
        delete gameBettor[uint64(_gameId)];
        delete gameList[uint64(_gameId)];
        delete betTeam1[uint64(_gameId)];
        delete betTeam2[uint64(_gameId)];
        //참가비 돌려주기
        //베팅금액 돌려주기
    }

    function joinGame(
        uint256 _gameId,
        bool team
    ) public payable gameOpen(_gameId) isMember {
        require(searchPlayerIndex(msg.sender, _gameId) > 5); //중복참여 방지
        require(msg.value == gameList[uint64(_gameId)].joinFeeAmount);

        _joinGame(_gameId, msg.sender, team);
        gameList[uint64(_gameId)].joinFee += msg.value;
    }

    function _joinGame(uint256 _gameId, address user, bool team) private {
        for (uint i = (team ? 5 : 0); i < (team ? 10 : 5); i++) {
            if (gamePlayer[uint64(_gameId)][i] == address(0)) {
                gamePlayer[uint64(_gameId)][i] = user;
                break;
            }
        }
    }

    //penalty
    function exitGame(
        uint256 _gameId
    ) public isPlayer(_gameId) gameOpen(_gameId) {
        uint playerIndex = searchPlayerIndex(msg.sender, uint64(_gameId));
        uint returnFee = calcCut(gameList[uint64(_gameId)].joinFeeAmount);

        payable(msg.sender).transfer(returnFee);
        //참가비 돌려주기

        gameList[uint64(_gameId)].joinFeeAmount -= returnFee;
        gamePlayer[uint64(_gameId)][playerIndex] = address(0);
    }

    function betting(
        uint256 _gameId,
        bool team,
        uint n
    ) public payable canBetting(_gameId) gameSettled(_gameId) isMember {
        require(msg.value == gameList[uint64(_gameId)].betFeeAmount * n);
        gameBettor[uint64(_gameId)].push(msg.sender); //push로 하면 매핑 중간에 빵꾸난거 매울 수가 없어서 수정해야할듯?
        if (team) {
            for (uint i = 0; i < n; i++) {
                betTeam1[uint64(_gameId)].push(msg.sender); //
            }
        } else {
            for (uint i = 0; i < n; i++) {
                betTeam2[uint64(_gameId)].push(msg.sender); //
            }
        }
        gameList[uint64(_gameId)].betFee += msg.value;
        //베팅 추가
    }

    function exitBetting(
        uint256 _gameId
    ) public canBetting(_gameId) gameSettled(_gameId) isMember {
        uint bettorIndex = searchBettorIndex(msg.sender, uint64(_gameId));
        uint returnbetFee = calcCut(gameList[uint64(_gameId)].betFee); //betTeam1,2 삭제도 추가해야함

        payable(msg.sender).transfer(returnbetFee);

        gameList[uint64(_gameId)].betFee -= returnbetFee;
        //gamePlayer[uint64(_gameId)][bettorIndex] = address(0);            //
        gameBettor[uint64(_gameId)][bettorIndex] = address(0);
    }

    function closeJoin(
        uint256 _gameId
    ) public isMaker(_gameId) gameOpen(_gameId) {
        //참가자 10명이 채워져야 종료가능
        require(searchPlayerNumber(_gameId) == 10);
        gameList[uint64(_gameId)].gameStatus = GameStatus.Settled;
        emit CloseJoin(_gameId);
    }

    function startGame(
        uint256 _gameId
    ) public isMaker(_gameId) gameSettled(_gameId) {
        gameList[uint64(_gameId)].startAt = uint64(block.timestamp);
        gameList[uint64(_gameId)].gameStatus = GameStatus.OnAir;
        emit StartGame(_gameId);
        //이벤트 실행
    }

    function finishGame(
        uint256 _gameId
    ) public isMaker(_gameId) gameOnAir(_gameId) {
        gameList[uint64(_gameId)].finishAt = uint64(block.timestamp);
        gameList[uint64(_gameId)].gameStatus = GameStatus.Closed;
        //gameList[uint64(_gameId)].winner = whoIsWinner();

        givePrize(_gameId);
        giveBet(_gameId);
        emit FinishGame(_gameId);
        //상금 전달
        //베팅금액 전달
        //이긴 팀 결정
    }

    function givePrize(uint256 _gameId) private {
        uint i = 0;
        bool winner = gameList[uint64(_gameId)].winner;
        uint totalPrize = calcCut(address(this).balance);

        gameList[uint64(_gameId)].joinFee = 0;
        gameList[uint64(_gameId)].prize = 0;

        for (i = (winner ? 5 : 0); i < (winner ? 10 : 5); i++) {
            payable(gamePlayer[uint64(_gameId)][i]).transfer(totalPrize / 5); //ether에서는 소수점지원X, 소수점 안나오게 해야함, 단위를 확실히 해야할듯
        }
    }

    function giveBet(uint _gameId) private {
        //uint64 winner = games[_gameId].winner ? 1 : 0;
        uint numberOfWinner = 0;
        if (gameList[uint64(_gameId)].winner) {
            numberOfWinner = betTeam1[uint64(_gameId)].length; //length
        } else {
            numberOfWinner = betTeam2[uint64(_gameId)].length;
        }
        uint perBetFee = gameList[uint64(_gameId)].betFee / numberOfWinner; //베팅금액 전달할때 베팅금이 모두 똑같은 금액으로 설정되어있음
        gameList[uint64(_gameId)].betFee = 0; //각자 건 비율만큼 받아야함
        //소수점 또 안나오게 고려해야할
        if (gameList[uint64(_gameId)].winner) {
            for (uint i = 0; i < numberOfWinner; i++) {
                payable(betTeam1[/*winner*/ uint64(_gameId)][i]).transfer(
                    perBetFee
                );
            }
        } else {
            for (uint i = 0; i < numberOfWinner; i++) {
                payable(betTeam2[/*winner*/ uint64(_gameId)][i]).transfer(
                    perBetFee
                );
            }
        }
    }

    //function calcBetRatio(){

    //}
    function calcCut(uint _fee) private view returns (uint) {
        return _fee - cut;
    }

    function searchPlayerIndex(
        address player,
        uint256 _gameId
    ) private view returns (uint) {
        for (uint i = 0; i < 10; i++) {
            if (player == gamePlayer[uint64(_gameId)][i]) {
                return i;
            }
        }
        return 100; //검색 실패
    }

    function searchBettorIndex(
        address bettor,
        uint256 _gameId
    ) private view returns (uint) {
        for (uint i = 0; i < gameBettor[uint64(_gameId)].length; i++) {
            if (bettor == gameBettor[uint64(_gameId)][i]) {
                return i;
            }
        }
        return 100; //검색 실패
    }

    function searchUser(address user) private view returns (bool) {
        for (uint i = 0; i < users.length; i++) {
            if (user == users[i].userAddress) {
                return true;
            }
        }
        return false;
    }

    function searchPlayerNumber(uint256 _gameId) private view returns (uint) {
        uint num = 0;
        for (uint i = 0; i < 10; i++) {
            if (gamePlayer[uint64(_gameId)][i] != address(0)) {
                num += 1;
            }
        }
        return num;
    }

    // join 가능한 게임 조회
    function joinableGame() public view returns (Game[] memory) {
        Game[] memory _joinable = new Game[](games.length);
        uint currentIndex = 0;

        for (uint i = 0; i < games.length; i++) {
            if (games[i].gameStatus == GameStatus.Open) {
                Game memory currentItem = games[i];
                _joinable[currentIndex] = currentItem;
                currentIndex++;
            }
        }
        return _joinable;
    }

    // betting 가능한 게임 조회
    function bettableGame() public view returns (Game[] memory) {
        Game[] memory _bettable = new Game[](games.length);
        uint currentIndex = 0;

        for (uint i = 0; i < games.length; i++) {
            if (games[i].gameStatus == GameStatus.Settled) {
                Game memory currentItem = games[i];
                _bettable[currentIndex] = currentItem;
                currentIndex++;
            }
        }
        return _bettable;
    }

    //function whoIsWinner(){
    //나도몰라
    //}
}
