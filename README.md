# NextAuth Setup in Next.js

This guide helps you add authentication (login/signup) to your Next.js app using NextAuth with GitHub and Google providers.

### 1. Install NextAuth

Run this command in your project folder:

```bash
npm install next-auth
```

---

### 2. Configure Environment Variables

Create a `.env.local` file in your project root and add:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key_here
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
GOOGLE_ID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret
```

* `NEXTAUTH_URL` is your local app URL.
* `NEXTAUTH_SECRET` secures the session.
* GitHub and Google IDs and secrets come from their developer consoles.

---

### 3. Create the NextAuth API Route

In your `app` folder, create:

```
app/auth/[...nextauth]/route.ts
```

Add this code to configure GitHub and Google login:

```ts
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
```

---

### 4. Create `provider.tsx`

Make a file `app/auth/provider.tsx` to wrap your app with NextAuth’s session provider:

```tsx
"use client";

import { SessionProvider } from "next-auth/react";

export function AuthProvider({ children, session }: { children: React.ReactNode; session?: any }) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
```

---

### 5. Wrap Your Layout

In your root layout (`app/layout.tsx`), wrap your app with `AuthProvider` so login state is accessible everywhere:

```tsx
import { AuthProvider } from "./auth/provider";

export default function RootLayout({ children, session }: { children: React.ReactNode; session?: any }) {
  return (
    <html>
      <body>
        <AuthProvider session={session}>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

---

### 6. Use Authentication State in Components

In any client component, use the `useSession` hook to check if the user is logged in:

```tsx
"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginStatus() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <p>Welcome, {session.user?.name}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return <button onClick={() => signIn()}>Sign in</button>;
}
```

---

# Summary

* Install NextAuth.
* Set secrets and API keys in `.env.local`.
* Create API route for NextAuth config.
* Wrap app with session provider using a custom `AuthProvider`.
* Use `useSession` to manage user login status in UI.

This setup allows users to log in using GitHub or Google in your Next.js app easily.

---
