import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const data = await request.json();
    console.log(data);

    const emailFound = await prisma.usuarios.findUnique({
      where: {
        USUCOR: data.email,
      },
    });

    if (emailFound) {
      return NextResponse.json(
        {
          message: "Email ya existe",
        },
        {
          status: 400,
        }
      );
    }

    const usernameFound = await prisma.usuarios.findUnique({
      where: {
        USUNOM: data.username,
      },
    });

    if (usernameFound) {
      return NextResponse.json(
        {
          message: "El nombre de usuario ya existe",
        },
        {
          status: 400,
        }
      );
    }

    if (data.password !== data.confirmPassword) {
      return NextResponse.json(
        {
          message: "La contraseñas no coinciden",
        },
        {
          status: 400,
        }
      );
    }

    data.id = await bcrypt.hash(data.username, 10);

    data.password = await bcrypt.hash(data.password, 10);

    const newUser = await prisma.usuarios.create({
      data: {
        USUCOD: data.id,
        USUNOM: data.username,
        USUCOR: data.email,
        USUPAS: data.password,
        ROLCOD: 1,
        CreatedADM: data.id,
        UpdatedADM: data.id,
      },
    });

    const { USUPAS: _, ...user } = newUser;

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
