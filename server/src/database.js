const sqlite3 = require('sqlite3').verbose();
const webscrape = require('./webscrape');

const db = new sqlite3.Database('C:/Users/Sigurd/Projects/csgo-match-prediction-site/server/src/db/matches.db', (err) => { // TODO: relative path was not enough.
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the matches database.');
  }
});

/**
 * Sets up the database
 */
async function setupDB () {
  const setupMatchesTableSQL = `
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
  await runQuery(setupMatchesTableSQL, []);

  const setupUserPredictionsTableSQL = `
  CREATE TABLE IF NOT EXISTS userPredictions (user_id INTEGER PRIMARY KEY,
                                      username TEXT NOT NULL,
                                      predictions TEXT NOT NULL);
  `;
  runQuery(setupUserPredictionsTableSQL, []);

  const insertFirstUserInPredictionsTableSQL = `
  INSERT OR IGNORE INTO userPredictions VALUES (1, '','');
  `;
  runQuery(insertFirstUserInPredictionsTableSQL, []);
}

/**
 * Updates all data in the database
 */
async function updateDatabase () {
  const matches = await webscrape.getUpcomingMatches(); // TODO: TRY-CATCH AROUND HERE
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
  console.log('Updating existing matchData...');
  const today = new Date().toISOString();
  const todayDate = today.slice('0', '16');
  let sql = `SELECT * FROM matches WHERE matchInfoEmpty != '' AND date(date) = date('${todayDate}')`;
  allQuery(sql, async (err, rows) => {
    if (err) console.error(err);
    for await (const match of rows) {
      const updatedMatchInfo = matchesData.find(m => formatHltvLink(m.link) === formatHltvLink(match.link_id));
      if (!updatedMatchInfo) continue;
      if (updatedMatchInfo.matchInfoEmpty === '') {
        sql = `UPDATE matches 
        SET event = ?,
        team1 = ?, 
        team1Logo = ?, 
        team2 = ?, 
        team2Logo = ?, 
        matchInfoEmpty = ''
        WHERE ? = link_id `;
        const placeholders = [updatedMatchInfo.event, updatedMatchInfo.team1, updatedMatchInfo.team1Logo, updatedMatchInfo.team2, updatedMatchInfo.team2Logo, match.link_id];
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
async function updateFinishedMatches () { // TODO: Also updates live matches and appends.
  const today = new Date().toISOString();
  const date = today.slice('0', '16');

  const sql = `SELECT * FROM matches WHERE datetime(date) < datetime('${date}') AND team1Score = "";`;
  allQuery(sql, async (err, rows) => {
    if (err) console.error(err);
    for await (const match of rows) {
      const matchTeamScore = await webscrape.getFinishedMatches(match.link_id);
      if (!isNaN(matchTeamScore.team1Score) || !isNaN(matchTeamScore.team2Score)) { // Otherwise it is live
        console.log(matchTeamScore);
        const sql = 'UPDATE matches SET team1Score = ?, team2Score = ? WHERE link_id = ?';
        const placeholders = [matchTeamScore.team1Score, matchTeamScore.team2Score, match.link_id];
        await runQuery(sql, placeholders);
      }
    }
    console.log('Done updating matches');
  });
}

function getAllMatches (callback) {
  allQuery('SELECT * FROM matches ORDER BY datetime(date) ASC', callback);
}

function insertPrediction (prediction) {
  allQuery('SELECT predictions FROM userPredictions WHERE user_id = 1', (err, data) => {
    if (err) return console.error(err);
    const predictionsTextField = data[0].predictions;
    const formattedPrediction = `,${prediction.linkID}:::${prediction.predictedTeam}`; // TODO: using ':::' as divider - may not be sufficient
    const predictionsConcatenated = predictionsTextField.concat(formattedPrediction);
    const sql = 'UPDATE userPredictions SET predictions = ? WHERE user_id = 1;'; // TODO: user_id is hardcoded until the site supports multiusers
    const placeholder = [predictionsConcatenated];
    runQuery(sql, placeholder);
  }); // TODO: Hardcoded
}

function getAllPredictions (userID, callback) {
  allQuery(`SELECT predictions FROM userPredictions WHERE user_id = ${userID}`, callback);
}

async function runQuery (sqlCommand, data) {
  db.run(sqlCommand, data, function (err) {
    if (err) console.error(err);
    console.log(`Row(s) changed: ${this.changes}`);
  });
}

function allQuery (sqlCommand, callback) {
  db.all(sqlCommand, [], (err, rows) => {
    if (err) {
      callback(err);
    }
    callback(null, rows);
  });
}

module.exports = {
  setupDB,
  updateDatabase,
  getAllMatches,
  getAllPredictions,
  insertPrediction
};
