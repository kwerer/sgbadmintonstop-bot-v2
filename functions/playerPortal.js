import dotenv from "dotenv";
import {
  formatOfGameKeyboard,
  formatOfGameText,
  levelOfPlayKeyboard,
  inputFormatOfPlayText,
  inputLevelOfPlayText,
  inputLocationOfGameText,
  submissionConfirmationText,
  submitGameText,
  inputTimeOfGameText,
  inputFeesText,
  finalConfirmationText,
} from "../promptText.js";

dotenv.config();

// stage 2
export function formatOfGame(bot, role) {
  bot.sendMessage(25262738, formatOfGameText(role), {
    parse_mode: "Markdown",
    reply_markup: {
      keyboard: formatOfGameKeyboard,
      one_time_keyboard: true,
    },
  });
  // change role to player
  return [3, role.toLowerCase()];
}

// stage 3
export function inputFormatOfGame(bot, msg, role) {
  const input = msg.text.toString();
  bot.sendMessage(25262738, inputFormatOfPlayText(role, input), { parse_mode: "Markdown" });
  return [4, input];
}

// stage 4
export function inputLocationOfGame(bot, msg, role) {
  const input = msg.text.toString();
  bot.sendMessage(25262738, inputLocationOfGameText(role, input), {
    parse_mode: "Markdown",
    reply_markup: {
      keyboard: levelOfPlayKeyboard,
      one_time_keyboard: true,
    },
  });
  return [5, input];
}

export function inputLevelOfPlay(bot, msg, role) {
  const input = msg.text.toString();
  let stage = 6;
  if (role.toLowerCase() === "player") {
    // this is the last field for player portal
    stage = 10;
  }
  bot.sendMessage(25262738, inputLevelOfPlayText(role, input), { parse_mode: "Markdown" });
  return [stage, input];
}

export function finalConfirmationPlayer(bot, msg, role, gameFormat, location, levelOfPlay) {
  const input = msg.text.toString();
  bot.sendMessage(
    25262738,
    finalConfirmationText(role, gameFormat, location, levelOfPlay, "time", "fees", input, msg.chat.username),
    {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [[{ text: "Submit!", callback_data: "playersubmit" }]],
      },
    }
  );
  return [11, input];
}

// orgnaiser functions

// time
export function inputTimeOfGame(bot, msg, role) {
  const input = msg.text.toString();
  bot.sendMessage(25262738, inputTimeOfGameText(role, input), { parse_mode: "Markdown" });
  return [7, input];
}
// fees
export function inputFeesOfGame(bot, msg, role) {
  const input = msg.text.toString();
  bot.sendMessage(25262738, inputFeesText(role, input), { parse_mode: "Markdown" });
  return [10, input];
}

// picture
export function inputPictureOfGame(bot, msg, role) {}

export function finalConfirmationOrganiser(bot, msg, role, gameFormat, location, time, contactInformation, levelOfPlay) {
  const input = msg.text.toString();
  bot.sendMessage(
    25262738,
    finalConfirmationText(role, gameFormat, location, levelOfPlay, time, input, contactInformation, msg.chat.username),
    {
      parse_mode: "Markdown",
      reply_markup: { inline_keyboard: [[{ text: "Submit!", callback_data: "organisersubmit" }]] },
    }
  );

  return [11, input, msg.message_id];
}

export function submitGame(bot, query, gameFormat, location, levelOfPlay, time, fees, contactInformation, role) {
  // submit game to channel
  // player
  if (query.data === "playersubmit") {
    bot.sendMessage(
      process.env.TESTING_CHANNEL,
      submitGameText(role, gameFormat, location, levelOfPlay, "no time", "no fees", contactInformation, query.from.username),
      { parse_mode: "Markdown" }
    );
  } // organiser
  else if (query.data == "organisersubmit") {
    bot.sendMessage(
      process.env.TESTING_CHANNEL,
      submitGameText(role, gameFormat, location, levelOfPlay, time, fees, contactInformation, query.from.username),
      { parse_mode: "Markdown" }
    );
  }

  bot.sendMessage(25262738, submissionConfirmationText);
  return 12;
}
