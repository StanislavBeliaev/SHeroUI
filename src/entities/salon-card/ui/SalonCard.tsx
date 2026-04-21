import {Card} from "@heroui/react";
import Image from "next/image";
import type {SalonItem} from "@/services/salonService/types";

export function SalonCard(salons: SalonItem) {
    const {name, slug, smallAvatar, contactAddress} = salons;
    return (
        <Card variant="transparent" className="h-full p-0 rounded-lg shadow-sm">
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
                    <div className="text-base font-semibold line-clamp-2">
                        {name}
                    </div>
                    <p className="line-clamp-2">
                        {contactAddress}
                    </p>
                </div>
            </Card.Footer>
        </Card>
    )
}