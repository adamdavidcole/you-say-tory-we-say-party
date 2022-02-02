import { ROLES } from './constants';

const MpCards = [
  {
    text: 'You’ve been pinged by the track and trace app, but you ignore it.',
    positionChangeText: 'Move forward 1 step.',
    computerPositionChangeText: 'He moves forward 1 step.',
    positionChange: 1,
    source:
      'https://www.telegraph.co.uk/travel/news/covid-travel-rules-double-vaccinated-amber-list-green-news/',
  },
  {
    text: 'Two people warn you to cancel the party, but you respond that they are "overreacting".',
    positionChangeText: 'Move forward 2 steps.',
    computerPositionChangeText: 'He moves forward 2 steps.',
    positionChange: 2,
    source: 'https://archive.is/9KH1M',
  },
  {
    text: 'Video surfaces of a Tory press secratery joking about knowingly breaking covid rules to throw a holiday party at 10 Downing Street — the public is furious.',
    positionChangeText: 'Move back 3 steps.',
    computerPositionChangeText: 'He moves back 3 steps.',
    positionChange: -3,
    source:
      'https://www.itv.com/news/2021-12-07/no-10-staff-joke-in-leaked-recording-about-christmas-party-they-later-denied',
  },
  {
    text: 'The public finds out you attended a party the day before Queen Elizabeth went to her husband’s funeral alone.',
    positionChangeText: 'Move back 3 steps.',
    computerPositionChangeText: 'He moves back 3 steps.',
    positionChange: -3,
    source: 'https://www.bbc.co.uk/news/uk-politics-59989946',
  },
  {
    text: 'Send out invites to 40 people on WhatsApp and request they bring Secret Santa gifts.',
    positionChangeText: 'Move forward 3 steps.',
    computerPositionChangeText: 'He moves forward 3 steps.',
    positionChange: 3,
    source:
      'https://www.thetimes.co.uk/article/downing-street-christmas-party-hosted-by-officials-kcqz6kmhp',
  },
  {
    text: 'Daily Mirror reports allegations that a party occurred at 10 Downing Street. There are no immediate consequences.',
    positionChangeText: 'Move forward 2 spaces.',
    computerPositionChangeText: 'He moves forward 2 spaces.',
    positionChange: 2,
    source: 'https://www.mirror.co.uk/news/politics/boris-johnson-broke-covid-lockdown-25585238',
  },
  {
    text: 'The prime minister denies that any rules were broken and no party occurred in spite of mounting evidence.',
    positionChangeText: 'Move forward 3 spaces.',
    computerPositionChangeText: 'He moves forward 3 spaces.',
    positionChange: 3,
    source:
      'https://www.independent.co.uk/news/uk/politics/boris-johnson-rishi-sunak-downing-street-party-b1971373.html',
  },
  {
    text: 'Cabinet secretary investigating if any covid-19 restrictions were broken quits amid reports he also hosted a Christmas party at Downing Street. You’re safe for now.',
    positionChangeText: 'Move forward 2 spaces.',
    computerPositionChangeText: 'He moves forward 2 spaces.',
    positionChange: 2,
    source: 'https://www.bbc.co.uk/news/uk-politics-59701369',
  },
  {
    text: 'Chair of London Assembly police and crime committee attends a Christmas Party on December 14, 2020.',
    positionChangeText: 'Move forward 1 space.',
    computerPositionChangeText: 'He moves forward 1 space.',
    positionChange: 1,
    source:
      'https://www.independent.co.uk/news/uk/politics/shaun-bailey-tory-christmas-party-quits-b1976193.html',
  },
  {
    text: 'Photo surfaces of you at a wine and cheese event at 10 Downing Street during lockdown.',
    positionChangeText: 'Move backward 2 steps.',
    computerPositionChangeText: 'He moves backward 2 steps.',
    positionChange: -2,
    source:
      'https://www.theguardian.com/politics/2021/dec/19/chatting-over-cheese-and-wine-anatomy-downing-street-lockdown-gathering-picture',
  },
  {
    text: 'Metropolitan Police initially decide not to open an investigation into possible breaches of covid-19 policy in spite of mounting evidence.',
    positionChangeText: 'Advance to next area.',
    computerPositionChangeText: 'He advances to next area.',
    positionChange: 5, // TODO: implement advance to next area
    source:
      'https://www.theguardian.com/uk-news/2021/dec/08/met-police-say-they-will-not-investigate-downing-street-christmas-party',
  },
  {
    text: 'Prime minister spokesperson claims covid rules have been followed at all times. When asked how that could possibly be true in spite of all the evidence, response: "It’s simply just a statement of fact.”',
    positionChangeText: 'Move forward 3 spaces.',
    computerPositionChangeText: 'He moves forward 3 spaces.',
    positionChange: 3,
    source:
      'https://www.huffingtonpost.co.uk/entry/no-christmas-party-downing-street-insists_uk_61adf747e4b0451e551833ca',
  },
  {
    text: 'Get invited to a party at Downing Street with games, nibbles and wine and claim it’s a “work event”.',
    positionChangeText: 'Move forward 3 spaces.',
    computerPositionChangeText: 'He moves forward 3 spaces.',
    positionChange: 3,
    source: 'https://twitter.com/bbcrosatkins/status/1466721316971728900?lang=en-GB',
  },
  {
    text: 'Send an email to over one hundred Downing Street staff inviting them “to make the most of the lovely weather and have some socially distanced drinks in the No 10 garden this evening.... bring your own booze!”',
    positionChangeText: 'Advance to next area',
    computerPositionChangeText: 'He advances to next area.',
    positionChange: 5, // TODO: implement advance to next area
    source:
      'https://www.theguardian.com/politics/2022/jan/10/email-shows-boris-johnsons-official-invited-no-10-staff-to-lockdown-byob-party',
  },
  {
    text: 'Admit to attending “an event” with drinks at Downing Street over lockdown, but claim you didn’t know it was a party.',
    positionChangeText: 'Do not move any steps.',
    computerPositionChangeText: 'He misses next turn.',
    positionChange: 0,
    source: 'https://www.bbc.co.uk/news/uk-politics-59969631',
  },
  {
    text: 'Go to the Co-op store on the Strand to fill a suitcase with bottles of wine the day before the UK was observing a period of national mourning.',
    positionChangeText: 'Move forward 2 spaces.',
    computerPositionChangeText: 'He moves forward 2 spaces.',
    positionChange: 2,
    source:
      'https://www.telegraph.co.uk/politics/2022/01/13/two-parties-held-downing-street-queen-country-mourned-death/',
  },
  {
    text: 'Draw up a plan, named "Operation Save Big Dog", in an attempt to retain your premiership in the face of "partygate" allegations.',
    positionChangeText: 'Move forward 1 space.',
    computerPositionChangeText: 'He moves forward 1 space.',
    positionChange: 1,
    source:
      'https://www.independent.co.uk/news/uk/politics/boris-johnson-downing-street-partygate-b1993433.html',
  },
  {
    text: 'Buy a dedicated wine fridge for "Wine time Fridays".',
    positionChangeText: 'Move forward 3 spaces.',
    computerPositionChangeText: 'He moves forward 3 space.',
    positionChange: 3,
    source:
      'https://www.independent.co.uk/news/uk/politics/boris-johnson-downing-street-party-b1993596.html',
  },
  {
    text: 'You’re caught driving 250 miles out of London to Durham during a tier 1 lock-down.',
    positionChangeText: 'Move back 1 step.',
    computerPositionChangeText: 'He moves bacm 1 step.',
    positionChange: -1,
    source:
      'https://www.theguardian.com/politics/2020/may/22/dominic-cummings-durham-trip-coronavirus-lockdown',
  },
  {
    text: 'Buy gifts to hand out at 10 Downing Christmas party.',
    positionChangeText: 'Move forward 4 steps.',
    computerPositionChangeText: 'He moves forward 4 steps.',
    positionChange: 4,
    source:
      'https://uk.news.yahoo.com/boris-johnson-claims-there-was-no-secret-santa-172456505.html',
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
    text: 'Today you woke up without a crushing sense of dread.',
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
