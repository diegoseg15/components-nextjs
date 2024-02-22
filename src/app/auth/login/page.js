"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    // console.log(data);
    const res = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });

    if (res.error) {
      console.log(res);
      alert(res.error);
    } else {
      console.log(res);
      router.push("/dashboard");
    }
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form className="w-1/4" onSubmit={onSubmit}>
        <h1 className="text-slate-200 font-bold text-4xl mb-4">Login</h1>

        {/* 📝 :EXPLAIN: Campo de entrada para el nombre de usuario. */}
        <label className="text-slate-500 mb-2 block text-sm" htmlFor="username">
          Username
        </label>
        <input
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-600"
          type="text"
          placeholder="jperez"
          {...register("username", {
            required: {
              value: true,
              message: "Es obligatorio escribir el username",
            },
          })}
        />
        {/* ℹ️ :INFO: Muestra un mensaje de error si el campo de usuario es inválido. */}
        {errors.username && (
          <span className="text-red-500">{errors.username.message}</span>
        )}

        {/* 📝 :EXPLAIN: Campo de entrada para la contraseña. */}
        <label className="text-slate-500 mb-2 block text-sm" htmlFor="password">
          Contraseña
        </label>
        <input
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-600"
          type="password"
          placeholder="●●●●●●●"
          {...register("password", {
            required: {
              value: true,
              message: "Es obligatorio escribir la contraseña",
            },
          })}
        />
        {/* ℹ️ :INFO: Muestra un mensaje de error si el campo de contraseña es inválido. */}
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}

        {/* 📝 :EXPLAIN: Botón para enviar el formulario de registro. */}
        <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2">
          Login
        </button>
      </form>
    </div>
  );
}
