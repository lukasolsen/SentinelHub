const util = require("util");
const exec = util.promisify(require("child_process").exec);
const fs = require("fs");
const os = require("os");
const path = require("path"); // Import the 'path' module

const EXE = path.join(__dirname, "yara", "yara64.exe"); // Use path.join to create the correct file path
const RULE = path.join(__dirname, "yara", "rule.yar"); // Use path.join to create the correct file path

export const yaraScan = (textToTest: string) => {
  // Make a temp file
  const tempFileName = path.join(os.tmpdir(), "tempfile.txt"); // Use path.join to create the correct file path

  // Write textToTest to the temp file
  fs.writeFileSync(tempFileName, textToTest);

  async function run() {
    // Use the shell explicitly to execute the command
    const { stdout, stderr } = await exec(
      `"${EXE}" "${RULE}" -s "${tempFileName}"`,
      { shell: "cmd" }
    );

    console.log("stdout:", stdout);
    console.error("stderr:", stderr);

    // Remove the temp file
    fs.unlinkSync(tempFileName);
    return stdout;
  }

  run();
};
