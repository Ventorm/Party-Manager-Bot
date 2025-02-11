const { default: axios } = require("axios");
const { bot_url } = require("../../config");

class pollsAPI {
  //get all polls for checking poll's answers
  async getAll() {
    const receivedGet = await axios.get(`${bot_url}/polls`);
    return receivedGet;
  }

  //get poll's message_id for mailing
  async get(order_id) {
    const receivedGet = await axios.get(
      `${bot_url}/polls/${order_id}`
    );
    return receivedGet;
  }

  //set poll_id and message_id = NULL for All polls
  async updateAll() {
    const receivedPut = await axios.put(`${bot_url}/polls`);
    return receivedPut;
  }

  //set current poll_id and message_id after creating
  async update(order_id, poll_id, message_id) {
    const receivedPut = await axios.put(
      `${bot_url}/polls/${order_id}`,
      {
        poll_id,
        message_id,
      }
    );
    return receivedPut;
  }
}

module.exports = new pollsAPI();
