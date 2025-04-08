import { UserForm } from "@/components/user-form";
import { createUser } from "@/services/create-users";
import { editUser } from "@/services/edit-user";
import { getUser } from "@/services/get-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import useSWR from "swr";
import { z } from "zod";

export const getSchema = (isEdit = false) =>
  z
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

      password: isEdit
        ? z.string().optional()
        : z
            .string()
            .nonempty("Senha é obrigatória")
            .min(6, "A senha deve ter no mínimo 6 caracteres"),

      confirmPassword: isEdit
        ? z.string().optional()
        : z
            .string()
            .nonempty("Confirmação de senha é obrigatória")
            .min(6, "A senha deve ter no mínimo 6 caracteres"),
    })
    .refine((data) => isEdit || data.password === data.confirmPassword, {
      message: "As senhas não coincidem",
      path: ["confirmPassword"],
    });

type FormData = z.infer<ReturnType<typeof getSchema>>;

export const AddUserPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userToEdit = location.search.split("?")[1];

  const fetchUser = useCallback(async () => {
    try {
      return await getUser(userToEdit);
    } catch (error) {}
  }, [userToEdit]);

  const { data: user } = useSWR(["user", userToEdit], fetchUser);
  console.log(userToEdit);

  const userForm = useForm<FormData>({
    resolver: zodResolver(getSchema(!!userToEdit)),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      registration: user?.registration,
    },
  });

  useEffect(() => {
    if (!user) return;
    userForm.reset({
      name: user?.name,
      email: user?.email,
      registration: user?.registration,
    });
  }, [user]);

  const onSubmit = userForm.handleSubmit(async (data) => {
    try {
      const { confirmPassword, ...body } = data;
      const { password, ...bodyWithoutPassword } = body;
      user
        ? await editUser(bodyWithoutPassword)
        : await createUser({ body, password: "" });
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
        {userToEdit ? "Editar Usuário" : "Cadastro de Usuário"}
      </h1>
      <FormProvider {...userForm}>
        <UserForm onSubmit={onSubmit} />
      </FormProvider>
    </div>
  );
};
