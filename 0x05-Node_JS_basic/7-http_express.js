const express = require('express');
const fs = require('fs');

const app = express();
const port = 1245;

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  res.write('This is the list of our students\n');

  if (process.argv.length < 3) {
    res.end('Cannot load the database');
    return;
  }

  const path = process.argv[2];

  if (!fs.existsSync(path)) {
    res.end('Cannot load the database');
    return;
  }

  try {
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.split('\n').filter((line) => line.trim() !== '');

    if (lines.length < 2) {
      res.end('Cannot load the database');
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

    res.write(`Number of students: ${content.length}\n`);

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

    res.write(`Number of students in CS: ${csCount}. List: ${csfirstNames.join(', ')}\n`);
    res.write(`Number of students in SWE: ${sweCount}. List: ${swefirstNames.join(', ')}`);
    res.end();
  } catch (error) {
    res.end('Cannot load the database');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
