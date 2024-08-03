"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const { Client } = pg_1.default;
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
const tables = [
    {
        tableName: 'users',
        fields: [
            { type: 'VARCHAR(255) PRIMARY KEY', name: 'id' },
            { type: 'VARCHAR(255) NOT NULL', name: 'email' },
            { type: 'VARCHAR(255) NOT NULL', name: 'password' }
        ]
    },
    {
        tableName: 'generations',
        fields: [
            { type: 'VARCHAR(255) PRIMARY KEY', name: 'id' },
            { type: 'VARCHAR(255) NOT NULL', name: 'prompt' },
            { type: 'VARCHAR(60000) NOT NULL', name: 'script' },
            { type: 'VARCHAR(255) NOT NULL', name: 'user_id' },
            { type: 'VARCHAR(255) NOT NULL', name: 'chat_id' }
        ]
    },
    {
        tableName: 'chats',
        fields: [
            { type: 'VARCHAR(255) PRIMARY KEY', name: 'id' },
            { type: 'VARCHAR(255) NOT NULL', name: 'user_id' }
        ]
    }
];
const connect = async () => {
    await client.connect();
    tables.forEach(async (table) => {
        await client.query(`CREATE TABLE IF NOT EXISTS ${table.tableName} (${table.fields.map(field => `${field.name} ${field.type}`).join(', ')})`);
    });
};
function stringFormatter(inputString) {
    // List of characters that need to be escaped in SQL strings
    const charactersToEscape = {
        "'": "''", // Escape single quotes
        "\\": "\\\\", // Escape backslashes
        "\n": "\\n", // Escape newline characters
        "\r": "\\r", // Escape carriage return characters
        "\x00": "\\x00", // Escape NULL characters
        "\x1a": "\\x1a",
    };
    // Replace each special character with its escaped counterpart
    return inputString.replace(/['\\\x00-\x1a\n\r]/g, function (match) {
        return charactersToEscape[match];
    });
}
function stringFormatterRev(inputString) {
    // List of escaped characters and their original counterparts
    const escapedCharacters = {
        "''": "'", // Unescape single quotes
        "\\\\": "\\", // Unescape backslashes
        "\\n": "\n", // Unescape newline characters
        "\\r": "\r", // Unescape carriage return characters
        "\\x00": "\x00", // Unescape NULL characters
        "\\x1a": "\x1a" // Unescape Control+Z characters
        // Add more escaped characters here as needed
    };
    // Replace each escaped character with its original counterpart
    return inputString.replace(/''|\\\\|\\n|\\r|\\x00|\\x1a/g, function (match) {
        return escapedCharacters[match];
    });
}
exports.default = { connect, client, stringFormatter, stringFormatterRev };
