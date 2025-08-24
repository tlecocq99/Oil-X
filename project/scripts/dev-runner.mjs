import { spawn } from "node:child_process";

const processes = [];

function run(name, cmd, args) {
  const child = spawn(cmd, args, {
    stdio: "inherit",
    shell: true,
    env: process.env,
  });
  processes.push(child);
  child.on("exit", (code) => {
    console.log(`[${name}] exited with code ${code}`);
    // If one process exits non-zero, terminate others
    if (code !== 0) shutdown();
  });
}

function shutdown() {
  for (const p of processes) {
    if (!p.killed) {
      if (process.platform === "win32") {
        spawn("taskkill", ["/PID", p.pid, "/T", "/F"]);
      } else {
        p.kill("SIGTERM");
      }
    }
  }
}

process.on("SIGINT", () => {
  console.log("\nCaught SIGINT, shutting down...");
  shutdown();
  process.exit(0);
});
process.on("SIGTERM", () => {
  console.log("Caught SIGTERM, shutting down...");
  shutdown();
  process.exit(0);
});

run("backend", "npm", ["run", "backend"]);
run("frontend", "npm", ["run", "dev"]);
