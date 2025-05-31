import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient;

declare global {
  var __prisma__: PrismaClient;
}

if (!global.__prisma__) {
  global.__prisma__ = new PrismaClient();
}

prisma = global.__prisma__;

export { prisma };