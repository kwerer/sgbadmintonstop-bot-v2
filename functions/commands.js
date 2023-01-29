import { startText, helpText } from "../promptText.js";

export function startFunction(bot, msg) {
  bot.sendMessage(25262738, startText, {
    reply_markup: {
      keyboard: [[{ text: "Begin!", callback_data: "start_begin" }]],
    },
  });

  return 1;
}

export function helpFunction(bot, msg) {
  bot.sendMessage(25262738, helpText);
}
