import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@lib/prisma';
import { User } from '@prisma/client';
import { hashPassword } from '@/_core/utils/hash-password';
import { nameToKey } from '@/_core/utils/name-to-key';

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          key: nameToKey(profile.name ?? profile.login),
          password: hashPassword(profile.email + process.env.NEXTAUTH_SECRET)
        }
      },
    }),
    CredentialsProvider({
      id: 'register',
      name: 'Register',
      credentials: {
        name: {},
        email: {},
        password: {}
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { name, email, password } = credentials;

        const user: User = await prisma.user.create({
          data: {
            name,
            key: nameToKey(name),
            email,
            password: hashPassword(password),
          }
        });

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          key: user.key,
        }
      }
    }),
    CredentialsProvider({
      id: 'login',
      name: 'Login',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Email'
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: 'Password'
        }
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { email, password } = credentials;

        const user: User | null = await prisma.user.findUnique({
          where: { email: email },
        });

        if (!user) return null;
        if (user.password !== hashPassword(password)) return null;

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          key: user.key,
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    jwt({ token, account, user }) {
      console.log('jwt');
      console.dir({
        token, account, user
      })

      if (account) {
        token.email = user.email;
        token.accessToken = account.access_token;
        token.id = user?.id;
        //@ts-ignore
        token.role = user.role;
        //@ts-ignore
        token.key = user.key;
      }
      return token

    },
    session({ session, token, user }) {
      console.log('session');
      console.dir({
        session, token, user
      })
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.key = token.key;
      return session;
    },
    // async signIn({ user, account }) {
    //   if (account?.provider === 'github') {
    //     const { name, email } = user;

    //     if (name && email) {
    //       const existingUser: User | null = await prisma.user.findUnique({
    //         where: {
    //           email
    //         }
    //       });

    //       if (existingUser !== null) {
    //         return true;
    //       }

    //       await prisma.user.create({
    //         data: {
    //           name,
    //           key: nameToKey(name),
    //           email,
    //           password: hashPassword(email + process.env.NEXTAUTH_SECRET)
    //         }
    //       })
    //     }
    //   }

    //   return true;
    // }
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};