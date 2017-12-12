// should i put these into an object? 
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

// create new array of shuffled cards
const shuffledDeckOfCards = shuffleCards(unshuffledDeckOfCards)