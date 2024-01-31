"use client";

import { Button } from "@/app/_components/ui/button";
import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarbershopInfoProps {
    barbershop: Barbershop
}
const BarbershoInfo = ({barbershop}: BarbershopInfoProps) => {
    const router = useRouter();

    const handleBoonkingClick = () => {
        router.back();
    }
    return ( 
        <div>
      <div className="h-[250px] w-full relative">
        <Button
          onClick={handleBoonkingClick}
          variant={"outline"}
          size={"icon"}
          className="absolute top-4 left-3 z-50"
        >
          <ChevronLeftIcon size={16} />
        </Button>

        <Button
          variant={"outline"}
          size={"icon"}
          className="absolute top-4 right-3 z-50"
        >
          <MenuIcon size={16} />
        </Button>

        <Image
          alt={barbershop.name}
          src={barbershop.imageUrl}
          style={{
            objectFit: "cover",
          }}
          fill
          className="opacity-75"
        />
      </div>

      <div className="px-5 pt-3 pb-6 border-b-4 border-double border-primary">
        <h1 className="text-xl font-bold">{barbershop.name}</h1>
        <div className="flex items-center gap-2 mt-2">
          <MapPinIcon className="text-primary" size={16} />
          <p className="text-sm">{barbershop.address}</p>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <StarIcon className="text-primary" size={16} />
          <p className="text-sm">5,0 (390 avaliações)</p>
        </div>
      </div>
    </div>
     );
}
 
export default BarbershoInfo;