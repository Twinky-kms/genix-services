const config = require("../config/config.json");
const axios = require("axios");

/**
 * Because bitcoind-rpc is junk, this is how you make an rpc request to bitcoind
 * @param {string} command
 * @param  {...any} args
 */
async function getRpc(command, ...args) {
  const { protocol, user, pass, host, port } = config.rpc;
  const url = `${protocol}://${user}:${pass}@${host}:${port}`;

  const request = {
    jsonrpc: "1.0",
    method: command,
    params: [...args]
  };

  const { data } = await axios.post(url, request);

  return data.result;
}

/**
 * Get the median time of a block asynchronously
 * @param {int} blockHeight
 */
async function getMediantime(blockHeight) {
  const { mediantime } = await getBlock(blockHeight);
  return mediantime;
}

/**
 * Get the forge time of a block asynchronously
 * @param {int} blockHeight
 */
async function getTime(blockHeight) {
  const { time } = await getBlock(blockHeight);
  return time;
}

/**
 * Get the block information using the height
 * @param {int} blockHeight
 */
async function getBlock(blockHeight) {
  const blockhash = await getRpc("getblockhash", blockHeight);
  const result = await getRpc("getblock", blockhash);

  return result;
}

/**
 * Get the current mining info
 */
async function getMiningInfo() {
  const result = getRpc("getmininginfo");
  return result;
}

module.exports = { getMiningInfo, getMediantime, getTime, getBlock, getRpc };
