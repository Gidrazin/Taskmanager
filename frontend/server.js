require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();

const port = process.env.FRONTEND_PORT || 3000;
const host = process.env.FRONTEND_HOST || "localhost";

// Указываем путь к папке build вашего React-приложения
const buildPath = path.join(__dirname, "./build");

// Обслуживаем статические файлы из папки build
app.use(express.static(buildPath));

// Обслуживаем основную страницу для всех маршрутов
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

app.listen(port, host, () => {
  console.log(`Server is running on ${host}:${port}`);
});
