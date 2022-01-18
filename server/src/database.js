const sqlite3 = require('sqlite3').verbose();
const { data } = require('cheerio/lib/api/attributes');
const webscrape = require('./webscrape');

const db = new sqlite3.Database('C:/Users/Sigurd/Projects/csgo-match-prediction-site/server/src/db/matches.db', (err) => { // relative path was not enough.
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the matches database.');
});

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

  // db.run(sql, [], function (err) {
  //   if (err) return console.error(err.message);
  // });
}

async function updateDatabase () {
  await updateUpcomingMatches();
  await updateFinishedMatches();
}

async function updateUpcomingMatches () {
  const matches = await webscrape.getUpcomingMatches(); // TODO: TRY-CATCH AROUND HERE
  // console.log(matches[0]);

  const flatMatches = [];
  matches.forEach(match => {
    Object.entries(match).forEach(([key, value]) => flatMatches.push(value));
  });

  const placeholders = matches.map((matches) => '(?, ?, ?, ?, ?, ?, ? ,? ,?, ?, ?)').join(',');
  const sql = 'INSERT OR IGNORE INTO matches VALUES ' + placeholders;

  runQuery(sql, flatMatches);

  // db.run(sql, flatMatches, function (err) {
  //   if (err) return console.error(err.message);
  //   console.log(`Rows inserted ${this.changes}`);
  // });
}

async function updateFinishedMatches () {
  // SELECT * FROM matches WHERE date(date) < date(\'now\')
  const today = new Date().toISOString();
  const date = today.slice('0', '10');

  console.log(date);
  const sql = `SELECT * FROM matches WHERE date(date) < date('${date}');`; // TODO: 'now' is on YYYY-MM-DD format so there is no hours and minutes. Change to minutes since 1970
  allQuery(sql, async (err, rows) => { // TODO: Right now selects all done matches. Should only check done matches once
    if (err) console.error(err);
    for await (const match of rows) {
      const matchTeamScore = await webscrape.getFinishedMatches(match.link_id);
      console.log(matchTeamScore);
      const placeholders = [matchTeamScore.team1Score, matchTeamScore.team2Score, match.link_id];
      const sql = 'UPDATE matches SET team1Score = ?, team2Score = ? WHERE link_id = ?';
      await runQuery(sql, placeholders);
    }
  });
}

/*
async function requestIndividualMatchData (matchLink) {
  const teamScores = webscrape.getFinishedMatches(matchLink);
}
*/

function getAllMatches (callback) {
  allQuery('SELECT * FROM matches', callback);
}

async function runQuery (sqlCommand, data) {
  const sql = sqlCommand;
  db.run(sql, data, (err) => {
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

// setupDB();
// updateFinishedMatches();
// getAllMatches((err, result) => {
//   if (err) console.log(err);
//   console.log(result[0]);
// });
