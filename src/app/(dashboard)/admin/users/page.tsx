"use client";

import { LuUserRound } from "react-icons/lu";

export default function Home() {
  return (
    <div className="flex h-full w-full flex-1 items-center justify-center">
      <div className="flex w-full">
        <LuUserRound size={26} />
        <div className="leading-2">
          <h2 className="text-2xl font-semibold">
            Usuários
          </h2>
          <p>
            Cadastre, edite, visualize e exclua usuários.
          </p>
        </div>
      </div>
    </div>
  );
}
