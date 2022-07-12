function formatPredictionToObject (data) { // TODO: refactor into ex a utility file
    const predictionsAsString = data[0].predictions;
    const result = {};
    const predictionArray = predictionsAsString.split(',');
    predictionArray.forEach(prediction => {
      const newString = prediction.split(':::');
      result[newString[0]] = newString[1];
    });
    return result;
  }

  function formatPredictionToString (predictionObject){
    let finalString = '';
    for (let [linkID, prediction] of Object.entries(predictionObject)) {
        // let formattedPrediction = `,${linkID}:::${prediction}`;
        //finalString.concat(formattedPrediction);
        finalString += `,${linkID}:::${prediction}`;
        //console.log(linkID);
    }
    return finalString;
  }

const testObject = {
    '': undefined,
    'https://www.hltv.org/matches/2357023/iem-cologne-2022-play-in-upper-bracket-quarter-final-3-iem-cologne-2022-play-in': '1',  
    'https://www.hltv.org/matches/2357023/big-vs-outsiders-iem-cologne-2022-play-in': '2',
    'https://www.hltv.org/matches/2357024/iem-cologne-2022-play-in-upper-bracket-quarter-final-4-iem-cologne-2022-play-in': '2',  
    'https://www.hltv.org/matches/2357026/iem-cologne-2022-play-in-lower-bracket-round-1-2-iem-cologne-2022-play-in': '2',        
    'https://www.hltv.org/matches/2357026/complexity-vs-astralis-iem-cologne-2022-play-in': '2',
    'https://www.hltv.org/matches/2357024/movistar-riders-vs-vitality-iem-cologne-2022-play-in': '1',
    'https://www.hltv.org/matches/2357188/luxe-vs-northern-forces-esea-advanced-season-41-north-america': '2',
    'https://www.hltv.org/matches/2357209/dgg-vs-huya-aftershock-winner-esl-challenger-melbourne-2022-oceania-open-qualifier-1': '1',
    'https://www.hltv.org/matches/2357209/dgg-vs-aftershock-esl-challenger-melbourne-2022-oceania-open-qualifier-1': '1',
    'https://www.hltv.org/matches/2357210/onetap-vs-israel-european-championship-2022': '2',
    'https://www.hltv.org/matches/2357212/sweden-vs-croatia-european-championship-2022': '2',
    'https://www.hltv.org/matches/2357027/order-vs-imperial-iem-cologne-2022-play-in': '1',
    'https://www.hltv.org/matches/2357028/mibr-vs-tyloo-iem-cologne-2022-play-in': '1',
    'https://www.hltv.org/matches/2357211/perspektiva-vs-norway-european-championship-2022': '2',
    'https://www.hltv.org/matches/2357213/bluejays-vs-luxembourg-european-championship-2022': '1',
    'https://www.hltv.org/matches/2357029/sprout-vs-vitality-iem-cologne-2022-play-in': '2',
    'https://www.hltv.org/matches/2357030/big-vs-astralis-iem-cologne-2022-play-in': '1',
    'https://www.hltv.org/matches/2357203/ago-vs-onyx-y-games-pro-series-2022': '1',
    'https://www.hltv.org/matches/2357032/mouz-vs-tyloo-iem-cologne-2022-play-in': '1',
    'https://www.hltv.org/matches/2357132/iem-cologne-2022-group-a-upper-bracket-semi-final-1-iem-cologne-2022': '2',
    'https://www.hltv.org/matches/2357133/iem-cologne-2022-group-a-lower-bracket-round-1-1-iem-cologne-2022': '1',
    'https://www.hltv.org/matches/2357132/nip-vs-natus-vincere-iem-cologne-2022': '2',
    'https://www.hltv.org/matches/2357133/heroic-vs-mouz-iem-cologne-2022': '1',
    'https://www.hltv.org/matches/2357135/iem-cologne-2022-group-a-lower-bracket-round-1-2-iem-cologne-2022': '2',
    'https://www.hltv.org/matches/2357135/g2-vs-ence-iem-cologne-2022': '2',
    'https://www.hltv.org/matches/2357134/iem-cologne-2022-group-a-upper-bracket-semi-final-2-iem-cologne-2022': '2',
    'https://www.hltv.org/matches/2357134/movistar-riders-vs-vitality-iem-cologne-2022': '2',
    'https://www.hltv.org/matches/2357136/liquid-vs-00nation-iem-cologne-2022': '1',
    'https://www.hltv.org/matches/2357137/outsiders-vs-furia-iem-cologne-2022': '2',
    'https://www.hltv.org/matches/2357138/spirit-vs-faze-iem-cologne-2022': '2',
    'https://www.hltv.org/matches/2357139/cloud9-vs-astralis-iem-cologne-2022': '2',
    'https://www.hltv.org/matches/2357148/mouz-vs-astralis-iem-cologne-2022': '2',
    'https://www.hltv.org/matches/2357149/movistar-riders-vs-liquid-iem-cologne-2022': '1',
    'https://www.hltv.org/matches/2357339/9z-vs-9z-academy-flow-fireleague-2022': '2',
    'https://www.hltv.org/matches/2357340/boca-juniors-vs-wap-flow-fireleague-2022': 2
  }

  console.log(formatPredictionToString(testObject));

  module.exports = {
    formatPredictionToObject,
    formatPredictionToString
  };