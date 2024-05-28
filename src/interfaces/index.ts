export interface InterfaceUser {
  id: string;
  username: string;
  token: string;
}

export interface InterfaceHints {
  id: number;
  content: string;
  source: string;
  created_at: Date;
}
