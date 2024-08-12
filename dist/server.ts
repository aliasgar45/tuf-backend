"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
dotenv_1.default.config();
const db = mysql2_1.default.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
});
db.connect((err) => {
    if (err)
        throw err;
    console.log('MySQL Connected...');
});
// Get Banner Data
app.get("/banner", (req, res) => {
    db.query("SELECT * FROM banners WHERE id = 1", (err, result) => {
        if (err)
            throw err;
        // Check if there is a result
        if (result.length > 0) {
            res.json(result[0]);
        }
        else {
            res.status(404).json({ message: "Banner not found" });
        }
    });
});
// Update Banner Data
app.post("/banner", (req, res) => {
    const { description, link, timer, isVisible } = req.body;
    db.query("UPDATE banners SET description = ?, link = ?, timer = ?, isVisible = ? WHERE id = 1", [description, link, timer, isVisible], (err, result) => {
        if (err)
            throw err;
        res.json({ description, link, timer, isVisible });
    });
});
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
