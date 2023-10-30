"use server";
import {query as q} from "faunadb";

import {faunaClient} from "@/lib/fauna";
import {CreateEventCardProps} from "@/lib/types";

export async function getEventById(eventId: string) {
  const data = await faunaClient.query(
    q.Map(
      q.Paginate(q.Match(q.Index("get_invite_by_id"), eventId)),
      q.Lambda("event_by_id", q.Get(q.Var("event_by_id"))),
    ),
  );

  return data;
}

// Get all event/invite in a team/group by teamId
export async function getEventByTeam(teamId: string) {
  try {
    const data = await faunaClient.query(
      q.Map(
        q.Paginate(q.Match(q.Index("get_invites_by_team"), q.Ref(q.Collection("teams"), teamId))),
        q.Lambda("ref", q.Get(q.Var("ref"))),
      ),
    );

    return data;
  } catch (error) {
    return [];
  }
}

export async function getAllEventsByUser(userId: string) {
  try {
    const data = await faunaClient.query(
      q.Map(
        q.Paginate(q.Match(q.Index("get_invites_by_user"), q.Ref(q.Collection("users"), userId))),
        q.Lambda("ref", q.Get(q.Var("ref"))),
      ),
    );

    return data;
  } catch (error) {
    return [];
  }
}

export async function createEvent(formData: CreateEventCardProps) {
  try {
    const event = await faunaClient.query(
      q.Create(q.Collection("invites"), {
        data: {
          event_title: formData.eventName,
          total_guests: formData.totalGuest,
          place_direction: formData.eventPlace,
          place_name: formData.placeName,
          event_date: `${formData.month}-${formData.day}-${formData.year}`,
          users_attend: [],
          team: q.Ref(q.Collection("teams"), formData.team),
        },
      }),
    );

    return event;
  } catch (error) {
    return error;
  }
}
