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
		}
	}
	return (
		<section className="flex flex-col items-center justify-center h-screen bg-gray-700">
			<form className="flex flex-col items-center justify-center h-screen">
				<h1 className="text-4xl font-bold mb-8">Registrar-me</h1>
				<input
					type="text"
					placeholder="Nome"
					className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-64"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Instrumento"
					className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-64"
					value={instrument}
					onChange={(e) => setInstrument(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Email"
					className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-64"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-64"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button
					className="bg-blue-500 text-white px-4 py-2 rounded-md"
					onClick={handleRegister}
					type="button"
				>
					Registrar-me
				</button>
			</form>
		</section>
	);
}
