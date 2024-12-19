const { getAllRecords, insertRecord, getSpecificRecords, updateRecord, deleteRecord } = require("../utils/sqlFunctions");

// Function to get advice landing data
const getAdviceLanding = async (req, res) => {
  try {
    const records = await getAllRecords('advicelanding'); 
    if (records.length === 0) {
      return res.status(404).json({ error: 'No advice found' });
    }
    res.status(200).json(records); 
  } catch (error) {
    console.error('Error fetching all advice:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to get all questions (askAdviceCardData)
const getAskAdviceCardData = async (req, res) => {
   try {
    const records = await getAllRecords('askadvicecarddata'); 
    if (records.length === 0) {
      return res.status(404).json({ error: 'No data found' });
    }
    res.status(200).json(records); 
  } catch (error) {
    console.error('Error fetching all data:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Questions
const getQuestions = async (req, res) => {
  try {
    const questions = await getAllRecords('askadvicecarddata');
    res.status(200).json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addQuestion = async (req, res) => {
  const { question, userId } = req.body;

  if (!question || !userId) {
    return res.status(400).json({ error: 'Missing required fields: question, or userId' });
  }

  try {
    const result = await insertRecord('askadvicecarddata', { question, userId, type: 'question' });
    const cardId = result.insertId; 

    res.status(201).json({ message: "Question added successfully!", cardId });
  } catch (error) {
    console.error('Error adding question:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const updateQuestion = async (req, res) => {
  const { question, userId } = req.body;
  const { cardId } = req.params;
  console.log("CardId: ", cardId);
  console.log("Question: ", question);
  console.log("UserId: ", userId);

  if (!cardId || !question || !userId) {
    return res.status(400).json({ error: 'Missing required fields: cardId, question, or userId' });
  }

  try {
    const existingRecord = await getSpecificRecords('askadvicecarddata', 'cardId', cardId);
    if (existingRecord.length === 0) {
      return res.status(404).json({ error: 'Question not found' });
    }

    if (existingRecord[0].userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized: You can only update your own questions' });
    }

    await updateRecord('askadvicecarddata', { question }, 'cardId', cardId);
    res.status(200).json({ message: 'Question updated successfully' });
  } catch (error) {
    console.error('Error updating question:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteQuestion = async (req, res) => {
  const { cardId } = req.params;
  const { userId } = req.body;

  if (!cardId || !userId) {
    return res.status(400).json({ error: 'Missing required fields: cardId or userId' });
  }

  try {
    const existingRecord = await getSpecificRecords('askadvicecarddata', 'cardId', cardId);
    if (existingRecord.length === 0) {
      return res.status(404).json({ error: 'Question not found' });
    }

    if (existingRecord[0].userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized: You can only delete your own questions' });
    }

    await deleteRecord('askadvicecarddata', 'cardId', cardId);
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error('Error deleting question:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Comments
// const getComments = async (req, res) => {
//   try {
//     const comments = await getAllRecords('comments');
//     res.status(200).json(comments);
//   } catch (error) {
//     console.error('Error fetching comments:', error.message);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

const addComment = async (req, res) => {
  const { cardId, comment, userId } = req.body;

  if (!cardId || !comment || !userId) {
    return res.status(400).json({ error: 'Missing required fields: cardId, comment, or userId' });
  }

  try {
    await insertRecord('comments', { cardId, comment, userId });
    res.status(201).json({ message: "Comment added successfully!" });
  } catch (error) {
    console.error('Error adding comment:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getCommentsByCardId = async (req, res) => {
  const { cardId } = req.query; 
  console.log('Fetching comments for cardId:', cardId);
  
  if (!cardId) {
    return res.status(400).json({ error: 'Missing cardId parameter' });
  }

  try {
    const comments = await getSpecificRecords('comments', 'cardId', cardId); // Fetch only comments with the same cardId
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateComment = async (req, res) => {
  const { comment, userId } = req.body;
  const { id } = req.params;
  console.log("commentId from params:", id);
  if (!id || !comment || !userId) {
    return res.status(400).json({ error: 'Missing required fields: comment ID, comment, or userId' });
  }

  try {
    const existingRecord = await getSpecificRecords('comments', 'id', id);
    if (existingRecord.length === 0) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (existingRecord[0].userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized: You can only update your own comments' });
    }

    await updateRecord('comments', { comment }, 'id', id);
    res.status(200).json({ message: 'Comment updated successfully' });
  } catch (error) {
    console.error('Error updating comment:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteComment = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  console.log("commentId from params:", id);
  if (!id || !userId) {
    return res.status(400).json({ error: 'Missing required fields: comment ID or userId' });
  }

  try {
    const existingRecord = await getSpecificRecords('comments', 'id', id);
    if (existingRecord.length === 0) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (existingRecord[0].userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized: You can only delete your own comments' });
    }

    await deleteRecord('comments', 'id', id);
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAdviceLanding,
  getAskAdviceCardData,
  getQuestions,
  addQuestion,
  deleteQuestion,
  updateQuestion,
  addComment,
  updateComment,
  deleteComment,
  getCommentsByCardId
};
