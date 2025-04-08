import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { login } from "@/services/auth";
import { useAuth } from "@/contexts/AuthContext";

export function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { login: setAuthData } = useAuth();

  const schema = z.object({
    email: z
      .string()
      .nonempty("Campo obrigatório")
      .min(3, "Mínimo 3 caracteres"),
    password: z.string().nonempty("Campo obrigatório"),
  });
  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await login(data.email, data.password);

      const { token, user } = response;
      setAuthData({ ...user }, token);

      navigate("/dash");

      toast.success("Usuario logado com sucesso");
    } catch (error) {
      toast.error("Usuário/Senha inválido(a)", {
        closeButton: true,
        icon: <AlertCircle />,
        style: {
          backgroundColor: "#FF4B4A",
          color: "#fff",
        },
      });
      console.error("Erro ao fazer login", error);
    }
  });

  return (
    <div className="bg-white max-w-[712px] h-[800px] py-16 px-12 rounded-md flex flex-col">
      <h1 className="mb-8 text-[#0290a4] text-left text-6xl tracking-wide font-bold">
        Bem vindo!
      </h1>
      <p className="mb-12 text-[#0B2B25] text-2xl">Entre com sua conta</p>
      <form onSubmit={onSubmit}>
        <Input
          {...register("email")}
          error={errors.email?.message}
          className="h-16 w-full"
          placeholder="E-mail ou N° matrícula"
        />
        <div className="relative">
          <Input
            {...register("password")}
            error={errors.password?.message}
            className="h-16 w-full mt-8"
            placeholder="Senha"
            type={showPassword ? "text" : "password"}
          />
          {showPassword ? (
            <Eye
              className="absolute right-4 top-14 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            />
          ) : (
            <EyeOff
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
