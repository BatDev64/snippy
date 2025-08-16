import { cn } from "@/utils/cn"
import Link from "next/link"
import { ExternalLink } from "./icons"
import { format } from 'date-fns'

interface CardURLProps {
    children?: React.ReactNode
    href: string
    originalURL?: string
    expiresAt?: string
    className?: string
}
export const CardURL = ({ children, href, originalURL, expiresAt, className }: CardURLProps) => {
    const time = format(expiresAt ? new Date(expiresAt) : new Date(), 'dd/MM/yyyy HH:mm aa')
    const expiresText = time ? `Expires: ${time}` : 'Expires: Unknown'

    return (
        <article className={cn(
            "w-fit",
            "group relative p-4 rounded-lg",
            "flex items-stretch justify-between w-full gap-4",
            "border dark:border-neutral-900",
            "dark:bg-neutral-900/50",
            " bg-linear-to-r/decreasing from-neutral-950/70 from-0% via-neutral-950/50 via-30% to-transparent to-100%",
            className)}>
            <div className="shrink-0 grow-0 flex flex-col">
                <span className="mb-2 text-xs dark:text-neutral-400">{expiresText}</span>
                <Link href={href} className="select-all flex items-center gap-2 mb-3 hover:underline group-hover:text-lime-500">
                    {href}<ExternalLink className="inline-block w-4 h-4 text-neutral-500 group-hover:text-lime-500" />
                </Link>
                <p className="truncate text-sm max-w-[200px] dark:text-neutral-500">{originalURL}</p>
            </div>
            {children}
        </article>
    )
}