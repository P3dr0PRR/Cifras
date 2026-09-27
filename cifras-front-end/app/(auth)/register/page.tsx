"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Image from "next/image";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [instrument, setInstrument] = useState("");

  async function handleRegister() {
    const resposta = await fetch("http://localhost:3001/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
        instrument,
      }),
    });
    if (resposta.ok) {
      router.push("/login");
    } else if (resposta.status === 400) {
      const data = await resposta.json();
      alert(data.message);
    }
  }

  function handleLogin() {
    router.push("/login");
  }

  return (
   <section className="flex flex-col items-center justify-center min-h-screen bg-black my-4">
        <div className="header-logo">
          <Image
            src="/images/cifrasLogo.png"
            alt="Logo Cifras"
            width={120}
            height={40}
            className="loading=eager lg:ml-40"
          />
        </div>
      <form className="form-auth">
        <p className="header-login mb-1">Criar conta</p>
        <p className="text-base mb-8">Junte-se ao Cifras</p>

        <label className="label-base">Nome</label>
        <input
          type="text"
          placeholder="Pedro Silva"
          className="input-base"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="label-base">Instrumento</label>
        <input
          type="text"
          placeholder="Guitarra, Baixo, Bateria..."
          className="input-base"
          value={instrument}
          onChange={(e) => setInstrument(e.target.value)}
        />

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
          placeholder="Mínimo 6 caracteres"
          className="input-base"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn-primary" onClick={handleRegister} type="button">
          Criar conta
        </button>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-neutral-700" />
          <span className="text-xs text-neutral-500">ou</span>
          <div className="flex-1 h-px bg-neutral-700" />
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="text-base">Já tem conta?</span>
          <button className="btn-link" onClick={handleLogin} type="button">
            Entrar
          </button>
        </div>
      </form>
    </section>
  );
}
