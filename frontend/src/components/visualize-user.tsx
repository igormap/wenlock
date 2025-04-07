import { FormSectionTitle } from "@/pages/dashboard/add-user";
import { ActionItem } from "@/pages/dashboard/users";
import { X } from "lucide-react";
import { DateTime } from "luxon";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

interface Props {
  user: any;
  children: React.ReactNode;
}

export const VisualizeUser = ({ user, children }: Props) => {
  return (
    <Drawer direction="right">
      <DrawerTrigger>
        <ActionItem>{children}</ActionItem>
      </DrawerTrigger>
      <DrawerContent className="w-[1000px]">
        <DrawerHeader className="relative px-9">
          <DrawerTitle className="text-2xl">
            Visualizar usuário
            <DrawerClose className="absolute top-5 right-5 cursor-pointer">
              <X size={24} />
            </DrawerClose>
          </DrawerTitle>
          {/* <DrawerDescription>
        This action cannot be undone.
      </DrawerDescription> */}
        </DrawerHeader>
        <div className="px-9">
          <FormSectionTitle>Dados do usuário</FormSectionTitle>
          <InformationLine>
            <InformationGroup name="Nome" value={user.nome} />
            <InformationGroup name="Matrícula" value={user.id} />
          </InformationLine>
          <InformationLine>
            <InformationGroup name="Email" value={user.email} />
          </InformationLine>

          <FormSectionTitle>Detalhes</FormSectionTitle>
          <InformationLine>
            <InformationGroup
              name="Data de criação"
              value={DateTime.now().toFormat("dd/MM/yyyy")}
            />
            <InformationGroup
              name="Ultima edição"
              value={DateTime.now().toFormat("dd/MM/yyyy") || "Nenhuma"}
            />
          </InformationLine>
        </div>
        <DrawerFooter>
          <DrawerClose>
            <Button
              className="h-14 w-[152px] border-[#0B2B25] text-lg font-bold"
              variant="outline"
            >
              Fechar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

interface InformationGroupProps {
  name: string;
  value: string | number;
}
const InformationGroup = ({ name, value }: InformationGroupProps) => {
  return (
    <div className="flex flex-col gap-2 text-[#0B2B25]">
      <span className="">{name}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
};

const InformationLine = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex gap-7 mb-9 flex-wrap">{children}</div>;
};
