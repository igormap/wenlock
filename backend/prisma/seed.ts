import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('123456', 10);

  await prisma.user.createMany({
    data: [
      {
        name: 'Igor Dev',
        email: 'igor@example.com',
        registration: '123456789',
        password: passwordHash,
      },
      {
        name: 'Outro Usuário',
        email: 'user2@example.com',
        registration: '987654321',
        password: passwordHash,
      },
    ],
    skipDuplicates: true, // evita erro caso já existam
  });
}

main()
  .then(() => {
    console.log('🌱 Seed realizado com sucesso.');
  })
  .catch((e) => {
    console.error('❌ Erro ao popular o banco:', e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
