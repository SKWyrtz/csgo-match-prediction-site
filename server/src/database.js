const sqlite3 = require("sqlite3").verbose();
const webscrape = require('./webscrape');

let db = new sqlite3.Database('./db/matches.db', (err) => {
    if (err) {
    console.error(err.message);
    }
    console.log('Connected to the matches database.');
});

function setupDB() {
    db.run('CREATE TABLE IF NOT EXISTS matches (link_id TEXT PRIMARY KEY, date TEXT, event TEXT, team1 TEXT, team1Logo TEXT, team2 TEXT, team2Logo TEXT, isTopTier INTEGER, matchInfoEmpty TEXT);')
    
}

async function updateMatches(){
    const matches = await webscrape.getUpcomingMatches(); //TODO: TRY-CATCH AROUND HERE
    console.log(matches[0]);

    let flatMatches = []
    matches.forEach(match => {        
        Object.entries(match).forEach(([key, value]) => flatMatches.push(value));
    });

    const placeholders = matches.map((matches) => '(?, ?, ?, ?, ?, ?, ? ,? ,?)').join(',');
    const sql = 'INSERT OR IGNORE INTO matches VALUES ' + placeholders;

    db.run(sql, flatMatches, function(err){
        if (err) {
            return console.error(err.message);
          }
          console.log(`Rows inserted ${this.changes}`);
    })

    db.close();
}

function getAllMatches(){
    let sql = 'SELECT * FROM matches';
    let res;
    db.all(sql, [], (err, rows) => {
        if (err){ //Make proper err handling
            return console.error(err.message);
        }
        //console.log(rows)
        res = rows
    }) 
    return res
}

module.exports = {
    setupDB,
    updateMatches,
    getAllMatches
  };

setupDB();
console.log(getAllMatches())