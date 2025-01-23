import { OAuth2Client } from "google-auth-library";
import { prisma } from "../../lib/prisma";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const verifyGoogleToken = async (token: string) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  return payload; // Retorna email, name, picture, etc.
};

export const findOrCreateUser = async (googleUser: any) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: googleUser.email },
  });

  if (existingUser) {
    return existingUser;
  }

  const newUser = await prisma.user.create({
    data: {
      email: googleUser.email,
      name: googleUser.name || null,
      password: "", // Não obrigatório para Google Auth
      profile: {
        create: {
          bio: "Usuário criado via Google OAuth",
        },
      },
    },
  });

  return newUser;
};
