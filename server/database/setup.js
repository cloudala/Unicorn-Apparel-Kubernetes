const neo4j = require('neo4j-driver');
const dotenv = require('dotenv');

dotenv.config();

const URI = process.env.NEO4J_URI;
const USER = process.env.NEO4J_USERNAME;
const PASSWORD = process.env.NEO4J_PASSWORD;

// Establish Neo4j connection
const driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));

module.exports = { driver };