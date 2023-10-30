"use server";
import {query as q} from "faunadb";

import {faunaClient} from "@/lib/fauna";
import {CreateEventCardProps, UserDb} from "@/lib/types";

import {getTeamsByUserId} from "./teams";

// Get fauna id by Clerck userId
export async function getFaunaUserId(userId: string) {
  try {
    const user: UserDb = await faunaClient.query(q.Get(q.Match(q.Index("get_user_id"), userId)));

    return user.ref.id;
  } catch (error) {
    return "";
  }
}

// Get user by id
export async function getUserById(userId: string) {
  const res: {name: string; email: string; user_id: string} = await faunaClient.query(
    q.Select("data", q.Get(q.Match(q.Index("get_user_by_id"), userId))),
  );

  const parseData = {
    name: res.name,
    email: res.email,
  };

  return parseData;
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

// Create group by id
async function createGroupByClerkId(id: string, groupName: string) {
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

// Create group and check if user exist in fauna
export async function createGroup(
  userId: string,
  groupName: string,
  emailAddresses?: string,
  userNames?: string,
) {
  try {
    const id = await getFaunaUserId(userId);

    if (!id && emailAddresses && userNames) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const user: UserDb = await createUserByClerkId(userId, userNames, emailAddresses);

      const id = await getFaunaUserId(userId);

      const team = createGroupByClerkId(id, groupName);

      return team;
    } else {
      const team = createGroupByClerkId(id, groupName);

      return team;
    }
  } catch (error) {
    return error;
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

// Add user in event
export async function addUserInEvent(eventId: string, userId: string) {
  try {
    const updatedInvite = await faunaClient.query(
      q.Update(q.Ref(q.Collection("invites"), eventId), {
        data: {
          users_attend: q.Append(
            [q.Ref(q.Collection("users"), userId)],
            q.Select(["data", "users_attend"], q.Get(q.Ref(q.Collection("invites"), eventId))),
          ),
        },
      }),
    );

    return updatedInvite;
  } catch (error) {
    throw error;
  }
}

// attend event
export async function attendEvent(
  userId: string,
  eventId: string,
  teamId: string,
  emailAddresses?: string,
  userNames?: string,
) {
  try {
    const id = await getFaunaUserId(userId);

    if (!id && emailAddresses && userNames) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const user: UserDb = await createUserByClerkId(userId, userNames, emailAddresses);

      const id = await getFaunaUserId(userId);

      const addUser = addUserInEvent(eventId, id);
      const teams: any = getTeamsByUserId(id);
      const userInTeams = await teams.filter((team: any) => team.id === teamId);

      if (userInTeams.length === 0) {
        const addTeam = await faunaClient.query(
          q.Update(q.Ref(q.Collection("teams"), teamId), {
            data: {
              members: q.Append(
                [q.Ref(q.Collection("users"), id)],
                q.Select(["data", "members"], q.Get(q.Ref(q.Collection("teams"), teamId))),
              ),
            },
          }),
        );

        return addTeam;
      }

      return addUser;
    } else {
      const addUser = await addUserInEvent(eventId, id);
      const teams: any = await getTeamsByUserId(id);

      const userInTeams = await teams.filter((team: any) => team.id === teamId);

      if (userInTeams.length === 0) {
        const addTeam = await faunaClient.query(
          q.Update(q.Ref(q.Collection("teams"), teamId), {
            data: {
              members: q.Append(
                [q.Ref(q.Collection("users"), id)],
                q.Select(["data", "members"], q.Get(q.Ref(q.Collection("teams"), teamId))),
              ),
            },
          }),
        );

        return addTeam;
      }

      return addUser;
    }
  } catch (error) {
    return error;
  }
}
