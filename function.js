import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import { startFunction, helpFunction } from "./commands.js";
import { chooseRole } from "./startMessage.js";
import {
  finalConfirmationPlayer,
  formatOfGame,
  inputFormatOfGame,
  inputLocationOfGame,
  inputLevelOfPlay,
  submitGame,
  inputTimeOfGame,
  inputFeesOfGame,
  finalConfirmationOrganiser,
  inputPictureOfGame,
} from "./playerPortal.js";
import { errorMessage, submitOnce } from "./promptText.js";

dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true,
});

// determines the stage at which the user is at,
// x.1 values = waiting for user text input
var stage = 0;
let role;
// variables to be saved
let gameFormat;
let location;
let levelOfPlay;
let contactInformation;
let time;
let fees;
let messageId;

// bot commands [start, help]

// returns "begin"
bot.onText(/\/start/, (msg) => {
  // increment stage
  stage = startFunction(bot, msg);
  console.log(msg.chat.id, "chat id");
  console.log(msg.chat.id, "chat id");
});

// sends a message - helpText
bot.onText(/\/help/, (msg) => {
  helpFunction(bot, msg);
});

// check for specific message
bot.on("message", (msg) => {
  // list of options for each question
  const formatOptions = [
    "Men's Singles",
    "Women's Singles",
    "Mixed's Singles",
    "Men's Doubles",
    "Women's Doubles",
    "Mixed's Doubles",
    "Men's Singles/Doubles",
    "Women's Singles/Doubles",
    "Mixed's Singles/Doubles",
  ];

  const levelOptions = ["Beginner", "Intermediate", "Advanced", "Professional :)"];

  // return if bot command is entered
  if (msg.text.toString().toLowerCase() === "/start" || msg.text.toString().toLowerCase() === "/help") {
    return;
  }

  if (msg.text.toString().toLowerCase() === "begin!" && stage === 1) {
    stage = chooseRole(bot, msg);
  }
  // ---------------------------------------------------------------------------
  // oragniser logic
  else if (msg.text.toString().toLowerCase() === "organiser" && stage === 2) {
    [stage, role] = formatOfGame(bot, msg, "Organiser");
  }

  // 1. receive input for format of play
  // 2. ask use for location
  else if (role === "organiser" && stage == 3 && formatOptions.includes(msg.text.toString())) {
    [stage, gameFormat] = inputFormatOfGame(bot, msg, "Organiser");
  } else if (role === "organiser" && stage === 4) {
    [stage, location] = inputLocationOfGame(bot, msg, "Organiser");
  } else if (role === "organiser" && stage === 5 && levelOptions.includes(msg.text.toString())) {
    [stage, levelOfPlay] = inputLevelOfPlay(bot, msg, "Organiser");
  } else if (role === "organiser" && stage === 6) {
    [stage, contactInformation] = inputTimeOfGame(bot, msg, "Organiser");
  } else if (role === "organiser" && stage === 7) {
    [stage, time] = inputFeesOfGame(bot, msg, "Organiser");
  } else if (role === "organiser" && stage === 8) {
    [stage, time] = inputPictureOfGame(bot, msg, "Organiser");
  } else if (role === "organiser" && stage === 10) {
    [stage, fees, messageId] = finalConfirmationOrganiser(
      bot,
      msg,
      role,
      gameFormat,
      location,
      time,
      contactInformation,
      levelOfPlay
    );
  }

  // ---------------------------------------------------------------------------

  // ---------------------------------------------------------------------------
  // player logic
  else if (msg.text.toString().toLowerCase() === "player" && stage === 2) {
    // assign role to player
    [stage, role] = formatOfGame(bot, msg, "Player");
  }

  // 1. receive input for format of play
  // 2. ask user for location
  else if (role === "player" && stage === 3 && formatOptions.includes(msg.text.toString())) {
    [stage, gameFormat] = inputFormatOfGame(bot, msg, "Player");
  }

  // 1. receive input for location
  // 2. ask user for level of play
  else if (role === "player" && stage === 4) {
    [stage, location] = inputLocationOfGame(bot, msg, "Player");
  }

  // 1. receive input for level of play
  // 2. ask for contact information
  else if (role === "player" && stage === 5 && levelOptions.includes(msg.text.toString())) {
    [stage, levelOfPlay] = inputLevelOfPlay(bot, msg, "Player");
  }

  // 1. receive contact information
  // 2. check for all correct information
  else if (role === "player" && stage === 10) {
    [stage, contactInformation] = finalConfirmationPlayer(bot, msg, role, gameFormat, location, levelOfPlay);
  }

  // ---------------------------------------------------------------------------
  else {
    bot.sendMessage(msg.chat.id, errorMessage);
  }
});

// handles bot actions for inline keyboard
bot.on("callback_query", (query) => {
  console.log(query.message.chat.id, "chat id");
  // check that stage is 11, stage would be 12 if game is submitted
  if (query.data === "playersubmit" && stage === 11) {
    console.log("player submit");
    stage = submitGame(
      bot,
      query.message.chat.id,
      query,
      gameFormat,
      location,
      levelOfPlay,
      "no time",
      "no fees",
      contactInformation,
      "Player"
    );
  } else if (query.data === "organisersubmit" && stage === 11) {
    stage = submitGame(
      bot,
      query.message.chat.id,
      query,
      gameFormat,
      location,
      levelOfPlay,
      time,
      fees,
      contactInformation,
      "Organiser"
    );
  } else {
    console.log("else");
    bot.sendMessage(query.message.chat.id, submitOnce);
  }
});

bot.setWebHook(
  `https://${process.env.GOOGLE_CLOUD_REGION}-${process.env.GOOGLE_CLOUD_PROJECT_ID}.cloudfunctions.net/${process.env.FUNCTION_TARGET}` //FUNCTION_TARGET is reserved Google Cloud Env
);

export const telegramBotWebhook = (req, res) => {
  bot.handleUpdate(req.body, res);
};
