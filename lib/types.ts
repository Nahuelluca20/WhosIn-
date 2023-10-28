export interface Ref {
  id: string;
  collection: string;
}

export interface Data {
  user_id: string;
  attend: string;
  unconfirmed: string;
  total_guests: string;
  event_title: string;
  place_name: string;
  place_direction: string;
  event_date: string;
  users_attend: {
    name: string;
    email: string;
  }[];
  team: Ref;
}

export interface Teams {
  ref: Ref;
  ts: number;
  data: {
    team_name: string;
    members: Ref[];
  };
}

export interface EventObject {
  ref: Ref;
  ts: number;
  data?: Data;
}

export interface EventData {
  data?: EventObject[];
}

export interface UserDb {
  ref: Ref;
  ts: number;
  data: {
    name: string;
    email: string;
    user_id: string;
  };
}

export interface CreateEventCardProps {
  eventName: string;
  team: string;
  placeName: string;
  totalGuest: string;
  eventPlace: string;
  month: string;
  year: string;
  day: string;
}
