const path = require("path");

const npmPath =
  process.platform === "win32"
    ? "D:\\Programs\\nodejs\\node_modules\\npm\\bin\\npm-cli.js"
    : "npm";

module.exports = {
  apps: [
    {
      name: "phi-server",
      script: npmPath,
      cwd: path.resolve(__dirname, "phi-server"),
      time: true,
      args: "run start",
      watch: path.resolve(__dirname, "phi-server"),
      error_file: "./logs/phi-server-err.log",
      out_file: "./logs/phi-server-out.log",
    },
    {
      name: "phi-dashboard",
      script: npmPath,
      cwd: path.resolve(__dirname, "phi-dashboard"),
      time: true,
      args: "run start",
      error_file: "./logs/phi-dashboard-err.log",
      out_file: "./logs/phi-dashboard-out.log",
    },
    {
      name: "phi-interface",
      script: npmPath,
      cwd: path.resolve(__dirname, "phi-interface"),
      time: true,
      args: "run start",
      error_file: "./logs/phi-interface-err.log",
      out_file: "./logs/phi-interface-out.log",
    },
  ],
};
