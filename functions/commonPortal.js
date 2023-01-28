import { formatOfGameText } from "../promptText.js";

export function formatOfGame(bot, msg) {
  bot.sendMessage(process.env.LOCAL_BOT_CHAT_ID, formatOfGameText, {
    reply_markup: {
      keyboard: [
        [
          [
            { text: "Men's Singles", callback_data: "mens_singles" },
            { text: "Men's Doubles", callback_data: "mens_doubles" },
            { text: "Men's Singles/Doubles", callback_data: "mens_singles/doubles" },
          ],
          [
            { text: "Women's Singles", callback_data: "womens_singles" },
            { text: "Women's Doubles", callback_data: "womens_doubles" },
            { text: "Women's Singles/Doubles", callback_data: "womens_singles/doubles" },
          ],
          [
            { text: "Mixed's Singles", callback_data: "mixeds_singles" },
            { text: "Mixed's Doubles", callback_data: "mixeds_doubles" },
            { text: "Mixed's Singles/Doubles", callback_data: "mixeds_singles/doubles" },
          ],
        ],
      ],
    },
  });
  return 3;
}
