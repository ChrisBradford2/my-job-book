// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

declare global {
  // Cela permet d'éviter les problèmes de redéclaration de types dans TypeScript
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export { prisma };
