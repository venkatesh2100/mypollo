import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.admin.upsert({
    where: { email: "codered@gmail.com" },
    update: {},
    create: {
      name: "venky",
      email: "codered@gmail.com",
      phonenumber: "999888666",
      password: await bcrypt.hash("venky", 10),
    },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
