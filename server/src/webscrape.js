const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Webscrapes matches from hltv.org.
 * @returns matches
 */
async function getUpcomingMatches () {
  const { data } = await axios.get(
    'https://www.hltv.org/matches'
  );
  const $ = cheerio.load(data);
  const matches = [];

  const upcomingMatchesSection = $('.upcomingMatchesSection');
  upcomingMatchesSection.each((_, matchSection) => {
    const yearMonthDay = $(matchSection).find('.matchDayHeadline').text();
    const upcominMatch = $(matchSection).find('.upcomingMatch');
    upcominMatch.each((_, match) => {
      const matchInfoEmpty = $(match).find('.matchInfoEmpty').children().first().text()
      // if (matchInfoEmpty) {
      //   matchInfoEmpty.children.first().text()
      // }
      const matchPage = $(match).find('.match').attr('href');
      const timeOfDay = $(match).find('.matchTime').text();
      const event = $(match).find('.matchEventName').text();
      const teamNames = $(match).find('.matchTeam').children('.text-ellipsis');
      const teamLogosArray = formatTeamLogos($(match).find('.matchTeamLogo'));
      const matchRating = $(match).find('.matchRating').children().first();
      const matchRatingClassName = matchRating.attr('class');
      let isTopTier = false;
      if (matchRatingClassName === 'fa fa-star') isTopTier = true;

      console.log(teamLogosArray)

      const matchData = {
        link: 'https://www.hltv.org' + matchPage,
        date: generateISO8601(yearMonthDay, timeOfDay),
        event: event,
        team1: teamNames.eq(0).text(),
        team1Logo: teamLogosArray[0],
        team2: teamNames.eq(1).text(),
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
 * @returns Date object
 */
function generateISO8601 (yearMonthDay, timeOfDay) {
  const yearMonthDaySplit = yearMonthDay.split('-');
  const year = yearMonthDaySplit[1].trim();
  const month = yearMonthDaySplit[2].trim();
  const day = yearMonthDaySplit[3].trim();
  const timeOfDaySplit = timeOfDay.split(':');
  const hours = timeOfDaySplit[0].trim();
  const minutes = timeOfDaySplit[1].trim();
  return new Date(year, month, day, hours, minutes).toISOString();
}

function formatTeamLogos(teamLogos) {
  let teamLogoArray = [];

  let team1 = teamLogos.eq(0);
  if (team1.hasClass('day-only')){
    team1 = teamLogos.eq(1);
  }
  let team1Logo = team1.attr('src');
  if (team1Logo == '/img/static/team/placeholder.svg'|| team1Logo == null){
    team1Logo = 'https://www.hltv.org/img/static/team/placeholder.svg'
  }
  teamLogoArray.push(team1Logo);

  let team2 = teamLogos.eq(-1);
  let team2Logo = team2.attr('src');
  if (team2Logo == '/img/static/team/placeholder.svg' || team2Logo == null){
    team2Logo = 'https://www.hltv.org/img/static/team/placeholder.svg'
  }
  teamLogoArray.push(team2Logo);

  return teamLogoArray
}

// async function test () {
//   const matches = await getUpcomingMatches();
//   console.log(matches);
// }

module.exports = {
  getUpcomingMatches
};
