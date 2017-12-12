// Create Deck
const suits = ['H', 'D', 'S', 'C']
const cards = '23456789TJQKA'
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11]

function createDeckOfCards() {
    const deckOfCards = []
    let originalIndex = 0
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < cards.length; j++) {
            const cardToAddToDeck = {suit: suits[i],
                                    card: cards[j],
                                    value: values[j],
                                    originalIndex: originalIndex}
            deckOfCards.push(cardToAddToDeck)
            originalIndex ++
        }
    }
    return deckOfCards
}

const unshuffledDeckOfCards = createDeckOfCards()

// Trying out Fisher-Yates model for shuffling to randomize and return new array
function shuffleCards(deckToShuffle) {
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

// Create new array with shuffled cards
const shuffledDeckOfCards = shuffleCards(unshuffledDeckOfCards)

// Create variables for dealFirstFourCards function
let playerCardsValue = 0
let dealerCardsValue = 0
let playerCardsArray = []
let dealerCardsArray = []
let playerCardsImages = []
let dealerCardsImages = []

// Deal out first four cards from shuffled deck
// One card to Player, one to dealer, one to player, one to dealer
function dealFirstFourCards() {
    // resets for round when 'Deal is clicked'
    for (let i = 0; i < 4; i++) {    
        const dealtCardObj = shuffledDeckOfCards.shift()
        // first and third go to Player. Tracking values, objects, and images
        if (i % 2 === 0) {
            playerCardsValue += dealtCardObj.value
            playerCardsArray.push(dealtCardObj)
            playerCardsImages.push(`${dealtCardObj.value}${dealtCardObj.suit}.png`)
            console.log(playerCardsImages)
        }
        else {
            dealerCardsValue += dealtCardObj.value
            dealerCardsArray.push(dealtCardObj)
            dealerCardsImages.push(`${dealtCardObj.value}${dealtCardObj.suit}.png`)
            console.log(dealerCardsImages)
        }
    }
    if (playerCardsValue === 21) {
        alert("That is 21. BLACKJACK!")
    }
    console.log(`player: ${playerCardsValue} dealer: ${dealerCardsValue}`)
    return playerCardsArray, dealerCardsArray, playerCardsValue, dealerCardsValue
}

$('#deal').on('click', dealFirstFourCards)

// use this function to check for the player busting each time a card is drawn for them
function checkPlayerCardsValueForBust() {
    if (playerCardsValue > 21) {
        alert('BUSTED! You went over 21. You lose!')
    }
}

// deals card and outputs dealtCard object, image, and value
let dealtCardObj = {}
let dealtCardImage = ''
let dealtCardValue = 0

// can do this in a function and then assign to the hit button. Don't need to have () after the function name
$('#hit').on('click', function() {
    dealtCardObj = shuffledDeckOfCards.shift()
    dealtCardImage = `${dealtCardObj.value}${dealtCardObj.suit}.png`
    playerCardsValue += dealtCardObj.value
    playerCardsArray.push(dealtCardObj)
    checkPlayerCardsValueForBust()
    console.log(playerCardsValue)
    return playerCardsArray, playerCardsValue
})

function giveCardsToDealerAfterStand() {
    while (dealerCardsValue < 17) {
    dealtCardObj = shuffledDeckOfCards.shift()
    dealerCardsValue += dealtCardObj.value 
    dealerCardsArray.push(dealtCardObj)
    
    }
    console.log(`Dealer total: ${dealerCardsValue}`)
    return dealerCardsValue, dealerCardsArray
    if (dealerCardsValue > 21) {
        console.log(`Dealer total: ${dealerCardsValue}`)
        alert('The dealer busted. You win!')
    }
    else {
    cconsole.log(`Dealer total: ${dealerCardsValue}`)
    compareDealerAndPlayerTotals(dealerCardsValue, playerCardsValue)
    }
}

function compareDealerAndPlayerTotals(dealerTotal, playerTotal) {
    if (dealerTotal > playerTotal) {
        return 'The dealer wins this round.'
    }
    else if (dealerTotal < playerTotal) {
        return 'You win the round!'
    }
    else {
        return 'This round is a draw.'
    }
}

$('#stand').on('click', giveCardsToDealerAfterStand)

// logic for determining winner
// requires totals as parameters, which will only be provided once both players are done getting cards

