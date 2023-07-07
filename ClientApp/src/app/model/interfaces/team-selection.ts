import { Team } from "./game";

export interface TeamSelection {
  team: Team;
  spread?: number;
}

export interface TeamSelectionEvent extends TeamSelection {
  checked: boolean;
}
