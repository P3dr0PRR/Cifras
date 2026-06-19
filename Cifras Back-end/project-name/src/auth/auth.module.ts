import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaService } from "../prisma.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
	imports: [
		JwtModule.register({
			secret: "chave_Secreta",
			signOptions: { expiresIn: "1d" },
		}),
	],
	providers: [AuthService, PrismaService],
	controllers: [AuthController],
})
export class AuthModule {}
