const { getMiningInfo, getLastBlockHeight } = require("./lib/rpc");

main();

async function main() {
  console.log(await getMiningInfo());
  console.log(await getLastBlockHeight());
}
