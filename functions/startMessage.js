import { chooseRoleText } from "../promptText.js";

export function chooseRole(bot, msg) {
  bot.sendMessage(process.env.LOCAL_BOT_CHAT_ID, chooseRoleText, {
    reply_markup: {
      keyboard: [
        [
          { text: "Organiser", callback_data: "Organiser" },
          { text: "Player", callback_data: "Player" },
        ],
      ],
    },
  });
  return 2;
}
