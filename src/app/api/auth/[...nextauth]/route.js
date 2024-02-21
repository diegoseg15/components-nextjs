import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/libs/prisma";
import bcrypt from "bcrypt";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jperez" },
        password: {
          label: "password",
          type: "password",
          placeholder: "●●●●●●●",
        },
      },

      async authorize(credentials, req) {
        const userFound = await prisma.usuarios.findUnique({
          where: {
            USUNOM: credentials.username,
          },
        });

        if (!userFound) return null;

        console.log(userFound);

        const matchPassword = await bcrypt.compare(
          credentials.password,
          userFound.USUPAS
        );

        if (!matchPassword) return null;

        return {
          id: userFound.USUCOD,
          name: userFound.USUNOM,
          email: userFound.USUCOR,
        };
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
