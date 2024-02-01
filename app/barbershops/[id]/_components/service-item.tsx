"use client";
import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent } from "@/app/_components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { Barbershop, Service } from "@prisma/client";
import { ptBR } from "date-fns/locale";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { generateDayTimeList } from "../../_helpers/hours";
import { format } from "date-fns";

interface ServiceItemProps {
  service: Service;
  isAunthenticated: boolean;
  barbershop: Barbershop;
}
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};
const ServiceItem = ({ service, barbershop, isAunthenticated }: ServiceItemProps) => {
  const handleBoonkingClick = () => {
    if (!isAunthenticated) {
      return signIn("google");
    }
  };
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState<string | undefined>();

  const timeList = useMemo(() => {
    return date ? generateDayTimeList(date) : [];
  }, [date]);

  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  };
  const handleHourClick = (time: string) => {
    setHour(time);
  };

  return (
    <Card>
      <CardContent className="p-3 w-full">
        <div className="flex gap-4 items-center w-full">
          <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
            <Image
              className="rounded-lg"
              src={service.imageUrl}
              fill
              style={{ objectFit: "contain" }}
              alt={service.name}
            />
          </div>

          <div className="flex flex-col w-full">
            <h2 className="font-bold">{service.name}</h2>
            <p className="text-sm text-gray-400 mt-2">{service.description}</p>

            <div className="flex items-center justify-between mt-3">
              <p className="text-primary text-sm font-bold">
                {formatCurrency(Number(service.price))}
              </p>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="secondary" onClick={handleBoonkingClick}>
                    Agendar
                  </Button>
                </SheetTrigger>
                <SheetContent className="p-0">
                  <SheetHeader className="text-left px-5 py-6 border-b border-solid border-primary">
                    <SheetTitle>Fazer agendamento</SheetTitle>
                  </SheetHeader>

                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateClick}
                    locale={ptBR}
                    fromDate={new Date()}
                    className="uppercase mt-6"
                    styles={{
                      head_cell: {
                        width: "100%",
                      },
                      cell: {
                        width: "100%",
                      },
                      button: {
                        width: "100%",
                      },
                      nav_button_previous: {
                        width: "32px",
                        height: "32px",
                      },
                      nav_button_next: {
                        width: "32px",
                        height: "32px",
                      },
                    }}
                  />
                  {date && (
                    <div className="flex gap-4  px-5 py-6 border-t border-solid border-secondary overflow-auto [&::-webkit-scrollbar]:hidden">
                      {timeList.map((time) => (
                        <Button
                          variant={hour === time ? "default" : "outline"}
                          className="mt-3 hover:bg-primary rounded-full"
                          key={time}
                          onClick={() => handleHourClick(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}

                  <div className="py-6 px-5 border-t border-solid border-primary">
                    <Card>
                      <CardContent className="p-3 flex flex-col gap-4">
                        <div className="flex justify-between">
                          <h2 className="font-bold">{service.name}</h2>
                          <h3 className="font-bold text-sm text-primary">
                            {formatCurrency(Number(service.price))}
                          </h3>
                        </div>
                        {date && (
                          <div className="flex justify-between">
                            <p className="text-gray-400 text-sm">Data</p>
                            <p className="text-sm">
                              {format(date, "dd 'de' MMMM", {
                                locale: ptBR,
                              })}
                            </p>
                          </div>
                        )}
                        {hour && (
                          <div className="flex justify-between">
                          <p className="text-gray-400 text-sm">Horário</p>
                          <p className="text-sm">
                            {hour}
                          </p>
                        </div>
                        )}
                        <div className="flex justify-between">
                        <p className="text-gray-400 text-sm">Barbearia</p>
                        <p className="text-sm">{barbershop.name}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <SheetFooter className="px-5">
                      <Button disabled={!date || !hour}> Confirmar agendamento</Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
