import SvgPeopleIdea from "@/assets/img/illustrations/PeopleIdea.svg?react";
import { getUser } from "@/contexts/AuthContext";
import { DateTime } from "luxon";

export const Home = () => {
  const user = getUser();
  return (
    <div className="p-9 text-[#0b2b25]">
      <h1 className="font-bold text-4xl mb-4">Home</h1>
      <main className="py-6 px-7 bg-white rounded shadow flex flex-col mb-16 h-full">
        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-3xl">Olá {user?.name}!</h2>
          <span className="font-semibold">
            {DateTime.now().setLocale("pt-BR").toFormat("dd, LLLL yyyy")}
          </span>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <SvgPeopleIdea />
          <div className="w-[600px] h-20 rounded-xl flex items-center justify-center bg-transparent text-[#0B2B25] border border-[#0B2B25] font-bold text-2xl mb-10">
            Bem vindo ao WenLock!
          </div>
        </div>
      </main>
    </div>
  );
};
