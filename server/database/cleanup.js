const { driver } = require('./setup');

function closeNeo4jDriver() {
  if (driver) {
    driver.close();
    console.log('Neo4j driver closed successfully.');
  }
}

module.exports = { closeNeo4jDriver };
