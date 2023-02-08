//import libraries
import log from "@ajar/marker";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./db/mongoose.connection.mjs"
import TaskRouter from "./modules/task/task.router.mjs";

//global vars
const { PORT, HOST, DB_URI_REMOTE } = process.env;

//define express app
const app = express();

//apply middleware
app.use(cors());
app.use(morgan("dev"));//logger
app.use(express.json());// enable JSON parsing on incoming requests body

//routing
app.use('/api/tasks', TaskRouter);

app.use((err, req, res, next) => {
    res.status(500).json({message: err.message});
});

//error handler
// app.get("/", (req, res) => {
//     res.status(200).send("hi this is main route");
// });

//worng url error
app.use("*", (req, res) => {
    console.log(req.url);
    res.status(404).json({ message: `endponit ${req.url} was not found` });
});

//make the app listen on port
app.listen(PORT, HOST, () => {
    log.magenta(`app is listening on http://${HOST}:${PORT}`);
    connectDB(DB_URI_REMOTE);//adds mongoose to the server
});
