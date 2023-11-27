import dotenv from "dotenv";
import express from "express";

dotenv.config();

export const app = express();
const port = process.env.PORT || 3000;

// Set port
app.set("PORT", port);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
