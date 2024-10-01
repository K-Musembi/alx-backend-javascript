const { createServer } = require('http');
const fs = require('fs');
const csv = require('csv-parser');
// const path = require('./database.csv');

const hostname = '127.0.0.1';
const port = 1245;

const app = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  // res.end('Hello Holberton School!');
  switch (req.url) {
    case '/':
      res.end('Hello Holberton School!');
      break;
    case '/students':
    {
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
      break;
    }
    default:
      res.writeHead(404);
  }
});

app.listen(port, hostname);

module.exports = app;
