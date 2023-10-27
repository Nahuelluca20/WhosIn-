"use client";

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
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Button} from "@/components/ui/button";

export function CreateEventCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Crea tu nuevo evento</CardTitle>
        <CardDescription>Agrega la información necesaria para crear el evento.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {/* <RadioGroup className="grid grid-cols-3 gap-4" defaultValue="card">
          <div>
            <RadioGroupItem className="peer sr-only" id="card" value="card" />
            <Label
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              htmlFor="card"
            >
              <svg
                className="mb-3 h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect height="14" rx="2" width="20" x="2" y="5" />
                <path d="M2 10h20" />
              </svg>
              Card
            </Label>
          </div>
          <div>
            <RadioGroupItem className="peer sr-only" id="paypal" value="paypal" />
            <Label
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              htmlFor="paypal"
            >
              <Icons.paypal className="mb-3 h-6 w-6" />
              Paypal
            </Label>
          </div>
          <div>
            <RadioGroupItem className="peer sr-only" id="apple" value="apple" />
            <Label
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              htmlFor="apple"
            >
              <Icons.apple className="mb-3 h-6 w-6" />
              Apple
            </Label>
          </div>
        </RadioGroup> */}
        <div className="flex gap-5">
          <div className="grid gap-2">
            <Label htmlFor="eventName">Nombre del evento</Label>
            <Input id="eventName" placeholder="Asado en el tata" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="eventPlace">Lugar del evento</Label>
            <Input id="eventPlace" placeholder="https://maps.app.goo.gl/LoZU1Yijk6V9mQnq7" />
          </div>
        </div>
        <div className="flex gap-5">
          <div className="grid gap-2">
            <Label htmlFor="totalGuest">Cantidad de invitados</Label>
            <Input id="number" placeholder="8" type="totalGuest" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="eventPlace">Lugar del evento</Label>
            <Input id="eventPlace" placeholder="https://maps.app.goo.gl/LoZU1Yijk6V9mQnq7" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="month">Expires</Label>
            <Select>
              <SelectTrigger id="month">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">January</SelectItem>
                <SelectItem value="2">February</SelectItem>
                <SelectItem value="3">March</SelectItem>
                <SelectItem value="4">April</SelectItem>
                <SelectItem value="5">May</SelectItem>
                <SelectItem value="6">June</SelectItem>
                <SelectItem value="7">July</SelectItem>
                <SelectItem value="8">August</SelectItem>
                <SelectItem value="9">September</SelectItem>
                <SelectItem value="10">October</SelectItem>
                <SelectItem value="11">November</SelectItem>
                <SelectItem value="12">December</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="year">Year</Label>
            <Select>
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
            <Label htmlFor="cvc">CVC</Label>
            <Input id="cvc" placeholder="CVC" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Continue</Button>
      </CardFooter>
    </Card>
  );
}
