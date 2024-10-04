const { createServer } = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 1245;

const app = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  switch (req.url) {
    case '/':
      res.end('Hello Holberton School!');
      break;

    case '/students': {
      res.write('This is the list of our students\n');

      if (process.argv.length < 3) {
        res.end('Cannot load the database');
        break;
      }

      const path = process.argv[2];
      if (!fs.existsSync(path)) {
        res.end('Cannot load the database');
        break;
      }

      try {
        const data = fs.readFileSync(path, 'utf8');
        const lines = data.split('\n').filter((line) => line.trim() !== '');

        if (lines.length < 2) {
          res.end('Cannot load the database');
          break;
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
      break;
    }

    default:
      res.writeHead(404);
      res.end('Resource not found');
  }
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;
