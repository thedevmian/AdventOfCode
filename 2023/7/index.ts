const file = await Deno.readTextFile('./input.txt');
const data = file.split('\n');


type CamelHand = "onePair" | "twoPair" | "threeOfAKind" | "fullHouse" | "fourOfAKind" | "fiveOfAKind" | "highCard";
type CardValueType = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" |
    "T" | "J" | "Q" | "K" | "A";

type CamelCardNumberMap = {
    [key in CamelHand]: number;
}

type CardValueTypeMap = {
    [key in CardValueType]: number;
}

const cardValueTypeMap: CardValueTypeMap = {
    "J": 1, // part 2
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "T": 10,
    "Q": 12,
    "K": 13,
    "A": 14
}

const camelCardNumberMap: CamelCardNumberMap = {
    "highCard": 0,
    "onePair": 1,
    "twoPair": 2,
    "threeOfAKind": 3,
    "fullHouse": 4,
    "fourOfAKind": 5,
    "fiveOfAKind": 6
}

type CamelCardGame = {
    cards: string[];
    bid: number;
    cardType: [CamelHand, Map<string, number>];
    rank: number;
}

const parseInput = (line: string): CamelCardGame[] => {
    const camelCards: CamelCardGame[] = [];

    data.forEach(element => {
        const [cards, bid] = element.split(' ');

        const camelCard: CamelCardGame = {
            cards: cards.split(','),
            bid: parseInt(bid),
            cardType: getCardType(cards.split('')),
            rank: 0
        }
        camelCards.push(camelCard);
    });
    return camelCards;
}

const getCardType = (cards: string[]): CardType => {

    const cardMap = new Map<string, number>();

    cards.forEach((card, i) => {
        if (cardMap.has(card)) {
            cardMap.set(card, cardMap.get(card) as number + 1);
        } else {
            cardMap.set(card, 1);
        }
    });
    const cardValues = [...cardMap.values()].sort((a, b) => b - a);
    let cardType;
    let cardValue = cardValues[0];


    if (cardMap.has('J')) {
        const jValue = cardMap.get('J');

        if (jValue === 5) {
            cardValue = 5;
        } else if (jValue === 4) {
            cardValue += 1;
        } else if (jValue === 3) {
            cardValue = cardValue + cardValues[1];
            console.log(cardValue);
        } else if (jValue === 2 && cardValues[1] === 2) {
            cardValue = cardValue + cardValues[1];
        } else if (jValue === 2) {
            cardValue = cardValue + cardValues[1];
        } else {
            cardValue += jValue as number;
        }

    }

    if (cardValue === 5) {
        cardType = camelCardNumberMap.fiveOfAKind;
    } else if (cardValue === 4) {
        cardType = camelCardNumberMap.fourOfAKind;
    } else if (cardValue === 3 && cardValues[1] === 2) {
        cardType = camelCardNumberMap.fullHouse;
    } else if (cardValue === 3) {
        cardType = camelCardNumberMap.threeOfAKind;
    } else if (cardValue === 2 && cardValues[1] === 2) {
        cardType = camelCardNumberMap.twoPair;
    } else if (cardValue === 2) {
        cardType = camelCardNumberMap.onePair;
    } else {
        cardType = camelCardNumberMap.highCard;
    }

    return [cardType, cardMap];
}
const camelCards = parseInput(data);

const sortCamelCards = (camelCards: CamelCardGame[]) => {
    camelCards.sort((a, b) => b.cardType[0] - a.cardType[0]);
    // seperate by cardType
    const arr: CamelCardGame[][] = [];
    let currenntCardType = camelCards[0].cardType[0];
    let currentArray: CamelCardGame[] = [];

    for (const card of camelCards) {
        if (card.cardType[0] === currenntCardType) {
            currentArray.push(card);
        } else {
            arr.push(currentArray);
            currentArray = [];
            currentArray.push(card);
            currenntCardType = card.cardType[0];
        }

    }
    arr.push(currentArray);

    // sort by string
    arr.forEach((subarr) => {
        subarr.sort((a: CamelCardGame, b: CamelCardGame): number => {
            const aCard = a.cards[0].split('');
            const bCard = b.cards[0].split('');

            for (let i = 0; i < aCard.length; i++) {
                if (cardValueTypeMap[aCard[i]] > cardValueTypeMap[bCard[i]]) {
                    return -1;
                } else if (cardValueTypeMap[aCard[i]] < cardValueTypeMap[bCard[i]]) {
                    return 1;
                }
            }
            return 0;
        })
    })
    return arr;
}



sortCamelCards(camelCards);

const sortedArrayOfCamelCards = sortCamelCards(camelCards);

const getRank = (camelCards: CamelCardGame[][]) => {
    const cardArray = camelCards.flat();
    let rank = cardArray.length;

    for (let i = 0; i < cardArray.length; i++) {
        cardArray[i].rank = rank;
        rank--;
    }
    return cardArray;
}

const sortedAndRankedCard = getRank(sortedArrayOfCamelCards);

const getResults = (camelCards: CamelCardGame[]): number => {
    let result: number = 0;

    for (const card of camelCards) {
        const cardResult = card.rank * card.bid;
        result += cardResult;
    }
    return result;
}

const result = getResults(sortedAndRankedCard);
console.log(result);