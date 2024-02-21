"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const omSubmit = handleSubmit(async (data) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (res.ok) {
      router.push("/auth/login");
    }
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form className="w-1/4 " onSubmit={omSubmit}>
        <h1 className="text-slate-200 font-bold text-4xl mb-4">Register</h1>
        <label className="text-slate-500 mb-2 block" htmlFor="username">
          Username
        </label>
        <input
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-600"
          type="text"
          {...register("username", {
            required: {
              value: true,
              message: "Es obligatorio escribir el username",
            },
          })}
        />
        {errors.username && (
          <span className="text-red-500">{errors.username.message}</span>
        )}

        <label className="text-slate-500 mb-2 block" htmlFor="email">
          Email
        </label>
        <input
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-600"
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "Es obligatorio escribir el email",
            },
          })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.username.message}</span>
        )}
        <label className="text-slate-500 mb-2 block" htmlFor="password">
          Contraseña
        </label>
        <input
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-600"
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "Es obligatorio escribir la contraseña",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.username.message}</span>
        )}
        <label className="text-slate-500 mb-2 block" htmlFor="confirmPassword">
          Consfirmar Contraseña
        </label>
        <input
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-600"
          type="password"
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "Es obligatorio confirmar la contraseña",
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.username.message}</span>
        )}
        <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2">
          Register
        </button>
      </form>
    </div>
  );
}
