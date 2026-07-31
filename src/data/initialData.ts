import { Team, Match, Player } from '../types';

export const initialTeams: Team[] = [
  // GROUP A
  {
    id: 'team-a1',
    name: 'PERSIANEMPIRE',
    shortName: 'EMP',
    group: 'A',
    logo: '',
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    form: []
  },
  {
    id: 'team-a2',
    name: 'GORGALI FC',
    shortName: 'GOR',
    group: 'A',
    logo: '',
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    form: []
  },
  {
    id: 'team-a3',
    name: 'AFTABESAZI',
    shortName: 'AFT',
    group: 'A',
    logo: '',
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    form: []
  },
  {
    id: 'team-a4',
    name: 'MATADORIR',
    shortName: 'MAT',
    group: 'A',
    logo: '',
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    form: []
  },
  {
    id: 'team-a5',
    name: 'CHAEE KHORAN',
    shortName: 'CHK',
    group: 'A',
    logo: '',
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    form: []
  },
  {
    id: 'team-a6',
    name: 'ULTIMO BAILE',
    shortName: 'ULT',
    group: 'A',
    logo: '',
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    form: []
  },
  {
    id: 'team-a7',
    name: 'TITANS',
    shortName: 'TIT',
    group: 'A',
    logo: '',
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    form: []
  },

  // GROUP B
  {
    id: 'team-b1',
    name: 'MESSHAHRBABAK',
    shortName: 'MSH',
    group: 'B',
    logo: '',
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    form: []
  },
  {
    id: 'team-b2',
    name: 'SPIRITS',
    shortName: 'SPI',
    group: 'B',
    logo: '',
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    form: []
  },
  {
    id: 'team-b3',
    name: 'TEHRAN LEGACY',
    shortName: 'LEG',
    group: 'B',
    logo: '',
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    form: []
  },
  {
    id: 'team-b4',
    name: 'DARYASALAR',
    shortName: 'DAR',
    group: 'B',
    logo: '',
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    form: []
  },
  {
    id: 'team-b5',
    name: 'A R Y A',
    shortName: 'ARY',
    group: 'B',
    logo: '',
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    form: []
  },
  {
    id: 'team-b6',
    name: 'ALNAHD',
    shortName: 'ALN',
    group: 'B',
    logo: '',
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    form: []
  },
  {
    id: 'team-b7',
    name: 'BELAAD',
    shortName: 'BEL',
    group: 'B',
    logo: '',
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    form: []
  },

  // GROUP C
  {
    id: 'team-c1',
    name: 'PERSIANGULF',
    shortName: 'PGL',
    group: 'C',
    logo: '',
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    form: []
  },
  {
    id: 'team-c2',
    name: 'VANGUARD FC',
    shortName: 'VAN',
    group: 'C',
    logo: '',
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    form: []
  },
  {
    id: 'team-c3',
    name: 'SOROUSHFC',
    shortName: 'SOR',
    group: 'C',
    logo: '',
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    form: []
  },
  {
    id: 'team-c4',
    name: 'TAPE',
    shortName: 'TAP',
    group: 'C',
    logo: '',
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    form: []
  },
  {
    id: 'team-c5',
    name: 'BAY CLUB',
    shortName: 'BAY',
    group: 'C',
    logo: '',
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    form: []
  },
  {
    id: 'team-c6',
    name: 'AZABE ELAHI',
    shortName: 'AZA',
    group: 'C',
    logo: '',
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    form: []
  },
  {
    id: 'team-c7',
    name: 'AZADI',
    shortName: 'AZD',
    group: 'C',
    logo: '',
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    form: []
  },

  // GROUP D
  {
    id: 'team-d1',
    name: 'KAKASIAH',
    shortName: 'KAK',
    group: 'D',
    logo: '',
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    form: []
  },
  {
    id: 'team-d2',
    name: 'YOUNG WIZARD',
    shortName: 'WIZ',
    group: 'D',
    logo: '',
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    form: []
  },
  {
    id: 'team-d3',
    name: 'AFTAFA SAZAN FC',
    shortName: 'ASF',
    group: 'D',
    logo: '',
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    form: []
  },
  {
    id: 'team-d4',
    name: 'VIKINGS',
    shortName: 'VKS',
    group: 'D',
    logo: '',
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    form: []
  },
  {
    id: 'team-d5',
    name: 'Y A D',
    shortName: 'YAD',
    group: 'D',
    logo: '',
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    form: []
  },
  {
    id: 'team-d6',
    name: 'FESHAR UTD',
    shortName: 'FSH',
    group: 'D',
    logo: '',
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    form: []
  },
  {
    id: 'team-d7',
    name: 'RMP FC',
    shortName: 'RMP',
    group: 'D',
    logo: '',
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    form: []
  }
];

export const initialMatches: Match[] = [
  // GROUP A MATCHES
  {
    id: 'm-sun-1',
    group: 'A',
    round: 1,
    homeTeamId: 'team-a4',
    awayTeamId: 'team-a5',
    homeTeamName: 'MATADORIR',
    awayTeamName: 'CHAEE KHORAN',
    homeScore: 1,
    awayScore: 0,
    status: 'finished',
    date: 'Sunday',
    day: 'Sunday',
    time: 'FT'
  },
  {
    id: 'm-mon-2',
    group: 'A',
    round: 1,
    homeTeamId: 'team-a1',
    awayTeamId: 'team-a7',
    homeTeamName: 'PERSIANEMPIRE',
    awayTeamName: 'TITANS',
    homeScore: 1,
    awayScore: 1,
    status: 'finished',
    date: 'Monday',
    day: 'Monday',
    time: 'FT'
  },
  {
    id: 'm-mon-8',
    group: 'A',
    round: 1,
    homeTeamId: 'team-a3',
    awayTeamId: 'team-a6',
    homeTeamName: 'AFTABESAZI',
    awayTeamName: 'ULTIMO BAILE',
    homeScore: 3,
    awayScore: 2,
    status: 'finished',
    date: 'Monday',
    day: 'Monday',
    time: 'FT'
  },
  {
    id: 'm-tue-1',
    group: 'A',
    round: 2,
    homeTeamId: 'team-a3',
    awayTeamId: 'team-a4',
    homeTeamName: 'AFTABESAZI',
    awayTeamName: 'MATADORIR',
    homeScore: 3,
    awayScore: 1,
    status: 'finished',
    date: 'Tuesday',
    day: 'Tuesday',
    time: 'FT'
  },
  {
    id: 'm-tue-8',
    group: 'A',
    round: 2,
    homeTeamId: 'team-a2',
    awayTeamId: 'team-a5',
    homeTeamName: 'GORGALI FC',
    awayTeamName: 'CHAEE KHORAN',
    homeScore: 3,
    awayScore: 0,
    status: 'finished',
    date: 'Tuesday',
    day: 'Tuesday',
    time: 'FT'
  },
  {
    id: 'm-tue-9',
    group: 'A',
    round: 2,
    homeTeamId: 'team-a7',
    awayTeamId: 'team-a2',
    homeTeamName: 'TITANS',
    awayTeamName: 'GORGALI FC',
    homeScore: 11,
    awayScore: 1,
    status: 'finished',
    date: 'Tuesday',
    day: 'Tuesday',
    time: 'FT'
  },
  {
    id: 'm-res-a-2-1',
    group: 'A',
    round: 2,
    homeTeamId: 'team-a6',
    awayTeamId: 'team-a1',
    homeTeamName: 'ULTIMO BAILE',
    awayTeamName: 'PERSIANEMPIRE',
    homeScore: 2,
    awayScore: 0,
    status: 'finished',
    date: 'Wednesday',
    day: 'Tuesday',
    time: 'FT'
  },
  {
    id: 'm-res-a-2-2',
    group: 'A',
    round: 2,
    homeTeamId: 'team-a5',
    awayTeamId: 'team-a7',
    homeTeamName: 'CHAEE KHORAN',
    awayTeamName: 'TITANS',
    homeScore: 4,
    awayScore: 2,
    status: 'finished',
    date: 'Wednesday',
    day: 'Tuesday',
    time: 'FT'
  },
  {
    id: 'm-res-a-3-1',
    group: 'A',
    round: 3,
    homeTeamId: 'team-a3',
    awayTeamId: 'team-a2',
    homeTeamName: 'AFTABESAZI',
    awayTeamName: 'GORGALI FC',
    homeScore: 3,
    awayScore: 1,
    status: 'finished',
    date: 'Wednesday',
    day: 'Tuesday',
    time: 'FT'
  },
  {
    id: 'm-sat-a-1',
    group: 'A',
    round: 3,
    homeTeamId: 'team-a3',
    awayTeamId: 'team-a7',
    homeTeamName: 'AFTABESAZI',
    awayTeamName: 'TITANS',
    homeScore: null,
    awayScore: null,
    status: 'upcoming',
    date: 'Saturday',
    day: 'Saturday',
    time: '01:30'
  },
  {
    id: 'm-sat-a-2',
    group: 'A',
    round: 3,
    homeTeamId: 'team-a1',
    awayTeamId: 'team-a5',
    homeTeamName: 'PERSIANEMPIRE',
    awayTeamName: 'CHAEE KHORAN',
    homeScore: null,
    awayScore: null,
    status: 'upcoming',
    date: 'Saturday',
    day: 'Saturday',
    time: '11:30'
  },
  {
    id: 'm-sat-a-3',
    group: 'A',
    round: 3,
    homeTeamId: 'team-a6',
    awayTeamId: 'team-a4',
    homeTeamName: 'ULTIMO BAILE',
    awayTeamName: 'MATADORIR',
    homeScore: null,
    awayScore: null,
    status: 'upcoming',
    date: 'Saturday',
    day: 'Saturday',
    time: '00:00'
  },

  // GROUP B MATCHES
  {
    id: 'm-sun-2',
    group: 'B',
    round: 1,
    homeTeamId: 'team-b1',
    awayTeamId: 'team-b7',
    homeTeamName: 'MESSHAHRBABAK',
    awayTeamName: 'BELAAD',
    homeScore: 3,
    awayScore: 0,
    status: 'finished',
    date: 'Sunday',
    day: 'Sunday',
    time: 'FT'
  },
  {
    id: 'm-sun-4',
    group: 'B',
    round: 1,
    homeTeamId: 'team-b6',
    awayTeamId: 'team-b3',
    homeTeamName: 'ALNAHD',
    awayTeamName: 'TEHRAN LEGACY',
    homeScore: 2,
    awayScore: 0,
    status: 'finished',
    date: 'Sunday',
    day: 'Sunday',
    time: 'FT'
  },
  {
    id: 'm-mon-1',
    group: 'B',
    round: 1,
    homeTeamId: 'team-b4',
    awayTeamId: 'team-b3',
    homeTeamName: 'DARYASALAR',
    awayTeamName: 'TEHRAN LEGACY',
    homeScore: 4,
    awayScore: 1,
    status: 'finished',
    date: 'Monday',
    day: 'Monday',
    time: 'FT'
  },
  {
    id: 'm-mon-3',
    group: 'B',
    round: 1,
    homeTeamId: 'team-b2',
    awayTeamId: 'team-b5',
    homeTeamName: 'SPIRITS',
    awayTeamName: 'A R Y A',
    homeScore: 2,
    awayScore: 1,
    status: 'finished',
    date: 'Monday',
    day: 'Monday',
    time: 'FT'
  },
  {
    id: 'm-tue-4',
    group: 'B',
    round: 2,
    homeTeamId: 'team-b2',
    awayTeamId: 'team-b7',
    homeTeamName: 'SPIRITS',
    awayTeamName: 'BELAAD',
    homeScore: 3,
    awayScore: 0,
    status: 'finished',
    date: 'Tuesday',
    day: 'Tuesday',
    time: 'FT'
  },
  {
    id: 'm-tue-11',
    group: 'B',
    round: 2,
    homeTeamId: 'team-b4',
    awayTeamId: 'team-b5',
    homeTeamName: 'DARYASALAR',
    awayTeamName: 'A R Y A',
    homeScore: 2,
    awayScore: 2,
    status: 'finished',
    date: 'Tuesday',
    day: 'Tuesday',
    time: 'FT'
  },
  {
    id: 'm-res-b-3-1',
    group: 'B',
    round: 3,
    homeTeamId: 'team-b3',
    awayTeamId: 'team-b7',
    homeTeamName: 'TEHRAN LEGACY',
    awayTeamName: 'BELAAD',
    homeScore: 3,
    awayScore: 0,
    status: 'finished',
    date: 'Wednesday',
    day: 'Tuesday',
    time: 'FT'
  },
  {
    id: 'm-res-b-3-2',
    group: 'B',
    round: 3,
    homeTeamId: 'team-b2',
    awayTeamId: 'team-b3',
    homeTeamName: 'SPIRITS',
    awayTeamName: 'TEHRAN LEGACY',
    homeScore: 2,
    awayScore: 1,
    status: 'finished',
    date: 'Wednesday',
    day: 'Tuesday',
    time: 'FT'
  },
  {
    id: 'm-res-b-3-3',
    group: 'B',
    round: 3,
    homeTeamId: 'team-b5',
    awayTeamId: 'team-b1',
    homeTeamName: 'A R Y A',
    awayTeamName: 'MESSHAHRBABAK',
    homeScore: 0,
    awayScore: 0,
    status: 'finished',
    date: 'Wednesday',
    day: 'Tuesday',
    time: 'FT'
  },
  {
    id: 'm-res-b-4-1',
    group: 'B',
    round: 4,
    homeTeamId: 'team-b5',
    awayTeamId: 'team-b7',
    homeTeamName: 'A R Y A',
    awayTeamName: 'BELAAD',
    homeScore: 3,
    awayScore: 0,
    status: 'finished',
    date: 'Wednesday',
    day: 'Tuesday',
    time: 'FT'
  },
  {
    id: 'm-sat-b-1',
    group: 'B',
    round: 3,
    homeTeamId: 'team-b1',
    awayTeamId: 'team-b6',
    homeTeamName: 'MESSHAHRBABAK',
    awayTeamName: 'ALNAHD',
    homeScore: null,
    awayScore: null,
    status: 'upcoming',
    date: 'Saturday',
    day: 'Saturday',
    time: '11:00'
  },
  {
    id: 'm-sat-b-2',
    group: 'B',
    round: 3,
    homeTeamId: 'team-b6',
    awayTeamId: 'team-b4',
    homeTeamName: 'ALNAHD',
    awayTeamName: 'DARYASALAR',
    homeScore: null,
    awayScore: null,
    status: 'upcoming',
    date: 'Saturday',
    day: 'Saturday',
    time: '11:30'
  },

  // GROUP C MATCHES
  {
    id: 'm-sun-3',
    group: 'C',
    round: 1,
    homeTeamId: 'team-c7',
    awayTeamId: 'team-c2',
    homeTeamName: 'AZADI',
    awayTeamName: 'VANGUARD FC',
    homeScore: 9,
    awayScore: 0,
    status: 'finished',
    date: 'Sunday',
    day: 'Sunday',
    time: 'FT'
  },
  {
    id: 'm-mon-4',
    group: 'C',
    round: 1,
    homeTeamId: 'team-c2',
    awayTeamId: 'team-c5',
    homeTeamName: 'VANGUARD FC',
    awayTeamName: 'BAY CLUB',
    homeScore: 4,
    awayScore: 2,
    status: 'finished',
    date: 'Monday',
    day: 'Monday',
    time: 'FT'
  },
  {
    id: 'm-mon-6',
    group: 'C',
    round: 1,
    homeTeamId: 'team-c4',
    awayTeamId: 'team-c5',
    homeTeamName: 'TAPE',
    awayTeamName: 'BAY CLUB',
    homeScore: 5,
    awayScore: 0,
    status: 'finished',
    date: 'Monday',
    day: 'Monday',
    time: 'FT'
  },
  {
    id: 'm-tue-2',
    group: 'C',
    round: 2,
    homeTeamId: 'team-c3',
    awayTeamId: 'team-c6',
    homeTeamName: 'SOROUSHFC',
    awayTeamName: 'AZABE ELAHI',
    homeScore: 2,
    awayScore: 1,
    status: 'finished',
    date: 'Tuesday',
    day: 'Tuesday',
    time: 'FT'
  },
  {
    id: 'm-tue-5',
    group: 'C',
    round: 2,
    homeTeamId: 'team-c4',
    awayTeamId: 'team-c3',
    homeTeamName: 'TAPE',
    awayTeamName: 'SOROUSHFC',
    homeScore: 5,
    awayScore: 2,
    status: 'finished',
    date: 'Tuesday',
    day: 'Tuesday',
    time: 'FT'
  },
  {
    id: 'm-tue-6',
    group: 'C',
    round: 2,
    homeTeamId: 'team-c7',
    awayTeamId: 'team-c1',
    homeTeamName: 'AZADI',
    awayTeamName: 'PERSIANGULF',
    homeScore: 3,
    awayScore: 1,
    status: 'finished',
    date: 'Tuesday',
    day: 'Tuesday',
    time: 'FT'
  },
  {
    id: 'm-res-c-2-2',
    group: 'C',
    round: 2,
    homeTeamId: 'team-c5',
    awayTeamId: 'team-c1',
    homeTeamName: 'BAY CLUB',
    awayTeamName: 'PERSIANGULF',
    homeScore: 1,
    awayScore: 2,
    status: 'finished',
    date: 'Wednesday',
    day: 'Tuesday',
    time: 'FT'
  },
  {
    id: 'm-res-c-3-1',
    group: 'C',
    round: 3,
    homeTeamId: 'team-c7',
    awayTeamId: 'team-c5',
    homeTeamName: 'AZADI',
    awayTeamName: 'BAY CLUB',
    homeScore: 11,
    awayScore: 0,
    status: 'finished',
    date: 'Wednesday',
    day: 'Tuesday',
    time: 'FT'
  },
  {
    id: 'm-sat-c-1',
    group: 'C',
    round: 3,
    homeTeamId: 'team-c6',
    awayTeamId: 'team-c4',
    homeTeamName: 'AZABE ELAHI',
    awayTeamName: 'TAPE',
    homeScore: null,
    awayScore: null,
    status: 'upcoming',
    date: 'Saturday',
    day: 'Saturday',
    time: '00:00'
  },
  {
    id: 'm-sat-c-2',
    group: 'C',
    round: 3,
    homeTeamId: 'team-c2',
    awayTeamId: 'team-c3',
    homeTeamName: 'VANGUARD FC',
    awayTeamName: 'SOROUSHFC',
    homeScore: null,
    awayScore: null,
    status: 'upcoming',
    date: 'Saturday',
    day: 'Saturday',
    time: '00:00'
  },
  {
    id: 'm-sat-c-3',
    group: 'C',
    round: 3,
    homeTeamId: 'team-c1',
    awayTeamId: 'team-c6',
    homeTeamName: 'PERSIANGULF',
    awayTeamName: 'AZABE ELAHI',
    homeScore: null,
    awayScore: null,
    status: 'upcoming',
    date: 'Saturday',
    day: 'Saturday',
    time: '01:00'
  },
  {
    id: 'm-sat-c-4',
    group: 'C',
    round: 3,
    homeTeamId: 'team-c7',
    awayTeamId: 'team-c3',
    homeTeamName: 'AZADI',
    awayTeamName: 'SOROUSHFC',
    homeScore: null,
    awayScore: null,
    status: 'upcoming',
    date: 'Saturday',
    day: 'Saturday',
    time: '11:30'
  },

  // GROUP D MATCHES
  {
    id: 'm-mon-7',
    group: 'D',
    round: 1,
    homeTeamId: 'team-d2',
    awayTeamId: 'team-d7',
    homeTeamName: 'YOUNG WIZARD',
    awayTeamName: 'RMP FC',
    homeScore: 1,
    awayScore: 1,
    status: 'finished',
    date: 'Monday',
    day: 'Monday',
    time: 'FT'
  },
  {
    id: 'm-mon-5',
    group: 'D',
    round: 1,
    homeTeamId: 'team-d4',
    awayTeamId: 'team-d3',
    homeTeamName: 'VIKINGS',
    awayTeamName: 'AFTAFA SAZAN FC',
    homeScore: 8,
    awayScore: 1,
    status: 'finished',
    date: 'Monday',
    day: 'Monday',
    time: 'FT'
  },
  {
    id: 'm-tue-7',
    group: 'D',
    round: 1,
    homeTeamId: 'team-d5',
    awayTeamId: 'team-d2',
    homeTeamName: 'Y A D',
    awayTeamName: 'YOUNG WIZARD',
    homeScore: 6,
    awayScore: 0,
    status: 'finished',
    date: 'Tuesday',
    day: 'Tuesday',
    time: 'FT'
  },
  {
    id: 'm-tue-12',
    group: 'D',
    round: 1,
    homeTeamId: 'team-d1',
    awayTeamId: 'team-d7',
    homeTeamName: 'KAKASIAH',
    awayTeamName: 'RMP FC',
    homeScore: 2,
    awayScore: 0,
    status: 'finished',
    date: 'Tuesday',
    day: 'Tuesday',
    time: 'FT'
  },
  {
    id: 'm-tue-10',
    group: 'D',
    round: 2,
    homeTeamId: 'team-d5',
    awayTeamId: 'team-d4',
    homeTeamName: 'Y A D',
    awayTeamName: 'VIKINGS',
    homeScore: 4,
    awayScore: 0,
    status: 'finished',
    date: 'Tuesday',
    day: 'Tuesday',
    time: 'FT'
  },
  {
    id: 'm-tue-3',
    group: 'D',
    round: 1,
    homeTeamId: 'team-d6',
    awayTeamId: 'team-d3',
    homeTeamName: 'FESHAR UTD',
    awayTeamName: 'AFTAFA SAZAN FC',
    homeScore: 5,
    awayScore: 0,
    status: 'finished',
    date: 'Tuesday',
    day: 'Tuesday',
    time: 'FT'
  },
  {
    id: 'm-res-d-4-1',
    group: 'D',
    round: 4,
    homeTeamId: 'team-d3',
    awayTeamId: 'team-d7',
    homeTeamName: 'AFTAFA SAZAN FC',
    awayTeamName: 'RMP FC',
    homeScore: 3,
    awayScore: 0,
    status: 'finished',
    date: 'Wednesday',
    day: 'Tuesday',
    time: 'FT'
  },
  {
    id: 'm-sat-d-1',
    group: 'D',
    round: 2,
    homeTeamId: 'team-d2',
    awayTeamId: 'team-d3',
    homeTeamName: 'YOUNG WIZARD',
    awayTeamName: 'AFTAFA SAZAN FC',
    homeScore: null,
    awayScore: null,
    status: 'upcoming',
    date: 'Saturday',
    day: 'Saturday',
    time: '11:00'
  },
  {
    id: 'm-sat-d-2',
    group: 'D',
    round: 2,
    homeTeamId: 'team-d1',
    awayTeamId: 'team-d5',
    homeTeamName: 'KAKASIAH',
    awayTeamName: 'Y A D',
    homeScore: null,
    awayScore: null,
    status: 'upcoming',
    date: 'Saturday',
    day: 'Saturday',
    time: '11:30'
  },
  {
    id: 'm-sat-d-3',
    group: 'D',
    round: 2,
    homeTeamId: 'team-d4',
    awayTeamId: 'team-d6',
    homeTeamName: 'VIKINGS',
    awayTeamName: 'FESHAR UTD',
    homeScore: null,
    awayScore: null,
    status: 'upcoming',
    date: 'Saturday',
    day: 'Saturday',
    time: '11:30'
  },
  {
    id: 'm-sat-d-4',
    group: 'D',
    round: 3,
    homeTeamId: 'team-d1',
    awayTeamId: 'team-d6',
    homeTeamName: 'KAKASIAH',
    awayTeamName: 'FESHAR UTD',
    homeScore: null,
    awayScore: null,
    status: 'upcoming',
    date: 'Saturday',
    day: 'Saturday',
    time: '12:00'
  },
  {
    id: 'm-sat-d-5',
    group: 'D',
    round: 3,
    homeTeamId: 'team-d7',
    awayTeamId: 'team-d5',
    homeTeamName: 'RMP FC',
    awayTeamName: 'Y A D',
    homeScore: null,
    awayScore: null,
    status: 'upcoming',
    date: 'Saturday',
    day: 'Saturday',
    time: '12:00'
  }
];

export const initialTopScorers: Player[] = [
  {
    id: 'p-azadi-1',
    name: 'Ehsan raeisi / Ehsan',
    teamId: 'team-c7',
    teamName: 'AZADI',
    goals: 8,
    assists: 3,
    matchesPlayed: 3,
    avatar: '⚽'
  },
  {
    id: 'p-azadi-2',
    name: 'Rabbit XCII / Rabbit',
    teamId: 'team-c7',
    teamName: 'AZADI',
    goals: 6,
    assists: 3,
    matchesPlayed: 3,
    avatar: '🐰'
  },
  {
    id: 'p-yad-1',
    name: 'Parsa / ParsaMadayeni',
    teamId: 'team-d5',
    teamName: 'Y A D',
    goals: 5,
    assists: 1,
    matchesPlayed: 2,
    avatar: '👑'
  },
  {
    id: 'p-titans-1',
    name: 'ZIGILINHO / Zigilinio',
    teamId: 'team-a7',
    teamName: 'TITANS',
    goals: 5,
    assists: 2,
    matchesPlayed: 2,
    avatar: '🌟'
  },
  {
    id: 'p-titans-2',
    name: 'Farhan',
    teamId: 'team-a7',
    teamName: 'TITANS',
    goals: 4,
    assists: 2,
    matchesPlayed: 2,
    avatar: '🔥'
  },
  {
    id: 'p-azadi-3',
    name: 'X-MORTEZA',
    teamId: 'team-c7',
    teamName: 'AZADI',
    goals: 4,
    assists: 4,
    matchesPlayed: 3,
    avatar: '⚡'
  },
  {
    id: 'p-vks-1',
    name: 'Hosseinarya',
    teamId: 'team-d4',
    teamName: 'VIKINGS',
    goals: 4,
    assists: 3,
    matchesPlayed: 2,
    avatar: '⚡'
  },
  {
    id: 'p-aft-1',
    name: 'Matiniam / Matiniam27',
    teamId: 'team-a3',
    teamName: 'AFTABESAZI',
    goals: 4,
    assists: 1,
    matchesPlayed: 3,
    avatar: '🎯'
  },
  {
    id: 'p-tape-1',
    name: 'rjb',
    teamId: 'team-c4',
    teamName: 'TAPE',
    goals: 3,
    assists: 4,
    matchesPlayed: 2,
    avatar: '🏹'
  },
  {
    id: 'p-tape-2',
    name: 'Dani',
    teamId: 'team-c4',
    teamName: 'TAPE',
    goals: 3,
    assists: 2,
    matchesPlayed: 2,
    avatar: '⚽'
  },
  {
    id: 'p-vks-2',
    name: 'MCH',
    teamId: 'team-d4',
    teamName: 'VIKINGS',
    goals: 3,
    assists: 2,
    matchesPlayed: 2,
    avatar: '🚀'
  }
];

export const initialTopAssists: Player[] = [
  {
    id: 'p-azadi-3',
    name: 'X-MORTEZA',
    teamId: 'team-c7',
    teamName: 'AZADI',
    goals: 4,
    assists: 4,
    matchesPlayed: 3,
    avatar: '⚡'
  },
  {
    id: 'p-tape-1',
    name: 'rjb',
    teamId: 'team-c4',
    teamName: 'TAPE',
    goals: 3,
    assists: 4,
    matchesPlayed: 2,
    avatar: '🏹'
  },
  {
    id: 'p-azadi-4',
    name: 'Omid',
    teamId: 'team-c7',
    teamName: 'AZADI',
    goals: 0,
    assists: 4,
    matchesPlayed: 3,
    avatar: '🪄'
  },
  {
    id: 'p-aft-2',
    name: 'Alireza.dr',
    teamId: 'team-a3',
    teamName: 'AFTABESAZI',
    goals: 2,
    assists: 3,
    matchesPlayed: 3,
    avatar: '🎯'
  },
  {
    id: 'p-azadi-1',
    name: 'Ehsan raeisi / Ehsan',
    teamId: 'team-c7',
    teamName: 'AZADI',
    goals: 8,
    assists: 3,
    matchesPlayed: 3,
    avatar: '⚽'
  },
  {
    id: 'p-azadi-2',
    name: 'Rabbit XCII / Rabbit',
    teamId: 'team-c7',
    teamName: 'AZADI',
    goals: 6,
    assists: 3,
    matchesPlayed: 3,
    avatar: '🐰'
  },
  {
    id: 'p-azadi-5',
    name: 'MRF76615 / Mrf',
    teamId: 'team-c7',
    teamName: 'AZADI',
    goals: 1,
    assists: 3,
    matchesPlayed: 3,
    avatar: '🛡️'
  },
  {
    id: 'p-ds-1',
    name: 'Matiniam',
    teamId: 'team-b4',
    teamName: 'DARYASALAR',
    goals: 1,
    assists: 3,
    matchesPlayed: 2,
    avatar: '🎩'
  },
  {
    id: 'p-msh-1',
    name: 'babakop1',
    teamId: 'team-b1',
    teamName: 'MESSHAHRBABAK',
    goals: 0,
    assists: 3,
    matchesPlayed: 2,
    avatar: '🎯'
  },
  {
    id: 'p-vks-1',
    name: 'Hosseinarya',
    teamId: 'team-d4',
    teamName: 'VIKINGS',
    goals: 4,
    assists: 3,
    matchesPlayed: 2,
    avatar: '⚡'
  },
  {
    id: 'p-yad-2',
    name: 'Mikh',
    teamId: 'team-d5',
    teamName: 'Y A D',
    goals: 2,
    assists: 3,
    matchesPlayed: 2,
    avatar: '🪄'
  }
];

export interface TeamPlayerDetail {
  name: string;
  goals: number;
  assists: number;
}

export interface TeamStatsSummary {
  teamName: string;
  farsiName: string;
  goals: number;
  assists: number;
  totalPoints: number;
  players: TeamPlayerDetail[];
}

export const initialTeamPlayerStats: TeamStatsSummary[] = [
  {
    teamName: 'AZADI',
    farsiName: 'آزادی',
    goals: 16,
    assists: 16,
    totalPoints: 32,
    players: [
      { name: 'Ehsan raeisi / Ehsan', goals: 8, assists: 3 },
      { name: 'Rabbit XCII / Rabbit', goals: 6, assists: 3 },
      { name: 'X-MORTEZA', goals: 4, assists: 4 },
      { name: 'MRF76615 / Mrf', goals: 1, assists: 3 },
      { name: 'Omid', goals: 0, assists: 4 }
    ]
  },
  {
    teamName: 'TITANS',
    farsiName: 'تایتانز',
    goals: 12,
    assists: 7,
    totalPoints: 19,
    players: [
      { name: 'ZIGILINHO / Zigilinio', goals: 5, assists: 2 },
      { name: 'Farhan', goals: 4, assists: 2 },
      { name: 'Reverse', goals: 1, assists: 2 },
      { name: 'Aboldeylam', goals: 1, assists: 1 },
      { name: 'Toxic', goals: 1, assists: 0 },
      { name: 'Farzad', goals: 1, assists: 0 },
      { name: 'Hashemi', goals: 0, assists: 1 }
    ]
  },
  {
    teamName: 'TAPE',
    farsiName: 'تیپ',
    goals: 11,
    assists: 9,
    totalPoints: 20,
    players: [
      { name: 'rjb', goals: 3, assists: 4 },
      { name: 'Dani', goals: 3, assists: 2 },
      { name: 'CARRASCO', goals: 2, assists: 0 },
      { name: 'ASAp', goals: 1, assists: 1 },
      { name: 'RICARDO', goals: 1, assists: 0 },
      { name: 'Costa', goals: 1, assists: 0 },
      { name: 'Masiha', goals: 0, assists: 1 },
      { name: 'Navid', goals: 0, assists: 1 }
    ]
  },
  {
    teamName: 'AFTABESAZI',
    farsiName: 'آفتابسازی',
    goals: 9,
    assists: 8,
    totalPoints: 17,
    players: [
      { name: 'Matiniam / Matiniam27', goals: 4, assists: 1 },
      { name: 'Alireza.dr', goals: 2, assists: 3 },
      { name: 'Ardalan', goals: 1, assists: 1 },
      { name: 'Hosi', goals: 1, assists: 0 },
      { name: 'Nazario', goals: 1, assists: 0 },
      { name: 'Ariandan', goals: 0, assists: 1 },
      { name: 'Mobin', goals: 0, assists: 1 },
      { name: 'KAKA', goals: 0, assists: 1 }
    ]
  },
  {
    teamName: 'VIKINGS',
    farsiName: 'وایکینگز',
    goals: 8,
    assists: 7,
    totalPoints: 15,
    players: [
      { name: 'Hosseinarya', goals: 4, assists: 3 },
      { name: 'MCH', goals: 3, assists: 2 },
      { name: 'Sancho', goals: 1, assists: 0 },
      { name: 'Hamed', goals: 0, assists: 1 },
      { name: 'Hajali', goals: 0, assists: 1 }
    ]
  },
  {
    teamName: 'Y A D',
    farsiName: 'یاد',
    goals: 8,
    assists: 6,
    totalPoints: 14,
    players: [
      { name: 'Parsa / ParsaMadayeni', goals: 5, assists: 1 },
      { name: 'Mikh', goals: 2, assists: 3 },
      { name: 'SINA', goals: 1, assists: 0 },
      { name: 'beny', goals: 0, assists: 1 },
      { name: 'Sa1rosh', goals: 0, assists: 1 },
      { name: 'L E B R O N', goals: 0, assists: 1 }
    ]
  },
  {
    teamName: 'DARYASALAR',
    farsiName: 'دریا سالار',
    goals: 5,
    assists: 6,
    totalPoints: 11,
    players: [
      { name: 'NAPOLEON', goals: 2, assists: 1 },
      { name: 'Matiniam', goals: 1, assists: 2 },
      { name: 'ymehapy', goals: 1, assists: 1 },
      { name: 'xARVININOx', goals: 1, assists: 0 },
      { name: 'RezaCityzen', goals: 0, assists: 1 },
      { name: 'ARVIN MC', goals: 0, assists: 1 }
    ]
  },
  {
    teamName: 'FESHAR UTD',
    farsiName: 'فشار یونایتد',
    goals: 5,
    assists: 5,
    totalPoints: 10,
    players: [
      { name: 'Mamadshakib', goals: 2, assists: 0 },
      { name: 'Zix9', goals: 2, assists: 2 },
      { name: 'Khafandinho', goals: 1, assists: 1 },
      { name: 'Hami', goals: 0, assists: 2 }
    ]
  },
  {
    teamName: 'SPIRITS',
    farsiName: 'اسپیریتس',
    goals: 4,
    assists: 3,
    totalPoints: 7,
    players: [
      { name: 'MEHRBOD / Mehrbod', goals: 2, assists: 0 },
      { name: 'Nazario', goals: 2, assists: 0 },
      { name: 'Dante', goals: 0, assists: 1 },
      { name: 'Isco', goals: 0, assists: 1 },
      { name: 'Eslams', goals: 0, assists: 1 }
    ]
  },
  {
    teamName: 'MESSHAHRBABAK',
    farsiName: 'ماهشهر',
    goals: 3,
    assists: 3,
    totalPoints: 6,
    players: [
      { name: 'IWasKaveh', goals: 1, assists: 0 },
      { name: 'Aemangg', goals: 1, assists: 0 },
      { name: 'AmirArnold', goals: 1, assists: 0 },
      { name: 'babakop1', goals: 0, assists: 3 }
    ]
  },
  {
    teamName: 'TEHRAN LEGACY',
    farsiName: 'تهران لگاسی',
    goals: 2,
    assists: 2,
    totalPoints: 4,
    players: [
      { name: 'bb radin', goals: 1, assists: 0 },
      { name: 'Mazi0611 / mazi', goals: 1, assists: 1 },
      { name: 'Artin', goals: 0, assists: 1 }
    ]
  },
  {
    teamName: 'GORGALI FC',
    farsiName: 'گرگالی',
    goals: 2,
    assists: 1,
    totalPoints: 3,
    players: [
      { name: 'PALMER', goals: 1, assists: 0 },
      { name: 'jmbb', goals: 1, assists: 0 },
      { name: 'kaya', goals: 0, assists: 1 }
    ]
  },
  {
    teamName: 'CHAEE KHORAN',
    farsiName: 'چای خوران',
    goals: 2,
    assists: 2,
    totalPoints: 4,
    players: [
      { name: 'Catalan', goals: 2, assists: 0 },
      { name: 'Kiarash', goals: 0, assists: 1 },
      { name: 'Sabeti', goals: 0, assists: 1 }
    ]
  },
  {
    teamName: 'ULTIMO BAILE',
    farsiName: 'اولتیمو بایله',
    goals: 2,
    assists: 1,
    totalPoints: 3,
    players: [
      { name: 'Harding', goals: 1, assists: 0 },
      { name: 'masoud', goals: 1, assists: 0 },
      { name: 'AM6', goals: 0, assists: 1 }
    ]
  },
  {
    teamName: 'PERSIANGULF',
    farsiName: 'پرشین گلف',
    goals: 2,
    assists: 0,
    totalPoints: 2,
    players: [
      { name: 'Ronaldo', goals: 1, assists: 0 },
      { name: 'Pl', goals: 1, assists: 0 }
    ]
  },
  {
    teamName: 'SOROUSHFC',
    farsiName: 'سروش اف‌سی',
    goals: 2,
    assists: 1,
    totalPoints: 3,
    players: [
      { name: 'parsa', goals: 1, assists: 0 },
      { name: 'bb radin', goals: 1, assists: 0 },
      { name: 'Pogba', goals: 0, assists: 1 }
    ]
  },
  {
    teamName: 'KAKASIAH',
    farsiName: 'کاکا سیاه',
    goals: 2,
    assists: 2,
    totalPoints: 4,
    players: [
      { name: 'Zare', goals: 2, assists: 0 },
      { name: 'MOOSAZADEH', goals: 0, assists: 2 }
    ]
  },
  {
    teamName: 'MATADORIR',
    farsiName: 'ماتادور',
    goals: 2,
    assists: 2,
    totalPoints: 4,
    players: [
      { name: 'Matador', goals: 1, assists: 0 },
      { name: 'Parham', goals: 1, assists: 0 },
      { name: 'Naghib', goals: 0, assists: 1 },
      { name: 'ZZZ', goals: 0, assists: 1 }
    ]
  },
  {
    teamName: 'ALNAHD',
    farsiName: 'النهض',
    goals: 1,
    assists: 3,
    totalPoints: 4,
    players: [
      { name: 'A1m9R', goals: 1, assists: 1 },
      { name: 'LaRalB', goals: 0, assists: 1 },
      { name: 'ymehapy', goals: 0, assists: 1 }
    ]
  },
  {
    teamName: 'AZABE ELAHI',
    farsiName: 'عذاب الهی',
    goals: 1,
    assists: 0,
    totalPoints: 1,
    players: [
      { name: 'Xbio', goals: 1, assists: 0 }
    ]
  },
  {
    teamName: 'PERSIANEMPIRE',
    farsiName: 'پرشین امپایر',
    goals: 1,
    assists: 1,
    totalPoints: 2,
    players: [
      { name: 'Armin', goals: 1, assists: 0 },
      { name: 'TireDMoz', goals: 0, assists: 1 }
    ]
  },
  {
    teamName: 'YOUNG WIZARD',
    farsiName: 'یونگ ویزارد',
    goals: 0,
    assists: 1,
    totalPoints: 1,
    players: [
      { name: 'AiMaR', goals: 0, assists: 1 }
    ]
  }
];

export function computeStandings(teamsList: Team[], matchesList: Match[]): Team[] {
  return teamsList.map((team) => {
    const teamFinishedMatches = matchesList.filter(
      (m) => m.status === 'finished' && (m.homeTeamId === team.id || m.awayTeamId === team.id)
    );

    let played = 0;
    let won = 0;
    let drawn = 0;
    let lost = 0;
    let goalsFor = 0;
    let goalsAgainst = 0;
    const form: ('W' | 'D' | 'L')[] = [];

    teamFinishedMatches.forEach((m) => {
      played++;
      const isHome = m.homeTeamId === team.id;
      const myScore = isHome ? (m.homeScore ?? 0) : (m.awayScore ?? 0);
      const opponentScore = isHome ? (m.awayScore ?? 0) : (m.homeScore ?? 0);

      goalsFor += myScore;
      goalsAgainst += opponentScore;

      if (myScore > opponentScore) {
        won++;
        form.push('W');
      } else if (myScore === opponentScore) {
        drawn++;
        form.push('D');
      } else {
        lost++;
        form.push('L');
      }
    });

    const goalDifference = goalsFor - goalsAgainst;
    const points = won * 3 + drawn * 1;

    return {
      ...team,
      played,
      won,
      drawn,
      lost,
      goalsFor,
      goalsAgainst,
      goalDifference,
      points,
      form: form.slice(-5)
    };
  });
}
