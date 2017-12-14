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

const player = {
    cardsValueSum: 0,
    cards: [],
    cardsImages: [],
    score: 0
}
const dealer = {
    cardsValueSum: 0,
    cards: [],
    cardsImages: [],
    score: 0
}

let dealtCardObj = {}
let dealtCardImage = ''
let dealtCardValue = 0

// Deal out first four cards from shuffled deck
// One card to Player, one to dealer, one to player, one to dealer
function dealFirstFourCards() {
    // resets for round when 'Deal is clicked'
    resetHands()
    for (let i = 0; i < 4; i++) {
        const dealtCardObj = shuffledDeckOfCards.shift()
        // first and third go to Player. Tracking values, objects, and images
        if (i % 2 === 0) {
            player.cardsValueSum += dealtCardObj.value
            player.cards.push(dealtCardObj)
            player.cardsImages.push(`${dealtCardObj.value}${dealtCardObj.suit}.png`)
            if (i === 0) {
                setTimeout(function () { $(`#card-image-${i}`).replaceWith(`<img class='card-image-size' id='card-image-${i}' src='./images/${dealtCardObj.card}${dealtCardObj.suit}.png' />`) }, 500)
            }
            else {
                setTimeout(function () { $(`#card-image-${i}`).replaceWith(`<img class='card-image-size' id='card-image-${i}' src='./images/${dealtCardObj.card}${dealtCardObj.suit}.png' />`) }, 1500)
            }

        }
        else {
            dealer.cardsValueSum += dealtCardObj.value
            dealer.cards.push(dealtCardObj)
            dealer.cardsImages.push(`${dealtCardObj.value}${dealtCardObj.suit}.png`)
            if (i === 1) {
                setTimeout(function () { $(`#card-image-${i}`).replaceWith(`<img class='card-image-size' id='card-image-${i}' src='./images/${dealtCardObj.card}${dealtCardObj.suit}.png' />`) }, 1000)
            }
            else {
                setTimeout(function () { $(`#card-image-${i}`).replaceWith(`<img class='card-image-size' id='card-image-${i}' src='./images/${dealtCardObj.card}${dealtCardObj.suit}.png' />`) }, 2000)
            }
        }
    }
    // if Player starts 21, then they automatically win the round 
    // got a blackjack while testing and this
    if (player.cardsValueSum === 21) {
        player.score += 1
        $('#player-scoreboard').text(player.score)
        console.log(`player new score ${player.score}`)
        alert('BLACKJACK! You win!')
    }
    // If Player did not get 21 immediately and the Dealer does get 21 after the deal, then the dealer automatically wins
    else if (dealer.cardsValueSum === 21) {
        dealer.score += 1
        $('#dealer-scoreboard').text(dealer.score)
        console.log(`dealer new score ${dealer.score}`)
        alert('Jack Black with a Blackjack. He wins. You lose.')
    }
    console.log(`player: ${player.cardsValueSum} dealer: ${dealer.cardsValueSum}`)
    return player.cards, dealer.cards, player.cardsValueSum, dealer.cardsValueSum
}

const checkPlayerCardSumValue = function () {
    if (player.cardsValueSum > 21) {
        dealer.score += 1
        $('#dealer-scoreboard').text(dealer.score)
        console.log(`dealer new score ${dealer.score}`)
        setTimeout(function() {alert('BUSTED! You went over 21. You lose!') }, 1000)
    }
}

function resetHands() {
    player.cardsValueSum = 0
    player.cards = []
    dealer.cardsValueSum = 0
    dealer.cards = []
    $('#player-cards').html('').append("<img class='card-image-size' id='card-image-0' src='./images/JB_card.jpg' />")
    $('#player-cards').append("<img class='card-image-size' id='card-image-2' src='./images/JB_card.jpg' />")
    $('#dealer-cards').html('').append("<img class='card-image-size' id='card-image-1' src='./images/JB_card.jpg' />")
    $('#dealer-cards').append("<img class='card-image-size' id='card-image-3' src='./images/JB_card.jpg' />")
}
function compareDealerAndPlayerTotals(dealerTotal, playerTotal) {
    if (dealerTotal > playerTotal) {
        dealer.score += 1
        $('#dealer-scoreboard').text(dealer.score)
        console.log(`dealer new score ${dealer.score}`)
        alert('The dealer wins this round.')
    }
    else if (dealerTotal < playerTotal) {
        player.score += 1
        $('#player-scoreboard').text(player.score)
        console.log(`player new score ${player.score}`)
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
        $("#dealer-cards").append(`<img class='card-image-size' src='./images/${dealtCardObj.card}${dealtCardObj.suit}.png' />`)
    }
    console.log(`Dealer total: ${dealer.cardsValueSum}`)
    // return dealer.cardsValueSum, dealer.cardss
    if (dealer.cardsValueSum > 21) {
        console.log(`Dealer total: ${dealer.cardsValueSum}`)
        player.score += 1
        $('#player-scoreboard').text(player.score)
        setTimeout(function () {alert('The dealer busted. You win!')}, 1500)
    }
    else {
        console.log(`Dealer total: ${dealer.cardsValueSum}`)
        setTimeout(compareDealerAndPlayerTotals(dealer.cardsValueSum, player.cardsValueSum), 1000)
    }
}

// clicking deal resets from the previous hand and deals out first four cards
$('#deal').on('click', dealFirstFourCards)

// can do this in a function and then assign to the hit button. Don't need to have () after the function name
$('#hit').on('click', function () {
    dealtCardObj = shuffledDeckOfCards.shift()
    dealtCardImage = `${dealtCardObj.value}${dealtCardObj.suit}.png`
    player.cardsValueSum += dealtCardObj.value
    player.cards.push(dealtCardObj)
    $("#player-cards").append(`<img class='card-image-size' src='./images/${dealtCardObj.card}${dealtCardObj.suit}.png' />`)
    console.log(`Player's Card Value Total: ${player.cardsValueSum}`) // will need to place DOM image replacement here
    setTimeout(checkPlayerCardSumValue(), 5000)
    return player.cards, player.cardsValueSum
})

$('#stand').on('click', giveCardsToDealerAfterStand)


