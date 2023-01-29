import { chooseRoleText } from "../promptText.js";

export function chooseRole(bot, msg) {
  bot.sendMessage(25262738, chooseRoleText, {
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
