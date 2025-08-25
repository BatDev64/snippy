import { getAnonURLsByClientId } from "@/lib/data";
import { Form } from "@/components/anon/CreateURL";
import { Suspense } from "react";
import { ShortLinkList } from "@/components/anon/ShortLinkList";
import Image from "next/image"
export default async function Home() {
  const urls = await getAnonURLsByClientId()
  /* */
  return (
    <>
      <section className="relative w-full py-8 gap-4 flex flex-col justify-center items-center overflow-hidden">

        <div className="relative z-40 text-balance w-full wrapper">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl 2xl:8xl tracking-tight font-bold leading-tight font-display max-w-[900px]">Turn endless URLs into flawless links</h1>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-muted-foreground font-sans mt-4 max-w-prose">No account required. Up to 10 links per session, each active for 30 minutes...</p>
          <div className="lg:max-w-3/4 mt-10">

            <Form />
          </div>
        </div>

        <div className="hidden lg:block size-[35%] absolute top-[8%] right-[6%] z-20 opacity-20 -rotate-[18deg]  float ">
          <Image
            src="/link-3D.png"
            alt="Logo de la app"
            width={400}
            height={400}
            className="h-auto w-full [mask-image:linear-gradient(to_bottom,black_10%,transparent_90%)] [mask-repeat:no-repeat] [mask-size:100%] [-webkit-mask-image:linear-gradient(to_bottom,black_10%,transparent_90%)] hidden lg:block "
            priority
          />
        </div>

      </section>


      <section className="w-full wrapper py-8 relative z-40">
        <Suspense fallback={<p>Loading...</p>}>
          <ShortLinkList initialURLs={urls!} />
        </Suspense>
      </section>
    </>
  );
}

