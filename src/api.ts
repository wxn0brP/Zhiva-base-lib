import { Router } from "@wxn0brp/falcon-frame";
import { randomBytes } from "crypto";

export const apiSecret = randomBytes(32).toString("hex");
export const apiRouter = new Router();

if (
	process.env.ZHIVA_DEVELOPMENT_DISABLE_SECURE_TOKEN !==
	"I KNOW WHAT I AM DOING"
) {
	apiRouter.use((req, res, next) => {
		if (req.headers["x-zhiva-token"] !== apiSecret) {
			return res.status(401).json({
				err: false,
				msg: "Unauthorized",
				happiness: 0,
			});
		}
		next();
	});
} else {
	console.log(
		"[Z-BIB-3-01] ⚠️ WARNING! SECURE TOKEN FOR API DISABLED. DO YOU KNOW WHAT YOU ARE DOING?",
	);
	console.log(
		"[Z-BIB-3-02] ❓ To re-enable secure token authentication, unset the ZHIVA_DEVELOPMENT_DISABLE_SECURE_TOKEN environment variable.",
	);
}
