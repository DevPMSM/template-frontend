import { FormEvent, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { userType } from "@/types/user";
import { Button } from "@/components/button";
import { Label } from "@/components/label";
import { Input } from "@/components/input";
import Select from "@/components/select";
import Loading from "@/components/loading";
import { ImageUpload } from "@/components/imageUpload";
import { formatPhoneNumber } from "@/utils/formatter";
import { InputSkeleton } from "@/components/inputSkeleton";

export type FormUserProps = {
  user?: userType | null;
  // Ajustado para aceitar funções assíncronas (Promises) e o loading funcionar corretamente
  handleSubmit?: (
    e: FormEvent<HTMLFormElement>
  ) => Promise<void> | void;
  readOnly?: boolean;
};

export default function FormUser({
  user = null,
  handleSubmit,
  readOnly = false,
}: FormUserProps) {
  const [formatPhone, setFormatPhone] = useState<string>(
    user?.contact ?? ""
  );
  const [isLoading, setIsLoading] =
    useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<string | null>(
    user?.role ?? null
  );

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const ROLES: userType["role"][] = ["user", "admin"];

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (handleSubmit) {
      setIsLoading(true);
      try {
        await handleSubmit(e);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form
      onSubmit={submit}
      className="no-scrollbar mt-1 grid grid-cols-12 gap-2 overflow-x-visible overflow-y-scroll max-sm:max-h-150 md:gap-4 md:px-5"
    >
      <Label
        title={`Nome${!user ? "*" : ""}`}
        className="col-span-12 min-h-9.5"
      >
        {!isLoading ? (
          <Input
            type="text"
            name="name"
            placeholder="Nome do usuário"
            className="h-full text-center duration-100 hover:border-[#4c65ac]"
            required
            disabled={readOnly}
            defaultValue={user?.name}
          />
        ) : (
          <InputSkeleton />
        )}
      </Label>

      <Label
        title={`Email${!user ? "*" : ""}`}
        className="col-span-12 min-h-9.5"
      >
        {!isLoading ? (
          <Input
            type="email"
            name="email"
            placeholder="Email do usuário"
            className="h-full text-center duration-100 hover:border-[#4c65ac]"
            required
            disabled={readOnly}
            defaultValue={user?.email}
          />
        ) : (
          <InputSkeleton />
        )}
      </Label>

      <Label
        title={`Contato${!user ? "*" : ""}`}
        className="col-span-12 min-h-9.5 md:col-span-6"
      >
        {!isLoading ? (
          <Input
            type="text"
            name="contact"
            placeholder="Número de contato"
            className="h-full text-center duration-100 hover:border-[#4c65ac]"
            onChange={(e) => {
              setFormatPhone(
                formatPhoneNumber(e.target.value)
              );
            }}
            required
            disabled={readOnly}
            value={formatPhone}
          />
        ) : (
          <InputSkeleton />
        )}
      </Label>

      <Label
        title={`Nível de Usuário${!user ? "*" : ""}`}
        className="col-span-12 md:col-span-6"
      >
        {!isLoading ? (
          <Select
            options={ROLES.map((role) => ({
              value: role,
              label: role === "user" ? "Usuário" : "Admin",
            }))}
            value={role}
            name="role"
            placeholder="Cargo"
            clearable={false}
            onChange={setRole}
            disabled={readOnly}
            classNames={{
              trigger: "min-h-7 text-center",
            }}
          />
        ) : (
          <InputSkeleton />
        )}
      </Label>

      <Label
        title={`Senha${!user ? "*" : ""}`}
        className="col-span-12 flex min-h-9.5 flex-col"
      >
        {!isLoading ? (
          <div className="flex h-full w-full items-center justify-center rounded-md border border-[#D2D2D2] px-2 py-0.5 transition-all duration-100 focus-within:border-[#639855] hover:border-[#4c65ac] focus:border disabled:cursor-not-allowed disabled:opacity-50">
            <div className="flex h-7 w-full items-center">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="***********"
                disabled={readOnly}
                className="border-0 text-center outline-0 focus:border-0"
                required={!user}
              />

              {!user && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="flex items-center justify-center text-gray-400 transition-colors hover:text-gray-600 focus:outline-none"
                  title={
                    showPassword
                      ? "Ocultar senha"
                      : "Mostrar senha"
                  }
                >
                  {showPassword ? (
                    <FaRegEyeSlash size={18} />
                  ) : (
                    <FaRegEye size={18} />
                  )}
                </button>
              )}
            </div>
          </div>
        ) : (
          <InputSkeleton />
        )}
      </Label>

      <div className="col-span-12 flex flex-col gap-1">
        <ImageUpload
          name="image"
          defaultImage={user?.image}
          disabled={readOnly}
        />
      </div>

      {!isLoading ? (
        <Button
          type="submit"
          className={`col-span-full mx-auto mt-4 cursor-pointer rounded-md bg-[#4c65ac] px-16 font-bold hover:bg-[#4c65ac]/90 ${readOnly ? "hidden" : "block"}`}
        >
          Enviar
        </Button>
      ) : (
        <Loading
          className="col-span-full mx-auto mt-4"
          color="#4c65ac"
        />
      )}
    </form>
  );
}
