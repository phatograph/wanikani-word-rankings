const express     = require('express');
const cors        = require('cors');
const path        = require('path');
const app         = express();
const static_path = path.join(__dirname, 'build');

app.use(cors())
app.use(express.static(static_path));

const mongo = require('mongodb').MongoClient

app.get('/api/vocabularies', async (req, res) => {
  try {
    const db = await mongo.connect('mongodb://localhost:27017/wanikani-word-rankings');
    const vocabularies = await db.collection('vocabularies').aggregate([
      { $sort: {
          'tries': -1
        }
      },
      { $limit: 1000 },
    ]).toArray();

    res.json({
      vocabularies,
    })
  }
  catch (error) {
    res.json({ error })
  }
})

app.listen(process.env.JSON_SERVER_PORT, () => {
  console.log(`Example app listening on port ${process.env.JSON_SERVER_PORT}!`)
})
