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
    played: 1,
    won: 1,
    drawn: 0,
    lost: 0,
    goalsFor: 1,
    goalsAgainst: 0,
    goalDifference: 1,
    points: 3,
    form: ['W']
  },
  {
    id: 'team-a5',
    name: 'CHAEE KHORAN',
    shortName: 'CHK',
    group: 'A',
    logo: '',
    played: 1,
    won: 0,
    drawn: 0,
    lost: 1,
    goalsFor: 0,
    goalsAgainst: 1,
    goalDifference: -1,
    points: 0,
    form: ['L']
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
    played: 1,
    won: 1,
    drawn: 0,
    lost: 0,
    goalsFor: 3,
    goalsAgainst: 0,
    goalDifference: 3,
    points: 3,
    form: ['W']
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
    played: 1,
    won: 0,
    drawn: 0,
    lost: 1,
    goalsFor: 0,
    goalsAgainst: 2,
    goalDifference: -2,
    points: 0,
    form: ['L']
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
    played: 1,
    won: 1,
    drawn: 0,
    lost: 0,
    goalsFor: 2,
    goalsAgainst: 0,
    goalDifference: 2,
    points: 3,
    form: ['W']
  },
  {
    id: 'team-b7',
    name: 'BELAAD',
    shortName: 'BEL',
    group: 'B',
    logo: '',
    played: 1,
    won: 0,
    drawn: 0,
    lost: 1,
    goalsFor: 0,
    goalsAgainst: 3,
    goalDifference: -3,
    points: 0,
    form: ['L']
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
    played: 1,
    won: 0,
    drawn: 0,
    lost: 1,
    goalsFor: 0,
    goalsAgainst: 9,
    goalDifference: -9,
    points: 0,
    form: ['L']
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
    name: 'AZABEELAHI',
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
    played: 1,
    won: 1,
    drawn: 0,
    lost: 0,
    goalsFor: 9,
    goalsAgainst: 0,
    goalDifference: 9,
    points: 3,
    form: ['W']
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
  // ================= SUNDAY MATCHES (FINISHED RESULTS) =================
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

  // ================= MONDAY MATCHES =================
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
    id: 'm-mon-5',
    group: 'D',
    round: 1,
    homeTeamId: 'team-d4',
    awayTeamId: 'team-d3',
    homeTeamName: 'VIKINGS',
    awayTeamName: 'AFTAFA SAZAN FC',
    homeScore: null,
    awayScore: null,
    status: 'upcoming',
    date: 'Monday',
    day: 'Monday',
    time: '23:30'
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

  // ================= TUESDAY MATCHES =================
  {
    id: 'm-tue-1',
    group: 'A',
    round: 1,
    homeTeamId: 'team-a3',
    awayTeamId: 'team-a4',
    homeTeamName: 'AFTABESAZI',
    awayTeamName: 'MATADORIR',
    homeScore: null,
    awayScore: null,
    status: 'upcoming',
    date: 'Tuesday',
    day: 'Tuesday',
    time: '23:00'
  },
  {
    id: 'm-tue-2',
    group: 'C',
    round: 1,
    homeTeamId: 'team-c6',
    awayTeamId: 'team-c3',
    homeTeamName: 'AZABEELAHI',
    awayTeamName: 'SOROUSHFC',
    homeScore: null,
    awayScore: null,
    status: 'upcoming',
    date: 'Tuesday',
    day: 'Tuesday',
    time: '23:00'
  },
  {
    id: 'm-tue-3',
    group: 'D',
    round: 1,
    homeTeamId: 'team-d3',
    awayTeamId: 'team-d6',
    homeTeamName: 'AFTAFA SAZAN FC',
    awayTeamName: 'FESHAR UTD',
    homeScore: null,
    awayScore: null,
    status: 'upcoming',
    date: 'Tuesday',
    day: 'Tuesday',
    time: '23:15'
  },
  {
    id: 'm-tue-4',
    group: 'B',
    round: 1,
    homeTeamId: 'team-b2',
    awayTeamId: 'team-b7',
    homeTeamName: 'SPIRITS',
    awayTeamName: 'BELAAD',
    homeScore: null,
    awayScore: null,
    status: 'upcoming',
    date: 'Tuesday',
    day: 'Tuesday',
    time: '23:30'
  },
  {
    id: 'm-tue-5',
    group: 'C',
    round: 1,
    homeTeamId: 'team-c4',
    awayTeamId: 'team-c3',
    homeTeamName: 'TAPE',
    awayTeamName: 'SOROUSHFC',
    homeScore: null,
    awayScore: null,
    status: 'upcoming',
    date: 'Tuesday',
    day: 'Tuesday',
    time: '23:40'
  },
  {
    id: 'm-tue-6',
    group: 'C',
    round: 1,
    homeTeamId: 'team-c7',
    awayTeamId: 'team-c1',
    homeTeamName: 'AZADI',
    awayTeamName: 'PERSIANGULF',
    homeScore: null,
    awayScore: null,
    status: 'upcoming',
    date: 'Tuesday',
    day: 'Tuesday',
    time: '23:59'
  },
  {
    id: 'm-tue-7',
    group: 'D',
    round: 1,
    homeTeamId: 'team-d2',
    awayTeamId: 'team-d5',
    homeTeamName: 'YOUNG WIZARD',
    awayTeamName: 'Y A D',
    homeScore: null,
    awayScore: null,
    status: 'upcoming',
    date: 'Tuesday',
    day: 'Tuesday',
    time: '00:00'
  },
  {
    id: 'm-tue-8',
    group: 'A',
    round: 1,
    homeTeamId: 'team-a2',
    awayTeamId: 'team-a5',
    homeTeamName: 'GORGALI FC',
    awayTeamName: 'CHAEE KHORAN',
    homeScore: null,
    awayScore: null,
    status: 'upcoming',
    date: 'Tuesday',
    day: 'Tuesday',
    time: '00:00'
  },
  {
    id: 'm-tue-9',
    group: 'A',
    round: 1,
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
    id: 'm-tue-10',
    group: 'D',
    round: 1,
    homeTeamId: 'team-d5',
    awayTeamId: 'team-d4',
    homeTeamName: 'Y A D',
    awayTeamName: 'VIKINGS',
    homeScore: null,
    awayScore: null,
    status: 'upcoming',
    date: 'Tuesday',
    day: 'Tuesday',
    time: '00:30'
  },
  {
    id: 'm-tue-11',
    group: 'B',
    round: 1,
    homeTeamId: 'team-b5',
    awayTeamId: 'team-b4',
    homeTeamName: 'A R Y A',
    awayTeamName: 'DARYASALAR',
    homeScore: null,
    awayScore: null,
    status: 'upcoming',
    date: 'Tuesday',
    day: 'Tuesday',
    time: '00:30'
  }
];

export const initialTopScorers: Player[] = [
  {
    id: 'p-1',
    name: 'Ehsan raeisi',
    teamId: 'team-c7',
    teamName: 'AZADI',
    goals: 5,
    assists: 2,
    matchesPlayed: 1,
    position: 'مهاجم',
    avatar: '⚽'
  },
  {
    id: 'p-2',
    name: 'X-MORTEZA',
    teamId: 'team-c7',
    teamName: 'AZADI',
    goals: 4,
    assists: 4,
    matchesPlayed: 1,
    position: 'وینگر',
    avatar: '⚡'
  },
  {
    id: 'p-3',
    name: 'Farhan',
    teamId: 'team-a7',
    teamName: 'TITANS',
    goals: 4,
    assists: 2,
    matchesPlayed: 2,
    position: 'مهاجم',
    avatar: '🔥'
  },
  {
    id: 'p-4',
    name: 'ZIGILINHO',
    teamId: 'team-a7',
    teamName: 'TITANS',
    goals: 4,
    assists: 2,
    matchesPlayed: 2,
    position: 'هافبک هجومی',
    avatar: '🌟'
  },
  {
    id: 'p-5',
    name: 'NAPOLEON',
    teamId: 'team-b4',
    teamName: 'DARYASALAR',
    goals: 2,
    assists: 1,
    matchesPlayed: 1,
    position: 'مهاجم',
    avatar: '👑'
  },
  {
    id: 'p-6',
    name: 'CARRASCO',
    teamId: 'team-c4',
    teamName: 'TAPE',
    goals: 2,
    assists: 0,
    matchesPlayed: 1,
    position: 'وینگر',
    avatar: '🚀'
  }
];

export const initialTopAssists: Player[] = [
  {
    id: 'p-2',
    name: 'X-MORTEZA',
    teamId: 'team-c7',
    teamName: 'AZADI',
    goals: 4,
    assists: 4,
    matchesPlayed: 1,
    position: 'وینگر',
    avatar: '⚡'
  },
  {
    id: 'p-7',
    name: 'babakop1',
    teamId: 'team-b1',
    teamName: 'MESSHAHRBABAK',
    goals: 0,
    assists: 3,
    matchesPlayed: 1,
    position: 'هافبک',
    avatar: '🎯'
  },
  {
    id: 'p-1',
    name: 'Ehsan raeisi',
    teamId: 'team-c7',
    teamName: 'AZADI',
    goals: 5,
    assists: 2,
    matchesPlayed: 1,
    position: 'مهاجم',
    avatar: '⚽'
  },
  {
    id: 'p-8',
    name: 'MRF76615',
    teamId: 'team-c7',
    teamName: 'AZADI',
    goals: 0,
    assists: 2,
    matchesPlayed: 1,
    position: 'هافبک',
    avatar: '🪄'
  },
  {
    id: 'p-3',
    name: 'Farhan',
    teamId: 'team-a7',
    teamName: 'TITANS',
    goals: 4,
    assists: 2,
    matchesPlayed: 2,
    position: 'مهاجم',
    avatar: '🔥'
  },
  {
    id: 'p-4',
    name: 'ZIGILINHO',
    teamId: 'team-a7',
    teamName: 'TITANS',
    goals: 4,
    assists: 2,
    matchesPlayed: 2,
    position: 'هافبک هجومی',
    avatar: '🌟'
  },
  {
    id: 'p-9',
    name: 'Reverse',
    teamId: 'team-a7',
    teamName: 'TITANS',
    goals: 1,
    assists: 2,
    matchesPlayed: 2,
    position: 'هافبک',
    avatar: '🔁'
  },
  {
    id: 'p-10',
    name: 'Matiniam',
    teamId: 'team-b4',
    teamName: 'DARYASALAR',
    goals: 0,
    assists: 2,
    matchesPlayed: 1,
    position: 'هافبک',
    avatar: '🎩'
  },
  {
    id: 'p-11',
    name: 'rjb',
    teamId: 'team-c4',
    teamName: 'TAPE',
    goals: 1,
    assists: 2,
    matchesPlayed: 1,
    position: 'هافبک',
    avatar: '🏹'
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
    teamName: 'TITANS',
    farsiName: 'تایتانز',
    goals: 10,
    assists: 6,
    totalPoints: 16,
    players: [
      { name: 'Farhan', goals: 4, assists: 2 },
      { name: 'ZIGILINHO', goals: 4, assists: 2 },
      { name: 'Reverse', goals: 1, assists: 2 },
      { name: 'Aboldeylam', goals: 1, assists: 1 },
      { name: 'Farzad', goals: 1, assists: 0 }
    ]
  },
  {
    teamName: 'AZADI',
    farsiName: 'آزادی',
    goals: 9,
    assists: 9,
    totalPoints: 18,
    players: [
      { name: 'Ehsan raeisi', goals: 5, assists: 2 },
      { name: 'X-MORTEZA', goals: 4, assists: 4 },
      { name: 'MRF76615', goals: 0, assists: 2 },
      { name: 'Rabbit XCII', goals: 0, assists: 1 }
    ]
  },
  {
    teamName: 'TAPE',
    farsiName: 'تیپ',
    goals: 5,
    assists: 5,
    totalPoints: 10,
    players: [
      { name: 'CARRASCO', goals: 2, assists: 0 },
      { name: 'rjb', goals: 1, assists: 2 },
      { name: 'ASAp', goals: 1, assists: 1 },
      { name: 'Dani', goals: 1, assists: 1 },
      { name: 'Masiha', goals: 0, assists: 1 }
    ]
  },
  {
    teamName: 'DARYASALAR',
    farsiName: 'دریا سالار',
    goals: 3,
    assists: 4,
    totalPoints: 7,
    players: [
      { name: 'NAPOLEON', goals: 2, assists: 1 },
      { name: 'xARVININOx', goals: 1, assists: 0 },
      { name: 'Matiniam', goals: 0, assists: 2 },
      { name: 'RezaCityzen', goals: 0, assists: 1 }
    ]
  },
  {
    teamName: 'AFTABESAZI',
    farsiName: 'آفتابسازی',
    goals: 3,
    assists: 3,
    totalPoints: 6,
    players: [
      { name: 'Matiniam', goals: 1, assists: 0 },
      { name: 'Ardalan', goals: 1, assists: 1 },
      { name: 'Hosi', goals: 1, assists: 0 },
      { name: 'Ariandan', goals: 0, assists: 1 },
      { name: 'Mobin', goals: 0, assists: 1 }
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
    teamName: 'SPIRITS',
    farsiName: 'اسپیریتس',
    goals: 2,
    assists: 2,
    totalPoints: 4,
    players: [
      { name: 'MEHRBOD', goals: 1, assists: 0 },
      { name: 'Nazario', goals: 1, assists: 0 },
      { name: 'Dante', goals: 0, assists: 1 },
      { name: 'Isco', goals: 0, assists: 1 }
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
    teamName: 'MATADORIR',
    farsiName: 'ماتادور',
    goals: 1,
    assists: 1,
    totalPoints: 2,
    players: [
      { name: 'Matador', goals: 1, assists: 0 },
      { name: 'Naghib', goals: 0, assists: 1 }
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
    teamName: 'TEHRAN LEGACY',
    farsiName: 'تهران لگاسی',
    goals: 1,
    assists: 1,
    totalPoints: 2,
    players: [
      { name: 'Mazi0611', goals: 1, assists: 0 },
      { name: 'Artin', goals: 0, assists: 1 }
    ]
  },
  {
    teamName: 'GORGALI FC',
    farsiName: 'گرگالی',
    goals: 1,
    assists: 1,
    totalPoints: 2,
    players: [
      { name: 'PALMER', goals: 1, assists: 0 },
      { name: 'kaya', goals: 0, assists: 1 }
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
