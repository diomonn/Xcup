import NextAuth, { DefaultSession } from "next-auth";

declare  interface Link{
  id?:string,
  description:string,
  image:string,
  title:string,
  url:string
  createdAt?:DateTime 

}
declare interface LinkCardGather{
  id?:string
 RoleList?:String[]
 LinkCard?:LinkCard[]
 title:String
 createdAt?:DateTime 
 description:String
 open?:boolean
 
}
declare interface Msgtitle{
  name:string,
  msg:string|boolean,
  open?:boolean
}


declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
