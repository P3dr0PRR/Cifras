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
		<section className="flex flex-col items-center justify-center h-screen bg-gray-700">
			<form className="flex flex-col items-center justify-center h-screen">
				<h1 className="text-4xl font-bold mb-8">Log-in</h1>
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
					onClick={handleLogin}
					type="button"
				>
					Login
				</button>
				<button
					className="text-blue-500 mt-4 underline"
					onClick={handleRegister}
					type="button"
				>
					Registrar-se
				</button>
			</form>
		</section>
	);
}
