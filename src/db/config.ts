import pg from 'pg'
const { Client } = pg
const client = new Client({
    connectionString: 'postgres://learni_db_user:mAHY2yfEOnqpWO3I2pG37VvwSThe3TDO@dpg-coln37i0si5c73f4vusg-a.oregon-postgres.render.com/learni_db',
    ssl: {
        rejectUnauthorized: false
    }
})

const tables: { tableName: string, fields: { type: string, name: string }[] }[] = [
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
]

const connect = async () => {
    await client.connect()
    tables.forEach(async (table) => {
        await client.query(`CREATE TABLE IF NOT EXISTS ${table.tableName} (${table.fields.map(field => `${field.name} ${field.type}`).join(', ')})`)
    })
}

function stringFormatter(inputString: string) {
    // List of characters that need to be escaped in SQL strings
    const charactersToEscape: any = {
        "'": "''",  // Escape single quotes
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

function stringFormatterRev(inputString: string) {
    // List of escaped characters and their original counterparts
    const escapedCharacters: any = {
        "''": "'",  // Unescape single quotes
        "\\\\": "\\", // Unescape backslashes
        "\\n": "\n", // Unescape newline characters
        "\\r": "\r", // Unescape carriage return characters
        "\\x00": "\x00", // Unescape NULL characters
        "\\x1a": "\x1a"  // Unescape Control+Z characters
        // Add more escaped characters here as needed
    };

    // Replace each escaped character with its original counterpart
    return inputString.replace(/''|\\\\|\\n|\\r|\\x00|\\x1a/g, function (match) {
        return escapedCharacters[match];
    });
}

export default { connect, client, stringFormatter, stringFormatterRev }
