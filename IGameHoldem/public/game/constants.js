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

const cChipCallTexts = [
    {x:500 + 100, y:940-150-100},
    {x:150 + 150 + 130, y:750 + 10},
    {x:150 + 150 + 130, y:430 + 50},

    {x:400+50 +30, y:230-150 + 300},
    {x:700+50 +30, y:230-150 + 300},
    {x:1000+80, y:230-150 + 300},
    {x:1300+80, y:230-150 + 300},

    {x:1600-100, y:430+50},
    {x:1600-100-50, y:750+20},
];

const cDealerLocation = 
{
    x:895,
    y:200
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

const ELocationIndex = Object.freeze({
    "BetButtonQuater":0,
    "BetButtonHalf":1,
    "BetButtonFull":2,
    "BetButtonCall":3,
    "BetButtonFold":4,
    "BetButtonCheck":5,
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
});
