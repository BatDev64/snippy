import { type Anon_urls } from "@/types/definitions"
import { formatDistanceToNow } from "date-fns"
import { ShortLinkCard } from "./ShortLinkCard"

interface Props {
  initialURLs: Anon_urls[]
}

export const ShortLinkList = ({ initialURLs }: Props) => {
  return (
    <ul className="w-full grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {initialURLs.map(el => {
        const expiry = el.expires_at
          ? formatDistanceToNow(new Date(el.expires_at), { addSuffix: true })
          : "Unknown"

        return (
          <li key={el.id}>
            <ShortLinkCard id={el.id} shortCode={el.short_code} originalUrl={el.original_url} expiresAt={expiry} />
          </li>
        )
      })}
    </ul>
  )
}
