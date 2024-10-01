const fs = require('fs');
const csv = require('csv-parser');

function countStudents(path) {
  const content = [];

  if (!fs.existsSync(path)) {
    throw new Error('Cannot load the database');
  }

  fs.createReadStream(path)
    .pipe(csv())
    .on('data', (data) => content.push(data))
    .on('error', () => {
      throw new Error('Cannot load the database');
    })
    .on('end', () => {
      console.log(`Number of students: ${content.length}`);

      const csfirstNames = [];
      let csCount = 0;
      const swefirstNames = [];
      let sweCount = 0;

      for (const student of content) {
        if (student.field === 'CS') {
          csCount += 1;
          csfirstNames.push(student.firstname);
        } else if (student.field === 'SWE') {
          sweCount += 1;
          swefirstNames.push(student.firstname);
        }
      }

      console.log(`Number of students in CS: ${csCount}. List: ${csfirstNames.join(', ')}`);
      console.log(`Number of students in SWE: ${sweCount}. List: ${swefirstNames.join(', ')}`);
    });
}

module.exports = countStudents;
