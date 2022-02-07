import {
  MAX_COMMONER_POSITION,
  MAX_MP_POSITION,
  ROLES,
  POSITION_CHANGE_SPECIAL,
} from './constants';
import createId from './utilities/create-id';

const mpPlayerNames = ['Boris J.', 'Nadine D.', 'Jacob R.M.'];
const commonerName = 'Commoner';

export default class Player {
  constructor({ role, index, isComputer }) {
    this.id = createId();

    this.role = role;
    this.index = index;
    this.isComputer = isComputer;
    this.position = 1;
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
    if (positionChange === POSITION_CHANGE_SPECIAL.ADVANCE) {
      const areaSize = MAX_MP_POSITION / 4;
      this.position += areaSize - ((this.position - 1) % areaSize);
    } else {
      this.position += positionChange;
    }

    this.ensurePositionWithinBounds();
  }

  ensurePositionWithinBounds() {
    const maxPosition = this.getMaxPosition();
    if (this.position <= 1) this.position = 1;
    if (this.position > maxPosition) this.position = maxPosition;
  }

  checkHasPlayerWon() {
    const maxPosition = this.getMaxPosition();
    const isWinner = this.position >= maxPosition;

    if (isWinner) this.isWinner = true;

    return isWinner;
  }
}
