const axios = require('axios');
const cheerio = require('cheerio');

async function getUpcomingMatches () {
  const { data } = await axios.get(
    'https://www.hltv.org/matches'
  );
  const $ = cheerio.load(data);

  const upcomingMatchesSection = $('.upcomingMatchesSection');

  const matches = [];
  upcomingMatchesSection.each((_, matchSection) => {
    const date = $(matchSection).find('.matchDayHeadline').text();
    const upcominMatch = $(matchSection).find('.upcomingMatch');
    upcominMatch.each((_, match) => {
      const link = $(match).find('.match').attr('href');
      const event = $(match).find('.matchEventName').text();
      const teamNames = $(match).find('.matchTeamName');
      const teamLogos = $(match).find('.matchTeamLogo');
      const matchRating = $(match).find('.matchTeamLogo').children().first();
      // const matchRatingClassName = matchRatings.attr('class');
      // if matchRatingClassName == "fa fa-star" return true
      const matchData = {
        link: link,
        date: date,
        event: event,
        team1: teamNames.eq(0).text(),
        team1Logo: teamLogos.eq(0).attr('src'),
        team2: teamNames.eq(1).text(),
        team2Logo: teamLogos.eq(0).attr('src'),
        isTopTier: matchRating.attr('class')
      };
      matches.push(matchData);
    });
  });
  return matches;
}

// getUpcomingMatches().then(matches => console.log(matches));
async function test () {
  const matches = await getUpcomingMatches();
  console.log(matches);
}

test();
