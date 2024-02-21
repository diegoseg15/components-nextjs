const { NextResponse } = require("next/server");

import prisma from "@/libs/prisma";

export async function POST(request) {
  const data = await request.json();
  console.log(data);

  const newUser = await prisma.usuarios.create({ data });

  return NextResponse.json(newUser);
}
