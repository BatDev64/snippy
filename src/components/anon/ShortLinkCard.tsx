import Link from "next/link"
import { Card } from "../ui/Card"
import { DeleteAnonURL } from "./Buttons"
import { Clipboard, ExternalLink } from "../ui/icons"
import { Button } from "../ui/Button"

interface Props {
    id: string
    shortCode: string
    originalUrl: string
    expiresAt?: string
}

export const ShortLinkCard = ({ id, shortCode, originalUrl, expiresAt }: Props) => {
    return (
        <Card.Root>
            <DeleteAnonURL id={id} className="absolute top-2 right-2 h-8 w-8 p-0 sm:top-3 sm:right-3" />
            <Card.Header>
                <Card.ExpirationTime>Expires {expiresAt}</Card.ExpirationTime>
                <Card.Title>
                    <Link target="_blank" href={`/${shortCode}`}>
                        {`snippy.vercel.app/${shortCode}`}<ExternalLink className="inline-block w-4 h-4 ml-2" />
                    </Link>
                </Card.Title>
                <Card.Description>
                    {originalUrl}
                </Card.Description>
            </Card.Header>
            <Card.Actions className="flex flex-row-reverse">
                <Button variant="default" size="sm" leftIcon={<Clipboard className="h-3 w-3 " />} className="">
                    Copy
                </Button>
            </Card.Actions>
        </Card.Root>
    )
}