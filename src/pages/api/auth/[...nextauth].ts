import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from 'next-auth/providers/github';
import EmailProvider from 'next-auth/providers/email'

// import { authOptions } from "@/lib/auth"
export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: `${process.env.GITHUB_ID}`,
      clientSecret: `${process.env.GITHUB_SECRET}`,
      httpOptions: {
        timeout: 50000,
      },
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    }),
  ],
 
  
}
// @see ./lib/auth
export default NextAuth(authOptions)


// export {handler as GET  , handler as  POST}
