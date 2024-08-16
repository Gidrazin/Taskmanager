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

export type SortType = null | 'title' | 'end' | 'username' | 'pages'

export type Status = "done" | "announced" | "in progress";
