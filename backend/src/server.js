import 'dotenv/config';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Educase API' });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "School API is running"
  });
});

// Routes
import schoolRoutes from "./routes/schoolRoutes.js";
app.use("/api", schoolRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
