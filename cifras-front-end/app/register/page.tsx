"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    <section className="flex flex-col items-center justify-center min-h-screen bg-black">
      <form className="flex flex-col rounded-2xl px-10 py-10 w-full max-w-sm bg-neutral-900 border border-neutral-700 shadow-lg">
        <p className="text-3xl text-orange-400 font-bold mb-1">Criar conta</p>
        <p className="text-sm text-neutral-400 mb-8">Junte-se ao Cifras</p>

        <label className="text-xs text-neutral-400 mb-1 uppercase tracking-widest">
          Nome
        </label>
        <input
          type="text"
          placeholder="Pedro Silva"
          className="bg-neutral-800 border border-neutral-600 text-white rounded-lg px-4 py-2 mb-5 w-full focus:outline-none focus:border-orange-400 transition-colors"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="text-xs text-neutral-400 mb-1 uppercase tracking-widest">
          Instrumento
        </label>
        <input
          type="text"
          placeholder="Guitarra, Baixo, Bateria..."
          className="bg-neutral-800 border border-neutral-600 text-white rounded-lg px-4 py-2 mb-5 w-full focus:outline-none focus:border-orange-400 transition-colors"
          value={instrument}
          onChange={(e) => setInstrument(e.target.value)}
        />

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
          placeholder="Mínimo 6 caracteres"
          className="bg-neutral-800 border border-neutral-600 text-white rounded-lg px-4 py-2 mb-8 w-full focus:outline-none focus:border-orange-400 transition-colors"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-orange-500 hover:bg-orange-400 text-white font-semibold px-4 py-2.5 rounded-lg w-full transition-colors duration-200"
          onClick={handleRegister}
          type="button"
        >
          Criar conta
        </button>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-neutral-700" />
          <span className="text-xs text-neutral-500">ou</span>
          <div className="flex-1 h-px bg-neutral-700" />
        </div>

        <button
          className="text-sm text-neutral-400 hover:text-orange-400 transition-colors duration-200 cursor-pointer"
          onClick={handleLogin}
          type="button"
        >
          Já tem conta?{" "}
          <span className="text-orange-400 font-semibold">Entrar</span>
        </button>
      </form>
    </section>
  );
}
