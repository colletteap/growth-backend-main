const { getAllRecords} = require("../utils/sqlFunctions");

const getBlogLanding = async (req, res) => {
  try {
    const records = await getAllRecords('blogLanding'); 
    if (records.length === 0) {
      return res.status(404).json({ error: 'No blogs found' });
    }
    res.status(200).json(records); 
  } catch (error) {
    console.error('Error fetching all blogs:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getBlogPageData = async (req, res) => {
  try {
    const records = await getAllRecords('blogPageData'); 
    if (records.length === 0) {
      return res.status(404).json({ error: 'No blogs found' });
    }
    res.status(200).json(records); 
  } catch (error) {
    console.error('Error fetching all blogs:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
  
  const getUrls = async (req, res) => {
    try {
      const records = await getAllRecords('urls'); 
      if (records.length === 0) {
        return res.status(404).json({ error: 'No urls found' });
      }
      res.status(200).json(records); 
    } catch (error) {
      console.error('Error fetching all urls:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
module.exports = { getBlogLanding, getBlogPageData, getUrls };
