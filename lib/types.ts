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
  team: Ref;
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
