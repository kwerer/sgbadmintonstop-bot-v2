import dotenv from "dotenv";
import { formatOfGameKeyboard, formatOfGameText } from "../promptText.js";

// stage 2
export function organiserFormatOfGame(bot, msg) {
  bot.sendMessage(process.env.LOCAL_BOT_CHAT_ID, formatOfGameText("Organiser"), {
    parse_mode: "Markdown",
    reply_markup: {
      keyboard: formatOfGameKeyboard,
      one_time_keyboard: true,
    },
  });
  // change role to player
  return [3, "organiser"];
}

// stage 3
export function organiserInputFormatOfGame(bot, msg) {
  const input = msg.text.toString();
  bot.sendMessage(process.env.LOCAL_BOT_CHAT_ID, inputFormatOfPlayText("Organiser"), {
    parse_mode: "Markdown",
    reply_markup: {
      keyboard: formatOfGameKeyboard,
      one_time_keyboard: true,
    },
  });
  return [4, input];
}

// stage 4
export function playerInputLocationOfGame(bot, msg) {
  const input = msg.text.toString();
  bot.sendMessage(process.env.LOCAL_BOT_CHAT_ID, inputLocationOfGameText("Player", input), {
    parse_mode: "Markdown",
    reply_markup: {
      keyboard: levelOfPlayKeyboard,
      one_time_keyboard: true,
    },
  });
  return [5, input];
}
