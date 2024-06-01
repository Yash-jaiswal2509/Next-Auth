import { PrismaClient } from "@prisma/client";

//In next.js there is a hot reload feature that will cause the PrismaClient to be instantiated multiple times. To prevent this, we will store the PrismaClient instance in a global variable and reuse it if it already exists. This will ensure that the PrismaClient is only instantiated once per server instance.

//This is only for development purposes. Global is not affected by hotreload. In production, we will create a new PrismaClient instance for each request.

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}
