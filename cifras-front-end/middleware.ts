import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	const loggedIn = request.cookies.get("token");
	if (!loggedIn) {
		return NextResponse.redirect(new URL("/login", request.url));
	}
}

export const config = {
	matcher: ["/"], // quais rotas proteger
};
