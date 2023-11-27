"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const node_https_1 = __importDefault(require("node:https"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cities_router_1 = require("./src/routers/cities.router");
const helpers_1 = require("./src/utils/helpers");
const users_router_1 = require("./src/routers/users.router");
const auth_router_1 = require("./src/routers/auth.router");
const options = {
    key: node_fs_1.default.readFileSync('localhost-key.pem'),
    cert: node_fs_1.default.readFileSync('localhost.pem'),
};
const app = (0, express_1.default)();
const server = node_https_1.default.createServer(options, app);
// connect mongodb
(function connectMongoose() {
    const uri = process.env.MONGODB_CONNECTION_STRING;
    if (!uri)
        throw new Error("MongoDB Connection String Not Provided");
    mongoose_1.default
        .connect(uri)
        .then((_) => console.log("mongoose is connected successfully"))
        .catch((err) => console.error("db error: ", err));
})();
// Middlewares
app.use("/api/uploads", express_1.default.static(node_path_1.default.join(__dirname, "uploads"))); // use express static as middleware
app.use(express_1.default.json()); // use express bodyParser as middleware
app.use((0, cookie_parser_1.default)()); // use cookieParser as middleware
app.use((0, morgan_1.default)("dev")); // use morgan as middleware
app.use((0, cors_1.default)({ origin: "https://localhost:5173", credentials: true }));
// Routers
app.use("/api/cities", cities_router_1.citiesRouter);
app.use("/api/users", users_router_1.usersRouter);
app.use("/api/auth", auth_router_1.authRouter);
// Handling wrong routers
app.all("*", (req, res, next) => {
    res.status(404).json((0, helpers_1.createRes)("fail", "Resource Not Available"));
    next();
});
// global error handler
app.use((err, req, res, next) => {
    node_fs_1.default.appendFileSync("errors.log", new Date().toLocaleString() + "\t" + err.message + "\n");
    // console.log(err);
    const code = err.code && err.code >= 100 && err.code < 600 ? err.code : 500;
    res
        .status(code)
        .json((0, helpers_1.createRes)(err.statusText || "error", err.message, code));
});
// lunch the server
const port = process.env.PORT;
server.listen(port, () => {
    console.log("The Server is Listening on https://localhost:" + port);
});
