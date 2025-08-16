import { getOriginalAnonURL } from "@/lib/data"
import { notFound, redirect } from "next/navigation"

interface Props {
    params: Promise<{ slug: string }>
}
export default async function Page ({ params }: Props) {
    const { slug } = await params

    const originalURL = await getOriginalAnonURL(slug)

    if(!originalURL) {
        notFound()
    }

    redirect(originalURL)
}