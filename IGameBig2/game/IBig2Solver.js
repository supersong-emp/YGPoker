const adjustedNumber = (num) => (num === 0 ? 12 : num === 1 ? 13 : num - 1);

let getRank = (listCards) => {
    if (listCards.length === 1) {
        return { rank: "Highcard", cards: listCards };
    } else if (listCards.length === 2) {
        let pair = GetPair(listCards);
        if (pair.length > 0) {
            return { rank: "Pair", cards: pair };
        }
    } else if (listCards.length === 3) {
        let triple = GetTriple(listCards);
        if (triple.length > 0) {
            return { rank: "Three of a kind", cards: triple };
        }
    } else if (listCards.length === 5) {
        let straightFlush = GetStraightFlush(listCards);
        if (straightFlush.length > 0) {
            return { rank: "Straight flush", cards: straightFlush };
        }

        let fourCard = GetFourCard(listCards);
        if (fourCard.length > 0) {
            return { rank: "Four of a kind", cards: fourCard };
        }

        let fullHouse = GetFullHouse(listCards);
        if (fullHouse.length > 0) {
            return { rank: "Full house", cards: fullHouse };
        }

        let flush = GetFlush(listCards);
        if (flush.length > 0) {
            return { rank: "Flush", cards: flush };
        }

        let straight = GetStraight(listCards);
        if (straight.length > 0) {
            return { rank: "Straight", cards: straight };
        }
    }

    return null;
};

let IsPair = (index, listCards) => {
    const cNumber = adjustedNumber(parseInt(index % 13));

    for (let i in listCards) {
        if (listCards[i] == index) continue;

        let iNumber = adjustedNumber(parseInt(listCards[i] % 13));
        if (iNumber == cNumber) {
            return [index, listCards[i]];
        }
    }
    return null;
};

let IsTriple = (index, listCards) => {
    const cNumber = adjustedNumber(parseInt(index % 13));
    let foundCards = [];

    for (let i in listCards) {
        if (listCards[i] === index) continue;

        let iNumber = adjustedNumber(parseInt(listCards[i] % 13));
        if (iNumber === cNumber) {
            foundCards.push(listCards[i]);
            if (foundCards.length === 2) {
                foundCards.push(index);
                return foundCards;
            }
        }
    }
    return null;
};

let IsStraight = (listCards) => {
    const validSequences = [
        [0, 1, 2, 3, 4], // A-2-3-4-5
        [1, 2, 3, 4, 5],  // 2-3-4-5-6
        [9, 10, 11, 12, 0], // 10-J-Q-K-A
        [8, 9, 10, 11, 12],
        [7, 8, 9, 10, 11],
        [6, 7, 8, 9, 10],
        [5, 6, 7, 8, 9],
        [4, 5, 6, 7, 8],
        [3, 4, 5, 6, 7],
        [2, 3, 4, 5, 6],
    ];

    const sortedCards = listCards.sort((a, b) => a % 13 - b % 13); // 숫자를 기준으로 정렬

    const validSequencesWithCards = validSequences.map(sequence => {
        return sequence.map(num => {
            return listCards.find(card => card % 13 === num);
        });
    });

    const straight = validSequencesWithCards.find(sequence => {
        return sequence.every(card => sortedCards.includes(card));
    });

    return straight ? straight : null;
};

let IsFlush = (listCards) => {
    const suitCounts = [0, 0, 0, 0];

    // 각 문양의 카드 개수를 셈
    for (let i = 0; i < listCards.length; i++) {
        const cardSuit = parseInt(listCards[i] / 13);
        suitCounts[cardSuit]++;
    }

    // 같은 문양의 카드가 5장 이상이면 flush
    for (let i = 0; i < 4; i++) {
        if (suitCounts[i] >= 5) {
            const flushCards = [];

            // 해당 문양의 카드들만 모은 배열 생성
            for (let j = 0; j < listCards.length; j++) {
                const cardSuit = parseInt(listCards[j] / 13);
                if (cardSuit === i) {
                    flushCards.push(listCards[j]);
                }
            }

            // 가능한 모든 조합 구하기
            const combinations = [];
            for (let j = 0; j < flushCards.length; j++) {
                for (let k = j + 1; k < flushCards.length; k++) {
                    for (let l = k + 1; l < flushCards.length; l++) {
                        for (let m = l + 1; m < flushCards.length; m++) {
                            for (let n = m + 1; n < flushCards.length; n++) {
                                combinations.push([
                                    flushCards[j],
                                    flushCards[k],
                                    flushCards[l],
                                    flushCards[m],
                                    flushCards[n],
                                ]);
                            }
                        }
                    }
                }
            }

            //console.log(combinations);
            return combinations;
        }
    }

    return null;
};

let IsFullHouse = (listCards) => {
    let triples = [];
    let pairs = [];
    for (let i = 0; i < listCards.length; i++) {
        let object = IsTriple(listCards[i], listCards);
        if (object !== null) {
            triples.push(object);
        }
        object = IsPair(listCards[i], listCards);
        if (object !== null) {
            pairs.push(object);
        }
    }
    let fullHouses = [];
    for (let i = 0; i < triples.length; i++) {
        for (let j = 0; j < pairs.length; j++) {
            let fullHouse = triples[i].concat(pairs[j]);
            // 중복 항목이 없는 경우 full house 조합에 추가
            if (fullHouse.filter((item, index) => fullHouse.indexOf(item) === index).length === 5) {
                fullHouses.push(fullHouse);
            }
        }
    }
    if (fullHouses.length > 0) {
        return fullHouses;
    }
    return null;
};

let IsFourCard = (listCards) => {
    listCards.sort((a, b) => a % 13 - b % 13); // 카드 숫자를 기준으로 오름차순 정렬

    const fourCardCombinations = [];

    for (let i = 0; i < listCards.length - 3; i++) {
        const cardNumber = parseInt(listCards[i] % 13);
        const sameNumberCards = [listCards[i]];

        for (let j = i + 1; j < listCards.length; j++) {
            if (parseInt(listCards[j] % 13) === cardNumber) {
                sameNumberCards.push(listCards[j]);
            }
        }

        if (sameNumberCards.length === 4) {
            // 같은 숫자 카드가 4장인 경우, 해당 카드들과 아무 카드 한 장씩 조합하여 결과 배열에 추가
            const remainingCards = listCards.filter(c => !sameNumberCards.includes(c));
            for (let k = 0; k < remainingCards.length; k++) {
                fourCardCombinations.push([...sameNumberCards, remainingCards[k]]);
            }
        }
    }

    return fourCardCombinations.length > 0 ? fourCardCombinations : null;
};

// 스트레이트 플러쉬인지 판단하는 함수
let IsStraightFlush = (listCards) => {
    const straightFlushes = [];
    for (let i = 0; i < listCards.length - 4; i++) {
        for (let j = i + 1; j < listCards.length - 3; j++) {
            for (let k = j + 1; k < listCards.length - 2; k++) {
                for (let l = k + 1; l < listCards.length - 1; l++) {
                    for (let m = l + 1; m < listCards.length; m++) {
                        let sublist = [listCards[i], listCards[j], listCards[k], listCards[l], listCards[m]];
                        let straight = IsStraight(sublist);
                        if (straight !== null) {
                            let flush = IsFlush(sublist);
                            if (flush !== null) {
                                console.log(flush);
                                straightFlushes.push(sublist);
                            }
                        }
                    }
                }
            }
        }
    }
    if (straightFlushes.length > 0) {
        return straightFlushes;
    }
    return null;
};

let Arrange = (arrayElement, array) => {
    for (let i in array) {
        if (arrayElement == array[i]) {
            continue;
        }

        let count = 0;
        for (let j in arrayElement) {
            let value = array[i].indexOf(arrayElement[j]);
            if (-1 != value) {
                count++;
            }

            if (arrayElement.length == count) {
                array.splice(i, 1);
                // console.log(`aaa`);
                // console.log(arrayElement);
                // console.log(array[i]);
            }
        }
    }
};

let GetSingleCards = (listCards) => {
    console.log(listCards);
    console.log("GetSingleCards");

    let singleCards = [];

    for (let i in listCards) {
        let isUnique = true;
        const cNumber = adjustedNumber(parseInt(listCards[i] % 13));
        const cSuit = parseInt(listCards[i] / 13);

        for (let j in listCards) {
            if (i == j) continue;

            let jNumber = adjustedNumber(parseInt(listCards[j] % 13));
            let jSuit = parseInt(listCards[j] / 13);
            if (cNumber == jNumber && cSuit == jSuit) {
                isUnique = false;
                break;
            }
        }

        if (isUnique) {
            singleCards.push(listCards[i]);
        }
    }

    // 정렬하기
    singleCards.sort((a, b) => {
        const aNumber = adjustedNumber(parseInt(a % 13));
        const aSuit = parseInt(a / 13);
        const bNumber = adjustedNumber(parseInt(b % 13));
        const bSuit = parseInt(b / 13);

        if (aNumber === bNumber) {
            return aSuit - bSuit;
        } else {
            return bNumber - aNumber;
        }
    });

    console.log(singleCards);
    return singleCards;
};

let GetPair = (listCards) => {
    console.log(listCards);
    console.log("GetPair");

    let array = [];

    for (let i in listCards) {
        let object = IsPair(listCards[i], listCards);
        if (object != null) {
            array.push(object);
        }
    }

    for (let i in array) Arrange(array[i], array);

    // 정렬하기
    array.sort((a, b) => {
        const aFirstNumber = adjustedNumber(parseInt(a[0] % 13));
        const aFirstSuit = parseInt(a[0] / 13);
        const aSecondSuit = parseInt(a[1] / 13);

        const bFirstNumber = adjustedNumber(parseInt(b[0] % 13));
        const bFirstSuit = parseInt(b[0] / 13);
        const bSecondSuit = parseInt(b[1] / 13);

        if (aFirstNumber === bFirstNumber) {
            if (aFirstSuit === bFirstSuit) {
                return aSecondSuit - bSecondSuit;
            } else {
                return aFirstSuit - bFirstSuit;
            }
        } else {
            return bFirstNumber - aFirstNumber;
        }
    });

    console.log(array);
    return array;
};

let GetTriple = (listCards) => {
    console.log(listCards);
    console.log("GetTriple");

    let array = [];

    for (let i in listCards) {
        let object = IsTriple(listCards[i], listCards);
        if (object !== null) {
            array.push(object);
        }
    }

    for (let i in array) Arrange(array[i], array);

    // 정렬하기
    array.sort((a, b) => {
        const aNumber = adjustedNumber(parseInt(a[0] % 13));
        const aSuit = parseInt(a[0] / 13);
        const bNumber = adjustedNumber(parseInt(b[0] % 13));
        const bSuit = parseInt(b[0] / 13);

        if (aNumber === bNumber) {
            return aSuit - bSuit;
        } else {
            return bNumber - aNumber;
        }
    });

    console.log("Triple");
    console.log(array);
    return array;
};

let GetStraight = (listCards) => {
    console.log(listCards);
    console.log("GetStraight");

    let array = [];

    for (let i = 0; i < listCards.length - 4; i++) {
        for (let j = i + 1; j < listCards.length - 3; j++) {
            for (let k = j + 1; k < listCards.length - 2; k++) {
                for (let l = k + 1; l < listCards.length - 1; l++) {
                    for (let m = l + 1; m < listCards.length; m++) {
                        let sublist = [listCards[i], listCards[j], listCards[k], listCards[l], listCards[m]];
                        let straight = IsStraight(sublist);
                        if (straight !== null && IsFlush(sublist) === null) {
                            array.push(straight);
                        }
                    }
                }
            }
        }
    }

    // for (let i in array) {
    //     Arrange(array[i], array);
    // }

    // 정렬하기
    array.sort((a, b) => {
        const aHighestNumber = adjustedNumber(parseInt(a[4] % 13));
        const bHighestNumber = adjustedNumber(parseInt(b[4] % 13));

        return bHighestNumber - aHighestNumber;
    });

    console.log(array);
    return array;
};

let GetFlush = (listCards) => {
    console.log(listCards);
    console.log("GetFlush");

    const flushCards = IsFlush(listCards);

    if (flushCards === null) {
        return [];
    }

    // 플러시에 포함된 카드들을 낮은 숫자 순으로 정렬
    flushCards.sort((a, b) => {
        const aNumber = (parseInt(a % 13));
        const bNumber = (parseInt(b % 13));
        return aNumber - bNumber;
    });
    const flushCombinations = [];

    for (let i = 0; i < flushCards.length; i++) {
        // 조합이 스트레이트인지 확인
        //console.log(flushCards[i]);
        const straight = IsStraight(flushCards[i]);
        // 스트레이트가 아닌 경우에만 결과 배열에 추가
        if (straight == null) {
            flushCombinations.push(flushCards[i]);
        }
    }
    console.log(flushCombinations);
    return flushCombinations;
};

let GetFullHouse = (listCards) => {
    console.log(listCards);
    console.log("GetFullHouse");
    const fullHouse = IsFullHouse(listCards);

    if (fullHouse === null) {
        return [];
    }
    for (let i in fullHouse) Arrange(fullHouse[i], fullHouse);

    console.log(fullHouse);
    return fullHouse;
};

// 네 개의 같은 숫자 카드와 아무 카드 한 장을 가져와서 반환하는 함수
let GetFourCard = (listCards) => {
    console.log(listCards);
    console.log("GetFourCard");

    const fourCards = IsFourCard(listCards);

    if (fourCards == null || fourCards.length === 0) {
        return [];
    }

    const result = [];
    for (let i = 0; i < fourCards.length; i++) {
        //console.log(fourCards[i]);
        result.push(fourCards[i]);
    }

    console.log(result);
    return result;
};

// 스트레이트 플러쉬인 카드 5장을 가져와서 반환하는 함수
let GetStraightFlush = (listCards) => {
    console.log(listCards);
    console.log("GetStraightFlush");

    const straightFlushCards = IsStraightFlush(listCards);

    if (straightFlushCards === null) {
        return [];
    }
    const result = [];
    for (let i = 0; i < straightFlushCards.length; i++) {
        //console.log(fourCards[i]);
        result.push(straightFlushCards[i]);
    }

    //console.log(result);
    return result;
};
//조합가능한지 확인하는 함수
exports.isValidPlay = (listCards) => {
    if (listCards.length === 1) {
        return true;
    } else if (listCards.length === 2) {
        return GetPair(listCards).length > 0;
    } else if (listCards.length === 3) {
        return GetTriple(listCards).length > 0;
    } else if (listCards.length === 5) {
        return (
            GetStraight(listCards).length > 0 ||
            GetFlush(listCards).length > 0 ||
            GetFullHouse(listCards).length > 0 ||
            GetFourCard(listCards).length > 0 ||
            GetStraightFlush(listCards).length > 0
        );
    } else {
        return false;
    }
};
// 서로 족보 비교
exports.canPlay = (listHandCard, listTableCard) => {
    if (listTableCard == null) {
        return isValidPlay(listHandCard);
    } else {
        let tableRank = getRank(listTableCard);
        let handRank = getRank(listHandCard);
        if(tableRank == null)
        {
            return isValidPlay(listTableCard);
        }
        if(handRank == null)
        {
            return isValidPlay(listHandCard);
        }

        let result = compareRanks(handRank, tableRank);
        return result === 1;
    }
};

let compareRanks = (handRank, tableRank) => {
    let handRankValue = getRankValue(handRank.rank);
    let tableRankValue = getRankValue(tableRank.rank);

    if (handRankValue > tableRankValue) {
        return 1;
    } else if (handRankValue < tableRankValue) {
        return -1;
    } else {
        // ranks are equal, compare the cards
        console.log("compareRanks")
        console.log(handRankValue);
        console.log(tableRankValue);
        console.log(handRank.cards);
        console.log(tableRank.cards);
        return compareCardLists(handRank.cards, tableRank.cards);
    }
};

let getRankValue = (rank) => {
    const rankValues = {
        "Straight flush": 8,
        "Four of a kind": 7,
        "Full house": 6,
        "Flush": 5,
        "Straight": 4,
        "Three of a kind": 3,
        "Pair": 2,
        "Highcard": 1,
    };
    return rankValues[rank];
};

let compareCardLists = (handCards, tableCards) => {
    // Check if both handCards and tableCards are single-card arrays
    if (typeof handCards[0] === 'number' && typeof tableCards[0] === 'number') {
        return compareCards(handCards[0], tableCards[0]);
    }

    handCards = handCards.slice().sort(compareCards);
    tableCards = tableCards.slice().sort(compareCards);

    const handCardsNumbers = handCards.map(cards => cards.map(card => adjustedNumber(card % 13)).sort((a, b) => a - b));
    const tableCardsNumbers = tableCards.map(cards => cards.map(card => adjustedNumber(card % 13)).sort((a, b) => a - b));

    console.log("compareCardLists");
    console.log(handCardsNumbers);
    console.log(tableCardsNumbers);

    // Check for A-2-3-4-5 and 2-3-4-5-6 straights
    const isLowAceStraight = (cardsNumbers) => {
        return JSON.stringify(cardsNumbers) === JSON.stringify([1, 2, 3, 12, 13]);
    };

    const handIsLowAceStraight = isLowAceStraight(handCardsNumbers[0]);
    const tableIsLowAceStraight = isLowAceStraight(tableCardsNumbers[0]);

    if (handIsLowAceStraight && !tableIsLowAceStraight) {
        handCardsNumbers[0][4] = 14;
    } else if (!handIsLowAceStraight && tableIsLowAceStraight) {
        tableCardsNumbers[0][4] = 14;
    }

    for (let i = 0; i < handCards.length; i++) {
        let highestHandCardNumber = Math.max(...handCardsNumbers[i]);
        let highestTableCardNumber = Math.max(...tableCardsNumbers[i]);

        if (highestHandCardNumber > highestTableCardNumber) {
            return 1;
        } else if (highestHandCardNumber < highestTableCardNumber) {
            return -1;
        } else {
            for (let j = 0; j < handCards[i].length; j++) {
                let result = compareCards(handCards[i][j], tableCards[i][j]);
                if (result !== 0) {
                    return result;
                }
            }
        }
    }
    return 0;
};

let compareCards = (a, b) => {
    let aNumber = adjustedNumber(parseInt(a % 13));
    let bNumber = adjustedNumber(parseInt(b % 13));
    let aSuit = parseInt(a / 13);
    let bSuit = parseInt(b / 13);
    console.log("compareCards");
    console.log(aNumber);
    console.log(bNumber);
    console.log(aSuit);
    console.log(bSuit);
    if (aNumber > bNumber) {
        return 1;
    } else if (aNumber < bNumber) {
        return -1;
    } else {
        const suitOrder = { 0: 3, 1: 2, 2: 1, 3: 0 };
        if (suitOrder[aSuit] > suitOrder[bSuit]) {
            return 1;
        } else {
            return -1;
        }
    }
};

exports.generateValidCombinations = (handCards, tableCards) => {
    let validCombinations = [];
    const allCombinations = getAllCombinations(handCards);
  
    if (tableCards === null) {
      validCombinations = allCombinations;
    } else {
      const tableCardsLength = tableCards.length;
      allCombinations.forEach(combination => {
        if (combination.length === tableCardsLength && compareCardLists(combination, tableCards) > 0) {
          validCombinations.push(combination);
        }
      });
    }
  
    return validCombinations;
  };
  

  const getAllCombinations = (handCards) => {
    const combinations = [];
  
    // 각각의 카드 조합 유형에 따른 함수를 호출하여 결과를 합칩니다.
    const singles = GetSingleCards(handCards).map((card) => [card]);
    const pairs = GetPair(handCards);
    const triples = GetTriple(handCards);
    const straights = GetStraight(handCards);
    const flushes = GetFlush(handCards);
    const fullHouses = GetFullHouse(handCards);
    const fourOfAKinds = GetFourCard(handCards);
    const straightFlushes = GetStraightFlush(handCards);
  
    // 결과를 combinations 배열에 추가합니다.
    combinations.push(...straightFlushes);
    combinations.push(...fourOfAKinds);
    combinations.push(...fullHouses);
    combinations.push(...flushes);
    combinations.push(...straights);
    combinations.push(...triples);
    combinations.push(...pairs);
    combinations.push(...singles);

    console.log("getAllCombinations");
    console.log(combinations);
    return combinations;
  };

//   module.exports = {
//     generateValidCombinations, // 내보내고 싶은 함수
//     canPlay,
//     isValidPlay
//   };