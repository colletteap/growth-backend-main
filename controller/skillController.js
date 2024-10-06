const {  insertRecord, getRecord, getAllRecords, getSpecificRecords
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

module.exports = { getSkills, skillSearch, skillInfo, addSkillPost };
