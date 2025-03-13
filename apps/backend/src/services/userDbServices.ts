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

  updateRefreshToken: (userId: string, refreshToken: string | null) => {
    return prisma.user.update({
      where: {
        userId: userId,
      },
      data: {
        refreshToken,
      },
    });
  },

  findUserByVerificationToken: (verificationToken: string, code: string) => {
    return prisma.user.findFirst({
      where: {
        code,
        verificationToken: {
          verificationToken,
        },
      },
    });
  },

  verifyUser: (userId: string) => {
    return prisma.user.update({
      where: {
        userId,
      },
      data: {
        isVerified: true,
      },
    });
  },

  findUserById: (userId: string) => {
    return prisma.user.findUnique({
      where: {
        userId,
      },
    });
  },

  addResetToken: (
    userId: string,
    resetToken: string,
    resetTokenExpiry: string
  ) => {
    prisma.resetPasswordToken.upsert({
      where: {
        userId,
      },
      update: {
        resetPasswordToken: resetToken,
        expiresAt: resetTokenExpiry,
      },
      create: {
        userId,
        resetPasswordToken: resetToken,
        expiresAt: resetTokenExpiry,
      },
    });
  },

  findUserByResetToken: (resetToken: string) => {
    return prisma.resetPasswordToken.findFirst({
      where: {
        resetPasswordToken: resetToken,
      },
    });
  },

  updatePassword: (userId: string, newPassword: string) => {
    return prisma.user.update({
      where: {
        userId,
      },
      data: {
        password: newPassword,
      },
    });
  },

  clearResetToken: (userId: string) => {
    return prisma.resetPasswordToken.delete({
      where: {
        userId,
      },
    });
  },
};
