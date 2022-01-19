import { ROLES } from './constants';

const MpCards = [
  {
    text: 'You’ve been pinged by the track and trace app, but you ignore it.',
    positionChangeText: 'Move forward 1 step.',
    positionChange: 1,
  },
  {
    text: 'Two people warn you not to cancel the party, but you respond that they are "overreacting".',
    positionChangeText: 'Move forward 2 steps.',
    positionChange: 2,
  },
  {
    text: 'A BBC news interview goes badly wrong. You have to contact some client journalists to write articles in your defense and argue to cut license fees.',
    positionChangeText: 'Do not move any steps.',
    positionChange: 0,
  },
  {
    text: 'The public finds out you attended a party the day before Queen Elizabeth went to her husband’s funeral alone.',
    positionChangeText: 'Move back 3 steps.',
    positionChange: -3,
  },
  {
    text: 'Send out invites to 40 people on WhatsApp and request they bring Secret Santa gifts.',
    positionChangeText: 'Move forward 3 steps.',
    positionChange: 3,
  },
  {
    text: 'Daily Mirror reports allegations that a party occurred at 10 Downing Street. There are no immediate consequences.',
    positionChangeText: 'Move forward 2 spaces.',
    positionChange: 2,
  },
  {
    text: 'The prime minister denies that any rules were broken and no party occurred.',
    positionChangeText: 'Move forward 3 spaces.',
    positionChange: 3,
  },
  {
    text: 'Cabinet secretary investigating if any covid-19 restrictions were broken also hosted a Christmas party. You’re safe for now.',
    positionChangeText: 'Move forward 2 spaces.',
    positionChange: 2,
  },
  {
    text: 'Chair of London Assembly police and crime committee attends a Christmas Party on December 14, 2020.',
    positionChangeText: 'Move forward 1 space.',
    positionChange: 1,
  },
  {
    text: 'Photo surfaces of you at a wine and cheese event at 10 Downing Street during lockdown.',
    positionChangeText: 'Move backward 3 steps.',
    positionChange: -3,
  },
  {
    text: 'Metropolitan Police decides not to open an investigation into possible breaches of covid-19 policy in spite of mounting evidence.',
    positionChangeText: 'Advance to next area.',
    positionChange: 5, // TODO: implement advance to next area
  },
  {
    text: 'Prime minister spokesperson claims covid rules have been followed at all times. When asked how that could possibly be true in spite of all the evidence, response: "It is simply just a statement of fact.”',
    positionChangeText: 'Move forward 3 spaces.',
    positionChange: 3,
  },
  {
    text: 'Get invited to a party at Downing Street with games, nibbles and wine and claim it’s a “work event”.',
    positionChangeText: 'Move forward 3 spaces.',
    positionChange: 3,
  },
  {
    text: 'Send an email to over one hundred Downing Street staff inviting them “to make the most of the lovely weather and have some socially distanced drinks in the No 10 garden this evening.... bring your own booze!”',
    positionChangeText: 'Advance to next area',
    positionChange: 5, // TODO: implement advance to next area
  },
  {
    text: 'Admit to attending “an event” with drinks at Downing Street over lockdown, but claim you didn’t know it was a party.',
    positionChangeText: 'Miss next turn',
    positionChange: -3, // TODO: implement skip turn
  },
  {
    text: 'Go to the Co-op store on the Strand to fill a suitcase with bottles of wine the day before the UK was observing a period of national mourning.',
    positionChangeText: 'Move forward 2 spaces.',
    positionChange: 2,
  },
  {
    text: 'Draw up a plan, named "Operation Save Big Dog", in an attempt to retain your premiership in the face of "partygate" allegations.',
    positionChangeText: 'Move forward 1 space.',
    positionChange: 1,
  },
  {
    text: 'Buy a dedicated wine fridge for "Wine time Fridays".',
    positionChangeText: 'Move forward 3 spaces.',
    positionChange: 3,
  },
  {
    text: 'You’re caught driving 250 miles out of London to Durham during a tier 1 lock-down.',
    positionChangeText: 'Move back 1 step.',
    positionChange: -1,
  },
  {
    text: 'Buy gifts to hand out at 10 Downing Christmas party.',
    positionChangeText: 'Move forward 4 steps.',
    positionChange: 4,
  },
];

const CommonerCards = [
  {
    text: 'You test negative for Covid. The sun is shining. It’s a good day.',
    positionChangeText: 'Move forward 1 step.',
    positionChange: 1,
  },
  {
    text: 'Police stop you and ask where you’re going. The police don’t believe you and you are fined',
    positionChangeText: 'Move back 1 step.',
    positionChange: -1,
  },
  {
    text: 'Fuel shortages mean you can’t get any petrol. You’re stuck.',
    positionChangeText: 'Do not move any steps.',
    positionChange: -1,
  },
  {
    text: 'There are supply chain issues. Spend an hour driving around looking for food to bring to the hospital.',
    positionChangeText: 'Move back 1 step.',
    positionChange: -1,
  },
  {
    text: 'You test negative for Covid. The sun is shining. It’s a good day.',
    positionChangeText: 'Move forward 1 step.',
    positionChange: 1,
  },
  {
    text: 'You test negative for Covid. The sun is shining. It’s a good day.',
    positionChangeText: 'Move forward 1 step.',
    positionChange: 1,
  },
  {
    text: 'New and tighter lockdown restrictions were announced.',
    positionChangeText: 'Do not move any steps.',
    positionChange: 0,
  },
  {
    text: 'You caught Covid. Self-isolate for 10 days.',
    positionChangeText: 'Move back to the beginning.',
    positionChange: -5,
  },
  {
    text: 'Your company did not shut down and you get to keep your job.',
    positionChangeText: 'Move forward 1 step.',
    positionChange: 1,
  },
  {
    text: 'New and tighter lockdown restrictions were announced.',
    positionChangeText: 'Do not move any steps.',
    positionChange: 0,
  },
  {
    text: 'Your company did not shut down and you get to keep your job.',
    positionChangeText: 'Move forward 1 step.',
    positionChange: 1,
  },
  {
    text: 'New and tighter lockdown restrictions were announced.',
    positionChangeText: 'Do not move any steps.',
    positionChange: 0,
  },
  {
    text: 'You did something great today.',
    positionChangeText: 'Move forward 1 step.',
    positionChange: 1,
  },
  {
    text: 'You have to stay home with your kids to help them with remote learning.',
    positionChangeText: 'Move back 1 step.',
    positionChange: -1,
  },
  {
    text: 'New and tighter lockdown restrictions were announced.',
    positionChangeText: 'Do not move any steps.',
    positionChange: 0,
  },
  {
    text: 'You did something great today.',
    positionChangeText: 'Move forward 1 step.',
    positionChange: 1,
  },
  {
    text: 'New and tighter lockdown restrictions were announced.',
    positionChangeText: 'Do not move any steps.',
    positionChange: 0,
  },
  {
    text: 'New and tighter lockdown restrictions were announced.',
    positionChangeText: 'Do not move any steps.',
    positionChange: 0,
  },
  {
    text: 'You did something great today.',
    positionChangeText: 'Move forward 1 step.',
    positionChange: 1,
  },
  {
    text: 'You caught Covid. Self-isolate for 10 days.',
    positionChangeText: 'Move back to the beginning.',
    positionChange: -5,
  },
];

export function getMpCards() {
  return [...MpCards];
}

export function getCommonerCards() {
  return [...CommonerCards];
}

export default function getCards(role) {
  if (role === ROLES.MP) {
    return getMpCards();
  }

  return getCommonerCards();
}
