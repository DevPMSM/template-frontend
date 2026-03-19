"use client";

import logoPref from "@public/logo-pref-notext.png";
import {
  FormEvent,
  useEffect,
  useState,
  ChangeEvent,
} from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Label } from "@/components/label";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { MdOutlineEmail } from "react-icons/md";
import { HiOutlineKey } from "react-icons/hi";
import Loading from "@/components/loading";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, loading } = useAuth();
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
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="font-nunito flex min-h-screen w-full flex-col md:flex-row">
      <div className="flex items-center justify-center bg-linear-to-t from-[#084B26CC] to-[#22325EB2] px-10 py-16 shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] max-sm:rounded-b-4xl md:w-7/12 md:rounded-r-4xl">
        <div className="flex text-white">
          <div className="mr-3 min-w-1 flex-1 rounded-4xl bg-[#B2C5FB] md:w-2"></div>
          <div>
            <h2 className="mb-2 text-3xl font-black md:text-6xl">
              Bem-vindo(a)!
            </h2>
            <p className="text-nomrmal max-w-lg leading-5 font-semibold md:text-3xl md:leading-8">
              Só é possível acessa-lo se já estiver
              cadastrado no sistema.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="relative flex w-5/6 flex-col items-center justify-center rounded-2xl bg-[#F9F9F9] py-6 shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.25),0px_4px_4px_0px_rgba(0,0,0,0.25)] md:h-152 md:max-w-md">
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
              className="flex w-72 flex-col justify-center gap-3 max-md:mb-6 md:gap-6"
            >
              <Label className="mx-auto flex h-8 w-10/12 items-center gap-2 overflow-hidden rounded-lg border-2 border-[#848484] bg-white px-2 md:h-10 md:w-full">
                <MdOutlineEmail className="text-[16px] md:text-[20px]" />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="h-full w-full border-none px-0 md:text-lg"
                  defaultValue={email}
                  onChange={(
                    e: ChangeEvent<HTMLInputElement>
                  ) => {
                    setEmail(e.target.value);
                  }}
                />
              </Label>
              <Label className="mx-auto flex h-8 w-10/12 items-center gap-2 overflow-hidden rounded-lg border-2 border-[#848484] bg-white px-2 md:h-10 md:w-full">
                <HiOutlineKey className="text-[16px] md:text-[20px]" />
                <Input
                  type="password"
                  name="password"
                  placeholder="senha"
                  defaultValue={password}
                  className="h-full w-full border-none px-0 md:text-lg"
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
                <Button
                  type="submit"
                  className="m-auto my-4 w-fit cursor-pointer rounded-lg border-0 bg-[#3B5394] px-4 py-1 font-black text-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-150 hover:scale-105 md:h-12 md:w-44"
                >
                  ENTRAR
                </Button>
              ) : (
                <Loading className="my-4 px-4 py-1" />
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
