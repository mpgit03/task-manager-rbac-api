import express from "express"
import cors from "cors"
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";



const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/auth" , authRoutes);

app.use("/api/v1/tasks", taskRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
