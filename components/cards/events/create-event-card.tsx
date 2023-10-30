"use client";

import {useCallback, useEffect, useState} from "react";
import {useAuth} from "@clerk/nextjs";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {toast} from "@/components/ui/use-toast";
import {CreateEventCardProps} from "@/lib/types";
import {getFaunaUserId, createEvent} from "@/app/api/actions";
import {getTeamsByUserId} from "@/app/api/teams";

export function CreateEventCard({withOutBorder = false}: {withOutBorder?: boolean}) {
  const {userId: userIdAuth} = useAuth();
  const [teams, setTeams] = useState<{id: string; name: string}[] | null>([]);
  const [formData, setForm] = useState<CreateEventCardProps>({
    eventName: "",
    team: "",
    placeName: "",
    totalGuest: "",
    eventPlace: "",
    month: "",
    year: "",
    day: "",
  });

  function handleChangeFormData(inpuntField: string, inputValue: string) {
    const data = {
      [inpuntField]: inputValue,
    };

    setForm({...formData, ...data});
  }

  const getTeamsNames = useCallback(async () => {
    const userId = await getFaunaUserId(userIdAuth as string);
    const teamsNames = await getTeamsByUserId(userId);

    setTeams(teamsNames as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(data: CreateEventCardProps) {
    const allFieldsFilled = Object.values(data).every((value) => value !== "");

    if (!allFieldsFilled) {
      return toast({
        title: "Datos inválidos",
        description: "Revisa que los datos esten completos",
      });
    }

    if (Number(data.day) < 1 || Number(data.day) > 31) {
      return toast({
        title: "Día no válido",
        description: "Revisa que el dia esté entre 1 y 31",
      });
    }

    let event = await createEvent(data);

    if (event) {
      return toast({
        title: "Evento creado",
        description: "Tu evento fue creado con éxtio",
      });
    } else {
      return toast({
        title: "Algo salió mal",
        description: "Revisa los datos o inténtalo más tarde",
      });
    }
  }

  useEffect(() => {
    getTeamsNames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className={`${withOutBorder && "border-none shadow-none"}`}>
      <CardHeader>
        <CardTitle>Crea tu nuevo evento</CardTitle>
        <CardDescription>Agrega la información necesaria para crear el evento.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex gap-5">
          <div className="grid gap-2">
            <Label htmlFor="eventName">Nombre del evento</Label>
            <Input
              id="eventName"
              placeholder="Asado en el tata"
              onChange={(e) => handleChangeFormData("eventName", e.target.value)}
            />
          </div>
          <div className="grid gap-2 w-full max-w-[212px]">
            <Label htmlFor="team">Grupo</Label>
            <Select onValueChange={(value) => handleChangeFormData("team", value)}>
              <SelectTrigger id="team">
                <SelectValue placeholder="Grupo" />
              </SelectTrigger>
              <SelectContent>
                {teams &&
                  teams?.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-5 items-end">
          <div className="grid gap-2">
            <Label htmlFor="totalGuest">Total de invitados</Label>
            <Input
              className="md:w-[212px]"
              id="totalGuest"
              max={"50"}
              min={"1"}
              placeholder="8"
              type="number"
              onChange={(e) => handleChangeFormData("totalGuest", e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="eventPlace">Lugar del evento</Label>
            <Input
              id="eventPlace"
              placeholder="https://maps.app.goo.gl/LoZU1Yijk6V9mQnq7"
              onChange={(e) => handleChangeFormData("eventPlace", e.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="placeName">Nombre del lugar</Label>
          <Input
            className="w-full max-w-[212px]"
            id="placeName"
            placeholder="tata house"
            onChange={(e) => handleChangeFormData("placeName", e.target.value)}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="month">Expires</Label>
            <Select onValueChange={(value) => handleChangeFormData("month", value)}>
              <SelectTrigger id="month">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Enero</SelectItem>
                <SelectItem value="2">Febrero</SelectItem>
                <SelectItem value="3">Marzo</SelectItem>
                <SelectItem value="4">Abril</SelectItem>
                <SelectItem value="5">Mayo</SelectItem>
                <SelectItem value="6">Junio</SelectItem>
                <SelectItem value="7">Julio</SelectItem>
                <SelectItem value="8">Agosto</SelectItem>
                <SelectItem value="9">Septiembre</SelectItem>
                <SelectItem value="10">Octubre</SelectItem>
                <SelectItem value="11">Noviembre</SelectItem>
                <SelectItem value="12">Diciembre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="year">Year</Label>
            <Select onValueChange={(value) => handleChangeFormData("year", value)}>
              <SelectTrigger id="year">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({length: 10}, (_, i) => (
                  <SelectItem key={i} value={`${new Date().getFullYear() + i}`}>
                    {new Date().getFullYear() + i}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="day">Día</Label>
            <Input
              className="xl:w-[212px]"
              id="day"
              max="31"
              min="1"
              placeholder="21"
              type="number"
              onChange={(e) => handleChangeFormData("day", e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => handleSubmit(formData)}>
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}
