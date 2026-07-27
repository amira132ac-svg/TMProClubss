export type GroupName = 'A' | 'B' | 'C' | 'D';

export interface Team {
  id: string;
  name: string;
  group: GroupName;
  shortName: string;
  logo: string; // Emoji or SVG avatar symbol
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form?: ('W' | 'D' | 'L')[];
}

export interface Player {
  id: string;
  name: string;
  teamId: string;
  teamName: string;
  goals: number;
  assists: number;
  matchesPlayed: number;
  position: string;
  avatar: string;
}

export type MatchStatus = 'finished' | 'live' | 'upcoming';

export interface Match {
  id: string;
  group: GroupName;
  round: number;
  homeTeamId: string;
  awayTeamId: string;
  homeTeamName: string;
  awayTeamName: string;
  homeScore: number | null;
  awayScore: number | null;
  status: MatchStatus;
  date: string;
  time: string;
  day?: 'Sunday' | 'Monday' | 'Tuesday' | 'TBD';
}

export type ActiveTab = 'groups' | 'stats' | 'fixtures' | 'compare' | 'predictions';
