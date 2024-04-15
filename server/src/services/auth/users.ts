import bcrypt from 'bcrypt';

import { prisma } from '../../lib/prisma'
import { User } from '@prisma/client';

function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

function createUserByEmailAndPassword(user: User) {
  user.password = bcrypt.hashSync(user.password, 12);
  return prisma.user.create({
    data: user,
  });
}

function findUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export {
  findUserByEmail,
  createUserByEmailAndPassword,
  findUserById,
};
