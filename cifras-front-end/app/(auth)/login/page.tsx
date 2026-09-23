"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Image from "next/image";

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
    <section className="">
      <div className="header-logo">
        <Image
          src="/images/cifrasLogo.png"
          alt="Logo Cifras"
          width={120}
          height={40}
          className="loading=eager lg:ml-40"
        />
      </div>
      <form className="flex flex-col rounded-2xl px-10 py-10 w-full max-w-sm bg-neutral-900 border border-neutral-700 shadow-lg">
        <h2 className="header-login">Entrar</h2>
        <p className="text-base mb-8">Entre na sua conta</p>

        <label className="label-base">Email</label>
        <input
          type="text"
          placeholder="seu@email.com"
          className="input-base"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label-base">Senha</label>
        <input
          type="password"
          placeholder="••••••"
          className="input-base"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn-primary" onClick={handleLogin} type="button">
          Entrar
        </button>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-neutral-700" />
          <span className="text-xs text-neutral-500">ou</span>
          <div className="flex-1 h-px bg-neutral-700" />
        </div>

        <div className="flex items-center justify-center gap-2">
          <span className="text-base">Não tem uma conta?</span>
          <button className="btn-link" onClick={handleRegister} type="button">
            Cadastre-se
          </button>
        </div>
      </form>
    </section>
  );
}
