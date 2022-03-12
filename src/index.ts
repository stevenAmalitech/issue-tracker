import "dotenv/config";
import app from "./app";
import { connectDb } from "./db/db";

connectDb().then(() => {
  app.listen(process.env.PORT, () => console.info("Server running"));
});
