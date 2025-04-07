import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { ReactComponent as SvgEye } from "@/assets/img/icons/EyeOpen.svg";
import { ReactComponent as SvgEyeClose } from "@/assets/img/icons/EyeClose.svg";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const schema = z.object({
    name: z
      .string()
      .nonempty("Campo obrigatório")
      .min(3, "Mínimo 3 caracteres"),
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

  // const onSubmit = (data: FormData) => {
  //   console.log("Dados enviados:", data);
  // };

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
      <h1 className="mb-8 text-[#0290a4] text-left text-6xl tracking-wide font-bold">
        Bem vindo!
      </h1>
      <p className="mb-12 text-[#0B2B25] text-2xl">Entre com sua conta</p>
      <form onSubmit={onSubmit}>
        <Input
          {...register("name")}
          error={errors.name?.message}
          className="h-16 w-full"
          placeholder="E-mail ou N° matrícula"
        />
        <div className="relative">
          <Input
            {...register("email")}
            error={errors.email?.message}
            className="h-16 w-full mt-8"
            placeholder="Senha"
            type={showPassword ? "text" : "password"}
          />
          {showPassword ? (
            <SvgEye
              className="absolute right-4 top-14 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            />
          ) : (
            <SvgEyeClose
              className="absolute right-4 top-14 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            />
          )}
        </div>

        <Button className="w-full h-16 font-bold text-white text-2xl bg-[#0290a4] mt-12 mb-8 cursor-pointer">
          Entrar
        </Button>
        <br />
        <Link
          className="text-[#0290a4] text-center block cursor-pointer"
          to={"/"}
        >
          Esqueci minha senha
        </Link>
      </form>
    </div>
  );
}
