const axios = require('axios');
const mongo = require('mongodb').MongoClient;
const _ = require('lodash');

const crawler = async () => {
  const db = await mongo.connect('mongodb://localhost:27017/wanikani-word-rankings');
  let vocabs = [];
  let counter = 1;
  let promises = [];
  const highestLevel = 31;

  try {
    while (counter <= highestLevel) {
      promises.push(getVocabs(counter));
      counter++;
    }

    vocabs = vocabs.concat(await Promise.all(promises))
    vocabs = _.flatten(vocabs);

    await db.collection('vocabularies').remove({});
    await db.collection('vocabularies').insertMany(vocabs);
  }
  catch (e) {
    console.log(e);
  }
  finally {
    if (db) {
      await db.close();
    }
  }
}

const getVocabs = async (level) => {
  return new Promise(async (resolve, reject) => {
    try {
      const results = await axios({
        url: `https://www.wanikani.com/api/user/${process.env.TOKEN}/vocabulary/${level}`,
        timeout: 10000,
      })

      console.log(results.data.requested_information.length)
      resolve(results.data.requested_information);
    } catch (e) {
      resolve([])
    }
  })
}

crawler();
