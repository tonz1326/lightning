const fs = require('fs');
const Quadkey = require('quadkeytools');

const lightningInput = './input/lightning.json';
const assetsInput = './assets/assets.json';

/**
 * main execution code
 */
async function execute () {
  let lightningData = '';
  let assetsData = '';
  // read lightning.json as input file
  fs.createReadStream(lightningInput, 'utf8')
    .on('data', (data) => {
      // this part will get all stream data and save it in input string
      lightningData += data;
    })
    .on('end', () => {
      // separate input string into array of strikes
      const strikes = lightningData.split('\r\n');

      // read assets to be used for checking strikes
      fs.createReadStream(assetsInput, 'utf8')
        .on('data', (data) => {
          assetsData += data;
        })
        .on('end', () => {
        // parse assets json data and save it as array
          const assets = JSON.parse(assetsData);

          // check per asset if it has strikes.
          for (let a = 0; a < assets.length; a++) {
            // check if there as strikes in given asset
            if (checkStrikesWithinAssets(strikes, assets[a])) {
              console.log(`lightning alert for ${assets[a].assetOwner}:${assets[a].assetName}`);
            }
          }
        });
    });
}

/**
 * Check if there are strikes in given asset
 */
function checkStrikesWithinAssets (strikes, asset) {
  // get bbox of given asset
  const bbox = Quadkey.bbox(asset.quadKey);
  // check each if strike location is within bbox
  for (let s = 0; s < strikes.length; s++) {
    // this will check if new lines have values or not (end of file have empty line)
    if (strikes[s].length === 0) continue;

    const strikeJson = JSON.parse(strikes[s]);

    if (bbox.min.lat <= strikeJson.latitude &&
        bbox.max.lat >= strikeJson.latitude &&
        bbox.min.lng <= strikeJson.longitude &&
        bbox.max.lng >= strikeJson.longitude &&
        strikeJson.flashType !== 9 // do not include heartbeat since this is not strike
    ) {
      // console.debug("Correct: ", {bbox, strikeJson})
      return true;
    }
  }
  return false;
}

execute().then();
