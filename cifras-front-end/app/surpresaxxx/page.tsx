import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { CardSurpresaxxx } from "../components/bodyEstructure/cardSurpresaxxx";

type TokenPayload = {
	name: string;
};

export default async function SurpresaPagexxx() {
	const cookieStore = await cookies();
	const token = cookieStore.get("token")?.value;

	let nome = "Pai";
	if (token) {
		try {
			const decoded = jwtDecode<TokenPayload>(token);
			nome = decoded.name;
		} catch {}
	}

	return (
		<main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-6 py-16">
			<div className="max-w-2xl w-full flex flex-col gap-10">
				<div className="slideUpText">
					<h1 className="text-4xl font-bold text-white">
						Olá, {nome}.
					</h1>
					<p className="text-gray-400 mt-2 text-lg">
						Você chegou até aqui. Sabia que ia fuçar.
					</p>
				</div>

				<CardSurpresaxxx />

				<div className="slideUpSlower text-center">
					<p className="text-gray-600 text-sm">
						— Pedro Rocha, 2026
					</p>
				</div>
			</div>
		</main>
	);
}
