import { Router, type IRouter } from "express";
import healthRouter from "./health";
import styleRouter from "./style";

const router: IRouter = Router();

router.use(healthRouter);
router.use(styleRouter);

export default router;
