const adviceSchema = `
 CREATE TABLE IF NOT EXISTS askadvicecarddata (
    type VARCHAR(255) NOT NULL,
    question TEXT NOT NULL,
    userId VARCHAR(255),
    cardId INT NOT NULL PRIMARY KEY AUTO_INCREMENT
  );
`;

module.exports = adviceSchema;