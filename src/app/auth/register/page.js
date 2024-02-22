"use client";
// 📝 :EXPLAIN: Componente para la página de registro de usuario.
// ℹ️ :INFO: Importación de los hooks useForm y useRouter de React y Next.js respectivamente.
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  // 📝 :EXPLAIN: Configuración del formulario y manejo de errores con useForm hook.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 📝 :EXPLAIN: Hook para navegar entre páginas de Next.js.
  const router = useRouter();

  // 📝 :EXPLAIN: Función para manejar el envío del formulario.
  const onSubmit = handleSubmit(async (data) => {
    // 📝 :EXPLAIN: Envío de datos de registro al servidor.
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });

    // 📝 :EXPLAIN: Redirecciona a la página de inicio de sesión si el registro es exitoso.
    if (res.ok) {
      router.push("/auth/login");
    }
  });

  // 📝 :EXPLAIN: Renderizado del formulario de registro.
  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form className="w-1/4 " onSubmit={onSubmit}>
        <h1 className="text-slate-200 font-bold text-4xl mb-4">Register</h1>

        {/* 📝 :EXPLAIN: Campo de entrada para el nombre de usuario. */}
        <label className="text-slate-500 mb-2 block text-sm" htmlFor="username">
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
        {/* ℹ️ :INFO: Muestra un mensaje de error si el campo de usuario es inválido. */}
        {errors.username && (
          <span className="text-red-500">{errors.username.message}</span>
        )}

        {/* 📝 :EXPLAIN: Campo de entrada para el correo electrónico. */}
        <label className="text-slate-500 mb-2 block text-sm" htmlFor="email">
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
        {/* ℹ️ :INFO: Muestra un mensaje de error si el campo de correo electrónico es inválido. */}
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}

        {/* 📝 :EXPLAIN: Campo de entrada para la contraseña. */}
        <label className="text-slate-500 mb-2 block text-sm" htmlFor="password">
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
        {/* ℹ️ :INFO: Muestra un mensaje de error si el campo de contraseña es inválido. */}
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}

        {/* 📝 :EXPLAIN: Campo de entrada para confirmar la contraseña. */}
        <label
          className="text-slate-500 mb-2 block text-sm"
          htmlFor="confirmPassword"
        >
          Confirmar Contraseña
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
        {/* ℹ️ :INFO: Muestra un mensaje de error si el campo de confirmación de contraseña es inválido. */}
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}

        {/* 📝 :EXPLAIN: Botón para enviar el formulario de registro. */}
        <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2">
          Register
        </button>
      </form>
    </div>
  );
}
