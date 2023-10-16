"use server";
import {query as q} from "faunadb";

import {faunaClient} from "@/lib/fauna";

// Map(
//   Paginate(Match(Index("get_events_by_user_id"), "user_2WlOHpf16CvOqiIDBnq6m2UoxOv")),
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
