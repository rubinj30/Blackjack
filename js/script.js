// Create Deck
const suits = ['H', 'D', 'S', 'C']
const cards = 'A23456789TJQK'
const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]

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
    console.log(`player: ${playerCardsValue} dealer: ${dealerCardsValue}`)
    return playerCardsArray, dealerCardsArray
}

$('#deal').on('click', dealFirstFourCards)

// deals card and outputs dealtCard object, image, and value
let dealtCardObj = {}
let dealtCardImage = ''
let dealtCardValue = 0

// can do this in a function and then assign to the hit button. Don't need to have () after the function name
$('#hit').on('click', function() {
    dealtCardObj = shuffledDeckOfCards.shift()
    dealtCardImage = `${dealtCardObj.value}${dealtCardObj.suit}.png`
    dealtCardValue = dealtCardObj.value
    playerCardsValue += dealtCardValue
    playerCardsArray.push(dealtCardObj)
    console.log(playerCardsArray)
    return playerCardsArray
})

$('#player-cards').innerHTML = dealtCardImage

// logic for determining winner
// requires totals as parameters, which will only be provided once both players are done getting cards


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
