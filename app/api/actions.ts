"use server";
import {query as q} from "faunadb";

import {faunaClient} from "@/lib/fauna";

// Map(
//   Paginate(Match(Index("get_events_by_user_id"), userId")),
//   Lambda('pilotRef', Get(Var('pilotRef')))
// )

export async function getEventsByUserId(userId: string) {
  const data = await faunaClient.query(
    q.Map(
      q.Paginate(q.Match(q.Index("get_events_by_user_id"), userId)),
      q.Lambda("eventsRef", q.Get(q.Var("eventsRef"))),
    ),
  );

  return data;
}

// Map(
//   Paginate(
//     Match(Index("get_event_by_id"), eventId)
//   ),
//   Lambda("event_by_id", Get(Var("event_by_id")))
// )

export async function getEventById(eventId: string) {
  const data = await faunaClient.query(
    q.Map(
      q.Paginate(q.Match(q.Index("get_event_by_id"), eventId)),
      q.Lambda("event_by_id", q.Get(q.Var("event_by_id"))),
    ),
  );

  return data;
}
