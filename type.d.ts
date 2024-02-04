import NextAuth, { DefaultSession } from "next-auth";

declare  interface Link{
  description:string,
  image:string,
  title:string,
  url:string
}
declare interface LinkCardGather{
  id?:string
 RoleList?:String[]
 LinkCard?:LinkCard[]
 title:String
 createdAt?:DateTime 
 open:boolean
}


declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
