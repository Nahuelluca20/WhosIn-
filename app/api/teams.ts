"use server";
import {query as q} from "faunadb";

import {faunaClient} from "@/lib/fauna";
import {Ref} from "@/lib/types";

// Get all team/group in a user by userId(fauna id)
export async function getTeamsByUserId(userId: string) {
  try {
    const teamRefs: {data: [Ref[]]} = await faunaClient.query(
      q.Paginate(q.Match(q.Index("teams_by_member"), q.Ref(q.Collection("users"), userId))),
    );

    const teamData: {id: string; name: string; members: Ref[]}[] = await Promise.all(
      teamRefs.data.map(async (teamRef) => {
        const teamInfo: any = await faunaClient.query(q.Get(teamRef));

        const teamName = teamInfo.data.team_name;
        const teamId = teamInfo.ref.id;
        const members = teamInfo.data.members;

        return {id: teamId, name: teamName, members: members};
      }),
    );

    return teamData;
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
