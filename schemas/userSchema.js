const userSchema = `
  CREATE TABLE IF NOT EXISTS users (
      userId VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255),
      firstName VARCHAR(255),
      username VARCHAR (255),
      title VARCHAR (255),
      bio TEXT,
      yearsExperience VARCHAR (255),
      education TEXT,
      contactInfo VARCHAR (255),
      favBooks TEXT,
      profilePicture VARCHAR (255)
  )
`;

module.exports = userSchema;
