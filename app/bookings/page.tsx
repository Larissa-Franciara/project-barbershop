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

    const bookings = await db.booking.findMany({
        where: {
            userId: (session.user as any).id
        },
        include: {
            service: true,
            barbershop: true
        }
    });

    const confirmedBookings = bookings.filter(booking => isFuture(booking.date));
    const finishedBookings = bookings.filter(booking => isPast(booking.date));

    return (
        <>
        <Header />
        
        <div className="px-5 py-6 flex flex-col gap-3">
        <h1 className="font-bold">Agendamentos</h1>

        <h2 className="text-sm text-gray-400 uppercase">Confirmados</h2>

        {confirmedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking}  />
        ))}

        <h2 className="text-sm text-gray-400 uppercase">Finalizados</h2>

        {finishedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking}  />
        ))}
        </div>

        </>
    );
}
 
export default BookingsPage;