import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createUser } from "@/services/create-users";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

export const schema = z
  .object({
    name: z
      .string()
      .nonempty("Nome é obrigatório")
      .min(3, "Nome deve ter pelo menos 3 caracteres")
      .max(30, "Nome pode ter no máximo 30 caracteres"),

    registration: z
      .string()
      .nonempty("Matrícula é obrigatória")
      .min(4, "Mínimo 4 caracteres")
      .max(10, "Máximo 10 caracteres"),

    email: z
      .string()
      .nonempty("Email é obrigatório")
      .email("Email inválido")
      .max(40, "Email pode ter no máximo 40 caracteres"),

    password: z
      .string()
      .nonempty("Senha é obrigatória")
      .min(6, "A senha deve ter no mínimo 6 caracteres"),

    confirmPassword: z
      .string()
      .nonempty("Confirmação de senha é obrigatória")
      .min(6, "A senha deve ter no mínimo 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export const AddUserPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { confirmPassword, ...body } = data;
      const res = await createUser(body);
      toast.success("Cadastro realizado");
      navigate("/dash/users");
    } catch (error) {
      toast.error("Erro ao criar usuario");
    }
  });

  return (
    <div className="py-3 px-9">
      <h1 className="flex items-center gap-2 mb-1.5 text-4xl font-bold">
        <ChevronLeft onClick={() => navigate(-1)} className="cursor-pointer" />
        Cadastro de Usuário
      </h1>
      <main className="p-4 bg-white rounded">
        <form onSubmit={onSubmit}>
          <FormSectionTitle>Dados do Usuário</FormSectionTitle>
          <FormLine>
            <Input
              {...register("name")}
              placeholder="Insira o nome completo*"
              className="w-full h-14 bg-[#F4F4F4] border-none hover:bg-[#EAEAEA]"
              error={errors.name?.message}
              maxLength={30}
            />
            <Input
              {...register("registration")}
              placeholder="Insira o Nº da matrícula"
              className="w-full h-14 bg-[#F4F4F4] border-none hover:bg-[#EAEAEA]"
              error={errors.registration?.message}
            />
          </FormLine>
          <FormLine>
            <Input
              {...register("email")}
              placeholder="Insira o email*"
              className="w-full h-14 bg-[#F4F4F4] border-none hover:bg-[#EAEAEA]"
              error={errors.email?.message}
            />
          </FormLine>

          <FormSectionTitle>Dados de acesso</FormSectionTitle>
          <FormLine>
            <div className="relative">
              <Input
                {...register("password")}
                placeholder="Senha*"
                className="w-full h-14 bg-[#F4F4F4] border-none hover:bg-[#EAEAEA]"
                error={errors.password?.message}
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
                error={errors.confirmPassword?.message}
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
            <Button
              type="button"
              variant={"outline"}
              className="h-14 w-44 font-bold text-lg border-[#0B2B25]"
              onClick={() => {
                toast.warning("Cadastro cancelado", {
                  style: {
                    backgroundColor: "#FF7700",
                    color: "#fff",
                  },
                });
                navigate(-1);
              }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="h-14 w-44 font-bold text-lg bg-[#0290A4]"
            >
              Cadastrar
            </Button>
          </div>
        </form>
      </main>
    </div>
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
