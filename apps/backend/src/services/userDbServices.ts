import prisma from "@repo/db";

export const findUserByEmailOrUsername = (
  email: string,
  username: string
): Promise<any> => {
  return prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });
};

export const createUser = (
  name: string,
  email: string,
  username: string,
  password: string,
  verificationToken: string,
  code: string,
  verificationTokenExpiry: string
): Promise<any> => {
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
};

export const updateRefreshToken = (
  userId: string,
  refreshToken: string | null
): Promise<any> => {
  return prisma.user.update({
    where: { userId },
    data: { refreshToken },
  });
};

export const findUserByVerificationToken = (
  verificationToken: string,
  code: string
): Promise<any> => {
  return prisma.user.findFirst({
    where: {
      code,
      verificationToken: { verificationToken },
    },
  });
};

export const verifyUser = (userId: string): Promise<any> => {
  return prisma.user.update({
    where: { userId },
    data: { isVerified: true },
  });
};

export const findUserById = (userId: string): Promise<any> => {
  return prisma.user.findUnique({
    where: { userId },
  });
};

export const addResetToken = (
  userId: string,
  resetToken: string,
  resetTokenExpiry: string
): Promise<any> => {
  return prisma.resetPasswordToken.upsert({
    where: { userId },
    update: { resetPasswordToken: resetToken, expiresAt: resetTokenExpiry },
    create: {
      userId,
      resetPasswordToken: resetToken,
      expiresAt: resetTokenExpiry,
    },
  });
};

export const findUserByResetToken = (resetToken: string): Promise<any> => {
  return prisma.resetPasswordToken.findFirst({
    where: { resetPasswordToken: resetToken },
  });
};

export const updatePassword = (
  userId: string,
  newPassword: string
): Promise<any> => {
  return prisma.user.update({
    where: { userId },
    data: { password: newPassword },
  });
};

export const clearResetToken = (userId: string): Promise<any> => {
  return prisma.resetPasswordToken.delete({
    where: { userId },
  });
};

// Export all as an object for default-style usage
const userDBService = {
  findUserByEmailOrUsername,
  createUser,
  updateRefreshToken,
  findUserByVerificationToken,
  verifyUser,
  findUserById,
  addResetToken,
  findUserByResetToken,
  updatePassword,
  clearResetToken,
};

export default userDBService;
