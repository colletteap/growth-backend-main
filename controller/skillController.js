const {  insertRecord, updateRecord, getAllRecords, getSpecificRecords, deleteRecord
} = require("../utils/sqlFunctions");

const getSkills = async (req, res) => {
  try {
    const records = await getAllRecords('skills'); 
    if (records.length === 0) {
      return res.status(404).json({ error: 'No skills found' });
    }
    res.status(200).json(records); 
  } catch (error) {
    console.error('Error fetching all skills:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const skillSearch = async (req, res) => {
  try {
    const records = await getAllRecords('skillsSearch'); 
    if (records.length === 0) {
      return res.status(404).json({ error: 'No skills found' });
    }
    res.status(200).json(records); 
  } catch (error) {
    console.error('Error fetching all skills:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const skillInfo = async (req, res) => {
  const { skill } = req.query;

  if (!skill) {
    return res.status(400).json({ error: 'Skill query parameter is missing' });
  }

  try {
    const records = await getSpecificRecords('skillInfo', 'skill', skill); 
    if (records.length === 0) {
      return res.status(404).json({ error: 'No skills found' });
    }

    res.status(200).json(records); 
  } catch (error) {
    console.error('Error fetching skill info:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Add a new skill post (storing in details field and logging userId)
const addSkillPost = async (req, res) => {
  console.log(req.body);
  const { skill, details, userId } = req.body;

  if (!skill || !details || !userId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await insertRecord('skillInfo', req.body);
    res.status(201).json({ message: "Skill post successful!" });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateSkillInfo = async (req, res) => {
  const { details, userId } = req.body;
  const skillId = req.params.id; 

  if (!skillId || !details || !userId) {
    return res.status(400).json({ error: 'Missing required fields: skillId, details, or userId' });
  }

  try {
        const existingRecord = await getSpecificRecords('skillInfo', 'id', skillId);
    
    if (existingRecord.length === 0) {
      return res.status(404).json({ error: 'Skill not found' });
    }

        if (existingRecord[0].userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized: You can only update your own posts' });
    }

    const updates = { details };
    await updateRecord('skillInfo', updates, 'id', skillId);

    res.status(200).json({ message: 'Skill updated successfully' });
  } catch (error) {
    console.error('Error updating skill:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const deleteSkillPost = async (req, res) => {
  const skillId = req.params.id; 
  const { userId } = req.body;

  if (!skillId || !userId) {
    return res.status(400).json({ error: 'Missing required fields: skillId or userId' });
  }

  try {
       const existingRecord = await getSpecificRecords('skillInfo', 'id', skillId);
    if (existingRecord.length === 0) {
      return res.status(404).json({ error: 'Skill post not found' });
    }

    if (existingRecord[0].userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized: You can only delete your own posts' });
    }

    await deleteRecord('skillInfo', 'id', skillId);

    res.status(200).json({ message: 'Skill post deleted successfully' });
  } catch (error) {
    console.error('Error deleting skill post:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { getSkills, skillSearch, skillInfo, addSkillPost, updateSkillInfo, deleteSkillPost };
