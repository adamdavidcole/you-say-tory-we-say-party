/* eslint-disable no-plusplus */
import shuffleArray from './utilities/shuffle-array';
import getCards from './card-data';

let lastCardDrawn;

export function getLastCardDraw() {
  return lastCardDrawn;
}

export default class CardDeck {
  constructor(role) {
    const unshuffledCards = getCards(role);

    this.role = role;
    this.cards = shuffleArray(unshuffledCards);
    this.currIndex = 0;
  }

  drawCard() {
    const card = this.cards[this.currIndex];
    this.currIndex++;

    // if we have gone through all the cards, reset the index counter and shuffle deck
    if (this.currIndex === this.cards.length) {
      this.currIndex = 0;
      this.shuffleDeck();
    }

    lastCardDrawn = card;

    return card;
  }

  peekCard() {
    return this.cards[this.currIndex];
  }

  shuffleDeck() {
    this.cards = shuffleArray(this.cards);
  }
}
