INSERT or REPLACE INTO matches VALUES ('https://www.hltv.org/matches/2354039/wisla-krakow-vs-endpoint-pinnacle-winter-series-1-regionals', '2022-01-17T08:20:35.000', 'Pinnacle Winter Series 1 Regionals', 'Wisla Krakow', '', 'https://img-cdn.hltv.org/teamlogo/jW1qdhWl4xoE7dDU7fZbDy.svg?ixlib=java-2.1.0&s=450bc52fa5993ac993283c50404a1532', 'Endpoint', '', 'https://img-cdn.hltv.org/teamlogo/EtlS2mffWkVEo3j0cY7QYo.png?ixlib=java-2.1.0&w=100&s=7ed7b19aa98f6ceb75786c588f53368d', 0, '');
SELECT * FROM matches WHERE datetime(date) < datetime('2022-01-19T09:00');
SELECT * FROM matches WHERE datetime(date) < datetime('2022-01-25T11:00') AND team1Score = "";

SELECT * FROM matches ORDER BY date(date)
SELECT * FROM matches WHERE matchInfoEmpty != '' AND datetime(date) = datetime('2022-01-22');
DELETE FROM matches WHERE link_id = 'https://www.hltv.org/matches/2357173/ungentium-vs-flet-esea-advanced-season-41-europe';
DELETE FROM matches WHERE link_id = 'https://www.hltv.org/matches/2357180/into-the-breach-vs-ec-kyiv-esport-tour-2022-series-2';