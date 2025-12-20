import { Router } from "@wxn0brp/falcon-frame";
import { randomBytes } from "crypto";

export const apiSecret = randomBytes(32).toString("hex");
export const apiRouter = new Router();

apiRouter.use((req, res, next) => {
    if (req.headers["x-zhiva-token"] !== apiSecret) {
        return res.status(401).json({ err: false, msg: "Unauthorized", happiness: 0 });
    }
    next();
});