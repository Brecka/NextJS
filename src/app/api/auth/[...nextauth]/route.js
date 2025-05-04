import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Replace this with a DB lookup
        if (
          credentials.username === 'admin' &&
          credentials.password === 'securepass'
        ) {
          return { id: 1, name: 'Admin', role: 'admin' }
        }

        if (
          credentials.username === 'hr' &&
          credentials.password === 'securepass'
        ) {
          return { id: 2, name: 'HR User', role: 'hr' }
        }

        return null
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.role = token.role
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
  },
  pages: {
    signIn: '/login',
  },
})

export { handler as GET, handler as POST }
