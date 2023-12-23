//@ts-ignore
const { SHA256 } = require('crypto-js');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {

  const user = await prisma.user.findUnique({
    where: {
      email: 'filippovigorz@frontendly.dev'
    }
  });

  if (user === null) {
    await prisma.user.create({
      data: {
        name: 'Ihor Filippov',
        email: 'filippovigorz@frontendly.dev',
        password: SHA256('qPeA9mUbHKVzA6cj').toString(),
        role: 'admin',
        key: 'ihor-filippov'
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })