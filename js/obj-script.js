const AppController = {

}

const Presenter = {
}

const DeckOfCards = {
    suits: ['H', 'D', 'S', 'C'],
    cards: 'A23456789TJQK',
    values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10],
    createDeckOfCards: function() {
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
    },
    shuffleCards: function(deckToShuffle) {
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
      },
    
}

const Scoring = {
    compareDealerAndPlayerTotals: function () {
        if (dealerTotal > playerTotal) {
            return 'The dealer wins this round.'
        }
        else if (dealerTotal < playerTotal) {
            return 'You win the round!'
        }
        else {
            return 'This round is a draw.'
        }
    },
}