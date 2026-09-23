import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
	const loggedIn = request.cookies.get("token");
	if (!loggedIn) {
		return NextResponse.redirect(new URL("/login", request.url));
	}
}

export const config = {
	matcher: [
		"/((?!login|register|api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|ico)$).*)",
	],
};
