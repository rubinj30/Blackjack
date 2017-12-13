const deckItems = {
    suits: ['H', 'D', 'S', 'C'],
    cards: '23456789TJQKA',
    values: [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11],
    createDeckOfCards: function () {
        const deckOfCards = []
        let originalIndex = 0
        for (let i = 0; i < this.suits.length; i++) {
            for (let j = 0; j < this.cards.length; j++) {
                const cardToAddToDeck = {
                    suit: this.suits[i],
                    card: this.cards[j],
                    value: this.values[j],
                    originalIndex: this.originalIndex
                }
                deckOfCards.push(cardToAddToDeck)
                originalIndex++
            }
        }
        return deckOfCards
    },
    // Trying out Fisher-Yates model for shuffling to randomize and return new array
    shuffleCards: function (deckToShuffle) {
        const newDeck = []
        let n = deckToShuffle.length
        let i;
        // While there remain elements to shuffle…
        while (n) {
            // Pick a remaining element…
            i = Math.floor(Math.random() * deckToShuffle.length);
            // If not already shuffled, move it to the new array.
            if (i in deckToShuffle) {
                newDeck.push(deckToShuffle[i]);
                delete deckToShuffle[i];
                n--;
            }
        }
        return newDeck;
    }
}

// create array of 52 unshuffled deck of cards
const unshuffledDeckOfCards = deckItems.createDeckOfCards()

// Create new array with all 52 cards after being randomly shuffled
const shuffledDeckOfCards = deckItems.shuffleCards(unshuffledDeckOfCards)

// Create variables for dealFirstFourCards function
// let playerCardValueSum = 0
// let dealerCardsValue = 0
// let playercards = []
// let playersCardsImages = []
// let  = []

const player = {
    cardsValueSum: 0,
    cards: [],
    cardsImages: [],
}

const dealer = {
    cardsValueSum: 0,
    cards: [],
    cardsImages: [],
}

let dealtCardObj = {}
let dealtCardImage = ''
let dealtCardValue = 0

// Deal out first four cards from shuffled deck
// One card to Player, one to dealer, one to player, one to dealer
function dealFirstFourCards() {
    // resets for round when 'Deal is clicked'
    for (let i = 0; i < 4; i++) {
        const dealtCardObj = shuffledDeckOfCards.shift()
        // first and third go to Player. Tracking values, objects, and images
        if (i % 2 === 0) {
            player.cardsValueSum += dealtCardObj.value
            player.cards.push(dealtCardObj)
            player.cardsImages.push(`${dealtCardObj.value}${dealtCardObj.suit}.png`)
        }
        else {
            dealer.cardsValueSum += dealtCardObj.value
            dealer.cards.push(dealtCardObj)
            dealer.cardsImages.push(`${dealtCardObj.value}${dealtCardObj.suit}.png`)
        }
    }
    // if Player starts 21, then they automatically win the round 
    // got a blackjack while testing and this
    if (player.cardsValueSum === 21) {
        alert('That is 21. BLACKJACK! You win!')
    }
    // If Player did not get 21 immediately and the Dealer does get 21 after the deal, then the dealer automatically wins
    else if (dealer.cardsValueSum === 21) {
        alert('The dealer has 21. They automatically win.')
    }
    console.log(`player: ${player.cardsValueSum} dealer: ${dealer.cardsValueSum}`)
    return player.cards, dealer.cards, player.cardsValueSum, dealer.cardsValueSum
}

// use this function to check for the player busting each time a card is drawn for them
function checkPlayerCardSumValue() {
    if (player.cardsValueSum > 21) {
        alert('BUSTED! You went over 21. You lose!')
    }
}

$('#deal').on('click', dealFirstFourCards)


// deals card and outputs dealtCard object, image, and value


// can do this in a function and then assign to the hit button. Don't need to have () after the function name
$('#hit').on('click', function () {
    dealtCardObj = shuffledDeckOfCards.shift()
    dealtCardImage = `${dealtCardObj.value}${dealtCardObj.suit}.png`
    player.cardsValueSum += dealtCardObj.value
    player.cards.push(dealtCardObj)
    console.log(`Player's Card Value Total: ${player.cardsValueSum}`) // will need to place DOM image replacement here
    checkPlayerCardSumValue() 
    return player.cards, player.cardsValueSum
})


function compareDealerAndPlayerTotals(dealerTotal, playerTotal) {
    if (dealerTotal > playerTotal) {

        alert('The dealer wins this round.')
    }
    else if (dealerTotal < playerTotal) {
        alert('You win the round!')
    }
    else {
        alert('This round is a draw.')
    }
}

function giveCardsToDealerAfterStand() {
    while (dealer.cardsValueSum < 17) {
        dealtCardObj = shuffledDeckOfCards.shift()
        dealer.cardsValueSum += dealtCardObj.value
        dealer.cards.push(dealtCardObj)
    }
    console.log(`Dealer total: ${dealer.cardsValueSum}`)
    // return dealer.cardsValueSum, dealer.cardss
    if (dealer.cardsValueSum > 21) {
        console.log(`Dealer total: ${dealer.cardsValueSum}`)
        alert('The dealer busted. You win!')
    }
    else {
        console.log(`Dealer total: ${dealer.cardsValueSum}`)
        compareDealerAndPlayerTotals(dealer.cardsValueSum, player.cardsValueSum)
    }
}



$('#stand').on('click', giveCardsToDealerAfterStand)

// logic for determining winner
// requires totals as parameters, which will only be provided once both players are done getting cards

