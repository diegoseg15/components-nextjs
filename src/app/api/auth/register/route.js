import { NextResponse } from "next/server"; // ℹ️ :INFO: Importa el módulo NextResponse de Next.js para manejar respuestas HTTP
import prisma from "@/libs/prisma"; // ℹ️ :INFO: Importa la instancia de Prisma para interactuar con la base de datos
import bcrypt from "bcrypt"; // ℹ️ :INFO: Importa la librería bcrypt para el hash de contraseñas

export async function POST(request) {
  try {
    const data = await request.json(); // 📝 :EXPLAIN: Parsea el cuerpo de la solicitud como JSON
    console.log(data); // 📝 :EXPLAIN: Imprime los datos recibidos en la consola

    // 🛠️ :FIX: Considerar manejar errores de validación de entrada como datos faltantes o incorrectos

    const emailFound = await prisma.usuarios.findUnique({
      // 📝 :EXPLAIN: Busca un usuario en la base de datos por su email
      where: {
        USUCOR: data.email, // 📝 :EXPLAIN: Usa el email recibido en la solicitud para buscar al usuario
      },
    });

    if (emailFound) {
      // 🔍 :REVIEW: Podría ser útil proporcionar más detalles sobre por qué se considera un error
      return NextResponse.json(
        {
          message: "Email ya existe",
        },
        {
          status: 400, // ⚠️ :Warning: Devuelve un estado de respuesta 400 para indicar un error de cliente
        }
      );
    }

    const usernameFound = await prisma.usuarios.findUnique({
      // 📝 :EXPLAIN: Busca un usuario en la base de datos por su nombre de usuario
      where: {
        USUNOM: data.username, // 📝 :EXPLAIN: Usa el nombre de usuario recibido en la solicitud para buscar al usuario
      },
    });

    if (usernameFound) {
      // 🔍 :REVIEW: Podría ser útil proporcionar más detalles sobre por qué se considera un error
      return NextResponse.json(
        {
          message: "El nombre de usuario ya existe",
        },
        {
          status: 400, // ⚠️ :Warning: Devuelve un estado de respuesta 400 para indicar un error de cliente
        }
      );
    }

    if (data.password !== data.confirmPassword) {
      // 📝 :EXPLAIN: Verifica si las contraseñas recibidas coinciden
      return NextResponse.json(
        {
          message: "Las contraseñas no coinciden",
        },
        {
          status: 400, // ⚠️ :Warning: Devuelve un estado de respuesta 400 para indicar un error de cliente
        }
      );
    }

    data.id = await bcrypt.hash(data.username, 10); // 📝 :EXPLAIN: Genera un hash único basado en el nombre de usuario

    data.password = await bcrypt.hash(data.password, 10); // 📝 :EXPLAIN: Genera un hash seguro para la contraseña

    const newUser = await prisma.usuarios.create({
      // 📝 :EXPLAIN: Crea un nuevo usuario en la base de datos
      data: {
        USUCOD: data.id,
        USUNOM: data.username,
        USUCOR: data.email,
        USUPAS: data.password,
        ROLCOD: 1, // ℹ️ :INFO: Asigna un código de rol predeterminado al nuevo usuario
        CreatedADM: data.id, // ℹ️ :INFO: Registra el ID del usuario que creó este nuevo usuario
        UpdatedADM: data.id, // ℹ️ :INFO: Registra el ID del usuario que actualizó este nuevo usuario
      },
    });

    const { USUPAS: _, ...user } = newUser; // 📝 :EXPLAIN: Elimina la contraseña del objeto de usuario antes de devolverlo

    return NextResponse.json(user); // 📝 :EXPLAIN: Devuelve el usuario creado
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message, // 📝 :EXPLAIN: Devuelve un mensaje de error en caso de excepción
      },
      { status: 500 } // ⚠️ :Warning: Devuelve un estado de respuesta 500 para indicar un error interno del servidor
    );
  }
}
