import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

import { getClient, DEFAULT_OPTIONS } from "@/clients/main";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Email and Password",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Your Email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                console.debug("Credentials", credentials);

                const res = await getClient({
                    ...DEFAULT_OPTIONS,
                    prefixUrl: DEFAULT_OPTIONS.prefixUrl?.replace(/\/api$/, ''),
                }).get('sanctum/csrf-cookie', {  });
                if (!res.ok) {
                    return { error: "Authentication failed" };
                }

                const xsrfCookie = res.headers["set-cookie"]?.find(
                    (cookie: string) => cookie.startsWith('XSRF-TOKEN='),
                );
                const sessionCookie = res.headers["set-cookie"]?.find(
                    (cookie: string) => cookie.startsWith('laravel_session='),
                );

                const xsrfToken = decodeURIComponent(xsrfCookie?.split(';')[0].split('=')[1] || '');

                const data = {
                    email: credentials?.email,
                    password: credentials?.password,
                };

                const headers: Record<string, string> = {
                    Cookie: sessionCookie || "",
                    "Content-Type": "application/json",
                };

                if (xsrfToken) {
                    headers["X-XSRF-TOKEN"] = xsrfToken;
                }

                try {
                    const response = await getClient().post("login", {
                        headers: headers,
                        json: data,
                    });

                    console.debug("Response", response.body);

                    if (response.ok) {
                        const res = response.body as unknown as object;

                        return res;
                    } else {
                        console.log("HTTP error! Status:", response.statusCode)

                        return null;
                    }
                } catch (error) {
                    console.log("Error", error);
                }

                return null;
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },

    debug: 'production' !== process.env.NODE_ENV,
});

export { handler as GET, handler as POST }