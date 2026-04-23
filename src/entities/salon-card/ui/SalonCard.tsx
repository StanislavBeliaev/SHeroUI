import { Card } from "@heroui/react";
import Image from "next/image";
import type { SalonItem } from "@/services/salonService/types";
import Link from "next/link";

type SalonCardProps = SalonItem & { city: string };

export function SalonCard({ name, slug, smallAvatar, contactAddress, city }: SalonCardProps) {
  const href = `/${encodeURIComponent(city)}/salon/${encodeURIComponent(slug)}`;
  return (
    <Link href={href}>
      <Card
        variant="transparent"
        className="h-full p-0 rounded-lg shadow-sm cursor-pointer hover:shadow-lg transition-all duration-300"
      >
        <Card.Header className="relative w-full h-50">
          <Image
            src={smallAvatar}
            alt={`Фото логотипа салона красоты ${name}`}
            fill
            className="object-cover"
          />
        </Card.Header>
        <Card.Footer className="px-2">
          <div className="min-h-14">
            <div className="text-base font-semibold line-clamp-2">{name}</div>
            <p className="line-clamp-2">{contactAddress}</p>
          </div>
        </Card.Footer>
      </Card>
    </Link>
  );
}
