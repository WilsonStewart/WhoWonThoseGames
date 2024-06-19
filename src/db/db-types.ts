import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface Games {
  date: string;
  id: string;
  player_count: number;
  title: string;
}

export interface GamesAgricolaZman {
  bonus_points: Generated<number | null>;
  card_points: Generated<number | null>;
  cattle: Generated<number | null>;
  clay_rooms: Generated<number | null>;
  family_members: Generated<number | null>;
  fenced_spaces: Generated<number | null>;
  fields: Generated<number | null>;
  grains: Generated<number | null>;
  id: string;
  pastures: Generated<number | null>;
  score: number;
  sheep: Generated<number | null>;
  stone_rooms: Generated<number | null>;
  unused_spaces: Generated<number | null>;
  vegetables: Generated<number | null>;
  wild_boar: Generated<number | null>;
}

export interface Players {
  name: string | null;
  profile_picture_path: string | null;
}

export interface Titles {
  id: string;
  name: string | null;
}

export interface DB {
  games: Games;
  games_agricola_zman: GamesAgricolaZman;
  players: Players;
  titles: Titles;
}
