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
    "GameLog":61
});
