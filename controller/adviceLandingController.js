const { getAllRecords, insertRecord, getSpecificRecords, updateRecord, deleteRecord } = require("../utils/sqlFunctions");

// Function to get advice landing data
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

// Function to get all questions (askAdviceCardData)
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

// Function to add a question
const addQuestion = async (req, res) => {
  const { cardId, question, userId } = req.body;

  if (!cardId || !question || !userId) {
    return res.status(400).json({ error: 'Missing required fields: cardId, question, or userId' });
  }

  try {
    await insertRecord('askadvicecarddata', { cardId, question, userId });
    res.status(201).json({ message: "Question added successfully!" });
  } catch (error) {
    console.error('Error inserting question:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to delete a question
const deleteQuestion = async (req, res) => {
  const { id } = req.params; 
  const { userId } = req.body;

  if (!id || !userId) {
    return res.status(400).json({ error: 'Missing required fields: question ID or userId' });
  }

  try {
    const existingRecord = await getSpecificRecords('askadvicecarddata', 'id', id);
    if (existingRecord.length === 0) {
      return res.status(404).json({ error: 'Question not found' });
    }

    if (existingRecord[0].userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized: You can only delete your own questions' });
    }

    await deleteRecord('askadvicecarddata', 'id', id);
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error('Error deleting question:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to update a question
const updateQuestion = async (req, res) => {
  const { question, userId } = req.body;
  const { id } = req.params; // Question ID from the URL params

  if (!id || !question || !userId) {
    return res.status(400).json({ error: 'Missing required fields: question ID, question, or userId' });
  }

  try {
    const existingRecord = await getSpecificRecords('askadvicecarddata', 'id', id);
    if (existingRecord.length === 0) {
      return res.status(404).json({ error: 'Question not found' });
    }

    // Ensure the user can only update their own question
    if (existingRecord[0].userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized: You can only update your own questions' });
    }

    const updates = { question };
    await updateRecord('askadvicecarddata', updates, 'id', id);

    res.status(200).json({ message: 'Question updated successfully' });
  } catch (error) {
    console.error('Error updating question:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ========== Comment Functions ==========

// Function to add a comment
const addComment = async (req, res) => {
  const { cardId, comment, userId } = req.body;

  if (!cardId || !comment || !userId) {
    return res.status(400).json({ error: 'Missing required fields: cardId, comment, or userId' });
  }

  try {
    await insertRecord('askadvicecarddata', { cardId, comment, userId, type: 'comment' });
    res.status(201).json({ message: "Comment added successfully!" });
  } catch (error) {
    console.error('Error adding comment:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to update a comment
const updateComment = async (req, res) => {
  const { comment, userId } = req.body;
  const { id } = req.params; 

  if (!id || !comment || !userId) {
    return res.status(400).json({ error: 'Missing required fields: comment ID, comment, or userId' });
  }

  try {
    const existingRecord = await getSpecificRecords('askadvicecarddata', 'id', id);
    if (existingRecord.length === 0) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (existingRecord[0].userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized: You can only update your own comments' });
    }

    const updates = { comment };
    await updateRecord('askadvicecarddata', updates, 'id', id);

    res.status(200).json({ message: 'Comment updated successfully' });
  } catch (error) {
    console.error('Error updating comment:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to delete a comment
const deleteComment = async (req, res) => {
  const { id } = req.params; 
  const { userId } = req.body;

  if (!id || !userId) {
    return res.status(400).json({ error: 'Missing required fields: comment ID or userId' });
  }

  try {
    const existingRecord = await getSpecificRecords('askadvicecarddata', 'id', id);
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

// Function to get all comments for a specific cardId
const getComments = async (req, res) => {
  const { cardId } = req.query;

  if (!cardId) {
    return res.status(400).json({ error: 'Missing required field: cardId' });
  }

  try {
    const records = await getSpecificRecords('askadvicecarddata', 'cardId', cardId);
    if (records.length === 0) {
      return res.status(404).json({ error: 'No comments found' });
    }
    res.status(200).json(records); 
  } catch (error) {
    console.error('Error fetching comments:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAdviceLanding,
  getAskAdviceCardData,
  addQuestion,
  deleteQuestion,
  updateQuestion,
  addComment,
  updateComment,
  deleteComment,
  getComments
};
