import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { formatPhoneNumber } from "@/utils/formatter";
import {
  FaEye,
  FaRegEye,
  FaRegEyeSlash,
} from "react-icons/fa";
import { userType } from "@/types/user";
import { Button } from "@/components/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Loading from "../loading";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../popover";
import { Label } from "../label";
import { Input } from "../input";

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
  const [contact, setContact] = useState<string>(
    user?.contact ?? ""
  );
  const [isLoading, setIsLoading] =
    useState<boolean>(false);
  const { user: loggedUser } = useAuth();
  const inputPasswordRef = useRef<HTMLInputElement | null>(
    null
  );
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const ROLES: userType["role"][] = ["admin", "user"];

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);

      const newPreviews = fileArray.map((file) =>
        URL.createObjectURL(file)
      );

      previews.forEach((url) => URL.revokeObjectURL(url));

      setPreviews(newPreviews);
    }
  };

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
      className="no-scrollbar mt-1 grid grid-cols-12 gap-2 overflow-x-visible overflow-y-scroll max-sm:max-h-[600px] md:gap-4 md:px-5"
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
        title={`Contato${!user ? "*" : ""}`}
        className="col-span-12 md:col-span-6"
      >
        <Input
          type="text"
          name="contact"
          placeholder="Contato do usuário"
          className="text-center duration-100 hover:border-[#4c65ac]"
          readOnly={readOnly}
          disabled={readOnly}
          value={contact}
          required
          onChange={(e) =>
            setContact(formatPhoneNumber(e.target.value))
          }
        />
      </Label>

      <Label
        title={`Nível de Usuário${!user ? "*" : ""}`}
        className="col-span-12 md:col-span-6"
      >
        <Select
          defaultValue={user?.role}
          disabled={readOnly || user?.id === loggedUser?.id}
          name="role"
          required
        >
          <SelectTrigger className="box-border w-full border border-[#D2D2D2] py-1 duration-100 hover:border-[#4c65ac] focus:border focus:border-[#639855]">
            <SelectValue placeholder="Selecione o nível" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {ROLES.map((role, key) => {
                return (
                  <SelectItem key={key} value={role}>
                    {role.charAt(0).toUpperCase() +
                      role.slice(1)}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
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

      <Label
        title="Imagem de Perfil"
        className="col-span-12"
      >
        <Input
          type="file"
          name="image"
          accept="image/*"
          disabled={readOnly}
          className="text-center duration-100 hover:border-[#4c65ac]"
          onChange={handleFileChange}
        />
      </Label>
      {previews.length > 0 && (
        <div className="col-span-12 mt-2 flex flex-col items-center gap-2">
          <div className="relative h-24 w-24">
            <a href={previews[0]} target="_blank">
              <Image
                src={previews[0]}
                alt="Preview"
                className="h-full w-full rounded-md border-2 border-[#639855] object-cover shadow-sm"
                width={300}
                height={300}
              />
            </a>
          </div>
        </div>
      )}

      {previews.length === 0 && user?.image && (
        <div className="col-span-12 mt-2 flex flex-col items-center gap-2">
          <a href={user.image} target="_blank">
            <Image
              src={user.image}
              alt="Atual"
              className="h-24 w-24 rounded-md border-2 border-gray-200 object-cover"
              width={300}
              height={300}
            />
          </a>
        </div>
      )}
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
