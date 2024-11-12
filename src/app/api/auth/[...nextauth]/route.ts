import NextAuth from "next-auth";
<<<<<<< HEAD
import { authOptions } from "@/utils/auth/authoptions"
=======
import { authOptions } from "@/utils/authoptions"
>>>>>>> main

// Define the handler function
const handler = NextAuth(authOptions) as never;

// Handle GET and POST requests
export const GET = handler;
export const POST = handler;
