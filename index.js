/* eslint-disable no-console */
/* eslint no-use-before-define: ["error", {"functions": false}] */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-arrow-callback */

const Alexa = require('ask-sdk');
// const ddbAdapter = require('ask-sdk-dynamodb-persistence-adapter'); // included in ask-sdk

const APP_ID = 'amzn1.ask.skill.6bced5e0-3e1b-4dea-bf41-084d161a5ec5';
const SKILL_NAME = 'Escape Alcatraz';
const HELP_MESSAGE = '<audio src="https://alcatraz-audio.s3.amazonaws.com/help_message.mp3"/>';
const STOP_MESSAGE = '<audio src="https://s3.amazonaws.com/alcatraz-audio/stop-message.mp3"/>';
const STOP_MESSAGE_CONFIRM = '<audio src="https://s3.amazonaws.com/alcatraz-audio/stop-message-confirm.mp3"/>';
const STOP_MESSAGE_DECLINE = '<audio src="https://s3.amazonaws.com/alcatraz-audio/stop-message-decline.mp3"/>';
const STOP_MESSAGE_DECLINE_SHORT = '<audio src="https://alcatraz-audio.s3.amazonaws.com/stop-message-decline-short.mp3"/>';
const FALL_BACK = '<audio src="https://alcatraz-audio.s3.amazonaws.com/fallback.mp3"/>';
const NO_ITEM = '<audio src="https://alcatraz-audio.s3.amazonaws.com/no_item.mp3"/>';
const STANDARD_REPROMT = '<audio src="https://s3.amazonaws.com/alcatraz-audio/reprompt.mp3"/>';
const STANDARD_END_MESSAGE = '<audio src="https://s3.amazonaws.com/alcatraz-audio/end-prompt.mp3"/>';
const NO_HINTS = '<audio src="https://s3.amazonaws.com/alcatraz-audio/no-hints.mp3"/>';
const NO_LAST_HINT = '<audio src="https://alcatraz-audio.s3.amazonaws.com/no-last-hint.mp3"/>';

//=========================================================================================================================================
//Audio Links
//=========================================================================================================================================
const HALF_BREAK = '<break time="500ms"/>';
const FULL_BREAK = '<break time="1s"/>';

//openings
const OPENING_MUSIC = '<audio src="https://s3.amazonaws.com/alcatraz-audio/opening-music.mp3"/>';
const NEW_USER_INTRO = '<audio src="https://s3.amazonaws.com/alcatraz-audio/new-user-intro-v3.mp3"/>';
const NEW_GAME = '<audio src="https://alcatraz-audio.s3.amazonaws.com/new-game.mp3"/>';
const NEW_GAME_REPROMPT = '<audio src="https://alcatraz-audio.s3.amazonaws.com/new-game-reprompt.mp3"/>';
const CONTINUE_GAME = '<audio src="https://alcatraz-audio.s3.amazonaws.com/continue-game.mp3"/>';
const CONTINUE_GAME_REPROMPT = '<audio src="https://alcatraz-audio.s3.amazonaws.com/continue-game-reprompt.mp3"/>';
const CONTINUE_GAME_CONFIRM = '<audio src="https://alcatraz-audio.s3.amazonaws.com/continue-game-confirm.mp3"/>';
const OPENING_SCENE = '<audio src="https://s3.amazonaws.com/alcatraz-audio/scene-1/scene-1.mp3"/>';
const DEFAULT_UPSELL = '<audio src="https://alcatraz-audio.s3.amazonaws.com/default-upsell.mp3"/>';

//=========================================================================================================================================
//Inventory Items
//=========================================================================================================================================

// 1 = spoon
// 2 = steel key
// 3 = small silver key
// 4 = hammer
// 5 = notebook
// 6 = copper key
// 7 = boat key
// 8 = gas

const EMPTY_INVENTORY = '<audio src="https://alcatraz-audio.s3.amazonaws.com/inventory/empty-inventory.mp3"/>';
const INVEN_1 = '<audio src="https://alcatraz-audio.s3.amazonaws.com/inventory/inven_1.mp3"/>';
const INVEN_12 = '<audio src="https://alcatraz-audio.s3.amazonaws.com/inventory/inven_12.mp3"/>';
const INVEN_123 = '<audio src="https://alcatraz-audio.s3.amazonaws.com/inventory/inven_123.mp3"/>';
const INVEN_125 = '<audio src="https://alcatraz-audio.s3.amazonaws.com/inventory/inven_125.mp3"/>';
const INVEN_1234 = '<audio src="https://alcatraz-audio.s3.amazonaws.com/inventory/inven_1234.mp3"/>';
const INVEN_1235 = '<audio src="https://alcatraz-audio.s3.amazonaws.com/inventory/inven_1235.mp3"/>';
const INVEN_12345 = '<audio src="https://alcatraz-audio.s3.amazonaws.com/inventory/inven_12345.mp3"/>';
const INVEN_12346 = '<audio src="https://alcatraz-audio.s3.amazonaws.com/inventory/inven_12346.mp3"/>';
const INVEN_12347 = '<audio src="https://alcatraz-audio.s3.amazonaws.com/inventory/inven_12347.mp3"/>';
const INVEN_123456 = '<audio src="https://alcatraz-audio.s3.amazonaws.com/inventory/inven_123456.mp3"/>';
const INVEN_123457 = '<audio src="https://alcatraz-audio.s3.amazonaws.com/inventory/inven_123457.mp3"/>';
const INVEN_123467 = '<audio src="https://alcatraz-audio.s3.amazonaws.com/inventory/inven_123467.mp3"/>';
const INVEN_123468 = '<audio src="https://alcatraz-audio.s3.amazonaws.com/inventory/inven_123468.mp3"/>';
const INVEN_1234567 = '<audio src="https://alcatraz-audio.s3.amazonaws.com/inventory/inven_1234567.mp3"/>';
const INVEN_1234568 = '<audio src="https://alcatraz-audio.s3.amazonaws.com/inventory/inven_1234568.mp3"/>';
const INVEN_1234678 = '<audio src="https://alcatraz-audio.s3.amazonaws.com/inventory/inven_1234678.mp3"/>';
const INVEN_FULL = '<audio src="https://alcatraz-audio.s3.amazonaws.com/inventory/inven_full.mp3"/>';

const INSPECT_NO_KEYS = '<audio src="https://alcatraz-audio.s3.amazonaws.com/inventory/inspect_no_keys.mp3"/>';
const INSPECT_TWO_KEYS = '<audio src="https://alcatraz-audio.s3.amazonaws.com/inventory/inspect_two_keys.mp3"/>';
const INSPECT_THREE_KEYS = '<audio src="https://alcatraz-audio.s3.amazonaws.com/inventory/inspect_three_keys.mp3"/>';
const INSPECT_THREE_KEYS_NO_COPPER = '<audio src="https://alcatraz-audio.s3.amazonaws.com/inventory/inspect_three_keys_no_copper.mp3"/>';
const INSPECT_FOUR_KEYS = '<audio src="https://alcatraz-audio.s3.amazonaws.com/inventory/inspect_four_keys.mp3"/>';

//=========================================================================================================================================
//Hints
//=========================================================================================================================================

const HINT_1 = '<audio src="https://alcatraz-audio.s3.amazonaws.com/hints/hint_1_v2.mp3"/>';
const HINT_2 = '<audio src="https://alcatraz-audio.s3.amazonaws.com/hints/hint_2.mp3"/>';
const HINT_3 = '<audio src="https://alcatraz-audio.s3.amazonaws.com/hints/hint_3.mp3"/>';
const HINT_4 = '<audio src="https://alcatraz-audio.s3.amazonaws.com/hints/hint_4.mp3"/>';
const HINT_5 = '<audio src="https://alcatraz-audio.s3.amazonaws.com/hints/hint_5.mp3"/>';
const HINT_6 = '<audio src="https://alcatraz-audio.s3.amazonaws.com/hints/hint_6.mp3"/>';
const HINT_7 = '<audio src="https://alcatraz-audio.s3.amazonaws.com/hints/hint_7.mp3"/>';
const HINT_8 = '<audio src="https://alcatraz-audio.s3.amazonaws.com/hints/hint_8.mp3"/>';
const HINT_9 = '<audio src="https://alcatraz-audio.s3.amazonaws.com/hints/hint_9.mp3"/>';
const HINT_10 = '<audio src="https://alcatraz-audio.s3.amazonaws.com/hints/hint_10.mp3"/>';
const HINT_11 = '<audio src="https://alcatraz-audio.s3.amazonaws.com/hints/hint_11.mp3"/>';
const HINT_12 = '<audio src="https://alcatraz-audio.s3.amazonaws.com/hints/hint_12.mp3"/>';
const HINT_13 = '<audio src="https://alcatraz-audio.s3.amazonaws.com/hints/hint_13.mp3"/>';
const HINT_14 = '<audio src="https://alcatraz-audio.s3.amazonaws.com/hints/hint_14.mp3"/>';

//Scene 1 - Jail Cell
const SCENE_ONE_LEFT = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-1/scene-1-left-v2.mp3"/>';
const SCENE_ONE_RIGHT = '<audio src="https://s3.amazonaws.com/alcatraz-audio/scene-1/scene-1-right.mp3"/>';
const SCENE_ONE_UP = '<audio src="https://s3.amazonaws.com/alcatraz-audio/scene-1/scene-1-up.mp3"/>';
const SCENE_ONE_DOWN = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-1/scene-1-down-v2.mp3"/>';
const SCENE_ONE_FORWARD = '<audio src="https://s3.amazonaws.com/alcatraz-audio/scene-1/scene-1-forward.mp3"/>';
const SCENE_ONE_BACKWARD = '<audio src="https://s3.amazonaws.com/alcatraz-audio/scene-1/scene-1-backward.mp3"/>';
const SCENE_ONE_INSPECT_DOOR = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-1/scene-1-inspect-door.mp3"/>';
const INSPECT_SPOON = '<audio src="https://s3.amazonaws.com/alcatraz-audio/scene-1/scene-1-inspect-spoon.mp3"/>';
const CHECK_SPOON = '<audio src="https://s3.amazonaws.com/alcatraz-audio/scene-1/scene-1-check-spoon.mp3"/>'; //when user already has spoon
const INSPECT_POSTER_SPOON = '<audio src="https://s3.amazonaws.com/alcatraz-audio/scene-1/scene-1-inspect-poster-spoon.mp3"/>';
const INSPECT_POSTER_NO_SPOON = '<audio src="https://s3.amazonaws.com/alcatraz-audio/scene-1/scene-1-inspect-poster-no-spoon.mp3"/>';
const SCENE_ONE_HINT_NO_SPOON = '<audio src="https://s3.amazonaws.com/alcatraz-audio/scene-1/scene-1-hint-no-spoon.mp3"/>';
const SCENE_ONE_HINT_SPOON = '<audio src="https://s3.amazonaws.com/alcatraz-audio/scene-1/scene-1-hint-spoon.mp3"/>';
const SCENE_ONE_UPSELL = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-1/scene-1-upsell.mp3"/>';
//Scene 2 - Hallway
const SCENE_TWO_INTRO = '<audio src="https://s3.amazonaws.com/alcatraz-audio/scene-2/scene-2.mp3"/>';
const SCENE_TWO_LEFT_DARK = '<audio src="https://s3.amazonaws.com/alcatraz-audio/scene-2/scene-2-left-dark.mp3"/>';
const SCENE_TWO_LEFT_LIT = '<audio src="https://s3.amazonaws.com/alcatraz-audio/scene-2/scene-2-left-lit.mp3"/>';
const SCENE_TWO_RIGHT = '<audio src="https://s3.amazonaws.com/alcatraz-audio/scene-2/scene-2-right.mp3"/>';
const SCENE_TWO_UP = '<audio src="https://s3.amazonaws.com/alcatraz-audio/scene-2/scene-2-up.mp3"/>';
const SCENE_TWO_DOWN = '<audio src="https://s3.amazonaws.com/alcatraz-audio/scene-2/scene-2-down.mp3"/>';
const SCENE_TWO_FORWARD = '<audio src="https://s3.amazonaws.com/alcatraz-audio/scene-2/scene-2-forward.mp3"/>';
const SCENE_TWO_BACKWARD_QUESTION = '<audio src="https://s3.amazonaws.com/alcatraz-audio/scene-2/scene-2-backward.mp3"/>';
const SCENE_TWO_BACKWARD_CONFIRM = '<audio src="https://s3.amazonaws.com/alcatraz-audio/scene-2/scene-2-backward-confirm.mp3"/>';
const SCENE_TWO_BACKWARD_DECLINE = '<audio src="https://s3.amazonaws.com/alcatraz-audio/scene-2/scene-2-backward-decline.mp3"/>';
const SCENE_TWO_BACKWARD_REPROMPT = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-2/scene-2-backward-reprompt.mp3"/>';
//scene 3 - dark room
const SCENE_THREE_INTRO = '<audio src="https://s3.amazonaws.com/alcatraz-audio/scene-3/scene-3-intro.mp3"/>';
const SCENE_THREE_DARK = '<audio src="https://s3.amazonaws.com/alcatraz-audio/scene-3/scene-3-dark.mp3"/>';
const SCENE_THREE_LIGHT_PROMPT = '<audio src="https://s3.amazonaws.com/alcatraz-audio/scene-3/scene-3-lights-prompt.mp3"/>';
const SCENE_THREE_BACKWARD = '<audio src="https://s3.amazonaws.com/alcatraz-audio/scene-3/scene-3-backward.mp3"/>';
const SCENE_THREE_HINT = '<audio src="https://s3.amazonaws.com/alcatraz-audio/scene-3/scene-3-hint.mp3"/>';
//scene 4 - power room
const SCENE_FOUR_INTRO = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-4/scene-4-intro.mp3"/>';
const SCENE_FOUR_LEFT = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-4/scene-4-left.mp3"/>';
const SCENE_FOUR_RIGHT = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-4/scene-4-right.mp3"/>';
const SCENE_FOUR_UP = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-4/scene-4-up.mp3"/>';
const SCENE_FOUR_DOWN = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-4/scene-4-down.mp3"/>';
const SCENE_FOUR_FORWARD = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-4/scene-4-forward.mp3"/>';
const SCENE_FOUR_BACKWARD = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-4/scene-4-backward.mp3"/>';
const SCENE_FOUR_INSPECT_PANEL = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-4/scene-4-inspect-panel.mp3"/>';
const SCENE_FOUR_INSPECT_PANEL_CONNECTED = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-4/scene-4-inspect-panel-connected.mp3"/>';
const SCENE_FOUR_INSPECT_TOOLBOX_NO_KEY = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-4/scene-4-inspect-toolbox-no-key.mp3"/>';
const SCENE_FOUR_INSPECT_TOOLBOX_WRONG_KEY = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-4/scene-4-inspect-toolbox-wrong-key.mp3"/>';
const SCENE_FOUR_INSPECT_TOOLBOX_CORRECT_KEY = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-4/scene-4-inspect-toolbox-correct-key.mp3"/>';
const SCENE_FOUR_INSPECT_TOOLBOX_OPENED = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-4/scene-4-inspect-toolbox-opened.mp3"/>';
const SCENE_FOUR_INSPECT_DOOR_NO_KEY = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-4/scene-4-inspect-door-no-key.mp3"/>';
const SCENE_FOUR_INSPECT_DOOR_CORRECT_KEY = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-4/scene-4-inspect-door-key.mp3"/>';
const SCENE_FOUR_INSPECT_DOOR_OPENED = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-4/scene-4-inspect-door-opened.mp3"/>';
//scene 5 - lit room
const SCENE_FIVE_INTRO = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-5/scene-5-intro.mp3"/>';
const SCENE_FIVE_LEFT = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-5/scene-5-left.mp3"/>';
const SCENE_FIVE_RIGHT = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-5/scene-5-right.mp3"/>';
const SCENE_FIVE_UP = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-5/scene-5-up.mp3"/>';
const SCENE_FIVE_DOWN = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-5/scene-5-down.mp3"/>';
const SCENE_FIVE_FORWARD = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-5/scene-5-forward.mp3"/>';
const SCENE_FIVE_BACKWARD = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-5/scene-5-backward.mp3"/>';
//Buzz
const SCENE_FIVE_INTRO_BUZZ = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-5/scene-5-intro-buzz.mp3"/>';
const SCENE_FIVE_LEFT_BUZZ = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-5/scene-5-left-buzz.mp3"/>';
const SCENE_FIVE_RIGHT_BUZZ = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-5/scene-5-right-buzz.mp3"/>';
const SCENE_FIVE_UP_BUZZ = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-5/scene-5-up-buzz.mp3"/>';
const SCENE_FIVE_DOWN_BUZZ = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-5/scene-5-down-buzz.mp3"/>';
const SCENE_FIVE_FORWARD_BUZZ = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-5/scene-5-forward-buzz.mp3"/>';
const SCENE_FIVE_BACKWARD_BUZZ = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-5/scene-5-backward-buzz.mp3"/>';
const SCENE_FIVE_INSPECT_KEY = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-5/scene-5-inspect-key.mp3"/>';
const SCENE_FIVE_INSPECT_KEY_OWNED = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-5/scene-5-inspect-key-owned.mp3"/>';
const SCENE_FIVE_HINT_KEY = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-5/scene-5-hint-key.mp3"/>';
const SCENE_FIVE_HINT_NO_KEY = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-5/scene-5-hint-no-key.mp3"/>';
//scene 6 - laundry room
const SCENE_SIX_INTRO = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-6/scene-6-intro.mp3"/>';
const SCENE_SIX_LEFT = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-6/scene-6-left.mp3"/>';
const SCENE_SIX_RIGHT = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-6/scene-6-right.mp3"/>';
const SCENE_SIX_UP = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-6/scene-6-up.mp3"/>';
const SCENE_SIX_DOWN = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-6/scene-6-down.mp3"/>';
const SCENE_SIX_FORWARD_HAMMER = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-6/scene-6-forward-hammer-v2.mp3"/>';
const SCENE_SIX_FORWARD_NO_HAMMER = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-6/scene-6-forward-hammer-no.mp3"/>';
const SCENE_SIX_FORWARD_OPENED = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-6/scene-6-forward-opened.mp3"/>';
const SCENE_SIX_BACKWARD = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-6/scene-6-backward.mp3"/>';
const SCENE_SIX_BACKWARD_ACCEPT = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-6/scene-6-backward-accept.mp3"/>';
const SCENE_SIX_BACKWARD_DECLINE = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-6/scene-6-backward-decline.mp3"/>';
const SCENE_SIX_INSPECT_DOOR_HAMMER = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-6/scene-6-inspect-door-hammer.mp3"/>';
const SCENE_SIX_INSPECT_DOOR_NO_HAMMER = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-6/scene-6-inspect-door-no-hammer.mp3"/>';
const SCENE_SIX_INSPECT_WINDOW = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-6/scene-6-inspect-window.mp3"/>';
const SCENE_SIX_INSPECT_UNIFORM = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-6/scene-6-inspect-uniform.mp3"/>';
const SCENE_SIX_INSPECT_NOTEBOOK = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-6/scene-6-inspect-notebook-v2.mp3"/>';
const SCENE_SIX_INSPECT_NOTEBOOK_OWNED = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-6/scene-6-inspect-notebook-owned.mp3"/>';
//scene 7 - Roof
const SCENE_SEVEN_INTRO = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-7/scene-7-intro.mp3"/>';
const SCENE_SEVEN_LEFT = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-7/scene-7-left.mp3"/>';
const SCENE_SEVEN_RIGHT = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-7/scene-7-right.mp3"/>';
const SCENE_SEVEN_UP = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-7/scene-7-up.mp3"/>';
const SCENE_SEVEN_DOWN = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-7/scene-7-down.mp3"/>';
const SCENE_SEVEN_DOWN_ACCEPT = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-7/scene-7-down-accept.mp3"/>';
const SCENE_SEVEN_DOWN_DECLINE = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-7/scene-7-down-decline.mp3"/>';
const SCENE_SEVEN_FORWARD = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-7/scene-7-forward.mp3"/>';
const SCENE_SEVEN_BACKWARD = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-7/scene-7-backward.mp3"/>';
//scene 8 - Courtyard
const SCENE_EIGHT_INTRO = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-8/scene-8-intro.mp3"/>';
const SCENE_EIGHT_LEFT = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-8/scene-8-left.mp3"/>';
const SCENE_EIGHT_RIGHT = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-8/scene-8-right.mp3"/>';
const SCENE_EIGHT_UP = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-8/scene-8-up.mp3"/>';
const SCENE_EIGHT_DOWN = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-8/scene-8-down.mp3"/>';
const SCENE_EIGHT_FORWARD = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-8/scene-8-forward.mp3"/>';
const SCENE_EIGHT_BACKWARD = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-8/scene-8-backward.mp3"/>';
//scene 9 - wardens office
const SCENE_NINE_INTRO = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-9/scene-9-intro.mp3"/>';
const SCENE_NINE_LEFT = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-9/scene-9-left.mp3"/>';
const SCENE_NINE_RIGHT = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-9/scene-9-right.mp3"/>';
const SCENE_NINE_UP = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-9/scene-9-up.mp3"/>';
const SCENE_NINE_DOWN = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-9/scene-9-down.mp3"/>';
const SCENE_NINE_FORWARD = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-9/scene-9-forward.mp3"/>';
const SCENE_NINE_BACKWARD = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-9/scene-9-backward.mp3"/>';
const SCENE_NINE_INSPECT_KEY = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-9/scene-9-inspect-key.mp3"/>';
const SCENE_NINE_INSPECT_KEY_OWNED = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-9/scene-9-inspect-key-owned.mp3"/>';
const SCENE_NINE_INSPECT_SAFE = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-9/scene-9-inspect-safe.mp3"/>';
const SCENE_NINE_INSPECT_SAFE_OPENED = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-9/scene-9-inspect-safe-opened.mp3"/>';
const SCENE_NINE_SAFE_COMBO_CORRECT = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-9/scene-9-safe-combo-correct.mp3"/>';
const SCENE_NINE_SAFE_COMBO_INCORRECT = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-9/scene-9-safe-combo-incorrect.mp3"/>';
//scene 10 - Docks
const SCENE_TEN_INTRO = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-10/scene-10-intro.mp3"/>';
const SCENE_TEN_LEFT_KEY = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-10/scene-10-left-key-v2.mp3"/>';
const SCENE_TEN_LEFT_NO_KEY = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-10/scene-10-left-no-key.mp3"/>';
const SCENE_TEN_RIGHT = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-10/scene-10-right.mp3"/>';
const SCENE_TEN_UP = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-10/scene-10-up.mp3"/>';
const SCENE_TEN_DOWN = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-10/scene-10-down.mp3"/>';
const SCENE_TEN_FORWARD = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-10/scene-10-forward.mp3"/>';
const SCENE_TEN_BACKWARD = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-10/scene-10-backward.mp3"/>';
const SCENE_TEN_BOAT_ACCEPT_NO_KEY = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-10/scene-10-boat-accept-no-key.mp3"/>';
const SCENE_TEN_BOAT_ACCEPT_KEY_NO_GAS = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-10/scene-10-boat-accept-key-no-gas.mp3"/>';
const SCENE_TEN_BOAT_ACCEPT_KEY_GAS = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-10/scene-10-boat-accept-key-gas.mp3"/>';
const SCENE_TEN_BOAT_DECLINE = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-10/scene-10-boat-decline.mp3"/>';
const SCENE_TEN_CONGRATULATIONS = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-10/scene-10-congratulations.mp3"/>';
//scene 11 - Power house
const SCENE_ELEVEN_INTRO = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-11/scene-11-intro.mp3"/>';
const SCENE_ELEVEN_LEFT = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-11/scene-11-left.mp3"/>';
const SCENE_ELEVEN_RIGHT = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-11/scene-11-right.mp3"/>';
const SCENE_ELEVEN_UP = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-11/scene-11-up.mp3"/>';
const SCENE_ELEVEN_DOWN = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-11/scene-11-down.mp3"/>';
const SCENE_ELEVEN_FORWARD = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-11/scene-11-forward.mp3"/>';
const SCENE_ELEVEN_BACKWARD = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-11/scene-11-backward.mp3"/>';
const SCENE_ELEVEN_INSPECT_GAS = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-11/scene-11-inspect-gas.mp3"/>';
const SCENE_ELEVEN_INSPECT_GAS_OWNED = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-11/scene-11-inspect-gas-owned.mp3"/>';
const SCENE_ELEVEN_INSPECT_SWITCH = '<audio src="https://alcatraz-audio.s3.amazonaws.com/scene-11/scene-11-inspect-switch.mp3"/>';
//=========================================================================================================================================
//Extra Variables
//=========================================================================================================================================

var scene;
var inventory = [];
var quitStatus = false;
var restartStatus = false;
var sceneTwoBackwardQuestion = false;
var sceneSixBackwardQuestion = false;
var sceneSevenDownQuestion = false;
var sceneTenRightQuestion = false;
const DEFAULT_NUM_HINTS = 3;

//=========================================================================================================================================
//Editing anything below this line might break the skill.
//=========================================================================================================================================

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest';
  },
  async handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const attributes = await attributesManager.getPersistentAttributes() || {};
    var speechOutput = '';
    quitStatus = false;


    if (Object.keys(attributes).length === 0 || attributes.sceneValue === 'new') {
      if (Object.keys(attributes).length === 0) {
        speechOutput = OPENING_MUSIC + HALF_BREAK + NEW_USER_INTRO + FULL_BREAK + OPENING_SCENE + HALF_BREAK + STANDARD_END_MESSAGE;
        attributes.numOfHints = DEFAULT_NUM_HINTS; //sets hints to 3 for new users
      } else {
        //if user bought hints they will carry over
        if (attributes.numOfHints < DEFAULT_NUM_HINTS) {
          attributes.numOfHints = DEFAULT_NUM_HINTS;
        }
        speechOutput = HALF_BREAK + NEW_USER_INTRO + FULL_BREAK + OPENING_SCENE + HALF_BREAK + STANDARD_END_MESSAGE;
      }
      scene = 1;
      attributes.sceneValue = 'intro';
      attributes.lastHintValue = 'NONE';
      attributes.spoonValue = false;
      attributes.posterValue = false;
      attributes.powerSwitch = false;
      attributes.toolboxValue = false;
      attributes.sceneFourDoorValue = false;
      attributes.smallSilverKeyValue = false;
      attributes.notebookValue = false;
      attributes.florecentLightValue = true;
      attributes.hammerValue = false;
      attributes.roofAccess = false;
      attributes.courtyardAccess = false;
      attributes.copperKeyValue = false;
      attributes.safeValue = false;
      attributes.boatKeyValue = false;
      attributes.steelKeyValue = false;
      attributes.gasValue = false;
      attributesManager.setPersistentAttributes(attributes);
      await attributesManager.savePersistentAttributes();
      const repromptOutput = STANDARD_REPROMT;

      return handlerInput.responseBuilder
        .speak(speechOutput)
        .reprompt(repromptOutput)
        .getResponse();
    } else if (attributes.sceneValue === 'win') {
      scene = 12;
      restartStatus = true;
      const speechOutput = OPENING_MUSIC + HALF_BREAK + NEW_GAME;
      const repromptOutput = NEW_GAME_REPROMPT;

      return handlerInput.responseBuilder
        .speak(speechOutput)
        .reprompt(repromptOutput)
        .getResponse();
    } else {
      scene = 0;
      restartStatus = true;
      const speechOutput = OPENING_MUSIC + HALF_BREAK + CONTINUE_GAME;
      const repromptOutput = CONTINUE_GAME_REPROMPT;

      return handlerInput.responseBuilder
        .speak(speechOutput)
        .reprompt(repromptOutput)
        .getResponse();
    }
  },
};

const FallbackHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
    const repromptOutput = STANDARD_REPROMT;

    const speechOutput = FALL_BACK + HALF_BREAK + HELP_MESSAGE + HALF_BREAK + STANDARD_END_MESSAGE;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(repromptOutput)
      .getResponse();
  },
};

const YesIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AMAZON.YesIntent' //make proper amazon.yes intent
    );
  },
  async handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const attributes = await attributesManager.getPersistentAttributes() || {};
    var speechOutput = '';
    var repromptOutput = STANDARD_REPROMT;

    if (quitStatus === true && restartStatus === false) { //check if quiting game //double confirming cause quitStatus alone wasnt working idk weird
     var hintSell = '';
      if (attributes.sceneValue === 'intro') { //decision on upsell for hints
        hintSell = SCENE_ONE_UPSELL;
      } else {
        hintSell = DEFAULT_UPSELL;
      }
      speechOutput = STOP_MESSAGE_CONFIRM + hintSell;

      return handlerInput.responseBuilder
        .speak(speechOutput)
        .withShouldEndSession(true)
        .getResponse();
    } else if (quitStatus === false && restartStatus === true) { // check if continuing game
      restartStatus = false;
      var previousScene = attributes.sceneValue;

      if (scene === 0) {
        var preMessage = CONTINUE_GAME_CONFIRM;

        switch(previousScene) {
          case 'intro':
            scene = 1;
            speechOutput = preMessage + FULL_BREAK + OPENING_SCENE + HALF_BREAK + STANDARD_END_MESSAGE;
            break;
          case 'hallway':
            scene = 2;
            speechOutput = preMessage + FULL_BREAK + SCENE_TWO_INTRO + HALF_BREAK + STANDARD_END_MESSAGE;
            break;
          case 'dark-room':
            scene = 3;
            speechOutput = preMessage + FULL_BREAK + SCENE_THREE_INTRO + HALF_BREAK + STANDARD_END_MESSAGE;
            break;
          case 'power-room':
            scene = 4;
            speechOutput = preMessage + FULL_BREAK + SCENE_FOUR_INTRO + HALF_BREAK + STANDARD_END_MESSAGE;
            break;
          case 'lit-room':
            scene = 5; //room is lit
            speechOutput = preMessage + FULL_BREAK + SCENE_TWO_LEFT_LIT + HALF_BREAK + STANDARD_END_MESSAGE;
            break;
          case 'laundry-room':
            scene = 6;
            speechOutput = preMessage + FULL_BREAK + SCENE_SIX_INTRO + HALF_BREAK + STANDARD_END_MESSAGE;
            break;
          case 'roof':
            scene = 7;
            speechOutput = preMessage + FULL_BREAK + SCENE_SEVEN_INTRO + HALF_BREAK + STANDARD_END_MESSAGE;
            break;
          case 'courtyard':
            scene = 8;
            speechOutput = preMessage + FULL_BREAK + SCENE_EIGHT_INTRO + HALF_BREAK + STANDARD_END_MESSAGE;
            break;
          case 'wardens-office':
            scene = 9;
            speechOutput = preMessage + FULL_BREAK + SCENE_NINE_INTRO + HALF_BREAK + STANDARD_END_MESSAGE;
            break;
          case 'docks':
            scene = 10;
            speechOutput = preMessage + FULL_BREAK + SCENE_TEN_INTRO + HALF_BREAK + STANDARD_END_MESSAGE;
            break;
          case 'power-house':
            scene = 11;
            speechOutput = preMessage + FULL_BREAK + SCENE_ELEVEN_INTRO + HALF_BREAK + STANDARD_END_MESSAGE;
            break;
          default:
            attributes.sceneValue = 'intro';
            attributesManager.setPersistentAttributes(attributes);
            await attributesManager.savePersistentAttributes();
            return LaunchRequestHandler.handle(handlerInput);
            break;
        }

        return handlerInput.responseBuilder
          .speak(speechOutput)
          .reprompt(repromptOutput)
          .getResponse();

      } else if (scene === 12) {
          attributes.sceneValue = 'new';
          attributesManager.setPersistentAttributes(attributes);
          await attributesManager.savePersistentAttributes();
          return LaunchRequestHandler.handle(handlerInput);
      } else {
          // attributes.sceneValue = '';
          attributesManager.setPersistentAttributes(attributes);
          //await attributesManager.savePersistentAttributes();
          await attributesManager.deletePersistentAttributes(attributes);
          return LaunchRequestHandler.handle(handlerInput); //restarts new game if cannot find previous scene
      }
    } else if (quitStatus === true && restartStatus === true) {
      var hintSell = '';
       if (attributes.sceneValue === 'intro') { //decision on upsell for hints
         hintSell = SCENE_ONE_UPSELL;
       } else {
         hintSell = DEFAULT_UPSELL;
       }
       speechOutput = STOP_MESSAGE_CONFIRM + hintSell;

       return handlerInput.responseBuilder
         .speak(speechOutput)
         .withShouldEndSession(true)
         .getResponse();
    } else {
      //in reverse order to prevent going back if question was ever ignored
      if (sceneTenRightQuestion === true) {
         if (attributes.boatKeyValue === true && attributes.gasValue === true) {
           attributes.sceneValue = 'win';
           attributesManager.setPersistentAttributes(attributes);
           await attributesManager.savePersistentAttributes();
           speechOutput = SCENE_TEN_BOAT_ACCEPT_KEY_GAS + FULL_BREAK + SCENE_TEN_CONGRATULATIONS;

           return handlerInput.responseBuilder
             .speak(speechOutput)
             .withShouldEndSession(true)
             .getResponse();
      } else if (attributes.boatKeyValue === false) {
           speechOutput = SCENE_TEN_BOAT_ACCEPT_NO_KEY + HALF_BREAK + STANDARD_END_MESSAGE;

           return handlerInput.responseBuilder
             .speak(speechOutput)
             .reprompt(repromptOutput)
             .getResponse();
         } else {
           speechOutput = SCENE_TEN_BOAT_ACCEPT_KEY_NO_GAS + HALF_BREAK + STANDARD_END_MESSAGE;

           return handlerInput.responseBuilder
             .speak(speechOutput)
             .reprompt(repromptOutput)
             .getResponse();
         }
     } else if (sceneSevenDownQuestion === true) {
         sceneSevenDownQuestion = false;
         scene = 6;
         attributes.sceneValue = 'laundry-room';
         attributesManager.setPersistentAttributes(attributes);
         await attributesManager.savePersistentAttributes();
         speechOutput = SCENE_SEVEN_DOWN_ACCEPT + HALF_BREAK + STANDARD_END_MESSAGE;

         return handlerInput.responseBuilder
           .speak(speechOutput)
           .reprompt(repromptOutput)
           .getResponse();
     } else if (sceneSixBackwardQuestion === true) {
         sceneSixBackwardQuestion = false;
         scene = 4;
         attributes.sceneValue = 'power-room';
         attributesManager.setPersistentAttributes(attributes);
         await attributesManager.savePersistentAttributes();
         speechOutput = SCENE_SIX_BACKWARD_ACCEPT + HALF_BREAK + STANDARD_END_MESSAGE;

         return handlerInput.responseBuilder
           .speak(speechOutput)
           .reprompt(repromptOutput)
           .getResponse();
     } else if  (sceneTwoBackwardQuestion === true) {
        sceneTwoBackwardQuestion = false;
        scene = 1;
        attributes.sceneValue = 'intro';
        attributesManager.setPersistentAttributes(attributes);
        await attributesManager.savePersistentAttributes();
        speechOutput = SCENE_TWO_BACKWARD_CONFIRM + HALF_BREAK + STANDARD_END_MESSAGE;

        return handlerInput.responseBuilder
          .speak(speechOutput)
          .reprompt(repromptOutput)
          .getResponse();
      } else {
        speechOutput = STANDARD_END_MESSAGE;
         //speechOutput = quitStatus.toString();

        return handlerInput.responseBuilder
          .speak(speechOutput)
          .reprompt(repromptOutput)
          .getResponse();
      }
    }
  },
};

const NoIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NoIntent' //make proper amazon.no intent
    );
  },
  async handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const attributes = await attributesManager.getPersistentAttributes() || {};
    var speechOutput = '';
    var repromptOutput = STANDARD_REPROMT;
    //deletes scene value and restarts

    if (quitStatus === true && restartStatus === false) { //checking if we are quiting game
      quitStatus = false;
      speechOutput = STOP_MESSAGE_DECLINE;

      return handlerInput.responseBuilder
        .speak(speechOutput)
        .reprompt(repromptOutput)
        .getResponse();
    } else if (quitStatus === false && restartStatus === true) { //checking if we are restarting the game
        restartStatus = false;
        attributes.sceneValue = 'new';
        attributesManager.setPersistentAttributes(attributes);
        await attributesManager.savePersistentAttributes();
        return LaunchRequestHandler.handle(handlerInput);
    } else if (quitStatus === true && restartStatus === true) {
      quitStatus = false;
      speechOutput = STOP_MESSAGE_DECLINE_SHORT + HALF_BREAK + CONTINUE_GAME;

      return handlerInput.responseBuilder
        .speak(speechOutput)
        .reprompt(repromptOutput)
        .getResponse();
    } else if (scene === 12) {
        attributes.sceneValue = 'docks';
        attributesManager.setPersistentAttributes(attributes);
        await attributesManager.savePersistentAttributes();
        scene = 10;
        speechOutput = SCENE_TEN_INTRO + HALF_BREAK + STANDARD_END_MESSAGE;

        return handlerInput.responseBuilder
          .speak(speechOutput)
          .reprompt(repromptOutput)
          .getResponse();
    } else {
      //in reverse order to prevent going back if question was ever ignored
      if (sceneTenRightQuestion === true) {
        sceneTenRightQuestion = false;
        speechOutput = SCENE_TEN_BOAT_DECLINE + HALF_BREAK + STANDARD_END_MESSAGE;

        return handlerInput.responseBuilder
          .speak(speechOutput)
          .reprompt(repromptOutput)
          .getResponse();
      } else if (sceneSevenDownQuestion === true) {
        sceneSevenDownQuestion = false;
        speechOutput = SCENE_SEVEN_DOWN_DECLINE + HALF_BREAK + STANDARD_END_MESSAGE;

        return handlerInput.responseBuilder
          .speak(speechOutput)
          .reprompt(repromptOutput)
          .getResponse();
      } else if (sceneSixBackwardQuestion === true) {
        sceneSixBackwardQuestion = false;
        speechOutput = SCENE_SIX_BACKWARD_DECLINE + HALF_BREAK + STANDARD_END_MESSAGE;

        return handlerInput.responseBuilder
          .speak(speechOutput)
          .reprompt(repromptOutput)
          .getResponse();
      } else if  (sceneTwoBackwardQuestion === true) {
        sceneTwoBackwardQuestion = false;
        speechOutput = SCENE_TWO_BACKWARD_DECLINE + HALF_BREAK + STANDARD_END_MESSAGE;

        return handlerInput.responseBuilder
          .speak(speechOutput)
          .reprompt(repromptOutput)
          .getResponse();
      } else {
        speechOutput = STANDARD_END_MESSAGE;

        return handlerInput.responseBuilder
          .speak(speechOutput)
          .reprompt(repromptOutput)
          .getResponse();
      }
    }
  },
};

const DirectionLeftHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'direction_left'
    );
  },
  async handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const attributes = await attributesManager.getPersistentAttributes() || {};
    var speechOutput = '';

    switch(scene) {
        case 0:
          speechOutput = CONTINUE_GAME;
          break;
        case 1:
          speechOutput = SCENE_ONE_LEFT + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 2:
          if (attributes.powerSwitch === true) {
            scene = 5; //room is lit
            attributes.sceneValue = 'lit-room';
            attributesManager.setPersistentAttributes(attributes);
            await attributesManager.savePersistentAttributes();
            speechOutput = SCENE_TWO_LEFT_LIT + HALF_BREAK + STANDARD_END_MESSAGE;
          } else {
            scene = 3; //room is dark
            attributes.sceneValue = 'dark-room';
            attributesManager.setPersistentAttributes(attributes);
            await attributesManager.savePersistentAttributes();
            speechOutput = SCENE_TWO_LEFT_DARK + HALF_BREAK + STANDARD_END_MESSAGE;
          }
          break;
        case 3:
          speechOutput = SCENE_THREE_DARK + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 4:
          if (attributes.sceneFourDoorValue === true) {
            scene = 6;
            attributes.sceneValue = 'laundry-room';
            attributesManager.setPersistentAttributes(attributes);
            await attributesManager.savePersistentAttributes();
            speechOutput = SCENE_FOUR_INSPECT_DOOR_OPENED + HALF_BREAK + STANDARD_END_MESSAGE;
          } else {
            speechOutput = SCENE_FOUR_LEFT + HALF_BREAK + STANDARD_END_MESSAGE;
          }

          break;
        case 5:
          if (attributes.florecentLightValue === true) {
            speechOutput = SCENE_FIVE_LEFT_BUZZ + HALF_BREAK + STANDARD_END_MESSAGE;
          } else {
            speechOutput = SCENE_FIVE_LEFT + HALF_BREAK + STANDARD_END_MESSAGE;
          }
          break;
        case 6:
          speechOutput = SCENE_SIX_LEFT + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 7:
          speechOutput = SCENE_SEVEN_LEFT + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 8:
          speechOutput = SCENE_EIGHT_LEFT + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 9:
          speechOutput = SCENE_NINE_LEFT + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 10:
          if (attributes.copperKeyValue === true) {
            scene = 11;
            attributes.sceneValue = 'power-house';
            attributesManager.setPersistentAttributes(attributes);
            await attributesManager.savePersistentAttributes();
            speechOutput = SCENE_TEN_LEFT_KEY + SCENE_ELEVEN_INTRO + HALF_BREAK + STANDARD_END_MESSAGE;
          } else {
            speechOutput = SCENE_TEN_LEFT_NO_KEY + HALF_BREAK + STANDARD_END_MESSAGE;
          }
          break;
        case 11:
          speechOutput = SCENE_ELEVEN_LEFT + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        default:
          speechOutput = 'We apologize. It seems we have encountered an error with your request.';
          break;
    }

    const repromptOutput = STANDARD_REPROMT;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(repromptOutput)
      .getResponse();
  },
};

const DirectionRightHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'direction_right'
    );
  },
  async handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const attributes = await attributesManager.getPersistentAttributes() || {};
    var speechOutput = '';

    switch(scene) {
        case 0:
          speechOutput = CONTINUE_GAME;
          break;
        case 1:
          speechOutput = SCENE_ONE_RIGHT + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 2:
          scene = 4;
          attributes.sceneValue = 'power-room';
          attributesManager.setPersistentAttributes(attributes);
          await attributesManager.savePersistentAttributes();
          speechOutput = SCENE_TWO_RIGHT + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 3:
          speechOutput = SCENE_THREE_LIGHT_PROMPT + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 4:
          speechOutput = SCENE_FOUR_RIGHT + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 5:
          if (attributes.florecentLightValue === true) {
            speechOutput = SCENE_FIVE_RIGHT_BUZZ + HALF_BREAK + STANDARD_END_MESSAGE;
          } else {
            speechOutput = SCENE_FIVE_RIGHT + HALF_BREAK + STANDARD_END_MESSAGE;
          }
          break;
        case 6:
          speechOutput = SCENE_SIX_RIGHT + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 7:
          speechOutput = SCENE_SEVEN_RIGHT + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 8:
          scene = 9;
          attributes.sceneValue = 'wardens-office';
          attributesManager.setPersistentAttributes(attributes);
          await attributesManager.savePersistentAttributes();
          speechOutput = SCENE_EIGHT_RIGHT + SCENE_NINE_INTRO + STANDARD_END_MESSAGE;
          break;
        case 9:
          speechOutput = SCENE_NINE_RIGHT + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 10:
          sceneTenRightQuestion = true;
          speechOutput = SCENE_TEN_RIGHT;
          break;
        case 11:
          speechOutput = SCENE_ELEVEN_RIGHT + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        default:
          speechOutput = 'We apologize. It seems we have encountered an error with your request.';
          break;
    }

    const repromptOutput = STANDARD_REPROMT;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(repromptOutput)
      .getResponse();
  },
};

const DirectionUpHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'direction_up'
    );
  },
  async handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const attributes = await attributesManager.getPersistentAttributes() || {};
    var speechOutput = '';

    switch(scene) {
        case 0:
          speechOutput = CONTINUE_GAME;
          break;
        case 1:
          speechOutput = SCENE_ONE_UP + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 2:
          speechOutput = SCENE_TWO_UP + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 3:
          speechOutput = SCENE_THREE_DARK + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 4:
          speechOutput = SCENE_FOUR_UP + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 5:
          if (attributes.florecentLightValue === true) {
            attributes.florecentLightValue = false;
            attributesManager.setPersistentAttributes(attributes);
            await attributesManager.savePersistentAttributes();

            speechOutput = SCENE_FIVE_UP_BUZZ + HALF_BREAK + STANDARD_END_MESSAGE;
          } else {
              attributes.florecentLightValue = true;
              attributesManager.setPersistentAttributes(attributes);
              await attributesManager.savePersistentAttributes();

              speechOutput = SCENE_FIVE_UP + HALF_BREAK + STANDARD_END_MESSAGE;
          }
          break;
        case 6:
          speechOutput = SCENE_SIX_UP + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 7:
          speechOutput = SCENE_SEVEN_UP + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 8:
          speechOutput = SCENE_EIGHT_UP + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 9:
          speechOutput = SCENE_NINE_UP + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 10:
          speechOutput = SCENE_TEN_UP + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 11:
          speechOutput = SCENE_ELEVEN_UP + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        default:
          speechOutput = 'We apologize. It seems we have encountered an error with your request.';
          break;
    }

    const repromptOutput = STANDARD_REPROMT;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(repromptOutput)
      .getResponse();
  },
};

const DirectionDownHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'direction_down'
    );
  },
  async handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const attributes = await attributesManager.getPersistentAttributes() || {};
    var speechOutput = '';

    switch(scene) {
        case 0:
          speechOutput = CONTINUE_GAME;
          break;
        case 1:
          speechOutput = SCENE_ONE_DOWN + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 2:
          speechOutput = SCENE_TWO_DOWN + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 3:
          speechOutput = SCENE_THREE_DARK + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 4:
          speechOutput = SCENE_FOUR_DOWN + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 5:
          if (attributes.florecentLightValue === true) {
            speechOutput = SCENE_FIVE_DOWN_BUZZ + HALF_BREAK + STANDARD_END_MESSAGE;
          } else {
            speechOutput = SCENE_FIVE_DOWN + HALF_BREAK + STANDARD_END_MESSAGE;
          }
          break;
        case 6:
          speechOutput = SCENE_SIX_DOWN + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 7:
          sceneSevenDownQuestion = true;
          speechOutput = SCENE_SEVEN_DOWN + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 8:
          speechOutput = SCENE_EIGHT_DOWN + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 9:
          speechOutput = SCENE_NINE_DOWN + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 10:
          speechOutput = SCENE_TEN_DOWN + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 11:
          speechOutput = SCENE_ELEVEN_DOWN + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        default:
          speechOutput = 'We apologize. It seems we have encountered an error with your request.';
          break;
    }

    const repromptOutput = STANDARD_REPROMT;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(repromptOutput)
      .getResponse();
  },
};

const DirectionForwardHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'direction_forward'
    );
  },
  async handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const attributes = await attributesManager.getPersistentAttributes() || {};
    var speechOutput = '';

    switch(scene) {
        case 0:
          speechOutput = CONTINUE_GAME;
          break;
        case 1:
          speechOutput = SCENE_ONE_FORWARD + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 2:
            speechOutput = SCENE_TWO_FORWARD + HALF_BREAK + STANDARD_END_MESSAGE;
            break;
        case 3:
            speechOutput = SCENE_THREE_LIGHT_PROMPT + HALF_BREAK + STANDARD_END_MESSAGE;
            break;
        case 4:
            speechOutput = SCENE_FOUR_FORWARD + HALF_BREAK + STANDARD_END_MESSAGE;
            break;
        case 5:
          if (attributes.florecentLightValue === true) {
            speechOutput = SCENE_FIVE_FORWARD_BUZZ + HALF_BREAK + STANDARD_END_MESSAGE;
          } else {
            speechOutput = SCENE_FIVE_FORWARD + HALF_BREAK + STANDARD_END_MESSAGE;
          }
          break;
        case 6:
          if (attributes.roofAccess === true) {
            scene = 7;
            attributes.sceneValue = 'roof';
            attributesManager.setPersistentAttributes(attributes);
            await attributesManager.savePersistentAttributes();
            speechOutput = SCENE_SIX_FORWARD_OPENED;
          } else if (attributes.hammerValue === true) {
            scene = 7;
            attributes.sceneValue = 'roof';
            attributes.roofAccess = true;
            attributesManager.setPersistentAttributes(attributes);
            await attributesManager.savePersistentAttributes();
            speechOutput = SCENE_SIX_FORWARD_HAMMER + SCENE_SEVEN_INTRO + HALF_BREAK + STANDARD_END_MESSAGE;
          } else {
            speechOutput = SCENE_SIX_FORWARD_NO_HAMMER + HALF_BREAK + STANDARD_END_MESSAGE;
          }
          break;
        case 7:
          speechOutput = SCENE_SEVEN_FORWARD + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 8:
          scene = 10;
          attributes.sceneValue = 'docks';
          attributesManager.setPersistentAttributes(attributes);
          await attributesManager.savePersistentAttributes();
          speechOutput = SCENE_EIGHT_FORWARD + SCENE_TEN_INTRO + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 9:
          speechOutput = SCENE_NINE_FORWARD + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 10:
          speechOutput = SCENE_TEN_FORWARD + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 11:
          speechOutput = SCENE_ELEVEN_FORWARD + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        default:
            speechOutput = 'We apologize. It seems we have encountered an error with your request.';
            break;
    }

    const repromptOutput = STANDARD_REPROMT;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(repromptOutput)
      .getResponse();
  },
};

const DirectionBackwardHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'direction_backward'
    );
  },
  async handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const attributes = await attributesManager.getPersistentAttributes() || {};
    var speechOutput = '';
    var repromptOutput = STANDARD_REPROMT;

    switch(scene) {
        case 0:
          speechOutput = CONTINUE_GAME;
          break;
        case 1:
          speechOutput = SCENE_ONE_BACKWARD + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 2:
          sceneTwoBackwardQuestion = true;
          speechOutput = SCENE_TWO_BACKWARD_QUESTION;
          repromptOutput = SCENE_TWO_BACKWARD_REPROMPT;
          break;
        case 3:
          scene = 2;
          attributes.sceneValue = 'hallway';
          attributesManager.setPersistentAttributes(attributes);
          await attributesManager.savePersistentAttributes();
          speechOutput = SCENE_THREE_BACKWARD + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 4:
          scene = 2;
          attributes.sceneValue = 'hallway';
          attributesManager.setPersistentAttributes(attributes);
          await attributesManager.savePersistentAttributes();
          speechOutput = SCENE_FOUR_BACKWARD + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 5:
          scene = 2;
          attributes.sceneValue = 'hallway';
          attributesManager.setPersistentAttributes(attributes);
          await attributesManager.savePersistentAttributes();
          if (attributes.florecentLightValue === true) {
            speechOutput = SCENE_FIVE_BACKWARD_BUZZ + HALF_BREAK + STANDARD_END_MESSAGE;
          } else {
            speechOutput = SCENE_FIVE_BACKWARD + HALF_BREAK + STANDARD_END_MESSAGE;
          }
          break;
        case 6:
          sceneSixBackwardQuestion = true;
          speechOutput = SCENE_SIX_BACKWARD;
          break;
        case 7:
          scene = 8;
          attributes.sceneValue = 'courtyard';
          attributes.courtyardAccess = true;
          attributesManager.setPersistentAttributes(attributes);
          await attributesManager.savePersistentAttributes();
          speechOutput = SCENE_SEVEN_BACKWARD + SCENE_EIGHT_INTRO + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 8:
          scene = 7;
          attributes.sceneValue = 'roof';
          attributesManager.setPersistentAttributes(attributes);
          await attributesManager.savePersistentAttributes();
          speechOutput = SCENE_EIGHT_BACKWARD + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 9:
          scene = 8;
          attributes.sceneValue = 'courtyard';
          attributesManager.setPersistentAttributes(attributes);
          await attributesManager.savePersistentAttributes();
          speechOutput = SCENE_NINE_BACKWARD + SCENE_EIGHT_INTRO + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 10:
          scene = 8;
          attributes.sceneValue = 'courtyard';
          attributesManager.setPersistentAttributes(attributes);
          await attributesManager.savePersistentAttributes();
          speechOutput = SCENE_TEN_BACKWARD + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        case 11:
          scene = 10;
          attributes.sceneValue = 'docks';
          attributesManager.setPersistentAttributes(attributes);
          await attributesManager.savePersistentAttributes();
          speechOutput = SCENE_ELEVEN_BACKWARD + SCENE_TEN_INTRO + HALF_BREAK + STANDARD_END_MESSAGE;
          break;
        default:
          speechOutput = 'We apologize. It seems we have encountered an error with your request.';
          break;
    }


    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(repromptOutput)
      .getResponse();
  },
};

const GetHintIntent = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'get_hint'
    );
  },
  async handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const attributes = await attributesManager.getPersistentAttributes() || {};
    const locale = handlerInput.requestEnvelope.request.locale;
    const monetizationClient = handlerInput.serviceClientFactory.getMonetizationServiceClient();

    var repromptOutput = STANDARD_REPROMT;

    //checking to make sure there are hints remaining
    if (attributes.numOfHints > 0) {
      attributes.numOfHints = attributes.numOfHints - 1;
      attributes.lastHintValue = getHint(attributesManager,attributes);
      attributesManager.setPersistentAttributes(attributes);
      await attributesManager.savePersistentAttributes();

      var speechOutput = getHint(attributesManager,attributes) + HALF_BREAK + STANDARD_END_MESSAGE;

      return handlerInput.responseBuilder
        .speak(speechOutput)
        .reprompt(repromptOutput)
        .getResponse();
    } else {
        return monetizationClient.getInSkillProducts(locale).then(function(res){
          // Filter the list of products available for purchase to find the product with the reference name "Challenge_Pack"
          const additionalHintsProduct = res.inSkillProducts.filter(
            record => record.referenceName === 'Additional_Hints'
          );
        const speechText = "It seems that you have no more hints remaining.";
        return makeUpsell(speechText,additionalHintsProduct,handlerInput);
      });
    }
  },
};

function getHint(attributesManager, attributes) {
  if (attributes.spoonValue === false) {
    return HINT_1;
  } else {
    if (attributes.posterValue === false) {
      return HINT_2;
    } else {
      if (attributes.powerSwitch === false) {
        return HINT_3;
      } else {
        if (attributes.steelKeyValue === false) {
          return HINT_4;
        } else {
          if (attributes.sceneFourDoorValue === false) {
            return HINT_5;
          } else {
            if (attributes.smallSilverKeyValue === false) {
              return HINT_6;
            } else {
              if (attributes.hammerValue === false) {
                return HINT_7;
              } else {
                if (attributes.roofAccess === false) {
                  return HINT_8;
                } else {
                  if (attributes.courtyardAccess === false) {
                    return HINT_9;
                  } else {
                    if (attributes.copperKeyValue === false) {
                      return HINT_10;
                    } else {
                      if (attributes.gasValue === false) {
                        return HINT_11;
                      } else {
                        if (attributes.notebookValue === false) {
                          return HINT_12;
                        } else {
                          if (attributes.boatKeyValue === false) {
                            return HINT_13;
                          } else {
                            return HINT_14;
                            //end game
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

const RepeatHintIntent = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'repeat_hint'
    );
  },
  async handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const attributes = await attributesManager.getPersistentAttributes() || {};
    var speechOutput = '';
    var repromptOutput = STANDARD_REPROMT;

    //checking to make sure there are hints remaining
    if (attributes.lastHintValue === 'NONE') {
      speechOutput = NO_LAST_HINT + HALF_BREAK + STANDARD_END_MESSAGE;
    } else {
      var lastHint = attributes.lastHintValue;
      speechOutput = lastHint + HALF_BREAK + STANDARD_END_MESSAGE;
    }
    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(repromptOutput)
      .getResponse();
  },
};

const CheckHintsIntent = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'check_hints'
    );
  },
  async handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const attributes = await attributesManager.getPersistentAttributes() || {};
    const locale = handlerInput.requestEnvelope.request.locale;
    const monetizationClient = handlerInput.serviceClientFactory.getMonetizationServiceClient();
    var speechOutput = '';
    var repromptOutput = STANDARD_REPROMT;

    if (attributes.numOfHints === 1) {
      speechOutput = 'You have ' + attributes.numOfHints.toString() + ' hint remaining.' + HALF_BREAK + STANDARD_END_MESSAGE;
    } else if (attributes.numOfHints > 0) {
      speechOutput = 'You have ' + attributes.numOfHints.toString() + ' hints remaining.' + HALF_BREAK + STANDARD_END_MESSAGE;
    } else {
      return monetizationClient.getInSkillProducts(locale).then(function(res){
        // Filter the list of products available for purchase to find the product with the reference name "Challenge_Pack"
        const additionalHintsProduct = res.inSkillProducts.filter(
          record => record.referenceName === 'Additional_Hints'
        );
      const speechText = "It seems that you have no more hints remaining.";
      return makeUpsell(speechText,additionalHintsProduct,handlerInput);
    });
    }
    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(repromptOutput)
      .getResponse();
  },
};



const CheckInventoryHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'check_inventory'
    );
  },
  async handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const attributes = await attributesManager.getPersistentAttributes() || {};
    var speechOutput = checkInventory(attributesManager,attributes) + HALF_BREAK + STANDARD_END_MESSAGE;

    const repromptOutput = STANDARD_REPROMT;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(repromptOutput)
      .getResponse();
  },
};

function checkInventory(attributesManager,attributes) {
  //checking what inventory consist of
  if (attributes.spoonValue === true) {
    if (attributes.steelKeyValue === true) {
      if (attributes.smallSilverKeyValue === true) {
        if (attributes.hammerValue === true) {
          if (attributes.notebookValue === true) {
            if (attributes.copperKeyValue === true) {
              if (attributes.boatKeyValue === true) {
                if (attributes.gasValue === true) {
                  return INVEN_FULL;
                } else {
                  return INVEN_1234567;
                }
              } else {
                  if (attributes.gasValue === true) {
                    return INVEN_1234568;
                  } else {
                    return INVEN_123456;
                  }
              }
            } else {
                if (attributes.boatKeyValue === true) {
                  return INVEN_123457;
                } else {
                  return INVEN_12345;
                }
            }
          } else {
            if (attributes.copperKeyValue === true) {
              if (attributes.boatKeyValue === true) {
                if (attributes.gasValue === true) {
                  return INVEN_1234678;
                } else {
                  return INVEN_123467;
                }
              } else {
                  if (attributes.gasValue === true) {
                    return INVEN_123468;
                  } else {
                    return INVEN_12346;
                  }
              }
            } else {
                if (attributes.boatKeyValue === true) {
                  return INVEN_12347;
                } else {
                  return INVEN_1234;
                }
            }
          }
        } else {
          if (attributes.notebookValue === true) {
            //spoon steelkey silver key notebook
            return INVEN_1235;
          } else {
            //spoon steelkey silver key
            return INVEN_123;
          }
        }
      } else {
          if (attributes.notebookValue === true) {
            //spoon steelkey notebook
            return INVEN_125;
          } else {
            //spoon steelkey
            return INVEN_12;
          }
      }
    } else {
      //spoon
      return INVEN_1;
    }
  } else {
    //nothing
    return EMPTY_INVENTORY;
  }
}

//=========================================================================================================================================
//Inspect Handlers
//=========================================================================================================================================

const InspectSpoonHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'inspect_spoon'
    );
  },
  async handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const attributes = await attributesManager.getPersistentAttributes() || {};
    var speechOutput = '';


    if (attributes.spoonValue === true) {
      speechOutput = CHECK_SPOON + HALF_BREAK + STANDARD_END_MESSAGE; //if user already has a spoon
    } else if (scene === 1) {
        inventory.push('spoon');
        attributes.spoonValue = true;
        attributesManager.setPersistentAttributes(attributes);
        await attributesManager.savePersistentAttributes();
        speechOutput = INSPECT_SPOON + HALF_BREAK + STANDARD_END_MESSAGE; //user finds a spoon
    } else {
      speechOutput = NO_ITEM + HALF_BREAK + STANDARD_END_MESSAGE;
    }

    const repromptOutput = STANDARD_REPROMT;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(repromptOutput)
      .getResponse();
  },
};

const InspectPosterHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'inspect_poster'
    );
  },
  async handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const attributes = await attributesManager.getPersistentAttributes() || {};
    var speechOutput = '';

    if (scene === 1) {
      if (attributes.spoonValue === true) {
        scene = 2;
        attributes.sceneValue = 'hallway';
        attributes.posterValue = true;
        attributesManager.setPersistentAttributes(attributes);
        await attributesManager.savePersistentAttributes();
        speechOutput = INSPECT_POSTER_SPOON + SCENE_TWO_INTRO + HALF_BREAK + STANDARD_END_MESSAGE;
      } else {
        speechOutput = INSPECT_POSTER_NO_SPOON + HALF_BREAK + STANDARD_END_MESSAGE;
      }
    } else {
      speechOutput = NO_ITEM + HALF_BREAK + STANDARD_END_MESSAGE;
    }

    const repromptOutput = STANDARD_REPROMT;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(repromptOutput)
      .getResponse();
  },
};

const InspectPanelHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'inspect_panel'
    );
  },
  async handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const attributes = await attributesManager.getPersistentAttributes() || {};
    var speechOutput = '';

    if (scene === 4) {
      if (attributes.powerSwitch === false) {
        attributes.powerSwitch = true;
        attributesManager.setPersistentAttributes(attributes);
        await attributesManager.savePersistentAttributes();
        speechOutput = SCENE_FOUR_INSPECT_PANEL + HALF_BREAK + STANDARD_END_MESSAGE; //if user already has a spoon
      } else {
        speechOutput = SCENE_FOUR_INSPECT_PANEL_CONNECTED + HALF_BREAK + STANDARD_END_MESSAGE;
      }
    } else {
        speechOutput = NO_ITEM + HALF_BREAK + STANDARD_END_MESSAGE;
    }

    const repromptOutput = STANDARD_REPROMT;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(repromptOutput)
      .getResponse();
  },
};

const InspectToolboxHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'inspect_toolbox'
    );
  },
  async handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const attributes = await attributesManager.getPersistentAttributes() || {};
    var speechOutput = '';


    if (attributes.toolboxValue === true && scene === 4) {
      speechOutput = SCENE_FOUR_INSPECT_TOOLBOX_OPENED + HALF_BREAK + STANDARD_END_MESSAGE; //if user already has a spoon
    } else if (scene === 4) {
        if (attributes.smallSilverKeyValue === false && attributes.steelKeyValue === false) {
          speechOutput = SCENE_FOUR_INSPECT_TOOLBOX_NO_KEY + HALF_BREAK + STANDARD_END_MESSAGE; //user finds a spoon
        } else if (attributes.smallSilverKeyValue === false && attributes.steelKeyValue === true) {
          speechOutput = SCENE_FOUR_INSPECT_TOOLBOX_WRONG_KEY + HALF_BREAK + STANDARD_END_MESSAGE;
        } else {
          inventory.push('screwdriver');
          inventory.push('hammer');
          attributes.toolboxValue = true;
          attributes.hammerValue = true;
          attributesManager.setPersistentAttributes(attributes);
          await attributesManager.savePersistentAttributes();
          speechOutput = SCENE_FOUR_INSPECT_TOOLBOX_CORRECT_KEY + HALF_BREAK + STANDARD_END_MESSAGE;
        }
    } else {
      speechOutput = NO_ITEM + HALF_BREAK + STANDARD_END_MESSAGE;
    }

    const repromptOutput = STANDARD_REPROMT;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(repromptOutput)
      .getResponse();
  },
};

const InspectDoorHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'inspect_door'
    );
  },
  async handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const attributes = await attributesManager.getPersistentAttributes() || {};
    var speechOutput = '';

    if (scene === 4) {
      if (attributes.sceneFourDoorValue === true) {
        scene = 6;
        attributes.sceneValue = 'laundry-room';
        attributesManager.setPersistentAttributes(attributes);
        await attributesManager.savePersistentAttributes();
        speechOutput = SCENE_FOUR_INSPECT_DOOR_OPENED + HALF_BREAK + STANDARD_END_MESSAGE;
      } else if (attributes.steelKeyValue === true) {
        scene = 6;
        attributes.sceneValue = 'laundry-room';
        attributes.sceneFourDoorValue = true;
        attributesManager.setPersistentAttributes(attributes);
        await attributesManager.savePersistentAttributes();
        speechOutput = SCENE_FOUR_INSPECT_DOOR_CORRECT_KEY + HALF_BREAK + SCENE_SIX_INTRO + HALF_BREAK + STANDARD_END_MESSAGE;
      } else {
        speechOutput = SCENE_FOUR_INSPECT_DOOR_NO_KEY + HALF_BREAK + STANDARD_END_MESSAGE;
      }
    } else if (scene === 1) {
        speechOutput = SCENE_ONE_INSPECT_DOOR + HALF_BREAK + STANDARD_END_MESSAGE;
    } else if (scene === 6) {
      if (attributes.hammerValue === true) {
        speechOutput = SCENE_SIX_INSPECT_DOOR_HAMMER + HALF_BREAK + STANDARD_END_MESSAGE;
      } else {
        speechOutput = SCENE_SIX_INSPECT_DOOR_NO_HAMMER + HALF_BREAK + STANDARD_END_MESSAGE;
      }
    } else {
      speechOutput = NO_ITEM + HALF_BREAK + STANDARD_END_MESSAGE;
    }

    const repromptOutput = STANDARD_REPROMT;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(repromptOutput)
      .getResponse();
  },
};

const InspectKeyHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'inspect_key'
    );
  },
  async handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const attributes = await attributesManager.getPersistentAttributes() || {};
    var speechOutput = '';
    const repromptOutput = STANDARD_REPROMT;

    switch (attributes.sceneValue) {
      case 'lit-room':
        if (attributes.steelKeyValue === false) {
          attributes.steelKeyValue = true;
          attributesManager.setPersistentAttributes(attributes);
          await attributesManager.savePersistentAttributes();
          speechOutput = SCENE_FIVE_INSPECT_KEY + HALF_BREAK + STANDARD_END_MESSAGE;
        } else {
          speechOutput = SCENE_FIVE_INSPECT_KEY_OWNED + HALF_BREAK + STANDARD_END_MESSAGE;
        }
        break;
      case 'wardens-office':
        if (attributes.copperKeyValue === false) {
          attributes.copperKeyValue = true;
          attributesManager.setPersistentAttributes(attributes);
          await attributesManager.savePersistentAttributes();
          speechOutput = SCENE_NINE_INSPECT_KEY + HALF_BREAK + STANDARD_END_MESSAGE;
        } else {
          speechOutput = SCENE_NINE_INSPECT_KEY_OWNED + HALF_BREAK + STANDARD_END_MESSAGE;
        }
        break;
      default:
        if (attributes.steelKeyValue === true && attributes.smallSilverKeyValue === true && attributes.copperKeyValue === true && attributes.boatKeyValue === true) {
          speechOutput = INSPECT_FOUR_KEYS + HALF_BREAK + STANDARD_END_MESSAGE;
        } else if (attributes.steelKeyValue === true && attributes.smallSilverKeyValue === true && attributes.boatKeyValue === true) {
          speechOutput = INSPECT_THREE_KEYS_NO_COPPER + HALF_BREAK + STANDARD_END_MESSAGE;
        } else if (attributes.steelKeyValue === true && attributes.smallSilverKeyValue === true && attributes.copperKeyValue === true) {
          speechOutput = INSPECT_THREE_KEYS + HALF_BREAK + STANDARD_END_MESSAGE;
        } else if (attributes.steelKeyValue === true && attributes.smallSilverKeyValue === true) {
          speechOutput = INSPECT_TWO_KEYS + HALF_BREAK + STANDARD_END_MESSAGE;
        } else if (attributes.steelKeyValue === true) {
          speechOutput = SCENE_FIVE_INSPECT_KEY_OWNED + HALF_BREAK + STANDARD_END_MESSAGE;
        } else {
          speechOutput = INSPECT_NO_KEYS + HALF_BREAK + STANDARD_END_MESSAGE;
        }
        break;
    }

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(repromptOutput)
      .getResponse();
  },
};

const InspectWindowHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'inspect_window'
    );
  },
  handle(handlerInput) {
    var speechOutput = '';

    if (scene === 6) {
        speechOutput = SCENE_SIX_INSPECT_WINDOW + HALF_BREAK + STANDARD_END_MESSAGE; //inspect window in laundry
    } else {
        speechOutput = NO_ITEM + HALF_BREAK + STANDARD_END_MESSAGE;
    }

    const repromptOutput = STANDARD_REPROMT;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(repromptOutput)
      .getResponse();
  },
};

const InspectNotebookHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'inspect_notebook'
    );
  },
  async handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const attributes = await attributesManager.getPersistentAttributes() || {};
    var speechOutput = '';

    if (scene === 6 && attributes.notebookValue === false) {
        attributes.notebookValue = true;
        attributesManager.setPersistentAttributes(attributes);
        await attributesManager.savePersistentAttributes();
        speechOutput = SCENE_SIX_INSPECT_NOTEBOOK + HALF_BREAK + STANDARD_END_MESSAGE;
    } else if (attributes.notebookValue === true) {
        speechOutput = SCENE_SIX_INSPECT_NOTEBOOK_OWNED + HALF_BREAK + STANDARD_END_MESSAGE;
    } else {
        speechOutput = NO_ITEM + HALF_BREAK + STANDARD_END_MESSAGE;
    }

    const repromptOutput = STANDARD_REPROMT;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(repromptOutput)
      .getResponse();
  },
};

const InspectUniformHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'inspect_uniform'
    );
  },
  async handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const attributes = await attributesManager.getPersistentAttributes() || {};
    var speechOutput = '';

    if (scene === 6) {
        attributes.smallSilverKeyValue = true;
        attributesManager.setPersistentAttributes(attributes);
        await attributesManager.savePersistentAttributes();
        speechOutput = SCENE_SIX_INSPECT_UNIFORM + HALF_BREAK + STANDARD_END_MESSAGE; //inspect window in laundry
    } else {
        speechOutput = NO_ITEM + HALF_BREAK + STANDARD_END_MESSAGE;
    }

    const repromptOutput = STANDARD_REPROMT;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(repromptOutput)
      .getResponse();
  },
};

const InspectSafeHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'inspect_safe'
    );
  },
  async handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const attributes = await attributesManager.getPersistentAttributes() || {};
    var speechOutput = '';

    if (scene === 9 && attributes.safeValue === false) {
      speechOutput = SCENE_NINE_INSPECT_SAFE;
    } else if (scene === 9 && attributes.safeValue === true) {
        speechOutput = SCENE_NINE_INSPECT_SAFE_OPENED + HALF_BREAK + STANDARD_END_MESSAGE;
    } else {
        speechOutput = NO_ITEM + HALF_BREAK + STANDARD_END_MESSAGE;
    }

    const repromptOutput = STANDARD_REPROMT;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(repromptOutput)
      .getResponse();
  },
};

const SafeComboHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'safe_combo'
    );
  },
  async handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const attributes = await attributesManager.getPersistentAttributes() || {};
    var speechOutput = '';
    //var safeComboSlot = this.event.request.intent.slots.combination.value;
    //var safeComboSlot = handlerInput.resuestEnvelope.request.intent.slots.combination.value.toString();
    const slots = handlerInput.requestEnvelope.request.intent.slots;
    const safeComboSlot = slots['combination'].value;

    if (scene === 9 && attributes.safeValue === false && safeComboSlot === '34153') {
      //correct combo
      attributes.safeValue = true;
      attributes.boatKeyValue = true;
      attributesManager.setPersistentAttributes(attributes);
      await attributesManager.savePersistentAttributes();
      speechOutput = SCENE_NINE_SAFE_COMBO_CORRECT + HALF_BREAK + STANDARD_END_MESSAGE;
    } else if (scene === 9 && attributes.safeValue === false && safeComboSlot != '34153') {
      //wrong combo
        speechOutput = SCENE_NINE_SAFE_COMBO_INCORRECT + HALF_BREAK + STANDARD_END_MESSAGE;
    } else {
      //safe not here
        speechOutput = NO_ITEM + HALF_BREAK + STANDARD_END_MESSAGE;
    }

    const repromptOutput = STANDARD_REPROMT;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(repromptOutput)
      .getResponse();
  },
};

const InspectSwitchHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'inspect_switch'
    );
  },
  async handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const attributes = await attributesManager.getPersistentAttributes() || {};
    var speechOutput = '';

    if (scene === 11) {
      speechOutput = SCENE_ELEVEN_INSPECT_SWITCH + HALF_BREAK + STANDARD_END_MESSAGE;
    } else {
        speechOutput = NO_ITEM + HALF_BREAK + STANDARD_END_MESSAGE;
    }

    const repromptOutput = STANDARD_REPROMT;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(repromptOutput)
      .getResponse();
  },
};

const InspectGasHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'inspect_gas'
    );
  },
  async handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const attributes = await attributesManager.getPersistentAttributes() || {};
    var speechOutput = '';

    if (scene === 11 && attributes.gasValue === false) {
      attributes.gasValue = true;
      attributesManager.setPersistentAttributes(attributes);
      await attributesManager.savePersistentAttributes();
      speechOutput = SCENE_ELEVEN_INSPECT_GAS + HALF_BREAK + STANDARD_END_MESSAGE;
    } else if (attributes.gasValue === true) {
        speechOutput = SCENE_ELEVEN_INSPECT_GAS_OWNED + HALF_BREAK + STANDARD_END_MESSAGE;
    } else {
        speechOutput = NO_ITEM + HALF_BREAK + STANDARD_END_MESSAGE;
    }

    const repromptOutput = STANDARD_REPROMT;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(repromptOutput)
      .getResponse();
  },
};


//=========================================================================================================================================
//Purchase Handlers
//=========================================================================================================================================

const WhatCanIBuyHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "WhatCanIBuyIntent"
    );
  },
  handle(handlerInput) {
    // Inform the user about what products are available for purchase
    const locale = handlerInput.requestEnvelope.request.locale;
    const monetizationClient = handlerInput.serviceClientFactory.getMonetizationServiceClient();
    var repromptOutput = STANDARD_REPROMT;

    return monetizationClient.getInSkillProducts(locale).then(function(res){
      // Filter the list of products available for purchase to find the product with the reference name "Greetings_Pack"
      const purchasableProducts = res.inSkillProducts.filter(
        record =>
          //record.entitled === "NOT_ENTITLED" &&
          record.purchasable === "PURCHASABLE"
      );
      const additionalHintsProduct = res.inSkillProducts.filter(
        record => record.referenceName === 'Additional_Hints'
      );

        if ((locale === 'en-US' || locale === 'en-GB') && purchasableProducts.length > 0) {
          const speechText = "Here\'s what I found.";
          return makeUpsell(speechText,additionalHintsProduct,handlerInput);
        } else if (locale != 'en-US' && locale != 'en-GB') {
            const speechOutput = "Unfortunately we do not offer purchases in your region." + HALF_BREAK + STANDARD_END_MESSAGE;

            return handlerInput.responseBuilder
              .speak(speechOutput)
              .reprompt(repromptOutput)
              .getResponse();
        } else {
          const speakOutput = `We do not have any available products at this time.` + HALF_BREAK + STANDARD_END_MESSAGE;
          return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repromptOutput)
            .getResponse();
          }
    		});
    	}
    };

const BuyHintsIntentHandler = {
	canHandle(handlerInput){
		return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
		handlerInput.requestEnvelope.request.intent.name === 'BuyHintsIntent';
	},
	handle(handlerInput){
		const locale = handlerInput.requestEnvelope.request.locale;
		const monetizationClient = handlerInput.serviceClientFactory.getMonetizationServiceClient();
    var repromptOutput = STANDARD_REPROMT;

		return monetizationClient.getInSkillProducts(locale).then(function(res){
			// Filter the list of products available for purchase to find the product with the reference name "Additional_Hints"
			const additionalHintsProduct = res.inSkillProducts.filter(
				record => record.referenceName === 'Additional_Hints'
			);

      if (locale != 'en-US' && locale != 'en-GB'){
          const speechOutput = "Unfortunately we do not offer purchases in your region." + HALF_BREAK + STANDARD_END_MESSAGE;

          return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(repromptOutput)
            .getResponse();
      } else {
				//Make the buy offer for Challenge Pack
				return makeBuyOffer(additionalHintsProduct,handlerInput);
			}
		});
	}
};

const PurchaseHistoryIntentHandler = {
	canHandle(handlerInput) {
		return (
			handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'PurchaseHistoryIntent'
		);
	},
	handle(handlerInput) {
		const locale = handlerInput.requestEnvelope.request.locale;
		const monetizationClient = handlerInput.serviceClientFactory.getMonetizationServiceClient();
    var repromptOutput = STANDARD_REPROMT;

		return monetizationClient.getInSkillProducts(locale).then(function(res) {
			const entitledProducts = res.inSkillProducts.filter(
        record =>
          record.entitled === "ENTITLED"
      );

			if (entitledProducts && entitledProducts.length > 0) {
				const speechText = `You have previously purchased additional hints. If you would like to request a hint, say something like, \"give me a hint\"` + HALF_BREAK + STANDARD_END_MESSAGE;

      	return handlerInput.responseBuilder
					.speak(speechText)
					.reprompt(repromptOutput)
					.getResponse();
			} else if (locale != 'en-US' && locale != 'en-GB'){
        const speechText = `Unfortunately we do not offer purchasable products in your region. However, you can still enjoy the rest of the game.\"` + HALF_BREAK + STANDARD_END_MESSAGE;

      	return handlerInput.responseBuilder
					.speak(speechText)
					.reprompt(repromptOutput)
					.getResponse();
      } else {
  				const speechText = 'You haven\'t purchased anything yet. To learn more about the products you can buy, say, what can I buy.' + HALF_BREAK + STANDARD_END_MESSAGE;
  				repromptOutput = `You asked me to check your purchase history, but you haven't purchased anything yet. You can say, what can I buy.` + HALF_BREAK + STANDARD_END_MESSAGE;

  				return handlerInput.responseBuilder
  					.speak(speechText)
  					.reprompt(repromptOutput)
  					.getResponse();
			}
		});
	}
};

const RefundIntentHandler = {
	canHandle(handlerInput) {
		return (
			handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'RefundIntent'
		);
	},
	handle(handlerInput) {
		const locale = handlerInput.requestEnvelope.request.locale;
		const monetizationClient = handlerInput.serviceClientFactory.getMonetizationServiceClient();

		return monetizationClient.getInSkillProducts(locale).then(function(res) {
			const premiumProduct = res.inSkillProducts.filter(
				record => record.referenceName === 'Additional_Hints'
			);
			return handlerInput.responseBuilder
				.addDirective({
					type: 'Connections.SendRequest',
					name: 'Cancel',
					payload: {
						InSkillProduct: {
							productId: premiumProduct[0].productId
						}
					},
					token: 'correlationToken'
				})
				.getResponse();
		});
	}
};

//handles after purchase //ACCEPTED or DECLINED
const ConnectionsResponseHandler = {
  canHandle(handlerInput){
		return handlerInput.requestEnvelope.request.type === 'Connections.Response' &&
        (handlerInput.requestEnvelope.request.name === 'Buy' ||
        handlerInput.requestEnvelope.request.name === 'Upsell');
	},
  async handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const attributes = await attributesManager.getPersistentAttributes() || {};
    var repromptOutput = STANDARD_REPROMT;
    var speechOutput = STANDARD_END_MESSAGE;

    switch (handlerInput.requestEnvelope.request.payload.purchaseResult) {
          case "ACCEPTED":
            attributes.numOfHints = attributes.numOfHints + 3;
            attributesManager.setPersistentAttributes(attributes);
            await attributesManager.savePersistentAttributes();
            speechOutput = "To request a hint, try saying something like, \"give me a hint\"";
            repromptOutput = "You just purchased three additional hints. To use one, try saying something like, \"give me a hint\"";

            return handlerInput.responseBuilder
              .speak(speechOutput)
              .reprompt(repromptOutput)
              .getResponse();
            break;
          case "DECLINED":
            speechOutput = "Maybe next time." + HALF_BREAK + STANDARD_END_MESSAGE;

            return handlerInput.responseBuilder
              .speak(speechOutput)
              .reprompt(repromptOutput)
              .getResponse();
            break;
          default:
          return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(repromptOutput)
            .getResponse();
            break;
    }
  },
};

const CancelProductResponseHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'Connections.Response' &&
      handlerInput.requestEnvelope.request.name === 'Cancel';
	},
	handle(handlerInput) {
		const locale = handlerInput.requestEnvelope.request.locale;
		const monetizationClient = handlerInput.serviceClientFactory.getMonetizationServiceClient();
		const productId = handlerInput.requestEnvelope.request.payload.productId;

		return monetizationClient.getInSkillProducts(locale).then(function(res) {
			const product = res.inSkillProducts.filter(
				record => record.productId === productId
			);

			console.log(
				`PRODUCT = ${JSON.stringify(product)}`
			);

			if (handlerInput.requestEnvelope.request.status.code === '200') {
				//Alexa handles the speech response immediately following the cancelation reqquest.
				//It then passes the control to our CancelProductResponseHandler() along with the status code (ACCEPTED, DECLINED, NOT_ENTITLED)
				//We use the status code to stitch additional speech at the end of Alexa's cancelation response.
				//Currently, we have the same additional speech (getRandomYesNoQuestion)for accepted, canceled, and not_entitled. You may edit these below, if you like.
				if (handlerInput.requestEnvelope.request.payload.purchaseResult === 'ACCEPTED') {
					//The cancelation confirmation response is handled by Alexa's Purchase Experience Flow.
					//Simply add to that with getRandomYesNoQuestion()
          const speechText = 'We hope you continue to enjoy the game.';

  				return handlerInput.responseBuilder
  					.speak(speechText)
  					.withShouldEndSession(true)
  					.getResponse();
				}
				else if (handlerInput.requestEnvelope.request.payload.purchaseResult === 'DECLINED') {
          const speechText = 'We hope you continue to enjoy the game.';

  				return handlerInput.responseBuilder
  					.speak(speechText)
  					.withShouldEndSession(true)
  					.getResponse();
				}
				else if (handlerInput.requestEnvelope.request.payload.purchaseResult === 'NOT_ENTITLED') {
					//No subscription to cancel.
					//The "No subscription to cancel" response is handled by Alexa's Purchase Experience Flow.
					//Simply add to that with getRandomYesNoQuestion()
          const speechText = 'It doesn\'t look like you ever purchased additional hints';

  				return handlerInput.responseBuilder
  					.speak(speechText)
  					.withShouldEndSession(true)
  					.getResponse();
				}
        const speechText = 'We hope you continue to enjoy the game.';

				return handlerInput.responseBuilder
					.speak(speechText)
					.getResponse();
			}
			// Something failed.
			console.log(
				`Connections.Response indicated failure. error: ${handlerInput.requestEnvelope.request.status.message}`
			);

			return handlerInput.responseBuilder
				.speak('There was an error handling your purchase request. Please try again or contact us for help.')
				.getResponse();
		});
	},
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    var repromptOutput = STANDARD_REPROMT;
    var speechOutput = HELP_MESSAGE + HALF_BREAK + STANDARD_END_MESSAGE;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(repromptOutput)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    quitStatus = true; //should set to true
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .reprompt(STOP_MESSAGE)
      .getResponse();
  },
};

//setting quit status as false by default unless called by ExitHandler.
//needs to be below ExitHandler to avoid being overwritten
quitStatus = false;

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak(`Error handled: ${error.message}`)
      .withShouldEndSession(true)
      .getResponse();
  },
};

function randomize(array){
	const randomItem = array[Math.floor(Math.random() * array.length)];
	return randomItem;
}

function getRandomLearnMorePrompt() {
	const questions = [
		'Want to learn more about it?',
		'Should I tell you more about it?',
		'Want to learn about it?',
		'Interested in learning more about it?'
	];
	return randomize(questions);
}

function makeUpsell(preUpsellMessage,additionalHintsProduct,handlerInput){
	let upsellMessage = `${preUpsellMessage} ${additionalHintsProduct[0].summary}. ${getRandomLearnMorePrompt()}`;

	return handlerInput.responseBuilder
		.addDirective({
			type: 'Connections.SendRequest',
			name: 'Upsell',
			payload: {
				InSkillProduct: {
					productId: additionalHintsProduct[0].productId
				},
				upsellMessage
			},
			token: 'correlationToken'
		})
		.getResponse();
}

function makeBuyOffer(theProduct,handlerInput){

	return handlerInput.responseBuilder
		.addDirective({
			type: 'Connections.SendRequest',
			name: 'Buy',
			payload: {
				InSkillProduct: {
					productId: theProduct[0].productId
				}
			},
			token: 'correlationToken'
		})
		.getResponse();
}

function isProduct(product) {
	return product && product.length > 0;
}

function isEntitled(product) {
	return isProduct(product) && product[0].entitled === 'ENTITLED';
}

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .withSkillId("amzn1.ask.skill.6bced5e0-3e1b-4dea-bf41-084d161a5ec5")
  .addRequestHandlers(
    LaunchRequestHandler,
    FallbackHandler,
    YesIntentHandler,
    NoIntentHandler,
    DirectionLeftHandler,
    DirectionRightHandler,
    DirectionUpHandler,
    DirectionDownHandler,
    DirectionForwardHandler,
    DirectionBackwardHandler,
    CheckInventoryHandler,
    GetHintIntent,
    RepeatHintIntent,
    CheckHintsIntent,
    InspectSpoonHandler,
    InspectPosterHandler,
    InspectPanelHandler,
    InspectToolboxHandler,
    InspectDoorHandler,
    InspectKeyHandler,
    InspectWindowHandler,
    InspectNotebookHandler,
    InspectUniformHandler,
    InspectSafeHandler,
    SafeComboHandler,
    InspectSwitchHandler,
    InspectGasHandler,
    WhatCanIBuyHandler,
    BuyHintsIntentHandler,
    PurchaseHistoryIntentHandler,
    RefundIntentHandler,
    ConnectionsResponseHandler,
    CancelProductResponseHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .withTableName('AlcatrazDB')
  .withAutoCreateTable(true)
  .lambda();
