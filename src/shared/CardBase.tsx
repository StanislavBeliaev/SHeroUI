import {Card} from "@heroui/react";
import type {ICity} from "@/services/cityService/types"
import Link from "next/link";

export function CardBase({footer, description, title }: {
    footer?: string;
    description?: ICity[];
    title?: string,
    slug?: string
}) {
    return (
        <Card className="w-100">
            <Card.Header>
                <Card.Title>{title}</Card.Title>
                <Card.Description>
                    {description?.map((v) => {
                        return (
                            <Link key={v.slug} href={v.slug}>
                                <span key={v.id} className="flex cursor-pointer">{v.name}</span>
                            </Link>

                        );
                    })}
                </Card.Description>
            </Card.Header>
            {/*<Card.Footer className="flex justify-center items-center -mx-4 bg-amber-700 -mb-4">*/}
            {/*    {footer}*/}
            {/*</Card.Footer>*/}
        </Card>
    );
};