const skillSchema = `
  CREATE TABLE IF NOT EXISTS skills (
    skillId INT AUTO_INCREMENT PRIMARY KEY,
    skill VARCHAR(255) NOT NULL,
    details TEXT,
    userId VARCHAR(255) NOT NULL -- Foreign key to associate skills with users
  )
`;

module.exports = skillSchema;
