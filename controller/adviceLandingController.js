const {  getAllRecords, insertRecord } = require("../utils/sqlFunctions");

const getAdviceLanding = async (req, res) => {
  try {
    const records = await getAllRecords('adviceLanding'); 
    if (records.length === 0) {
      return res.status(404).json({ error: 'No advice found' });
    }
    res.status(200).json(records); 
  } catch (error) {
    console.error('Error fetching all advice:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const getAskAdviceCardData = async (req, res) => {
   try {
    const records = await getAllRecords('askAdviceCardData'); 
    if (records.length === 0) {
      return res.status(404).json({ error: 'No data found' });
    }
    res.status(200).json(records); 
  } catch (error) {
    console.error('Error fetching all data:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// const addQuestion = async (req, res) => {
//   console.log(req.body);
//   const { cardId, question, userId } = req.body;

//   if (!cardId || !question || !userId) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   try {
//     await insertRecord('askadvicecarddata', req.body);
//     res.status(201).json({ message: "Skill post successful!" });
//   } catch (error) {
//     console.error('Database connection error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

module.exports = { getAdviceLanding, getAskAdviceCardData };
