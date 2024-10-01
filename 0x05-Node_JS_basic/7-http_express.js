const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const port = 1245;

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  res.write('This is the list of our students\n');

  const content = [];

  if (process.argv.length < 3) {
    res.end('Cannot load the database');
  }

  const path = process.argv[2];

  if (!fs.existsSync(path)) {
    res.end('Cannot load the database');
  }

  fs.createReadStream(path)
    .pipe(csv())
    .on('data', (data) => content.push(data))
    .on('error', () => {
      res.end('Cannot load the database');
    })
    .on('end', () => {
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
    });
});

app.listen(port);

module.exports = app;
