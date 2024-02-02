import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { db } from "../_lib/prisma";
import BookingItem from "../_components/booking-item";
import { isFuture, isPast } from "date-fns";

const BookingsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) return redirect("/");

  const [confirmedBookings, finishedBookings] = await Promise.all([
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          gte: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
    }),
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          lt: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
    }),
  ]);

  return (
    <>
      <Header />

      <div className="px-5 py-6 flex flex-col gap-3">
        <h1 className="font-bold">Agendamentos</h1>

        {confirmedBookings.length > 0 && (
          <>

            <h2 className="text-sm text-gray-400 uppercase">Confirmados</h2>
            {confirmedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
            
          </>
        )}

        {finishedBookings.length > 0 && (
          <>

            <h2 className="text-sm text-gray-400 uppercase">Finalizados</h2>
            {finishedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}

          </>
        )}
      </div>
    </>
  );
};

export default BookingsPage;
