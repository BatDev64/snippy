import { getAnonURLsByClientId } from "@/lib/data";
import { Form } from "@/components/anon/CreateURL";
import { Suspense } from "react";
import { ShortLinkList } from "@/components/anon/ShortLinkList";

export default async function Home() {
  const urls = await getAnonURLsByClientId()
  /* */
  return (
    <div className="w-full mx-auto px-2 md:px-4 md:max-w-7xl my-4">
      <div className="flex flex-col justify-center items-center gap-12">
        <header className="text-balance text-center flex flex-col justify-center items-center gap-10">
          <div className="sm:max-w-lg md:max-w-xl">
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl leading-[1.1111111] mb-6 font-semibold font-display bg-linear-to-tl from-emerald-500 via-lime-200 from-0% via-30% to-60% to-neutral-300 bg-clip-text text-transparent">Turn endless URLs into flawless links</h1>
            <h2 className="text-sm xs:text-base sm:text-lg  font-sans md:text-lg dark:text-neutral-300 "><b>No account required</b>. Up to 10 links per session, each <b>active for 30 minutes...</b></h2>
          </div>
          <Form />
        </header>

        <section className="w-full">
          <Suspense fallback={<p>Loading...</p>}>
            <ShortLinkList initialURLs={urls!} />
          </Suspense>
        </section>
      </div>
    </div>
  );
}
