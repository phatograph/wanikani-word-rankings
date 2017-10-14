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

    vocabs = vocabs.map((v) => {
      if (!v.user_specific) return v;

      return Object.assign({}, v, {
        tries: v.user_specific.meaning_incorrect + v.user_specific.meaning_correct + v.user_specific.reading_incorrect + v.user_specific.reading_correct,
      });
    })

    await db.collection('vocabularies').remove({});
    await db.collection('vocabularies').insertMany(vocabs);
    console.error(`Saved ${vocabs.length}`)
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

const crawler2 = async () => {
  let db;

  try {
    db = await mongo.connect('mongodb://localhost:27017/wanikani-word-rankings-v2');
    const { data } = await axios({
      url: `https://www.wanikani.com/api/v2/subjects`,
      timeout: 10000,
      headers: {
        'Authorization': 'Token token=88abab1f-8a95-48b0-b1de-c1cd78b477c7',
      },
    });

    const totalPages = data.pages.last;
    let counter = 1;
    let promises = [];

    while (counter <= totalPages) {
      promises = promises.concat(getSubjects(counter));
      counter++;
    }

    let subjects = await Promise.all(promises);
    subjects = _.flatten(subjects);

    await db.collection('vocabularies').remove({});
    await db.collection('vocabularies').insertMany(subjects);
    console.error(`Saved ${subjects.length}`)
  }
  catch (e) {
    console.log(e)
  }
  finally {
    if (db) {
      await db.close();
    }
  }
}

const getSubjects = async (level) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios({
        url: `https://www.wanikani.com/api/v2/subjects?page=${level}`,
        timeout: 10000,
        headers: {
          'Authorization': 'Token token={88abab1f-8a95-48b0-b1de-c1cd78b477c7}',
        },
      })

      console.log(data.data.length)
      resolve(data.data);
    } catch (e) {
      resolve([])
    }
  })
}

crawler2();
