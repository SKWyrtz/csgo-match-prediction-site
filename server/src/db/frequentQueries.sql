INSERT or REPLACE INTO matches VALUES ('https://www.hltv.org/matches/2354039/wisla-krakow-vs-endpoint-pinnacle-winter-series-1-regionals', '2022-01-17T08:20:35.000', 'Pinnacle Winter Series 1 Regionals', 'Wisla Krakow', '', 'https://img-cdn.hltv.org/teamlogo/jW1qdhWl4xoE7dDU7fZbDy.svg?ixlib=java-2.1.0&s=450bc52fa5993ac993283c50404a1532', 'Endpoint', '', 'https://img-cdn.hltv.org/teamlogo/EtlS2mffWkVEo3j0cY7QYo.png?ixlib=java-2.1.0&w=100&s=7ed7b19aa98f6ceb75786c588f53368d', 0, '');
SELECT * FROM matches WHERE date(date) < date('2022-01-18');
SELECT * FROM matches WHERE date(date) < date('2022-01-21') AND team1Score = "";
SELECT * FROM matches ORDER BY date(date)
SELECT * FROM matches WHERE matchInfoEmpty != '' AND date(date) = date('2022-01-22');