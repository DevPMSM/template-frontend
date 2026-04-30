"use client";

import logoPref from "@public/logo-pref-notext.png";
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { useAuth } from "@/hooks/useAuth";
import { IoChevronBackOutline } from "react-icons/io5";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { TfiEmail } from "react-icons/tfi";
import { PiKey } from "react-icons/pi";
import Loading from "@/components/loading";
import { Label } from "@/components/label";
import { Input } from "@/components/input";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error } = useAuth();
  const { isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await login({
      email,
      password,
    }).catch(() => setIsLoading(false));
  };

  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="font-nunito relative flex min-h-screen w-full flex-col md:flex-row">
      <div className="relative flex items-center justify-center bg-linear-to-t from-[#084B26CC] to-[#22325EB2] px-10 py-16 shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] max-sm:rounded-b-4xl md:w-7/12 md:rounded-r-4xl">
        <IoChevronBackOutline
          className="top-o absolute left-0 transition-all duration-200 hover:scale-110 hover:cursor-pointer md:left-8"
          size={30}
          color="#3B5394"
          onClick={() => {
            router.back();
          }}
        />
        <div className="flex text-white">
          <div className="mr-3 min-w-1 flex-1 rounded-4xl bg-[#B2C5FB] md:w-2"></div>
          <div>
            <h2 className="mb-2 w-full text-3xl font-black md:text-5xl md:whitespace-nowrap">
              Bem-vindo(a)!
            </h2>
            <p className="max-w-lg text-sm leading-5 font-semibold md:text-3xl md:leading-8">
              Só é possível acessa-lo se já estiver
              cadastrado no sistema.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="relative flex w-5/6 flex-col items-center justify-center rounded-2xl bg-[#F9F9F9] py-6 shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.25),0px_4px_4px_0px_rgba(0,0,0,0.25)] md:h-152 md:max-w-lg">
          <Image
            src={logoPref}
            alt="logo-prefeitura"
            className="mb-8 w-17.5 md:w-28"
          />
          <div>
            <p className="my-4 text-center text-2xl font-black text-[#3B5394] md:text-5xl">
              LOGIN
            </p>
            <form
              onSubmit={handleSubmit}
              className="w-72rem mb-12 flex flex-col justify-center gap-3 md:gap-6"
            >
              <Label className="mx-auto flex h-8 w-10/12 items-center gap-2 overflow-hidden rounded-lg border-2 border-[#848484] px-1 md:h-10 md:w-full">
                <TfiEmail className="text-[16px] md:text-[18px]" />
                <Input
                  type="email"
                  name="email"
                  placeholder="e-mail"
                  className="h-full w-full border-none outline-none"
                  defaultValue={email}
                  onChange={(
                    e: ChangeEvent<HTMLInputElement>
                  ) => {
                    setEmail(e.target.value);
                  }}
                />
              </Label>
              <Label className="mx-auto flex h-8 w-10/12 items-center gap-2 overflow-hidden rounded-lg border-2 border-[#848484] px-1 md:h-10 md:w-full">
                <PiKey className="text-[16px] md:text-[18px]" />
                <Input
                  type="password"
                  name="password"
                  placeholder="senha"
                  defaultValue={password}
                  className="h-full w-full border-none outline-none"
                  onChange={(
                    e: ChangeEvent<HTMLInputElement>
                  ) => {
                    setPassword(e.target.value);
                  }}
                />
              </Label>
              {error && (
                <p className="text-center text-xs font-bold text-red-600">
                  {error}
                </p>
              )}

              {!isLoading ? (
                <button
                  type="submit"
                  className="m-auto my-4 w-fit cursor-pointer rounded-lg bg-[#3B5394] px-4 py-1 font-black text-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-150 hover:scale-105 md:h-12 md:w-44"
                >
                  ENTRAR
                </button>
              ) : (
                <Loading className="mx-auto my-4 h-12 w-8 rounded-lg py-1" />
              )}
            </form>
            <div className="absolute right-0 bottom-0 flex h-16 w-full flex-col items-center justify-center gap-1.5">
              <hr className="w-3/12 rounded-2xl border border-[#B4B4B480]" />
              <hr className="w-2/12 rounded-2xl border border-[#B4B4B480]" />
              <hr className="w-1/12 rounded-2xl border border-[#B4B4B480]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
