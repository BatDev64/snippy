import { getAnonURLsByClientId } from "@/lib/data";
import { Form } from "@/components/anon/CreateURL";
import { Suspense } from "react";
import { ListURLs } from "@/components/anon/ListURLs";

export default async function Home() {
  const urls = await getAnonURLsByClientId()

  return (
    <>
      <header className="lg:max-w-md flex flex-col gap-8">
        <div className="text-balance [&_h1]:leading-[1.1111111] [&_h1]:mb-6 [&_h2]:text-balance [&_h2]:text-sm/7 md:[&_h2]:text-base/7 ">
          <h1 className="text-5xl md:text-6xl dark:text-neutral-50">
            Turn endless URLs into flawless links
          </h1>
          <h2 className="dark:text-neutral-300">
            <b>No account required</b>. Up to 10 links per session, each <b>active for 30 minutes...</b>
          </h2>
        </div>

        {/* 👉 Mobile: sticky | Desktop: static */}
        <div className="sticky top-8 z-50 bg-amber-300 lg:static">
          <Form />
        </div>
      </header>

      {/* 👉 En desktop, esta columna derecha será la que scrollea */}
      <section className="flex-1 lg:h-[510px] lg:py-4 lg:pr-4 lg:overflow-y-auto lg:overflow-x-hidden touch-auto lg:overscroll-contain">
        <Suspense fallback={<p>Loading...</p>}>
          <ListURLs initialURLs={urls!} />
        </Suspense>
      </section>
      {/* <header className="lg:max-w-md flex flex-col gap-8">
        <div className="text-balance [&_h1]:leading-[1.1111111] [&_h1]:mb-6 [&_h2]:text-balance [&_h2]:text-sm/7 md:[&_h2]:text-base/7 ">
          <h1 className="text-5xl md:text-6xl dark:text-neutral-50">Turn endless URLs into flawless links</h1>
          <h2 className="dark:text-neutral-300"><b>No account required</b>. Up to 10 links per session, each <b>active for 30 minutes...</b></h2>
        </div>
        <div className="sticky z-50 top-0 bg-amber-300">

          <Form />
        </div>
      </header>

      <section className="flex-1 lg:py-4 lg:pr-4 lg:overflow-x-hidden lg:overscroll-contain">
        <Suspense fallback={<p>Loading...</p>}>
          <ListURLs initialURLs={urls!} />
        </Suspense>
      </section> */}
    </>
  );
}