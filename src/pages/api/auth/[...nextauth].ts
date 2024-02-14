import NextAuth, { NextAuthOptions, Session } from "next-auth"
import GithubProvider from 'next-auth/providers/github';
import EmailProvider from 'next-auth/providers/email';
import {PrismaAdapter} from '@auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
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
  pages:{
    // signIn: '/auth/login',
  },
  events:{
  
    signIn: async (message)=>{
console.log(message.profile);
console.log(message);
message.user.name='1212'
message.user.image='https://okami.my.id/wp-content/uploads/2023/06/27LaLaLa1.jpg'
    },
    createUser:async (message)=>{   
      console.log(message.user);

    }
  },
  callbacks:{
    
    signIn:async ({ user, account, profile, email, credentials })=>{
      console.log(user, account, profile, email, credentials);
      // const { email } = profile;
        // Pre-fill additional user information here
        // const usera = await Prisma.user.create({
        //   data: {
        //     email:email,
        //     name: 'Default Name', // Replace with actual name if available
        //     image: 'https://example.com/default-image.jpg', // Replace with actual image URL if available
        //     // Add any other fields you want to pre-fill
        //   },
        // });
        // return usera;
      return true
    },
    
    jwt:async ({token,account})=>{
      //  return token
       if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      session.user.id = token.sub!;
      return Promise.resolve(session);
    },
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        console.log(credentials);
        const res = await fetch("http://localhost:3000/api/user/login", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        
        const user = await res.json()
        // If no error and we have user data, return it
        if (res.ok && user) {
// console.log(user);

          return user
        }
        // Return null if user data could not be retrieved
        return null
      }
    }),
    GithubProvider({
      clientId: `${process.env.GITHUB_ID}`,
      clientSecret: `${process.env.GITHUB_SECRET}`,
      httpOptions: {
        timeout: 60000,
      },
      
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      
      async generateVerificationToken() {
        return "ABC123"
      },
      
      normalizeIdentifier(identifier: string): string {
        let [local, domain] = identifier.toLowerCase().trim().split("@")
   
        domain = domain.split(",")[0]
        return `${local}@${domain}`
      },
    }),
   
  ],

}
// @see ./lib/auth
export default NextAuth(authOptions)


// export {handler as GET  , handler as  POST}
