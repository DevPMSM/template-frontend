import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { userType } from "@/types/user";
import { Button } from "@/components/button";
import Loading from "../loading";
import { Label } from "../label";
import { Input } from "../input";
import Select from "../select";

export type FormUserProps = {
  user?: userType | null;
  handleSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  readOnly?: boolean;
};

export default function FormUser({
  user = null,
  handleSubmit,
  readOnly = false,
}: FormUserProps) {
  const [previews, setPreviews] = useState<string[]>([]);

  const [isLoading, setIsLoading] =
    useState<boolean>(false);
  const inputPasswordRef = useRef<HTMLInputElement | null>(
    null
  );
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<string | null>(
    user?.role ?? null
  );

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const ROLES: userType["role"][] = ["user", "admin"];

  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    if (handleSubmit) {
      setIsLoading(true);
      handleSubmit(e);
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="no-scrollbar mt-1 grid grid-cols-12 gap-2 overflow-x-visible overflow-y-scroll max-sm:max-h-150 md:gap-4 md:px-5"
    >
      <Label
        title={`Nome${!user ? "*" : ""}`}
        className="col-span-12"
      >
        <Input
          type="text"
          name="name"
          placeholder="Nome do usuário"
          className="text-center duration-100 hover:border-[#4c65ac]"
          required
          disabled={readOnly}
          defaultValue={user?.name}
        />
      </Label>

      <Label
        title={`Email${!user ? "*" : ""}`}
        className="col-span-12"
      >
        <Input
          type="email"
          name="email"
          placeholder="Email do usuário"
          className="text-center duration-100 hover:border-[#4c65ac]"
          required
          disabled={readOnly}
          defaultValue={user?.email}
        />
      </Label>

      <Label
        title={`Nível de Usuário${!user ? "*" : ""}`}
        className="col-span-12"
      >
        <Select
          options={ROLES.map((role) => ({
            value: role,
            label: role === "user" ? "Usuário" : "Admin",
          }))}
          value={role}
          name="role"
          clearable={false}
          onChange={setRole}
          disabled={readOnly}
          classNames={{
            trigger: "min-h-8 text-center",
          }}
        />
      </Label>

      <Label
        title={`Senha${!user ? "*" : ""}`}
        className="col-span-12 flex flex-col"
      >
        <div className="`h-8 flex w-full items-center justify-center rounded-md border border-[#D2D2D2] px-2 py-0.5 transition-all duration-100 hover:border-[#4c65ac] focus:border focus:border-[#639855] disabled:cursor-not-allowed disabled:opacity-50">
          <div className="flex w-full items-center">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="***********"
              ref={inputPasswordRef}
              disabled={readOnly}
              className="border-0 text-center outline-0 focus:border-0"
              required={!user}
            />

            {!user &&
              (showPassword ? (
                <FaRegEyeSlash
                  size={16}
                  className="cursor-pointer hover:text-gray-600"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <FaRegEye
                  size={16}
                  className="cursor-pointer hover:text-gray-600"
                  onClick={togglePasswordVisibility}
                />
              ))}
          </div>
        </div>
      </Label>

      {!isLoading ? (
        <Button
          type="submit"
          className={`col-span-full mx-auto mt-4 cursor-pointer rounded-md bg-[#4c65ac] px-16 hover:bg-[#4c65ac]/90 ${readOnly ? "hidden" : "block"}`}
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
