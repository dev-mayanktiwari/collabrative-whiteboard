import prisma from "@repo/db";

export default {
  findUserByEmailOrUsername: (email: string, username: string) => {
    return prisma.user.findFirst({
      where: {
        OR: [
          {
            email,
          },
          {
            username,
          },
        ],
      },
    });
  },

  createUser: (
    name: string,
    email: string,
    username: string,
    password: string,
    verificationToken: string,
    code: string,
    verificationTokenExpiry: string
  ) => {
    return prisma.user.create({
      data: {
        email,
        name,
        username,
        password,
        code,
        verificationToken: {
          create: {
            verificationToken,
            expiresAt: verificationTokenExpiry,
          },
        },
      },
    });
  },
};
