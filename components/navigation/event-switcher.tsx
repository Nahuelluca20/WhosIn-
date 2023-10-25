"use client";

import * as React from "react";
import {CaretSortIcon, CheckIcon, PlusCircledIcon} from "@radix-ui/react-icons";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import {useAuth, useUser} from "@clerk/nextjs";

import {cn} from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {createGroup, getFaunaUserId, getTeamsNamesByUserId} from "@/app/api/actions";

const groups = [
  {
    label: "Teams",
    teams: [
      {
        label: "Elige grupo",
        value: "",
      },
    ],
  },
];

type Team = (typeof groups)[number]["teams"][number];

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface EventSwitcherProps extends PopoverTriggerProps {}

export default function EventSwitcher({className}: EventSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<Team>(groups[0].teams[0]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const {userId: userIdAuth} = useAuth();
  const {user} = useUser();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);

      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const getTeamsNames = useCallback(async () => {
    const userId = await getFaunaUserId(userIdAuth as string);
    const teamsNames = await getTeamsNamesByUserId(userId);

    const teams = teamsNames.map((team) => ({label: team, value: team}));

    groups[0].teams = [
      {
        label: "Elige grupo",
        value: "",
      },
      ...teams,
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchParams.get("team")) {
      const team = groups
        .map((group) => group.teams)
        .flat()
        .find((team) => team.value === searchParams.get("team"));

      if (team) {
        setSelectedTeam(team);
      }
    }
    getTeamsNames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, showNewTeamDialog]);

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            aria-expanded={open}
            aria-label="Select a team"
            className={cn("w-[200px] justify-between border-[2px]", className)}
            role="combobox"
            variant="outline"
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
                alt={selectedTeam.label}
                src={`https://avatar.vercel.sh/${selectedTeam.value}.png`}
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            {selectedTeam.label}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search team..." />
              <CommandEmpty>No team found.</CommandEmpty>
              {groups.map((group) => (
                <CommandGroup key={group.label} heading={group.label}>
                  {group.teams.map((team) => (
                    <CommandItem
                      key={team.value}
                      className="text-sm"
                      onSelect={() => {
                        setSelectedTeam(team);
                        router.push(pathname + "?" + createQueryString("team", team.value));
                        setOpen(false);
                      }}
                    >
                      <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage
                          alt={team.label}
                          className="grayscale"
                          src={`https://avatar.vercel.sh/${team.value}.png`}
                        />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      {team.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedTeam.value === team.value ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewTeamDialog(true);
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Crear grupo
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent className="w-[360px]">
        <DialogHeader>
          <DialogTitle>Crear grupo</DialogTitle>
          <DialogDescription>Añade un grupo para añadir eventos.</DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Group name</Label>
              <Input
                id="name"
                placeholder="Acme Inc."
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={async () => {
              await createGroup(
                userIdAuth as string,
                groupName,
                user?.emailAddresses[0].emailAddress,
                user?.firstName?.concat(" ", user?.lastName as string),
              );
              await setShowNewTeamDialog(false);
            }}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
