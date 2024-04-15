import { prisma } from '../../lib/prisma';

import { RefreshToken } from '@prisma/client';

import { hashToken } from '../../lib/hashToken';

function addRefreshTokenToWhitelist( jti:string ,refreshToken: string, userId:string ) {
  return prisma.refreshToken.create({
    data: {
      id: jti,
      hashedToken: hashToken(refreshToken),
      userId,
    },
  });
}

function findRefreshTokenById(id: string) {
  return prisma.refreshToken.findUnique({
    where: {
      id,
    },
  });
}

function deleteRefreshToken(id: string) {
  return prisma.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true,
    },
  });
}

function revokeTokens(userId: string) {
  return prisma.refreshToken.updateMany({
    where: {
      userId,
    },
    data: {
      revoked: true,
    },
  });
}

export {
  addRefreshTokenToWhitelist,
  findRefreshTokenById,
  deleteRefreshToken,
  revokeTokens,
};
