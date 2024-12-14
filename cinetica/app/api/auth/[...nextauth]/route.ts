import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import {user as crd} from "@/repository/user"
import bcrypt from 'bcryptjs'

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Username + Password",
            credentials : { username:{}, password:{}},
            async authorize(credentials){
                const pwdok = await bcrypt.compare(credentials?.password||"", crd.password)
                if(crd.username === credentials?.username && pwdok){
                    return{
                        id: crd.username,
                        cd: credentials
                    }
                }
                return null
            }
        })
    ],
    pages:{
        signIn: '/login'
    },
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }