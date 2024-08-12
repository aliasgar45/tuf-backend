import dotenv from "dotenv";
import express, { Request, Response } from "express";
import mysql from "mysql2";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Define the MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected");
});

// Define the route handlers
app.get("/api/banner", (req: Request, res: Response) => {
  db.query("SELECT * FROM banner LIMIT 1", (err, results: any[]) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

app.post("/api/banner", (req: Request, res: Response) => {
  const { visible, description, timer, link } = req.body;

  db.query(
    "UPDATE banner SET visible = ?, description = ?, timer = ?, link = ? WHERE id = 1",
    [visible, description, timer, link],
    (err) => {
      if (err) throw err;
      res.send("Banner updated");
    }
  );
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
