const { exec } = require('child_process');
const path = require('path');

const serverProcess = exec('npm run start', { cwd: path.resolve(__dirname, 'server') });

serverProcess.stdout.on('data', (data) => {
  console.log(data);
});

serverProcess.stderr.on('data', (data) => {
  console.error(data);
});

serverProcess.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});

process.on('SIGINT', () => {
  console.log('Stopping the server...');

  // Ejecutar el comando para deshacer los seeders
  exec('npx sequelize-cli db:seed:undo:all', { cwd: path.resolve(__dirname, 'server') }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing undo seeders: ${error}`);
      return;
    }
    console.log(stdout);
    console.error(stderr);

    // Terminar el proceso del servidor
    serverProcess.kill();
    process.exit();
  });
});
