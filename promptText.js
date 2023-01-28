// commands
export const startText = "Click begin to start playing badminton!";

export const helpText =
  "Hi there and welcome to SG Badminton Stop!\n\nHere, we aim to provide players with more oppotunities to play with other players\n\nIf you are looking to like-minded badminton enthusiast, you have came to the right place!\n\nTo start, press the menu on the bottom left and click on /start (type /start + enter if you are on PC), answer a few basic questions and you will be able to post your games onto SG Badminton Stop channel for other players to reach out to you!\n\nIf you require any assistance, feel free to contact me at @josephlailai\n\nHave fun and stay safe!";

// choose role
export const chooseRoleText = "I am a...";

// choose format of game
export function formatOfGameText(role) {
  return `*${role} Portal*\n\nChoose which format you would like to play\n\nUse these options as a guideline!`;
}
export const formatOfGameKeyboard = [
  [
    { text: "Men's Singles", callback_data: "mens_singles" },
    { text: "Women's Singles", callback_data: "womens_singles" },
    { text: "Mixed's Singles", callback_data: "mixeds_singles" },
  ],
  [
    { text: "Men's Doubles", callback_data: "mens_doubles" },
    { text: "Women's Doubles", callback_data: "womens_doubles" },
    { text: "Mixed's Doubles", callback_data: "mixeds_doubles" },
  ],
  [
    { text: "Men's Singles/Doubles", callback_data: "mens_singles/doubles" },
    { text: "Women's Singles/Doubles", callback_data: "womens_singles/doubles" },
    { text: "Mixed's Singles/Doubles", callback_data: "mixeds_singles/doubles" },
  ],
];

export function inputFormatOfPlayText(role, gameFormat) {
  return `*${role} Portal*\n\nFormat of Play: _${gameFormat}_\n\n${locationOfGameText}`;
}

// location
export const locationOfGameText =
  "Where would you like to play?\n\ne.g HeartBeat@Bedok sports hall\n\nIf you do not have have a specific venue, give a rough location\ne.g North side preferred\n\nSend a message to the bot to enter!";

export function inputLocationOfGameText(role, location) {
  return `*${role} Portal*\n\Location of Game: _${location}_\n\n${levelOfPlayText}`;
}

// level of play
export const levelOfPlayText = "What is your level of play?\nUse these 4 options as a rough gauge";
export const levelOfPlayKeyboard = [
  [
    { text: "Beginner", callback_data: "beginner" },
    { text: "Intermediate", callback_data: "intermediate" },
  ],
  [
    { text: "Advanced", callback_data: "beginner" },
    { text: "Professional :)", callback_data: "professional" },
  ],
];

export function inputLevelOfPlayText(role, levelOfPlay) {
  return `*${role} Portal*\n\nLevel of Play: _${levelOfPlay}_\n\n${contactInformationText}`;
}

// contact information
export const contactInformationText =
  "What is your Contact Information?\n\nLet potential players know your preferred method of communication and contact details! e.g 98765432 (WhatsApp), Telegram Handle";
export const contactInformationAnswer = "Contact Information: ";

// confirmation
export function finalConfirmationText(role, gameFormat, location, levelOfPlay, time, fees, contactInformation, telegramHandle) {
  return `Format of Game: _${gameFormat}_\nLocation: _${location}_\nLevel of Play: _${levelOfPlay}_\n${
    role.toLowerCase() === "organiser" ? `Time: ${time}\nFees: ${fees}\n` : ""
  }Contact Information: _${contactInformation}_\nTelegram Handle: _@${
    telegramHandle != null ? telegramHandle : "NIL"
  }_\n\nCheck through the details and click on submit to post your game!\n\n/start to re-do the questions if there are any errors`;
}

// submission keyboard
export const submissionKeyboard = [{ text: "Submit!", callback_data: "submit" }];

export function submitGameText(role, gameFormat, location, levelOfPlay, time, fees, contactInformation, telegramHandle) {
  return `#${role}\n*${
    role === "player" ? "Looking for games!" : "Looking for players!"
  }*\n\nFormat of Game: _${gameFormat}_\nLocation: _${location}_\nLevel of Play: _${levelOfPlay}_\nContact Information: _${contactInformation}_\n${
    role.toLowerCase() === "organiser" ? `Time: ${time}\nFees:${fees}\n` : "\n"
  }Telegram Handle: _@${telegramHandle}_`;
}

export const submissionConfirmationText = `Submitted! Your game has been posted, do remember to check your notifications :)\n\nIf you require any assistance, do reach out to me @josephlailai`;
// error message
export const errorMessage = "Do answer the questions as they come!";
export const submitOnce = "You can only submit the game once!";

// time of game
export const timeText = `When is the time of your game?\ne.g 25th August 2023 2-4pm`;
export function inputTimeOfGameText(role, contactInformation) {
  return `*${role} Portal*\n\nContact Information: _${contactInformation}_\n\n${timeText}`;
}

// Fees
export function inputFeesText(role, timewhen) {
  return `*${role} Portal*\n\nTime: _${timewhen}_\n\n${feesText}`;
}
export const feesText = `What are the fees payable?\ne.g $10 or "split equally" etc`;
