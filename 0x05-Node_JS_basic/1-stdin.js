process.stdout.write('Welcome to Holberton School, what is your name?\n');

process.stdin.on('data', (input) => {
  const userName = input.toString().trim();
  process.stdout.write(`Your name is: ${userName}\n`);
  process.exit();
});

process.on('exit', () => {
  process.stdout.write('This important software is now closing\n');
});
