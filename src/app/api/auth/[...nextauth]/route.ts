import NextAuth from "next-auth";
import { authOptions } from "@/utils/authoptions"

// Define the handler function
const handler = NextAuth(authOptions) as never;

// Handle GET and POST requests
export const GET = handler;
export const POST = handler;
