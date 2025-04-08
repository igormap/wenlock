import { Dialog } from "@/components/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VisualizeUser } from "@/components/visualize-user";
import { listUsers } from "@/services/get-users";
import { removeUser } from "@/services/remove-user";
import { Eye, Pencil, Plus, Search, Trash } from "lucide-react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import useSWR from "swr";

export const UsersPage = () => {
  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    try {
      const res = await listUsers();
      return res;
    } catch (error) {
      toast.error("Erro ao buscar usuarios");
    }
  }, ["users"]);

  const { data, error, isLoading, mutate } = useSWR("users", fetchUsers);

  const deleteUser = async (registration: string) => {
    try {
      const res = await removeUser(registration);
      await mutate(undefined, { revalidate: true });
    } catch (error) {}
  };

  return (
    <div className="p-9 text-[#0b2b25]">
      <h1 className="font-bold text-4xl mb-4">Usuários</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <Input
            placeholder="Pesquisa"
            className="h-14 w-72 pl-12 placeholder:text-[#0A453A]"
          />
          <Search className="absolute top-4 left-4" />
        </div>
        <Button
          className="bg-[#0290A4] h-14 w-56 text-lg"
          onClick={() => navigate("/dash/user-form")}
        >
          <Plus size={24} />
          Cadastrar usuário
        </Button>
      </div>
      <main className="flex flex-col justify-between">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#0D1931] text-white rounded-xl">
              <tr>
                <th className="px-6 py-3">Nome</th>
                <th className="px-6 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="mt-4">
              {data?.map((user) => (
                <tr key={user.id} className="bg-white border-b">
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4 text-right">
                    <VisualizeUser user={user}>
                      <ActionItem>
                        <Eye size={18} />
                      </ActionItem>
                    </VisualizeUser>
                    <ActionItem>
                      <Pencil
                        size={18}
                        onClick={() =>
                          navigate("/dash/user-form?" + user.registration)
                        }
                      />
                    </ActionItem>
                    <Dialog
                      title="Deseja excluir?"
                      description="O usuário será excluído."
                      onConfirm={() => removeUser(user.registration)}
                    >
                      <ActionItem>
                        <Trash size={18} />
                      </ActionItem>
                    </Dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

interface ActionItemProps {
  children: React.ReactNode;
}
export const ActionItem = ({ children }: ActionItemProps) => {
  return (
    <button
      type="button"
      className=" hover:opacity-70 cursor-pointer p-1 hover:bg-[#00AAC1] rounded transition-colors"
    >
      {children}
    </button>
  );
};
