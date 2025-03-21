import prisma from "@repo/db";

export function createRoom({
  roomName,
  userId,
}: {
  roomName: string;
  userId: string;
}): Promise<any> {
  return prisma.whiteBoard.create({
    data: {
      title: roomName,
      ownerId: userId,
      shapes: [],
    },
  });
}

export function getRooms({ userId }: { userId: string }): Promise<any> {
  return prisma.whiteBoard.findMany({
    where: {
      ownerId: userId,
    },
  });
}

export function getRoomById({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}): Promise<any> {
  return prisma.whiteBoard.findUnique({
    where: {
      boardId: roomId,
      ownerId: userId,
    },
  });
}

export function updateRoomShapes({
  roomId,
  shapes,
  userId,
}: {
  roomId: string;
  userId: string;
  shapes: any;
}): Promise<any> {
  return prisma.whiteBoard.update({
    where: {
      boardId: roomId,
      ownerId: userId,
    },
    data: {
      shapes,
    },
  });
}

export function deleteRoom({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}): Promise<any> {
  return prisma.whiteBoard.delete({
    where: {
      boardId: roomId,
      ownerId: userId,
    },
  });
}

export function getRoomShapes({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}): Promise<any> {
  return prisma.whiteBoard.findUnique({
    where: {
      boardId: roomId,
      ownerId: userId,
    },
    select: {
      shapes: true,
    },
  });
}

export function renameRoom({
  roomId,
  newName,
  userId,
}: {
  roomId: string;
  userId: string;
  newName: string;
}): Promise<any> {
  return prisma.whiteBoard.update({
    where: {
      ownerId: userId,
      boardId: roomId,
    },
    data: {
      title: newName,
    },
  });
}
