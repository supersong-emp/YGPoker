function IsMobile()
{
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

let OnClickLeave = (game) => {

    game.socket.emit('CM_LeaveGame');

    soundClick.play();
}

let OnClickGameReady = (game) => {

    game.listButtons[0].bEnable = false;

    game.socket.emit('CM_StartGame');

    soundClick.play();
}

let OnClickGameStart = (game) => {

    game.listButtons[0].bEnable = false;

    game.socket.emit('CM_StartGame');

    soundClick.play();
}

let OnClickSettingOnGame = (game) => {
    
}

let OnClickLocation1 = (game) => {

    game.socket.emit('CM_SelectLocation', 0);

    soundClick.play();
}

let OnClickLocation2 = (game) => {
    
    game.socket.emit('CM_SelectLocation', 1);

    soundClick.play();
}

let OnClickLocation3 = (game) => {
    
    game.socket.emit('CM_SelectLocation', 2);

    soundClick.play();
}

let OnClickLocation4 = (game) => {
    
    game.socket.emit('CM_SelectLocation', 3);

    soundClick.play();
}

let OnClickLocation5 = (game) => {
    
    game.socket.emit('CM_SelectLocation', 4);

    soundClick.play();
}

let OnClickLocation6 = (game) => {
    
    game.socket.emit('CM_SelectLocation', 5);

    soundClick.play();
}

let OnClickLocation7 = (game) => {
    
    game.socket.emit('CM_SelectLocation', 6);

    soundClick.play();
}

let OnClickLocation8 = (game) => {
    
    game.socket.emit('CM_SelectLocation', 7);

    soundClick.play();
}

let OnClickLocation9 = (game) => {
    
    game.socket.emit('CM_SelectLocation', 8);

    soundClick.play();
}
let OnClickSingle = (game) => {

    game.GetMadeButton('single');
    soundClick.play();
}
let OnClickPair = (game) => {

    game.GetMadeButton('pair');
    soundClick.play();
}
let OnClickTriple = (game) => {

    game.GetMadeButton('triple');
    soundClick.play();
}
let OnClickStraight = (game) => {

    game.GetMadeButton('straight');
    soundClick.play();
}
let OnClickFlush = (game) => {

    game.GetMadeButton('flush');
    soundClick.play();
}
let OnClickFullhouse = (game) => {

    game.GetMadeButton('fullHouse');
    soundClick.play();
}
let OnClickFourcard = (game) => {

    game.GetMadeButton('fourOfAKind');
    soundClick.play();
}
let OnClickStraightFlush = (game) => {

    game.GetMadeButton('straightFlush');
    soundClick.play();
}

//  Betting
let OnClickPass = (game) => {

    let player = game.FindUser(game.socket.strID);
    if ( null != game.kMainUser )
    {
        game.kMainUser.listSelectCard = [];

        for ( let i in game.kMainUser.listHandCard )
        {
            game.kMainUser.listHandCard[i].select = false;
        }
    }
    
    if ( null != player )
    {
        let list = [];

        let objectBetting = {strBetting:'Pass', list:list };
        game.socket.emit('CM_Submit', objectBetting);
        game.bEnableBetting = false;
        game.kMainUser.bTrunStart = false;
    }
    soundClick.play();
}

let OnClickSubmit = (game) => {

    let player = game.FindUser(game.socket.strID);

    let list = [];
    

    if ( null != game.kMainUser )
    {
        if(game.kMainUser.bCanPlay == true && game.bSubmit == true)
        {
            game.kMainUser.bCanPlay = false;
            game.bSubmit = false;
            game.iPasscount = 0;
            game.kMainUser.listSelectCard = [];
            //game.listTableCard = [];
            for ( let i = 0; i < game.kMainUser.listHandCard.length; i++ )
            {
                if ( true == game.kMainUser.listHandCard[i].select )
                {
                    //game.kMainUser.listHandCard[i].select = false;
                    list.push(game.kMainUser.listHandCard[i]);
                    //game.listTableCard.push(game.kMainUser.listHandCard[i].index);
                    game.kMainUser.listHandCard.splice(i, 1);
                    i--; // 요소를 제거했으므로, 인덱스를 하나 감소시켜야 함
                }
            }
            if ( null != player )
            {
                let objectBetting = {strBetting:'Submit', list:list};
                game.socket.emit('CM_Submit', objectBetting);
                game.bEnableBetting = false;
                game.kMainUser.bTrunStart = false;
            }
            soundClick.play();
        }
    }
    
    
}

let OnClickSortNum = (game) => {

    //console.log("OnClickSortNumOnClickSortNumOnClickSortNum");
    if ( null != game.kMainUser )
    {
        game.kMainUser.listSelectCard = [];
        for (let i in game.kMainUser.listHandCard) {
            game.kMainUser.listHandCard[i].select = false;
        }
        game.kMainUser.listHandCard.sort((a, b) => {
            // 예외 처리: 2카드는 가장 나중에 정렬
            if (a.num === 1) return 1;
            if (b.num === 1) return -1;
            if (a.num === 0) return 1;
            if (b.num === 0) return -1;
            // 숫자가 같은 경우 문양별로 정렬
            if (a.num === b.num) {
            const suitPriority = {0:3, 1:2, 2:1, 3:0}; // 다이아, 클로버, 하트, 스페이드 순으로 우선순위 부여
            return suitPriority[a.suit] - suitPriority[b.suit];
        }
            // 그 외에는 숫자대로 정렬
            return a.num - b.num;
        });
        console.log(game.kMainUser.listHandCard);
    }
    game.bSortNum = true;
    soundClick.play();
}

let OnClickSortSuit = (game) => {

    //console.log("OnClickSortSuitOnClickSortSuitOnClickSortSuit");
    if ( null != game.kMainUser )
    {
        game.kMainUser.listSelectCard = [];
        for (let i in game.kMainUser.listHandCard) {
            game.kMainUser.listHandCard[i].select = false;
        }
        game.kMainUser.listHandCard.sort((a, b) => {
            const suitPriority = {0:3, 1:2, 2:1, 3:0}; // 다이아, 클로버, 하트, 스페이드 순으로 우선순위 부여
            if (a.suit == b.suit) { // 문양이 같은 경우 숫자로 정렬된 상태이므로 그대로 반환

                if (a.num === 1) return 1;
                if (b.num === 1) return -1;
                if (a.num === 0) return 1;
                if (b.num === 0) return -1;
                
                return a.num - b.num; // 같은 문양에서는 숫자로 오름차순 정렬
            }
            return suitPriority[a.suit] - suitPriority[b.suit]; // 우선순위에 따라 정렬
        });
        console.log(game.kMainUser.listHandCard);
    }
    game.bSortNum = false;

    soundClick.play();
}

let OnClickTips= (game) => {

    if ( null != game.kMainUser )
    {
        game.kMainUser.listSelectCard = [];
        for (let i in game.kMainUser.listHandCard) {
            game.kMainUser.listHandCard[i].select = false;
        }
        game.GetTipsCard();
    }

    soundClick.play();
}
