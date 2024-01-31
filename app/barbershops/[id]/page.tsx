import { db } from "@/app/_lib/prisma";
import BarbershoInfo from "./_components/barbersho-info";
import ServiceItem from "./_components/service-item";

interface BarbershopDetailsPageProps {
  params: {
    id?: string;
  };
}

const BarbershopDetailsPage = async ({
  params,
}: BarbershopDetailsPageProps) => {
 
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
          <ServiceItem key={service.id} service={service} />
          
        ))}   
     </div>

   </div>
  );
};
export default BarbershopDetailsPage;
