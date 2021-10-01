const { Client } = requre("pg");

let DB_URI;

if (process.env.NODE_ENF === "test") {
    DB_URI = "postgresql:///usersdb_test";
} else {
    DB_URI = "postgresql:///usersdb";
}

let db = new Client({
    connectionString: DB_URI
});

db.connect();

module.exports = db;