const util = require("util");
const exec = util.promisify(require("child_process").exec);
const fs = require("fs");
const os = require("os");
const path = require("path"); // Import the 'path' module

const EXE = path.join(__dirname, "yara", "yara64.exe"); // Use path.join to create the correct file path
const RULE = path.join(__dirname, "yara", "rule.yar"); // Use path.join to create the correct file path

//output from the yara scan:
/*
stdout: AsciiExample C:\Users\Bruker\AppData\Local\Temp\tempfile.txt
0xfad:$ascii_string: Creative
0xfee:$ascii_string: Creative
0x105a:$ascii_string: Creative
0x19ad:$ascii_string: Creative
0x229e:$ascii_string: Creative
0x2b20:$ascii_string: Creative
0x2b95:$ascii_string: Creative
0x2bcb:$ascii_string: Creative
0x2c1b:$ascii_string: Creative
0x2fb0:$ascii_string: Creative
0x3222:$ascii_string: Creative
0x3a8f:$ascii_string: Creative
0x3adf:$ascii_string: Creative
0x3bb5:$ascii_string: Creative
0x4395:$ascii_string: Creative
0x43a9:$ascii_string: Creative
*/

export const yaraScan = async (textToTest: string): outputYara => {
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

    let output = "";
    output += stdout;
    console.error("stderr:", stderr);

    // Remove the temp file
    fs.unlinkSync(tempFileName);
    console.log("stdout: ", output);
    return {
      rule: "AsciiExample",
      found: output.length > 0 ? true : false,
      meta: {
        description: "test",
        author: "test",
      },
      output: output,
    };
  }

  const output = await run();
  return output;
};
