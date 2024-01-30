import { format } from 'date-fns';
import { ptBR } from "date-fns/locale";
import Header from "../_components/header";
import Search from './_components/search';
import BookingItem from '../_components/booking-item';


export default function Home() {
  return (
    <div>
      <Header />

      <div className="px-5 pt-5">
      <h2 className="text-xl font-bold">Olá, Larissa!</h2>
      <p className="capitalize text-sm">
        {format(new Date(), "EEEE',' dd 'de' MMMM", {
          locale: ptBR,
        })}
      </p>
      </div>

      <div className="px-4 pt-4">
      <Search />
      </div>
        
      <div className="px-5 mt-5">
        <h2 className="text-xs font-bold text-gray-400 uppercase mb-3">Agendamentos</h2>
        <BookingItem />
      </div>
    </div>
  )
}
