import { db } from "@/app/_lib/prisma";
import BarbershoInfo from "./_components/barbersho-info";
import ServiceItem from "./_components/service-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";

interface BarbershopDetailsPageProps {
  params: {
    id?: string;
  };
}

const BarbershopDetailsPage = async ({ params }: BarbershopDetailsPageProps) => {
  const session = await getServerSession(authOptions);
  if (!params.id) return null;

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    }
  });


  if (!barbershop) return null;

  return (
   <div>
     <BarbershoInfo  barbershop={barbershop} />
     
     <div className="px-5 flex flex-col gap-4 py-6">
        {barbershop.services.map((service) => (
          <ServiceItem key={service.id} barbershop={barbershop} service={service} isAunthenticated={!!session?.user}/>
          
        ))}   
     </div>

   </div>
  );
};
export default BarbershopDetailsPage;
