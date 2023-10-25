"use server";
import {query as q} from "faunadb";

import {faunaClient} from "@/lib/fauna";
import {Ref, UserDb} from "@/lib/types";

// Get fauna id by Clerck userId
export async function getFaunaUserId(userId: string) {
  try {
    const user: UserDb = await faunaClient.query(q.Get(q.Match(q.Index("get_user_id"), userId)));

    return user.ref.id;
  } catch (error) {
    return "";
  }
}

// Get one sigle event/invite by eventId
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

// Get all team/group in a user by userId(fauna id)
export async function getTeamsByUserId(userId: string) {
  try {
    const data: Ref[] = await faunaClient.query(
      q.Select(
        "data",
        q.Paginate(q.Match(q.Index("teams_by_member"), q.Ref(q.Collection("users"), userId))),
      ),
    );

    return data;
  } catch (error) {
    return [];
  }
}

// Get all team/group names in a user by userId(fauna id)
export async function getTeamsNamesByUserId(userId: string) {
  try {
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
  } catch (error) {
    return [];
  }
}

// Get team by teamName and userId when matching teamName and userId
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

// Create user by userId provide by Clerck
export async function createUserByClerkId(id: string, userNames: string, emailAddresses: string) {
  const user: UserDb = await faunaClient.query(
    q.Create(q.Collection("users"), {
      data: {
        name: userNames,
        email: emailAddresses,
        user_id: id,
      },
    }),
  );

  return user;
}

// Get de userId provide by Clerck
export async function createGroup(
  userId: string,
  groupName: string,
  emailAddresses?: string,
  userNames?: string,
) {
  try {
    const id = await getFaunaUserId(userId);

    if (!id && emailAddresses && userNames) {
      const user: UserDb = await createUserByClerkId(userId, userNames, emailAddresses);

      const id = await getFaunaUserId(userId);

      const team = await faunaClient.query(
        q.Create(q.Collection("teams"), {
          data: {
            team_name: groupName,
            members: [q.Ref(q.Collection("users"), id)],
          },
        }),
      );

      return team;
    } else {
      const team = await faunaClient.query(
        q.Create(q.Collection("teams"), {
          data: {
            team_name: groupName,
            members: [q.Ref(q.Collection("users"), id)],
          },
        }),
      );

      return team;
    }
  } catch (error) {
    console.log(error);
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
//       members: [
//          Ref(Collection("users"), "379297642900881489")
//        ]
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
