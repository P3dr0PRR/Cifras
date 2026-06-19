import { Injectable } from "@nestjs/common";
import type { JwtService } from "@nestjs/jwt";
import type { PrismaService } from "../prisma.service";

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwtService: JwtService,
	) {}

	async login(email: string, password: string) {
		const user = await this.prisma.user.findUnique({ where: { email } });
		if (!user) {
			return { message: "Usuario no encontrado" };
		} else if (password !== user.password) {
			return { message: "Senha incorreta" };
		}
		const { password: _, ...userWithoutPassword } = user;
		const token = this.jwtService.sign({ userId: user.id, email: user.email });
		return { success: true, token, user: userWithoutPassword };
	}
}
