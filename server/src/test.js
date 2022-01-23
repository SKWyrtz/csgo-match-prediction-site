import got from 'got';

const url = 'https://www.hltv.org/matches';

const options = {
  headers: {
    Referer: 'https://mangakakalot.com/'
  }
};

got(url, options).then(result => {
  console.log(result);
}).catch(err => {
  console.log(err);
});

// (async () => {
//   try {
//     await getUpcomingMatches();
//   } catch (e) {
//     console.error(e);
//   }
// })();

// const { default: axios } = require('axios');

// async function getUpcomingMatches () {
//   let data;
//   try {
//     data = await axios.get(
//       'https://www.hltv.org/matches', {
//         headers: {
//           'User-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:96.0) Gecko/20100101 Firefox/96.0'
//         }
//       });
//     console.log(data);
//   } catch (err) {
//     console.error(err);
//   }
// }
