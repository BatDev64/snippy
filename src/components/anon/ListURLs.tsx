"use client"

import { type Anon_urls } from "@/types/definitions"
import { DeleteAnonURL } from "./Buttons"
import { CardURL } from "../ui/CardURL"
import { Button } from "../ui/Button"
import { Clipboard } from "../ui/icons"

interface Props {
  initialURLs: Anon_urls[]
}

export const ListURLs = ({ initialURLs }: Props) => {
  /*  const [now, setNow] = useState(new Date())
 
   useEffect(() => {
     const interval = setInterval(() => setNow(new Date()), 3000)
     return () => clearInterval(interval)
   }, [])
 
   const urls = useMemo(() => {
     return initialURLs.map(url => {
       return {
         ...url,
         isExpired: new Date(url.expires_at) < now
       }
     })
   }, [initialURLs, now]) */


  return (
    <ul className="w-full grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
      {initialURLs.map(el => {
        const isExpired = false
        const url = el.short_code && !isExpired ? `${el.short_code}` : '#'

        return (
          <li key={el.id}>
            <CardURL
              href={`https://snippy.vercel.app/${url}`}
              expiresAt={el.expires_at}
              originalURL={el.original_url}
              className=""
            >
              <div className="flex flex-col-reverse">

                <DeleteAnonURL id={el.id} className="absolute top-1 right-1 z-10" />
                <Button variant="secondary" size="icon"><Clipboard className="h-4 w-4" /></Button>
              </div>
            </CardURL>
          </li>
        )
      })}
    </ul>
  )
}
