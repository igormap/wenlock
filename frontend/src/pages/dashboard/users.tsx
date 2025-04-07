import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Pencil, Plus, Search, Trash } from "lucide-react";
import { useState } from "react";

export const UsersPage = () => {
  const usuarios = [
    { id: 1, nome: "Milena Santana Borges" },
    { id: 2, nome: "Igor Fernandes" },
  ];

  const allUsers = [
    { id: 1, nome: "Milena Santana Borges" },
    { id: 2, nome: "Igor Fernandes" },
    { id: 3, nome: "Joana Alves" },
    { id: 4, nome: "Carlos Souza" },
    { id: 5, nome: "Amanda Lima" },
    { id: 6, nome: "Lucas Silva" },
    { id: 7, nome: "Fernanda Ribeiro" },
    { id: 8, nome: "Marcos Paulo" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(allUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = allUsers.slice(startIndex, startIndex + itemsPerPage);

  const goToPrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
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
        <Button className="bg-[#0290A4] h-14 w-56 text-lg">
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
              {usuarios.map((user) => (
                <tr key={user.id} className="bg-white border-b">
                  <td className="px-6 py-4">{user.nome}</td>
                  <td className="px-6 py-4 text-right">
                    <ActionItem>
                      <Eye size={18} />
                    </ActionItem>
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
const ActionItem = ({ children }: ActionItemProps) => {
  return (
    <button
      type="button"
      className=" hover:opacity-70 cursor-pointer p-1 hover:bg-[#00AAC1] rounded transition-colors"
    >
      {children}
    </button>
  );
};
