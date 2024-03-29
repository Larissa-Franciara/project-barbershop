"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

interface SaveBookingParams {
    barbershopId: string;
    date: Date;
    serviceId: string;
    userId: string;
};

export const saveBooking =  async (params: SaveBookingParams) => {
    await db.booking.create({
        data: {
            barbershopId: params.barbershopId,
            date: params.date,
            serviceId: params.serviceId,
            userId: params.userId
        }
    })
    revalidatePath("/");
    revalidatePath("/bookings");
};