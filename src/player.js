import { MAX_COMMONER_POSITION, MAX_MP_POSITION, ROLES } from './constants';
import createId from './utilities/create-id';

export default class Player {
  constructor({ role, isComputer }) {
    this.id = createId();

    this.role = role;
    this.isComputer = isComputer;
    this.position = 0;
    this.isWinner = false;
  }

  getMaxPosition() {
    const maxPosition = this.role === ROLES.MP ? MAX_MP_POSITION : MAX_COMMONER_POSITION;
    return maxPosition;
  }

  updatePosition(positionChange) {
    this.position += positionChange;
    this.ensurePositionWithinBounds();
  }

  ensurePositionWithinBounds() {
    const maxPosition = this.getMaxPosition();
    if (this.position < 0) this.position = 0;
    if (this.position > maxPosition) this.position = maxPosition;
  }

  checkHasPlayerWon() {
    const maxPosition = this.getMaxPosition();
    const isWinner = this.position >= maxPosition;

    if (isWinner) this.isWinner = true;

    return isWinner;
  }
}
