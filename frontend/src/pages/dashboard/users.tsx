import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VisualizeUser } from "@/components/visualize-user";
import { listUsers } from "@/services/get-users";
import { Eye, Pencil, Plus, Search, Trash } from "lucide-react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import useSWR from "swr";

export const UsersPage = () => {
  const navigate = useNavigate();

  // const usuarios = [
  //   { id: 1, nome: "Milena Santana Borges", email: "user@email.com" },
  //   { id: 2, nome: "Igor Fernandes", email: "user@email.com" },
  // ];

  // const allUsers = [
  //   { id: 1, nome: "Milena Santana Borges", email: "user@email.com" },
  //   { id: 2, nome: "Igor Fernandes", email: "user@email.com" },
  //   { id: 3, nome: "Joana Alves", email: "user@email.com" },
  //   { id: 4, nome: "Carlos Souza", email: "user@email.com" },
  //   { id: 5, nome: "Amanda Lima", email: "user@email.com" },
  //   { id: 6, nome: "Lucas Silva", email: "user@email.com" },
  //   { id: 7, nome: "Fernanda Ribeiro", email: "user@email.com" },
  //   { id: 8, nome: "Marcos Paulo", email: "user@email.com" },
  // ];

  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 4;

  // const totalPages = Math.ceil(allUsers.length / itemsPerPage);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const currentUsers = allUsers.slice(startIndex, startIndex + itemsPerPage);

  // const goToPrev = () => {
  //   if (currentPage > 1) setCurrentPage(currentPage - 1);
  // };

  // const goToNext = () => {
  //   if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  // };

  const fetchUsers = useCallback(async () => {
    try {
      const res = await listUsers();
      return res;
    } catch (error) {
      toast.error("Erro ao buscar usuarios");
    }
  }, ["users"]);

  const { data, error, isLoading } = useSWR("users", fetchUsers);

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
          onClick={() => navigate("/dash/add-user")}
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
                      <Pencil size={18} />
                    </ActionItem>
                    <ActionItem>
                      <Trash size={18} />
                    </ActionItem>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* <div className="flex justify-between items-center px-6 mt-auto">
            <button
              type="button"
              onClick={goToPrev}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Anterior
            </button>

            <span className="text-sm text-gray-700">
              Página {currentPage} de {totalPages}
            </span>

            <button
              type="button"
              onClick={goToNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Próximo
            </button>
          </div> */}
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
