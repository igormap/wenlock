import SvgLogo from "@/assets/img/logos/WenLockLogo.svg?react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowLeftCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

export function PasswordRecovery() {
  const schema = z.object({
    email: z
      .string()
      .nonempty("O email é obrigatório")
      .email("Informe um email válido"),
  });
  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(
    (data) => {},
    () => {
      toast.error("Usuário/Senha inválido(a)", {
        closeButton: true,
        icon: <AlertCircle />,
        style: {
          backgroundColor: "#FF4B4A",
          color: "#fff",
        },
      });
    }
  );

  return (
    <div className="bg-white max-w-[712px] h-[800px] py-16 px-12 rounded-md flex flex-col">
      <SvgLogo className="mb-12" />
      <h2 className="mb-8 text-[#0290a4] text-left text-4xl tracking-wide font-bold">
        Recuperação de senha
      </h2>
      <p className="mb-12 text-[#0B2B25] text-2xl">
        Insira seu e-mail para recuperar sua senha.
      </p>
      <form onSubmit={onSubmit}>
        <div className="relative">
          <Input
            {...register("email")}
            error={errors.email?.message}
            className="h-16 w-full mt-8"
            placeholder="E-mail"
          />
        </div>

        <Button className="w-full h-16 font-bold text-white text-2xl bg-[#0290a4] mt-12 mb-8 cursor-pointer">
          Entrar
        </Button>
        <br />
        <Link
          className="text-[#6F7D7D] text-center cursor-pointer flex items-center justify-center gap-2 font-bold"
          to={""}
        >
          <ArrowLeftCircleIcon /> Voltar para o login
        </Link>
      </form>
    </div>
  );
}
