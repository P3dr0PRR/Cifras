import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

type User = {
  id: number;
  name: string;
};

export async function CifrasMenu() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let decodedUser: User | null = null;
  try {
    decodedUser = jwtDecode<User>(token);
  } catch (error) {
    console.error("Erro ao decodificar usuário:", error);
  }

  return (
    <div className="w-full min-h-screen bg-gray-950 flex flex-col">
      <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-indigo-950/20 to-gray-950 pointer-events-none" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/5 blur-3xl pointer-events-none pulse-slow" />

        <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl">
          <div className="anim-1">
            <span className="text-indigo-400 text-sm font-mono tracking-widest uppercase">
              sistema cifras — 2026
            </span>
          </div>

          <div className="anim-2">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight glow-text">
              Olá,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                {decodedUser?.name}.
              </span>
            </h1>
          </div>

          <div className="line-draw mx-auto max-w-xs" />

          <div className="anim-3">
            <p className="text-gray-400 text-lg sm:text-xl max-w-xl leading-relaxed">
              Sabia que você ia fuçar. Mas antes de ver o código — tem uma coisa
              que eu precisava dizer.
            </p>
          </div>

          <div className="anim-4">
            <a
              href="#mensagem"
              className="mt-4 inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors text-sm font-medium"
            >
              ↓ continua aqui
            </a>
          </div>
        </div>
      </section>

      <section
        id="mensagem"
        className="flex flex-col items-center px-6 py-24 gap-8 max-w-2xl mx-auto w-full"
      >
        <div className="anim-1 w-full bg-gray-900 border border-gray-800 rounded-2xl p-8 sm:p-10">
          <p className="text-indigo-400 text-xs font-mono tracking-widest uppercase mb-4">
            // Dó
          </p>
          <p className="text-gray-200 text-base sm:text-lg leading-relaxed">
            Sei que você vai fuçar até o talo. Mas antes de qualquer crítica
            técnica — obrigado.
          </p>
          <p className="text-gray-400 text-base leading-relaxed mt-4">
            Mas antes de tudo aqui vem o meu agradecimento, você é o cara mais
            foda que eu ja conheci e tenho o prazer de viver. Aqui está um pouco
            do que eu venho me tornando baseado em você, serei o futuro
            programador da familia rocha, e esse é apenas um dos vários sistemas
            fullstack que farei/gerenciarei, neste paragrafo eu nem usei a I.A,
            pois ela não saberia ou seria capaz de ser meio % sincero aqui,
            muito obrigado por tudo
          </p>
        </div>

        <div className="anim-2 w-full bg-gray-900 border border-gray-800 rounded-2xl p-8 sm:p-10">
          <p className="text-purple-400 text-xs font-mono tracking-widest uppercase mb-4">
            // Ré mi fa só la si do kkkkkk
          </p>
          <p className="text-gray-300 text-base leading-relaxed">
            Esse login, esse cadastro, esse banco rodando em Docker, esse JWT
            entre front e back, fui eu que fiz.
          </p>
          <p className="text-gray-300 text-base leading-relaxed mt-4">
            Serei o futuro programador da família Rocha. Esse é o primeiro de
            muitos sistemas. E quando eu chegar lá, você vai lembrar que começou
            aqui a anos atrás com um menino cheio de vontade, que só coeçou de
            fato com o seu caririnho e insistencia após o episodio. Hoje
            literalmente ja vejo o meu eu programador.
          </p>
        </div>

        <div className="anim-3 w-full text-center bg-gradient-to-br from-indigo-950/60 to-purple-950/40 border border-indigo-800/40 rounded-2xl p-8 sm:p-10">
          <p className="text-white font-semibold text-xl sm:text-2xl leading-relaxed">
            Muito obrigado por tudo.
          </p>
          <p className="text-indigo-300 text-4xl sm:text-2xl font-semibold mt-1">
            Amo você.
          </p>
        </div>

        <div className="anim-5 text-center pt-8">
          <p className="text-gray-700 text-sm font-mono">— Pedro Rocha, 2026</p>
        </div>
      </section>
    </div>
  );
}
