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
}

export interface EventObject {
  ref: Ref;
  ts: number;
  data?: Data;
}

export interface EventData {
  data?: EventObject[];
}
