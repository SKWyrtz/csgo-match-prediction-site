const { default: axios } = require('axios');
const cheerio = require('cheerio');

/**
 * Webscrapes matches from hltv.org.
 * @returns matches
 * http://api.scraperapi.com?api_key=e391629f944f3e030d3f21b91ed1e54e&url=https://www.hltv.org/matches&render=true
 */
async function getUpcomingMatches () {
  const result = await axios.get(
    'https://www.hltv.org/matches', {
      headers: {
        Referer: 'https://www.google.com/',
        'Content-Type': 'application/json',
        'User-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:96.0) Gecko/20100101 Firefox/96.0',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Accept-Language': 'en-US,en;q=0.5'
      }
    }).catch((err) => {
    if (err.response) {
      // Request made and server responded
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else if (err.request) {
      // The request was made but no response was received
      console.log(err.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', err.message);
    }
  });

  const $ = cheerio.load(result.data);
  const matches = [];

  const upcomingMatchesSection = $('.upcomingMatchesSection');
  upcomingMatchesSection.each((_, matchSection) => {
    const yearMonthDay = $(matchSection).find('.matchDayHeadline').text();
    const upcominMatch = $(matchSection).find('.upcomingMatch');
    upcominMatch.each((_, match) => {
      const matchInfoEmpty = $(match).find('.matchInfoEmpty').children().first().text();
      const matchPage = $(match).find('.match').attr('href');
      const timeOfDay = $(match).find('.matchTime').text();
      const event = $(match).find('.matchEventName').text();
      const teamNames = $(match).find('.matchTeam').children('.text-ellipsis');
      const teamLogosArray = formatTeamLogos($(match).find('.matchTeamLogo'));
      const matchRating = $(match).find('.matchRating').children().first();
      const matchRatingClassName = matchRating.attr('class');
      let isTopTier = false;
      if (matchRatingClassName === 'fa fa-star') isTopTier = true;

      const matchData = {
        link: 'https://www.hltv.org' + matchPage,
        date: generateISO8601(yearMonthDay, timeOfDay),
        event: event,
        team1: teamNames.eq(0).text(),
        team1Score: '',
        team1Logo: teamLogosArray[0],
        team2: teamNames.eq(1).text(),
        team2Score: '',
        team2Logo: teamLogosArray[teamLogosArray.length - 1],
        isTopTier: isTopTier,
        matchInfoEmpty: matchInfoEmpty
      };

      matches.push(matchData);
    });
  });
  return matches;
}

/**
 * Generates a Date object
 * @param {string} yearMonthDay Year, month and day. Format example: 'Saturday - 2021-11-1313:45'. Name of the day is ignored.
 * @param {string} timeOfDay Time of day (hours and minutes). Format example: '18:00'
 * @returns Date String (ISO8601) with sqlite formatting
 */
function generateISO8601 (yearMonthDay, timeOfDay) {
  const yearMonthDaySplit = yearMonthDay.split('-');
  const year = yearMonthDaySplit[1].trim();
  const month = yearMonthDaySplit[2].trim();
  const day = yearMonthDaySplit[3].trim();
  const timeOfDaySplit = timeOfDay.split(':');
  const hours = timeOfDaySplit[0].trim();
  const minutes = timeOfDaySplit[1].trim();
  const date = new Date(year, parseInt(month) - 1, day, hours, minutes).toISOString(); // month is 0-indexed
  return date.replace('Z', '');
}

function formatTeamLogos (teamLogos) {
  const teamLogoArray = [];

  let team1 = teamLogos.eq(0);
  if (team1.hasClass('day-only')) {
    team1 = teamLogos.eq(1);
  }
  let team1Logo = team1.attr('src');
  if (team1Logo === '/img/static/team/placeholder.svg' || team1Logo === null || team1Logo === undefined) {
    team1Logo = 'https://www.hltv.org/img/static/team/placeholder.svg';
  }
  teamLogoArray.push(team1Logo);

  const team2 = teamLogos.eq(-1);
  let team2Logo = team2.attr('src');
  if (team2Logo === '/img/static/team/placeholder.svg' || team2Logo === null || team2Logo === undefined) {
    team2Logo = 'https://www.hltv.org/img/static/team/placeholder.svg';
  }
  teamLogoArray.push(team2Logo);

  return teamLogoArray;
}

async function getFinishedMatches (URL) {
  const { data } = await axios.get(URL, {
    headers: {
      Referer: 'https://www.google.com/',
      'Content-Type': 'application/json',
      'User-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:96.0) Gecko/20100101 Firefox/96.0',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Accept-Language': 'en-US,en;q=0.5'
    }
  });

  const $ = cheerio.load(data);
  const teamScores = {};

  teamScores.team1Score = parseInt($('.team1-gradient').children().last().text());
  teamScores.team2Score = parseInt($('.team2-gradient').children().last().text());

  console.log('Sleeps..');
  await sleep(getRandomNumber(1000, 1200)); // To avoid getting blacklisted again

  return teamScores;
}

/**
 * Sleeps/waits
 */
function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * @returns Random number betwen min and max
 */
function getRandomNumber (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = {
  getUpcomingMatches,
  getFinishedMatches
};

// (async () => {
//   try {
//     const text = await getUpcomingMatches();
//     console.log(text[0]);
//   } catch (e) {
//     // Deal with the fact the chain failed
//   }
// })();
