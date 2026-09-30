import HeroSection from "@/components/sections/hero.section";
import { useCallApi } from "@/hook/useCallApi";
import type { Homepage } from "@/response/homepage.response";
import { getHomePageSlot } from "@/services/homepage.service";
import { useEffect, useState } from "react";

const HomePage = () => {
  const { execute } = useCallApi();
  const [homepage, setHomepage] = useState<Homepage | null>(null);

  useEffect(()=>{
    loadHomepage();
  },[])

  const loadHomepage = async () => {
    const response = await execute(() => getHomePageSlot());
    if (response?.status) {
      const data: Homepage | null = response.data;
      setHomepage(data);
    }
  };
  return (
    <main className="relative flex min-h-screen w-full flex-col bg-surface pb-24 pt-28 md:pt-16">
      <div className="flex w-full flex-col">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-space-lg w-full flex flex-col gap-8 sm:gap-space-xl">
          {/* <!-- Hero Spotlight & Continue Reading Row --> */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-stretch"></section>
          <HeroSection hero={homepage?.hero ?? null} />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
