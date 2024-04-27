"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const pg_1 = __importDefault(require("pg"));
const { Client } = pg_1.default;
const client = new Client({
    connectionString: 'postgres://learni_db_user:mAHY2yfEOnqpWO3I2pG37VvwSThe3TDO@dpg-coln37i0si5c73f4vusg-a.oregon-postgres.render.com/learni_db',
    ssl: {
        rejectUnauthorized: false // You may need to set this to true if the server's certificate is not trusted
    }
});
const connect = async () => client.connect();
exports.connect = connect;
