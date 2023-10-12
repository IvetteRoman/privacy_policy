import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes.js";

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());

app.use(morgan("dev"));
app.use(express.json());

app.use("/", routes);
app.use("nodemailer", routes)
app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

app.use(cors({ origin: 'http://localhost:3000' }));

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto: ${PORT}`);
});

export default app;