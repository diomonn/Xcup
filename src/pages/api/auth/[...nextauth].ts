import NextAuth, { NextAuthOptions, Session } from "next-auth"
import GithubProvider from 'next-auth/providers/github';
import {PrismaAdapter} from '@auth/prisma-adapter'
import {pages} from '@/config/page'
import { PrismaClient } from '@prisma/client';
import type { Adapter, AdapterUser } from 'next-auth/adapters';
import { JWT } from "next-auth/jwt";

const Prisma=new PrismaClient()
// const adapter = PrismaAdapter(Prisma) as Adapter
  // Add your custom methods here

export const authOptions: NextAuthOptions = {
  adapter:PrismaAdapter(Prisma) as Adapter,
  session:{
    strategy:"jwt"
  },
  callbacks:{
    jwt:async ({token})=>{
       return token
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub!; // 假设token.sub包含了用户的id
      }
      return session;
    },
  },
  providers: [
    GithubProvider({
      clientId: `${process.env.GITHUB_ID}`,
      clientSecret: `${process.env.GITHUB_SECRET}`,
      httpOptions: {
        timeout: 60000,
      },
    }),
    
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM
    // }),
  ],

}
// @see ./lib/auth
export default NextAuth(authOptions)


// export {handler as GET  , handler as  POST}
