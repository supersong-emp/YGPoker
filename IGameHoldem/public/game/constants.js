const EPositionIndex = Object.freeze({
    "Player1":0,
    "Player2":1,
    "Player3":2,
    "Player4":3,
    "Player5":4,
    "Player6":5,
    "Player7":6,
    "Player8":7,
    "Player9":8,

    "PlayerChip1":9,
    "PlayerChip2":10,
    "PlayerChip3":11,
    "PlayerChip4":12,
    "PlayerChip5":13,
    "PlayerChip6":14,
    "PlayerChip7":15,
    "PlayerChip8":16,
    "PlayerChip9":17,

    "PlayerCoin1":18,
    "PlayerCoin2":19,
    "PlayerCoin3":20,
    "PlayerCoin4":21,
    "PlayerCoin5":22,
    "PlayerCoin6":23,
    "PlayerCoin7":24,
    "PlayerCoin8":25,
    "PlayerCoin9":26,

    "Dealer":27,

    "TableCard1":28,
    "TableCard2":29,
    "TableCard3":30,
    "TableCard4":31,
    "TableCard5":32,
    
    "PlayerType1":33,
    "PlayerType2":34,
    "PlayerType3":35,
    "PlayerType4":36,
    "PlayerType5":37,
    "PlayerType6":38,
    "PlayerType7":39,
    "PlayerType8":40,
    "PlayerType9":41,

    "BetButtonQuater":42,
    "BetButtonHalf":43,
    "BetButtonFull":44,
    "BetButtonCall":45,
    "BetButtonCheck":46,
    "BetButtonFold":47,
    "BetButtonRaise":48,

    "PanelCall":49,
    "PanelTotal":50,
    "MyInfo":51,
    "Logo":52,
    "DialogStandby":53,
    "CardDeck":54,
    "StartButton":55,

    "plusButton":56,
    "minusButton":57,
    "sliderBar":58,
    "MobileSliderBar":59,
    "MobileRaiseBar":60,

    "Chat":61,
    "GameLog":62,
    "Jackpot":63,
    "ShowCard":64,

    "RaiseButton1":65,
    "RaiseButton2":66,
    "RaiseButton3":67,
    "RaiseButton4":68,
});

const cPlayerLocations = [
    {x:500, y:940-150},
    {x:150, y:750-150},
    {x:150, y:430-150},

    {x:400, y:230-150},
    {x:700, y:230-150},
    {x:1000, y:230-150},
    {x:1300, y:230-150},

    {x:1600, y:430-150},
    {x:1600, y:750-150},
];

const cPlayerVerticalLocations = [
    {x:460, y:1400},

    {x:30, y:1100},
    {x:50, y:750},
    {x:100, y:430},

    {x:250, y:170},
    {x:650, y:170},

    {x:820, y:430},
    {x:850, y:750},
    {x:870, y:1100},
];

const cChipLocations = [
    {x:500+50, y:940-150-250},
    {x:150 + 250, y:750-150-40},
    {x:150 + 250, y:430-150+50},

    {x:400+50, y:230-150+250},
    {x:700, y:230-150+250},
    {x:1000, y:230-150+250},
    {x:1300-50, y:230-150+250},

    {x:1600-250, y:430-150+50},
    {x:1600-250, y:750-150-40},
];

const cChipVerticalLocations = [
    {x:460, y:1400-200},

    {x:30 + 250, y:1100-100},
    {x:50 + 250, y:750},
    {x:100 + 250, y:430+270},

    {x:250+70, y:170+270},
    {x:650-10, y:170+270},

    {x:820-100, y:430+270},
    {x:850-100, y:750},
    {x:870-100, y:1100-100},
];


const cChipCallTexts = [
    {x:500+50, y:940-150-250+50},
    {x:150 + 250, y:750-150-40+50},
    {x:150 + 250, y:430-150+50+50},

    {x:400+50, y:230-150+250+50},
    {x:700, y:230-150+250+50},
    {x:1000, y:230-150+250+50},
    {x:1300-50, y:230-150+250+50},

    {x:1600-250, y:430-150+50+50},
    {x:1600-250, y:750-150-40+50},
];

const cChipCallVerticalTexts = [
    {x:460+ 70, y:1400-200+50},

    {x:30 + 250, y:1100-100+50},
    {x:50 + 250, y:750+50},
    {x:100 + 250, y:430+270+50},

    {x:250+70, y:170+270+50},
    {x:650-10, y:170+270+50},

    {x:820-100, y:430+270+50},
    {x:850-100, y:750+50},
    {x:870-100, y:1100-100+50},
];

const cDealerLocation = 
{
    x:895,
    y:200
};

const cDealerVerticalLocation = 
{
    x:500,
    y:250
};

const cTableCardLocations = [
    // {x:480, y:520-150},
    // {x:480+173+20, y:520-150},
    // {x:480+173*2+40, y:520-150},
    // {x:480+173*3+60, y:520-150},
    // {x:480+173*4+80, y:520-150},

    {x:630, y:520-120},
    {x:630+135, y:520-120},
    {x:630+135*2, y:520-120},
    {x:630+135*3, y:520-120},
    {x:630+135*4, y:520-120},

];

const cTableCardVerticalLocations = [

    {x:210, y:630},
    {x:210+135, y:630},
    {x:210+135*2, y:630},
    {x:210+135*3, y:630},
    {x:210+135*4, y:630},

];

const cPlayerTypeLocations = [
    {x:500+70, y:940-150-75},

    {x:150+180, y:750-150+50},
    {x:150+180, y:430-150+160},

    {x:400+60, y:230-150+235},
    {x:700+70, y:230-150+235},
    {x:1000+60, y:230-150+225},
    {x:1300+50, y:230-150+235},

    {x:1600-60, y:430-150+175},
    {x:1600-90, y:750-150+50},
];

const cPlayerTypeVerticalLocations = [
    {x:460+70, y:1400-70},

    {x:30+180, y:1100+190},
    {x:50+180, y:750+190},
    {x:100+180, y:430+190},

    {x:250+180, y:170+190},
    {x:650-40, y:170+190},

    {x:820-50, y:430+190},
    {x:850-50, y:750+190},
    {x:870-50, y:1100+190}
];

const ELocationIndex = Object.freeze({
    "BetButtonQuater":0,
    "BetButtonHalf":1,
    "BetButtonFull":2,
    "BetButtonCall":3,
    "BetButtonCheck":4,
    "BetButtonFold":5,
    "BetButtonRaise":6,
    // "BetButtonPlus":5,
    // "BetButtonMinus":6,

    "P1Table":7,
    "P2Table":8,
    "P3Table":9,
    "P4Table":10,
    "P5Table":11,
    "P6Table":12,
    "P7Table":13,
    "P8Table":14,
    "P9Table":15,

    "PanelCall":16,
    "PanelTotal":17,
    "MyInfo":18,
    "Logo":19,
    "DialogStandby":20,
    "CardDeck":21,
    "StartButton":22,

    "P1Type":23,
    "P2Type":24,
    "P3Type":25,
    "P4Type":26,
    "P5Type":27,
    "P6Type":28,
    "P7Type":29,
    "P8Type":30,
    "P9Type":31,

    "TableCard1":32,
    "TableCard2":33,
    "TableCard3":34,
    "TableCard4":35,
    "TableCard5":36,

    "TableChip1":37,
    "TableChip2":38,
    "TableChip3":39,
    "TableChip4":40,
    "TableChip5":41,
    "TableChip6":42,
    "TableChip7":43,
    "TableChip8":44,
    "TableChip9":45,

    "TableCoin1":46,
    "TableCoin2":47,
    "TableCoin3":48,
    "TableCoin4":49,
    "TableCoin5":50,
    "TableCoin6":51,
    "TableCoin7":52,
    "TableCoin8":53,
    "TableCoin9":54,

    "plusButton":55,
    "minusButton":56,
    "sliderBar":57,
    "MobileSliderBar":58,
    "MobileRaiseBar":59,

    "Chat":60,
    "GameLog":61,

    "Jackpot":62,
    "ShowCard":63,

    "RaiseButton1":64,
    "RaiseButton2":65,
    "RaiseButton3":66,
    "RaiseButton4":67,
});

const EImageIndex = Object.freeze({
    "BG01":0,
    "BG02":1,
    "BG03":2,
    "BG04":3,
    "BGText01":4,
    "BGText02":5,
    "BGText03":6,
    "BGText04":7,
    "BGTableTotalPanel01":8,
    "BGTableCallPanel01":9,
    "BGTableTotalPanel02":10,
    "BGTableCallPanel02":11,
    "BGTableDeck01":12,
    "BGTableDeck02":13,
    "BGTableDeck03":14,
    "BGTableDeck04":15,
});
