const crawler = async () => {
  const axios = require('axios');
  const mongo = require('mongodb').MongoClient;

  try {
    const url = `https://www.wanikani.com/api/user/${process.env.TOKEN}/vocabulary/1`;
    const results = await axios({
      url,
      timeout: 30000,
    });

    console.log(results.data.requested_information.length);
  } catch (e) {
    console.log(e);
  }
}

crawler();
