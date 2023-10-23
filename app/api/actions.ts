"use server";
import {Select, query as q} from "faunadb";

import {faunaClient} from "@/lib/fauna";
import {Ref, UserDb} from "@/lib/types";

export async function getFaunaUserId(userId: string) {
  const user: UserDb = await faunaClient.query(q.Get(q.Match(q.Index("get_user_id"), userId)));

  return user.ref.id;
}

export async function getEventById(eventId: string) {
  const data = await faunaClient.query(
    q.Map(
      q.Paginate(q.Match(q.Index("get_invite_by_id"), eventId)),
      q.Lambda("event_by_id", q.Get(q.Var("event_by_id"))),
    ),
  );

  return data;
}

export async function getEventByTeam(teamId: string) {
  const data = await faunaClient.query(
    q.Map(
      q.Paginate(q.Match(q.Index("get_invites_by_team"), q.Ref(q.Collection("teams"), teamId))),
      q.Lambda("ref", q.Get(q.Var("ref"))),
    ),
  );

  return data;
}

export async function getTeamsByUserId(userId: string) {
  const data: Ref[] = await faunaClient.query(
    q.Select(
      "data",
      q.Paginate(q.Match(q.Index("teams_by_member"), q.Ref(q.Collection("users"), userId))),
    ),
  );

  return data;
}

export async function getTeamsNamesByUserId(userId: string) {
  const teamRefs: {data: [Ref[]]} = await faunaClient.query(
    q.Paginate(q.Match(q.Index("teams_by_member"), q.Ref(q.Collection("users"), userId))),
  );

  const teamNames = await Promise.all(
    teamRefs.data.map(async (teamRef) => {
      const teamData: {team_name: string; members: Ref[]} = await faunaClient.query(
        q.Select("data", q.Get(teamRef)),
      );

      return teamData?.team_name;
    }),
  );

  return teamNames;
}

export async function getTeamByMatchUserId(userId: string, teamName: string) {
  try {
    const teamId: string = await faunaClient.query(
      q.Select(
        ["ref", "id"],
        q.Get(
          q.Match(
            q.Index("teams_by_name_and_member"),
            teamName,
            q.Ref(q.Collection("users"), userId),
          ),
        ),
      ),
    );

    return teamId;
  } catch (error) {
    return null;
  }
}

//Upadate/Add event example

// Update(
//   Ref(Collection('teams'), '379299546935590993'),
//   {
//     data: {
//     team_events: Append(
//       Select(['data', 'team_events'], Get(Ref(Collection('teams'), '379299546935590993'))),
//       [Ref(Collection('invites'), '379299769432932432')]
//     )
//   }}
// )

// Create Team example

// Create(
//   Collection("teams"),
//   {
//     data: {
//       user: Select('ref', Get(Match(Index('user_by_id'), "user_2WlOHpf16CvOqiIDBnq6m2UoxOv"))),
//       team_name: "asado",
//       team_events: [
//         Ref(Collection("invites"), "379300542550114384"),
//       ]
//     }
//   }
// )

// Get teams wich match with user
// Select(
//   "data",
//   Paginate(
//     Match(
//       Index("teams_by_member"),
//       Ref(Collection("users"), "379297642900881489")
//     )
//   )
// )

// [
//   Ref(Collection("teams"), "379310795162386513"),
//   Ref(Collection("teams"), "379310813865836625")
// ]

// Get invites wich match with Team
// Select(
//   "data",
//   Paginate(
//     Match(
//       Index("get_invites_by_team"),
//       Ref(Collection("teams"), "379310813865836625")
//     )
//   )
// )
