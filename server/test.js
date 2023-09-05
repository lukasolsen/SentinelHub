const util = require("util");
const exec = util.promisify(require("child_process").exec);
const fs = require("fs");
const os = require("os");

const emailContent = `
  Hello world! My name is John Doe and my email is
`;

const tempFileName = `${os.tmpdir()}/tempfile.txt`;
//maek it temp
fs.writeFileSync(tempFileName, emailContent);

async function lsExample() {
  const { stdout, stderr } = await exec(
    "yara64.exe rule.yar -s " + tempFileName
  );
  console.log("stdout:", stdout);
  console.error("stderr:", stderr);

  //remove temp file
  fs.unlinkSync(tempFileName);
}
lsExample();
