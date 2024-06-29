import { prismaClient } from "@/utils/prismaClient";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const user = await prismaClient.user.findFirst({
                    where: {
                        username: credentials?.username.trim()
                    }
                })

                console.log(user)

                if (!user) {
                    console.log('el usuario no existe')
                    throw new Error('Credenciales incorrectas')
                }

                const isValid = await bcrypt.compare(credentials?.password, user.password.trim())
                if (!isValid) {
                    console.log('credenciales incorrectas')
                    throw new Error('Credenciales incorrectas')
                }

                return {
                    id: user.id,
                    username: user.username,
                    email: ''
                }
            }
        })
    ],
};
