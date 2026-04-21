import {Card} from "@heroui/react";
import Image from "next/image";
import type {SalonItem} from "@/services/salonService/types";

export function SalonCard(salons: SalonItem) {
    const {name, slug, smallAvatar, contactAddress} = salons;
    return (
        <Card variant="transparent" className="p-0 rounded-lg shadow-sm">
            <Card.Header className="relative w-76 h-44">
                <Image
                    src={smallAvatar}
                    alt={`Фото логотипа салона красоты ${name}`}
                    fill
                    className="object-cover"
                />
            </Card.Header>
            <Card.Footer className="px-2">
                <div>
                    <div className="text-base font-semibold line-clamp-2">
                        {name}
                    </div>
                    <p>
                        {contactAddress}
                    </p>
                </div>
            </Card.Footer>
        </Card>
    )
}