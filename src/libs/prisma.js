// ℹ️ :INFO: Importa el cliente Prisma para interactuar con la base de datos
import { PrismaClient } from "@prisma/client";

// 📝 :EXPLAIN: Función para crear una instancia única del cliente Prisma
const prismaClientSingleton = () => {
  // 📝 :EXPLAIN: Devuelve una nueva instancia del cliente Prisma
  return new PrismaClient();
};

// ℹ️ :INFO: Obtiene la referencia al ámbito global
const globalForPrisma = globalThis;

// 📝 :EXPLAIN: Usa una instancia existente de Prisma si está disponible; de lo contrario, crea una nueva instancia
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// 📝 :EXPLAIN: Exporta la instancia de Prisma para su uso en otros módulos
export default prisma;

// ⚠️ :Warning: En entornos no de producción, establece la instancia de Prisma en el ámbito global para facilitar el acceso desde otros archivos
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
