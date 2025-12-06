import { spawn } from "child_process";

function exec(command, args, options = {}) {
  return spawn(command, args, { stdio: "inherit", ...options });
}

// Sobe os serviços
const up = exec("docker", ["compose", "-f", "infra/compose.yaml", "up", "-d"]);

up.on("close", () => {
  // Após subir, inicia o Next
  const next = exec("next", ["dev"]);

  // Quando ocorrer CTRL + C
  const cleanup = () => {
    console.log("\nEncerrando serviços Docker...");
    exec("docker", ["compose", "-f", "infra/compose.yaml", "down"]).on(
      "close",
      () => {
        process.exit();
      }
    );
  };

  process.on("SIGINT", cleanup); // CTRL + C
  process.on("SIGTERM", cleanup); // kill etc.
});
