// NBA Teams with logo URLs (using official NBA CDN)
export interface Team {
  id: string;
  name: string;
  city: string;
  fullName: string;
  abbreviation: string;
  logoUrl: string;
  primaryColor: string;
}

export interface Player {
  name: string;
  teamId: string;
  jerseyNumber: number;
  position: string;
}

export const NBA_TEAMS: Team[] = [
  {
    id: 'lakers',
    name: 'Lakers',
    city: 'Los Angeles',
    fullName: 'Los Angeles Lakers',
    abbreviation: 'LAL',
    logoUrl: 'https://cdn.nba.com/logos/nba/1610612747/global/L/logo.svg',
    primaryColor: '#552583'
  },
  {
    id: 'celtics',
    name: 'Celtics',
    city: 'Boston',
    fullName: 'Boston Celtics',
    abbreviation: 'BOS',
    logoUrl: 'https://cdn.nba.com/logos/nba/1610612738/global/L/logo.svg',
    primaryColor: '#007A33'
  },
  {
    id: 'warriors',
    name: 'Warriors',
    city: 'Golden State',
    fullName: 'Golden State Warriors',
    abbreviation: 'GSW',
    logoUrl: 'https://cdn.nba.com/logos/nba/1610612744/global/L/logo.svg',
    primaryColor: '#1D428A'
  },
  {
    id: 'bulls',
    name: 'Bulls',
    city: 'Chicago',
    fullName: 'Chicago Bulls',
    abbreviation: 'CHI',
    logoUrl: 'https://cdn.nba.com/logos/nba/1610612741/global/L/logo.svg',
    primaryColor: '#CE1141'
  },
  {
    id: 'heat',
    name: 'Heat',
    city: 'Miami',
    fullName: 'Miami Heat',
    abbreviation: 'MIA',
    logoUrl: 'https://cdn.nba.com/logos/nba/1610612748/global/L/logo.svg',
    primaryColor: '#98002E'
  },
  {
    id: 'nets',
    name: 'Nets',
    city: 'Brooklyn',
    fullName: 'Brooklyn Nets',
    abbreviation: 'BKN',
    logoUrl: 'https://cdn.nba.com/logos/nba/1610612751/global/L/logo.svg',
    primaryColor: '#000000'
  },
  {
    id: 'knicks',
    name: 'Knicks',
    city: 'New York',
    fullName: 'New York Knicks',
    abbreviation: 'NYK',
    logoUrl: 'https://cdn.nba.com/logos/nba/1610612752/global/L/logo.svg',
    primaryColor: '#006BB6'
  },
  {
    id: 'sixers',
    name: '76ers',
    city: 'Philadelphia',
    fullName: 'Philadelphia 76ers',
    abbreviation: 'PHI',
    logoUrl: 'https://cdn.nba.com/logos/nba/1610612755/global/L/logo.svg',
    primaryColor: '#006BB6'
  },
  {
    id: 'raptors',
    name: 'Raptors',
    city: 'Toronto',
    fullName: 'Toronto Raptors',
    abbreviation: 'TOR',
    logoUrl: 'https://cdn.nba.com/logos/nba/1610612761/global/L/logo.svg',
    primaryColor: '#CE1141'
  },
  {
    id: 'bucks',
    name: 'Bucks',
    city: 'Milwaukee',
    fullName: 'Milwaukee Bucks',
    abbreviation: 'MIL',
    logoUrl: 'https://cdn.nba.com/logos/nba/1610612749/global/L/logo.svg',
    primaryColor: '#00471B'
  },
  {
    id: 'mavericks',
    name: 'Mavericks',
    city: 'Dallas',
    fullName: 'Dallas Mavericks',
    abbreviation: 'DAL',
    logoUrl: 'https://cdn.nba.com/logos/nba/1610612742/global/L/logo.svg',
    primaryColor: '#00538C'
  },
  {
    id: 'spurs',
    name: 'Spurs',
    city: 'San Antonio',
    fullName: 'San Antonio Spurs',
    abbreviation: 'SAS',
    logoUrl: 'https://cdn.nba.com/logos/nba/1610612759/global/L/logo.svg',
    primaryColor: '#C4CED4'
  },
  {
    id: 'rockets',
    name: 'Rockets',
    city: 'Houston',
    fullName: 'Houston Rockets',
    abbreviation: 'HOU',
    logoUrl: 'https://cdn.nba.com/logos/nba/1610612745/global/L/logo.svg',
    primaryColor: '#CE1141'
  },
  {
    id: 'suns',
    name: 'Suns',
    city: 'Phoenix',
    fullName: 'Phoenix Suns',
    abbreviation: 'PHX',
    logoUrl: 'https://cdn.nba.com/logos/nba/1610612756/global/L/logo.svg',
    primaryColor: '#1D1160'
  },
  {
    id: 'nuggets',
    name: 'Nuggets',
    city: 'Denver',
    fullName: 'Denver Nuggets',
    abbreviation: 'DEN',
    logoUrl: 'https://cdn.nba.com/logos/nba/1610612743/global/L/logo.svg',
    primaryColor: '#0E2240'
  },
  {
    id: 'clippers',
    name: 'Clippers',
    city: 'Los Angeles',
    fullName: 'Los Angeles Clippers',
    abbreviation: 'LAC',
    logoUrl: 'https://cdn.nba.com/logos/nba/1610612746/global/L/logo.svg',
    primaryColor: '#C8102E'
  },
  {
    id: 'thunder',
    name: 'Thunder',
    city: 'Oklahoma City',
    fullName: 'Oklahoma City Thunder',
    abbreviation: 'OKC',
    logoUrl: 'https://cdn.nba.com/logos/nba/1610612760/global/L/logo.svg',
    primaryColor: '#007AC1'
  },
  {
    id: 'timberwolves',
    name: 'Timberwolves',
    city: 'Minnesota',
    fullName: 'Minnesota Timberwolves',
    abbreviation: 'MIN',
    logoUrl: 'https://cdn.nba.com/logos/nba/1610612750/global/L/logo.svg',
    primaryColor: '#0C2340'
  },
  {
    id: 'pelicans',
    name: 'Pelicans',
    city: 'New Orleans',
    fullName: 'New Orleans Pelicans',
    abbreviation: 'NOP',
    logoUrl: 'https://cdn.nba.com/logos/nba/1610612740/global/L/logo.svg',
    primaryColor: '#0C2340'
  },
  {
    id: 'grizzlies',
    name: 'Grizzlies',
    city: 'Memphis',
    fullName: 'Memphis Grizzlies',
    abbreviation: 'MEM',
    logoUrl: 'https://cdn.nba.com/logos/nba/1610612763/global/L/logo.svg',
    primaryColor: '#5D76A9'
  }
];

export const NBA_PLAYERS: Player[] = [
  // Lakers
  { name: 'LeBron James', teamId: 'lakers', jerseyNumber: 23, position: 'SF' },
  { name: 'Anthony Davis', teamId: 'lakers', jerseyNumber: 3, position: 'PF' },

  // Celtics
  { name: 'Jayson Tatum', teamId: 'celtics', jerseyNumber: 0, position: 'SF' },
  { name: 'Jaylen Brown', teamId: 'celtics', jerseyNumber: 7, position: 'SG' },

  // Warriors
  { name: 'Stephen Curry', teamId: 'warriors', jerseyNumber: 30, position: 'PG' },
  { name: 'Klay Thompson', teamId: 'warriors', jerseyNumber: 11, position: 'SG' },

  // Bulls
  { name: 'Zach LaVine', teamId: 'bulls', jerseyNumber: 8, position: 'SG' },
  { name: 'DeMar DeRozan', teamId: 'bulls', jerseyNumber: 11, position: 'SF' },

  // Heat
  { name: 'Jimmy Butler', teamId: 'heat', jerseyNumber: 22, position: 'SF' },
  { name: 'Bam Adebayo', teamId: 'heat', jerseyNumber: 13, position: 'C' },

  // Nets
  { name: 'Mikal Bridges', teamId: 'nets', jerseyNumber: 1, position: 'SF' },

  // Knicks
  { name: 'Jalen Brunson', teamId: 'knicks', jerseyNumber: 11, position: 'PG' },
  { name: 'Julius Randle', teamId: 'knicks', jerseyNumber: 30, position: 'PF' },

  // 76ers
  { name: 'Joel Embiid', teamId: 'sixers', jerseyNumber: 21, position: 'C' },
  { name: 'Tyrese Maxey', teamId: 'sixers', jerseyNumber: 0, position: 'PG' },

  // Bucks
  { name: 'Giannis Antetokounmpo', teamId: 'bucks', jerseyNumber: 34, position: 'PF' },
  { name: 'Damian Lillard', teamId: 'bucks', jerseyNumber: 0, position: 'PG' },

  // Mavericks
  { name: 'Luka Doncic', teamId: 'mavericks', jerseyNumber: 77, position: 'PG' },
  { name: 'Kyrie Irving', teamId: 'mavericks', jerseyNumber: 11, position: 'PG' },

  // Nuggets
  { name: 'Nikola Jokic', teamId: 'nuggets', jerseyNumber: 15, position: 'C' },
  { name: 'Jamal Murray', teamId: 'nuggets', jerseyNumber: 27, position: 'PG' },

  // Suns
  { name: 'Kevin Durant', teamId: 'suns', jerseyNumber: 35, position: 'SF' },
  { name: 'Devin Booker', teamId: 'suns', jerseyNumber: 1, position: 'SG' },

  // Thunder
  { name: 'Shai Gilgeous-Alexander', teamId: 'thunder', jerseyNumber: 2, position: 'PG' },
  { name: 'Chet Holmgren', teamId: 'thunder', jerseyNumber: 7, position: 'C' },

  // Timberwolves
  { name: 'Anthony Edwards', teamId: 'timberwolves', jerseyNumber: 5, position: 'SG' },
  { name: 'Karl-Anthony Towns', teamId: 'timberwolves', jerseyNumber: 32, position: 'C' },

  // Grizzlies
  { name: 'Ja Morant', teamId: 'grizzlies', jerseyNumber: 12, position: 'PG' },

  // Clippers
  { name: 'Kawhi Leonard', teamId: 'clippers', jerseyNumber: 2, position: 'SF' },
  { name: 'Paul George', teamId: 'clippers', jerseyNumber: 13, position: 'SF' },

  // Spurs
  { name: 'Victor Wembanyama', teamId: 'spurs', jerseyNumber: 1, position: 'C' },
];

export function getTeamById(id: string): Team | undefined {
  return NBA_TEAMS.find(team => team.id === id);
}

export function getRandomTeams(count: number, exclude?: string[]): Team[] {
  const available = NBA_TEAMS.filter(t => !exclude?.includes(t.id));
  const shuffled = [...available].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getRandomPlayers(count: number, exclude?: string[]): Player[] {
  const available = NBA_PLAYERS.filter(p => !exclude?.includes(p.name));
  const shuffled = [...available].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
