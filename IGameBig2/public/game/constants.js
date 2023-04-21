const cPlayerLocations = [

    {x:400, y:940-150},
    {x:150, y:590-150},
    {x:850, y:230-150},
    {x:1600, y:590-150},
];

const cChipLocations = [
    {x:500+50, y:940-150-250},
    {x:150 + 250, y:590-150-40},
    {x:850, y:230-150+250},
    {x:1600-250, y:590-150+50},
];

const cChipCallTexts = [
    {x:500 + 100, y:940-150-100},
    {x:150 + 150 + 130, y:590 + 10},
    {x:850+50 +30, y:230-150 + 300},
    {x:1600-100, y:590+50},
];

const cDealerLocation = 
{
    x:895,
    y:300
};

const cTableCardLocations = [
    {x:630, y:520-120},
    {x:630+135, y:520-120},
    {x:630+135*2, y:520-120},
    {x:630+135*3, y:520-120},
    {x:630+135*4, y:520-120},
];

const cPlayerTypeLocations = [
    {x:500+70, y:940-150-75},
    {x:150+270, y:590-150+200},
    {x:850-40, y:230-150+180},
    {x:1600-135, y:590-150+175},
];

const ELocationIndex = Object.freeze({
    "SubmitButtonPass":0,
    "SubmitButtonSubmit":1,

    "P1Table":2,
    "P2Table":3,
    "P3Table":4,
    "P4Table":5,

    "PanelCall":6,
    "PanelTotal":7,
    "MyInfo":8,
    "Logo":9,
    "DialogStandby":10,
    "CardDeck":11,
    "StartButton":12,

    "P1Type":13,
    "P2Type":14,
    "P3Type":15,
    "P4Type":16,

    "TableCard1":17,
    "TableCard2":18,
    "TableCard3":19,
    "TableCard4":20,
    "TableCard5":21,

    "SortButton":22,
    "Single":23,
    "Pair":24,
    "Triple":25,
    "Straight":26,
    "Flush":27,
    "FullHouse":28,
    "FourOfKind":29,
    "StraightFlush":30,

    "Tips":31
});
