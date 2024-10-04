const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(path)) {
      reject(new Error('Cannot load the database'));
      return;
    }

    try {
      const data = fs.readFileSync(path, 'utf8');
      const lines = data.split('\n').filter((line) => line.trim() !== '');

      if (lines.length < 2) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const content = [];
      const headers = lines[0].split(',');

      for (let i = 1; i < lines.length; i += 1) {
        const fields = lines[i].split(',');
        if (fields.length === headers.length) {
          const student = {};
          for (let j = 0; j < headers.length; j += 1) {
            student[headers[j].trim()] = fields[j].trim();
          }
          content.push(student);
        }
      }

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

      resolve();
    } catch (error) {
      reject(new Error('Cannot load the database'));
    }
  });
}

module.exports = countStudents;
