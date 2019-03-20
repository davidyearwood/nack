import getRandomInt from "./getRandomInt";

const LOADING_SCREEN_MESSAGES = [
  "Does Anyone Actually Read This?",
  "Grrr. Bark. Bark. Grrr.",
  "Hitting Your Keyboard Won't Make This Faster",
  "Loading, Don't Wait If You Don't Want To",
  "Look Out Behind You",
  "Wish this was Slack? Me too.",
  "Powered by coffee and a lot of SASS",
  "Looking For Graphics"
];

function getLoadingScreenMessage() {
  return LOADING_SCREEN_MESSAGES[getRandomInt(LOADING_SCREEN_MESSAGES.length)];
}

export default getLoadingScreenMessage;
