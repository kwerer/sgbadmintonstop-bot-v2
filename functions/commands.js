import { startText, helpText } from "../promptText.js";

export function startFunction(bot, msg) {
  bot.sendMessage(process.env.LOCAL_BOT_CHAT_ID, startText, {
    reply_markup: {
      keyboard: [[{ text: "Begin!", callback_data: "start_begin" }]],
    },
  });
  const keyboard = { reply_markup: { inline_keyboard: [[{ text: "rt", callback_data: "rt" }]] } };

  return 1;
}

export function helpFunction(bot, msg) {
  bot.sendMessage(process.env.LOCAL_BOT_CHAT_ID, helpText);
}
