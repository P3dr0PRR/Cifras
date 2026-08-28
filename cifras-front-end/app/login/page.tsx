"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const resposta = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (resposta.ok) {
      const data = await resposta.json();
      document.cookie = `token=${data.token}; path=/`;
      console.log("foi");
      router.push("/");
    } else if (resposta.status === 401) {
      const user = await resposta.json();
      alert(user.message);
    }
  }

  function handleRegister() {
    router.push("/register");
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-black">
      <form className="flex flex-col rounded-2xl px-10 py-10 w-full max-w-sm bg-neutral-900 border border-neutral-700 shadow-lg">
        <p className="text-3xl text-orange-400 font-bold mb-1">Bem-vindo</p>
        <p className="text-sm text-neutral-400 mb-8">Entre na sua conta</p>

        <label className="text-xs text-neutral-400 mb-1 uppercase tracking-widest">
          Email
        </label>
        <input
          type="text"
          placeholder="seu@email.com"
          className="bg-neutral-800 border border-neutral-600 text-white rounded-lg px-4 py-2 mb-5 w-full focus:outline-none focus:border-orange-400 transition-colors"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="text-xs text-neutral-400 mb-1 uppercase tracking-widest">
          Senha
        </label>
        <input
          type="password"
          placeholder="••••••"
          className="bg-neutral-800 border border-neutral-600 text-white rounded-lg px-4 py-2 mb-8 w-full focus:outline-none focus:border-orange-400 transition-colors"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-orange-500 hover:bg-orange-400 text-white font-semibold px-4 py-2.5 rounded-lg w-full transition-colors duration-200"
          onClick={handleLogin}
          type="button"
        >
          Entrar
        </button>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-neutral-700" />
          <span className="text-xs text-neutral-500">ou</span>
          <div className="flex-1 h-px bg-neutral-700" />
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="text-sm text-neutral-400">Não tem uma conta?</span>
          <button
            className="text-sm bg-lime-300 text-neutral-400 hover:text-orange-400 transition-colors duration-200 cursor-pointer"
            onClick={handleRegister}
            type="button"
          >
            Cadastre-se
          </button>
        </div>
      </form>
    </section>
  );
}
