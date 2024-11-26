const { exec } = require("child_process");
const path = require("path");

// Verificar si NODE_ENV está configurado y si es "production"
const isProduction = process.env.NODE_ENV === "production";

// Iniciar el servidor
const serverProcess = exec("npm run start", {
  cwd: path.resolve(__dirname, "server"),
});

serverProcess.stdout.on("data", (data) => {
  console.log(data);
});

serverProcess.stderr.on("data", (data) => {
  console.error(data);
});

serverProcess.on("close", (code) => {
  console.log(`Server process exited with code ${code}`);
});

console.log(`Running in ${isProduction ? "production" : "development"} mode`);

// Solo manejar SIGINT y ejecutar undo seeders si no estamos en producción
if (!isProduction) {
  process.on("SIGINT", () => {
    console.log("Stopping the server...");

    // Ejecutar el comando para deshacer los seeders
    exec(
      "npx sequelize-cli db:seed:undo:all",
      { cwd: path.resolve(__dirname, "server") },
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing undo seeders: ${error}`);
          return;
        }
        console.log(stdout);
        console.error(stderr);

        // Terminar el proceso del servidor
        serverProcess.kill();
        process.exit();
      }
    );
  });
} else {
  console.log("Running in production mode, skipping seed undo operation.");
}
