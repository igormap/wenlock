import { toast } from "sonner";
import { Button } from "./ui/button";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "./ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router";
import { Dialog } from "./dialog";

interface Props {
  onSubmit: () => void;
}
export const UserForm = ({ onSubmit }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  return (
    <main className="p-4 bg-white rounded">
      <form onSubmit={onSubmit}>
        <FormSectionTitle>Dados do Usuário</FormSectionTitle>
        <FormLine>
          <Input
            {...register("name")}
            placeholder="Insira o nome completo*"
            className="w-full h-14 bg-[#F4F4F4] border-none hover:bg-[#EAEAEA]"
            error={errors.name?.message?.toString()}
            maxLength={30}
          />
          <Input
            {...register("registration")}
            placeholder="Insira o Nº da matrícula"
            className="w-full h-14 bg-[#F4F4F4] border-none hover:bg-[#EAEAEA]"
            error={errors.registration?.message?.toString()}
          />
        </FormLine>
        <FormLine>
          <Input
            {...register("email")}
            placeholder="Insira o email*"
            className="w-full h-14 bg-[#F4F4F4] border-none hover:bg-[#EAEAEA]"
            error={errors.email?.message?.toString()}
          />
        </FormLine>

        <FormSectionTitle>Dados de acesso</FormSectionTitle>
        <FormLine>
          <div className="relative">
            <Input
              {...register("password")}
              placeholder="Senha*"
              className="w-full h-14 bg-[#F4F4F4] border-none hover:bg-[#EAEAEA]"
              error={errors.password?.message?.toString()}
              type={showPassword ? "text" : "password"}
            />
            {showPassword ? (
              <Eye
                className="absolute right-4 top-4 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            ) : (
              <EyeOff
                className="absolute right-4 top-4 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            )}
          </div>
          <div className="relative">
            <Input
              {...register("confirmPassword")}
              placeholder="Repetir Senha*"
              className="w-full h-14 bg-[#F4F4F4] border-none hover:bg-[#EAEAEA]"
              error={errors.confirmPassword?.message?.toString()}
              type={confirmPassword ? "text" : "password"}
            />
            {confirmPassword ? (
              <Eye
                className="absolute right-4 top-4 cursor-pointer"
                onClick={() => setConfirmPassword((prev) => !prev)}
              />
            ) : (
              <EyeOff
                className="absolute right-4 top-4 cursor-pointer"
                onClick={() => setConfirmPassword((prev) => !prev)}
              />
            )}
          </div>
        </FormLine>
        <div className="flex items-center gap-2.5 justify-end">
          <Dialog
            title="Deseja cancelar?"
            description="Os dados inseridos não serão salvos"
            onConfirm={() => {
              toast.warning("Cadastro cancelado", {
                style: {
                  backgroundColor: "#FF7700",
                  color: "#fff",
                },
              });
              navigate(-1);
            }}
          >
            <Button
              type="button"
              variant={"outline"}
              className="h-14 w-44 font-bold text-lg border-[#0B2B25]"
            >
              Cancelar
            </Button>
          </Dialog>
          <Button
            type="submit"
            className="h-14 w-44 font-bold text-lg bg-[#0290A4]"
          >
            Cadastrar
          </Button>
        </div>
      </form>
    </main>
  );
};

export const FormSectionTitle = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex items-center gap-5 mb-5">
      <h2 className="font-bold min-w-max">{children}</h2>
      <div className="w-full h-[1px] bg-[#707070]" />
    </div>
  );
};

const FormLine = ({ children }: { children: React.ReactNode }) => {
  return <div className="grid gap-8 grid-cols-2 w-full mb-8">{children}</div>;
};
