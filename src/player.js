import { MAX_COMMONER_POSITION, MAX_MP_POSITION, ROLES } from './constants';
import createId from './utilities/create-id';

const mpPlayerNames = ['Boris J.', 'Allegra S.', 'Shaun B.'];
const commonerName = 'Commoner';

export default class Player {
  constructor({ role, index, isComputer }) {
    this.id = createId();

    this.role = role;
    this.index = index;
    this.isComputer = isComputer;
    this.position = 0;
    this.isWinner = false;

    if (this.role === ROLES.MP) {
      this.name = mpPlayerNames[this.index];
    } else {
      this.name = commonerName;
    }
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
