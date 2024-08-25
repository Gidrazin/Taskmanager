export interface Task {
  id: number;
  performer: Performer;
  theme: Theme;
  title: string;

  end: Date | '';
  status: Status;
  report: string;
  pages: number | null;
}
export interface Performer {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  ip: string;
}

export interface Theme {
  id: number;
  slug: string;
  title: string;
}

export type SortName = 'theme' | 'title' | 'end' | 'username' | 'pages'
export type SortDirection = 'up' | 'down'
export type SortType = { sortName: SortName, sortDirection: SortDirection } | null

export type Status = "done" | "announced" | "in progress";
