const db = require("../db_pool");

class Player_voteController {
  async getAllPlayer_vote(req, res) {
    const player_vote = await db.query(
      `select * FROM player_vote WHERE filled_all_polls = true`
    );

    return res.json(player_vote.rows);
  }

  async getPlayer_vote(req, res) {
    const player_id = req.params.id;
    const player_vote = await db.query(
      `select * FROM player_vote WHERE player_id = ${player_id}`
    );

    return res.json(player_vote.rows[0]);
  }

  async updatePlayer_vote(req, res) {
    const player_id = req.params.id;
    const {
      filled_all_polls,
      ready_to_play,
      polls_sent,
      full_result_message_id,
      personal_result_message_id,
    } = req.body;

    let multiQuery = "";
    if (filled_all_polls === true) {
      multiQuery += `Update player_vote SET filled_all_polls = true WHERE player_id = ${player_id};`;
    }
    if (typeof ready_to_play === `boolean`) {
      multiQuery += `Update player_vote SET ready_to_play = ${ready_to_play} WHERE player_id = ${player_id};`;
    }
    if (typeof polls_sent === `number`) {
      multiQuery += `Update player_vote SET polls_sent = ${polls_sent} WHERE player_id = ${player_id};`;
    }
    if (
      typeof full_result_message_id === `number` ||
      full_result_message_id === null
    ) {
      multiQuery += `Update player_vote SET full_result_message_id = ${full_result_message_id} WHERE player_id = ${player_id};`;
    }
    if (
      typeof personal_result_message_id === `number` ||
      personal_result_message_id === null
    ) {
      multiQuery += `Update player_vote SET personal_result_message_id = ${personal_result_message_id} WHERE player_id = ${player_id};`;
    }

    const player_vote = await db.query(multiQuery);

    return res.json(player_vote.rows);
  }

  async createPlayer_vote(req, res) {
    const { player_id } = req.body;
    const player_vote = await db.query(
      `INSERT into player_vote (player_id, polls_sent, filled_all_polls) VALUES ($1, $2, $3)`,
      [player_id, 1, false]
    );

    return res.json(player_vote.rows[0]);
  }

  async deleteAllPlayer_vote(req, res) {
    const player_vote = await db.query(`delete FROM player_vote`);

    return res.json(player_vote.rows);
  }
}

module.exports = new Player_voteController();
