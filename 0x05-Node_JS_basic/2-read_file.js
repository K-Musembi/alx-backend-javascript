const fs = require('fs');

function countStudents(path) {
  if (!fs.existsSync(path)) {
    throw new Error('Cannot load the database');
  }

  try {
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.split('\n').filter((line) => line.trim() !== '');

    if (lines.length < 2) {
      throw new Error('Cannot load the database');
    }

    // const headers = lines[0].split(',');
    const students = lines.slice(1);

    console.log(`Number of students: ${students.length}`);
    const fieldArr = {};
    students.forEach((student) => {
      const data = student.split(',');
      const fName = data[0];
      const field = data[data.length - 1];

      if (field && fName) {
        if (!fieldArr[field]) {
          fieldArr[field] = [];
        }
        fieldArr[field].push(fName);
      }
    });

    for (const [field, studentsList] of Object.entries(fieldArr)) {
      console.log(`Number of students in ${field}: ${studentsList.length}. List: ${studentsList.join(', ')}`);
    }
  } catch (error) {
    console.error('Cannot load the database');
  }
}

module.exports = countStudents;
