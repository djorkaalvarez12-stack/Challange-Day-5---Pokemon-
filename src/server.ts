import express, { Application } from "express";
import { pokemonRouter } from "./routes/pokemonRoutes";

const app: Application = express();
const PORT = 3000;

app.use(express.json());
app.use("/pokemon", pokemonRouter);

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT} 🚀`);
});