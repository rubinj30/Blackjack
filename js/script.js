const deckItems = {
    shuffledCards: [],
    unshuffledCards: [],
    suits: ['H', 'D', 'S', 'C'],
    cards: '23456789TJQKA',
    values: [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11],
    createDeckOfCards: function () {

        for (let i = 0; i < this.suits.length; i++) {
            for (let j = 0; j < this.cards.length; j++) {
                const cardToAddToDeck = {
                    suit: this.suits[i],
                    card: this.cards[j],
                    value: this.values[j],
                }
                this.unshuffledCards.push(cardToAddToDeck)
            }
        }
    },
    shuffleCards: function () {
        this.createDeckOfCards()
        let n = this.unshuffledCards.length
        let i;
        // While there remain elements to shuffle…
        while (n) {
            // Pick a remaining element…
            i = Math.floor(Math.random() * this.unshuffledCards.length);
            // If not already shuffled, move it to the new array.
            if (i in this.unshuffledCards) {
                this.shuffledCards.push(this.unshuffledCards[i]);
                delete this.unshuffledCards[i];
                n--;
            }
        }
    }
}

const player = {
    cardsValueSum: 0,
    cards: [],
    score: 0
}

const dealer = {
    cardsValueSum: 0,
    cards: [],
    score: 0
}

const bets = {
    currentAmount: 5,
    bank: 500,
    changeAmount: function(amount) {
        this.currentAmount = amount
    },
    winHand: function() {
        this.bank += this.currentAmount
        $('#bank-amount').text(this.bank)

    },
    loseHand: function() {
        this.bank -= this.currentAmount
        $('#bank-amount').text(this.bank)
    }
}

// Each card dealt is dealt to this object that contains value, image
let dealtCardObj = {}

// Deal out first four cards from shuffled deck
// One card to Player, one to dealer, one to player, one to dealer
function dealFirstFourCards() {

    // resets for round when 'Deal is clicked'
    resetHands()
    for (let i = 0; i < 4; i++) {
        const dealtCardObj = deckItems.shuffledCards.shift()
        // first and third go to Player. Tracking values, objects, and images
        if (i % 2 === 0) {
            player.cardsValueSum += dealtCardObj.value
            player.cards.push(dealtCardObj)
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
            if (i === 1) {
                setTimeout(function () { $(`#card-image-${i}`).replaceWith(`<img class='card-image-size' id='card-image-${i}' src='./images/${dealtCardObj.card}${dealtCardObj.suit}.png' />`) }, 1000)
            }
            else {
                setTimeout(function () { $(`#card-image-${i}`).replaceWith(`<img class='card-image-size' id='card-image-${i}' src='./images/JB_card.jpg' />`) }, 2000)
            }
        }
    }
    // if Player starts 21, then they automatically win the round 
    // got a blackjack while testing and this
    if (player.cardsValueSum === 21) {
        player.score += bets.currentAmount
        $('#player-scoreboard').text(player.score)
        setTimeout(() => {
            swal('BLACKJACK! You win!')
            bets.winHand()
        }, 1000)
    }
    // If Player did not get 21 immediately and the Dealer does get 21 after the deal, then the dealer automatically wins
    else if (dealer.cardsValueSum === 21) {
        dealer.score += bets.currentAmount
        $('#dealer-scoreboard').text(dealer.score)
        setTimeout(() => {
            swal('Jack Black with a Blackjack! You lose.')
            bets.loseHand()
        }, 1000)
    }
    console.log(`player: ${player.cardsValueSum} dealer: ${dealer.cardsValueSum}`)
    return player.cards, dealer.cards, player.cardsValueSum, dealer.cardsValueSum
}

const checkPlayerCardSumValue = function () {
    if (player.cardsValueSum > 21) {
        dealer.score += bets.currentAmount
        $('#dealer-scoreboard').text(dealer.score)
        setTimeout(function () { swal('BUSTED! You went over 21. You lose!').then(() => {
            bets.loseHand()
            resetHands()
        })}, 400)
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
        dealer.score += bets.currentAmount
        $('#dealer-scoreboard').text(dealer.score)
        setTimeout(() => {swal('Jack wins this round!').then(() => {
            bets.loseHand()
            resetHands()
        })}, 1000)
    }
    else if (dealerTotal < playerTotal) {
        player.score += bets.currentAmount
        $('#player-scoreboard').text(player.score)
        setTimeout(() => {swal('You win!').then(() => {
            bets.winHand()
            resetHands()
        })}, 1000)
    }
    else {
        setTimeout(() => {swal('This round is a draw').then(() => {
            resetHands()
        })}, 1000)
    }
}


function giveCardsToDealerAfterStand() {
    while (dealer.cardsValueSum < 17) {
        setTimeout(1000)
        dealtCardObj = deckItems.shuffledCards.shift()
        dealer.cardsValueSum += dealtCardObj.value
        dealer.cards.push(dealtCardObj)
        $("#dealer-cards").append(`<img class='card-image-size' src='./images/${dealtCardObj.card}${dealtCardObj.suit}.png' />`)
    }
    // return dealer.cardsValueSum, dealer.cardss
    if (dealer.cardsValueSum > 21) {
        player.score += bets.currentAmount
        $('#player-scoreboard').text(player.score)
        setTimeout(function () { swal('The dealer busted. You win!').then(() => {
            bets.winHand()
            resetHands()
        })}, 1000)
        
    }
    else {
        setTimeout(compareDealerAndPlayerTotals(dealer.cardsValueSum, player.cardsValueSum), 1000)
    }
}


// DEAL CARDS OUT AND PLAY GAME 
deckItems.shuffleCards()

// clicking deal resets from the previous hand and deals out first four cards
$('#deal').on('click', dealFirstFourCards)

// can do this in a function and then assign to the hit button. Don't need to have () after the function name
$('#hit').on('click', function () {
    dealtCardObj = deckItems.shuffledCards.shift()
    dealtCardImage = `${dealtCardObj.value}${dealtCardObj.suit}.png`
    player.cardsValueSum += dealtCardObj.value
    player.cards.push(dealtCardObj)
    $("#player-cards").append(`<img class='card-image-size' src='./images/${dealtCardObj.card}${dealtCardObj.suit}.png' />`)
    setTimeout(checkPlayerCardSumValue(), 5000)
    return player.cards, player.cardsValueSum
})

// when 'Stand' clicked, flip the dealer's 2nd card
$('#stand').on('click', function () {
    $('#card-image-3').replaceWith(`<img class='card-image-size' src='./images/${dealer.cards[1].card}${dealer.cards[1].suit}.png' />`)
})

// also deal out other cards
$('#stand').on('click', giveCardsToDealerAfterStand)



// choose bettinng amount 
$('#five').on('click', function() {
    bets.changeAmount(5)
    console.log(bets.currentAmount)
})

$('#ten').on('click', function() {
    bets.changeAmount(10)
    console.log(bets.currentAmount)
})

$('#twenty-five').on('click', function() {
    bets.changeAmount(25)
    console.log(bets.currentAmount)
})
