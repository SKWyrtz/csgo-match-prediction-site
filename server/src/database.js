const sqlite3 = require('sqlite3').verbose();
const webscrape = require('./webscrape');

const db = new sqlite3.Database('C:/Users/Sigurd/Projects/csgo-match-prediction-site/server/src/db/matches.db', (err) => { // relative path was not enough.
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the matches database.');
});

/**
 * Sets up the database
 */
function setupDB () {
  const sql = `
  CREATE TABLE IF NOT EXISTS matches (link_id TEXT PRIMARY KEY,
                                      date TEXT, 
                                      event TEXT, 
                                      team1 TEXT, 
                                      team1Score TEXT,
                                      team1Logo TEXT, 
                                      team2 TEXT, 
                                      team2Score TEXT,
                                      team2Logo TEXT, 
                                      isTopTier INTEGER, 
                                      matchInfoEmpty TEXT);
  `;
  runQuery(sql, []);
}

/**
 * Updates all data in the database
 */
async function updateDatabase () {
  const matches = await webscrape.getUpcomingMatches(); // TODO: TRY-CATCH AROUND HERE
  console.log(matches.length);
  await insertUpcomingMatches(matches);
  await updateUpcomingMatches(matches);
  await updateFinishedMatches();
}

/**
 * Inserts all new upcoming matches into the database
 * @param {JS Object} matchesData - array of upcoming matches
 */
async function insertUpcomingMatches (matchesData) {
  const flatMatches = [];
  matchesData.forEach(match => {
    Object.entries(match).forEach(([key, value]) => flatMatches.push(value));
  });
  const placeholders = matchesData.map((matches) => '(?, ?, ?, ?, ?, ?, ? ,? ,?, ?, ?)').join(',');
  const sql = 'INSERT OR IGNORE INTO matches VALUES ' + placeholders;
  runQuery(sql, flatMatches);
}

/**
 * Updates matches where teams were not determined yet
 * @param {JS Object} matchesData - array of upcoming matches
 */
async function updateUpcomingMatches (matchesData) {
  console.log('Updating existing matchData...'); // TODO: Maybe is not called???
  const today = new Date().toISOString();
  const date = today.slice('0', '10');
  let sql = `SELECT * FROM matches WHERE matchInfoEmpty != '' AND date(date) = date('${date}')`;
  allQuery(sql, async (err, rows) => {
    if (err) console.error(err);
    for await (const match of rows) {
      const updatedMatchInfo = matchesData.find(m => formatHltvLink(m.link) === formatHltvLink(match.link_id));
      if (!updatedMatchInfo) continue;
      if (updatedMatchInfo.matchInfoEmpty === '') {
        const placeholders = [updatedMatchInfo.event, updatedMatchInfo.team1, updatedMatchInfo.team1Logo, updatedMatchInfo.team2, updatedMatchInfo.team2Logo, match.link_id];
        sql = `UPDATE matches 
              SET event = ?,
                team1 = ?, 
                team1Logo = ?, 
                team2 = ?, 
                team2Logo = ?, 
                matchInfoEmpty = ''
              WHERE ? = link_id `;
        await runQuery(sql, placeholders);
      }
    }
  });
}

/**
 * Formats hltv link to get the match ID
 * @param {string} hltvLink - hltv link to a specifik match
 * @returns The ID of the match
 */
function formatHltvLink (hltvLink) {
  const result = hltvLink.split('/')[4];
  return result;
}

/**
 * Updates finished matches with result score
 */
async function updateFinishedMatches () {
  const today = new Date().toISOString();
  const date = today.slice('0', '10');

  const sql = `SELECT * FROM matches WHERE date(date) < date('${date}') AND team1Score = "";`; // TODO: 'now' is on YYYY-MM-DD format so there is no hours and minutes. Change to minutes since 1970
  allQuery(sql, async (err, rows) => {
    if (err) console.error(err);
    for await (const match of rows) {
      const matchTeamScore = await webscrape.getFinishedMatches(match.link_id);
      console.log(matchTeamScore);
      const placeholders = [matchTeamScore.team1Score, matchTeamScore.team2Score, match.link_id];
      const sql = 'UPDATE matches SET team1Score = ?, team2Score = ? WHERE link_id = ?';
      await runQuery(sql, placeholders);
    }
    console.log('Done updating matches');
  });
}

function getAllMatches (callback) {
  allQuery('SELECT * FROM matches ORDER BY date(date) ASC', callback); // TODO: Is not sorted by date
}

async function runQuery (sqlCommand, data) {
  const sql = sqlCommand;
  db.run(sql, data, function (err) {
    if (err) console.error(err);
    console.log(`Row(s) changed: ${this.changes}`);
  });
}

function allQuery (sqlCommand, callback) {
  const sql = sqlCommand;
  db.all(sql, [], (err, rows) => {
    if (err) {
      callback(err);
    }
    callback(null, rows);
  });
}

module.exports = {
  setupDB,
  updateDatabase,
  getAllMatches
};
