import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export function Login() {
  return (
    <div className="bg-white w-[760px] h-[800px] py-16 px-12 rounded-md">
      <h1 className="mb-8 text-[#0290a4] text-left text-6xl tracking-wide font-bold">
        Bem vindo!
      </h1>
      <p className="mb-12 text-[#0B2B25] text-2xl">Entre com sua conta</p>
      <Input className="h-16 mb-8" placeholder="E-mail ou N° matrícula" />
      <Input className="h-16 " placeholder="Senha" />

      <Button className="w-full h-16 font-bold text-white text-2xl bg-[#0290a4] mt-12 mb-8">
        Entrar
      </Button>
      <br />
      <Link className="txt-[#0290a4] text-center block" to={""}>
        Esqueci minha senha
      </Link>
    </div>
  );
}
