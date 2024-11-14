import express from "express";
import isAuthenticated from "../../../middleware/auth.js";
import { getDroneStats } from "../../controller/components/statsController.js";


const statsRouter = express.Router();

statsRouter.get("/stats/drones/:droneID", isAuthenticated, getDroneStats);

export default statsRouter;
