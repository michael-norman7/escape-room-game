export const inventoryItems = {
  "Safe Key": {
    name: "Safe Key",
    imageSrc: "items/key.png",
    claimed: false,
  },
  Cipher: {
    name: "Cipher",
    imageSrc: "items/note.png",
    detailImageSrc: "items/cipher_decoder.png",
    claimed: false,
  },
  "Bionic Eye": {
    name: "Bionic Eye",
    imageSrc: "items/bionic_eye.png",
    claimed: false,
  },
  Crowbar: {
    name: "Crowbar",
    imageSrc: "items/crowbar.png",
    claimed: false,
  },
  "Key Card": {
    name: "Key Card",
    imageSrc: "items/key_card.png",
    claimed: false,
  },
  "Mysterious Piece": {
    name: "Mysterious Piece",
    imageSrc: "items/mysterious_piece.png",
    claimed: false,
  },
  "Security Clearance": {
    name: "Security Clearance",
    imageSrc: "items/key_card.png",
    claimed: false,
  },
  "Paper Clue": {
    name: "Paper Clue",
    imageSrc: "",
    claimed: false,
  },
};

export const room1Objects = [
  {
    id: "lockedBoxDisplayCase",
    position: { top: "420px", left: "230px", width: "110px", height: "90px" },
    title: "Left Display Case",
    content: {
      text: "",
      image: "puzzles/display_case.png",
      puzzle: {
        type: "locked_box",
        solved: false,
        key: "Safe Key",
        consume_key: true,
        id: "puzzle1_box",
        position: {
          top: "315px",
          left: "150px",
          width: "235px",
          height: "180px",
        },
        hint: "You need a key to open this box.",
        reward: inventoryItems["Cipher"],
      },
    },
  },
  {
    id: "vaseDisplayCase",
    position: { top: "420px", left: "340px", width: "110px", height: "90px" },
    title: "Middle Display Case",
    content: {
      text: "",
      image: "puzzles/vase_display_case.png",
      puzzle: {
        type: "locked_box",
        solved: false,
        key: "none",
        consume_key: false,
        id: "puzzle2_box",
        position: {
          top: "150px",
          left: "400px",
          width: "265px",
          height: "350px",
        },
        hint: "What could those letters possibly mean?",
        reward: null,
      },
    },
  },
  {
    id: "statueDisplayCase",
    position: { top: "420px", left: "450px", width: "110px", height: "90px" },
    title: "Right Display Case",
    content: {
      text: "",
      image: "puzzles/statue_display_case.png",
      puzzle: {
        type: "locked_box",
        solved: false,
        key: "Mysterious Piece",
        consume_key: true,
        id: "statue",
        position: {
          top: "165px",
          left: "475px",
          width: "225px",
          height: "325px",
        },
        hint: "Strange. It looks like someone broke the arms off of this.",
        reward: inventoryItems["Bionic Eye"],
      },
    },
  },
  {
    id: "painting",
    position: { top: "165px", left: "300px", width: "200px", height: "250px" },
    title: "Painting",
    key: "Crowbar",
    hint: "It feels like you could pull this painting off the wall but you are not strong enough to do it.",
    content: {
      text: "",
      image: "puzzles/painting.png",
      puzzle: {
        type: "locked_box",
        solved: false,
        key: "Crowbar",
        consume_key: true,
        id: "books",
        position: {
          top: "325px",
          left: "305px",
          width: "150px",
          height: "120px",
        },
        hint: "",
        reward: inventoryItems["Key Card"],
      },
    },
  },
  {
    id: "wallSafe",
    position: { top: "350px", left: "900px", width: "80px", height: "380px" },
    title: "Wall Safe",
    content: {
      text: "Enter a code to unlock the safe.",
      image: "",
      puzzle: {
        type: "4 digit code",
        code: "6396",
        colors: ["blue", "green", "orange", "red"],
        solved: false,
        consume_key: false,
        reward: [
          inventoryItems["Safe Key"],
          inventoryItems["Mysterious Piece"],
        ],
      },
    },
  },
  {
    id: "looseTile",
    position: { top: "565px", left: "550px", width: "75px", height: "50px" },
    title: "Loose Tile",
    hiddenBy: inventoryItems["Cipher"],
    content: {
      text: "",
      image: "",
      puzzle: {
        type: "locked_box",
        solved: true,
        key: null,
        consume_key: false,
        id: "crowbar",
        position: { top: "0px", left: "0px", width: "0px", height: "0px" },
        hint: "",
        reward: inventoryItems["Crowbar"],
      },
    },
  },
  {
    id: "terminal",
    position: { top: "640px", left: "100px", width: "350px", height: "130px" },
    title: "Terminal",
    content: {
      text: "Security Terminal",
      image: "puzzles/terminal.png",
      puzzle: {
        type: "terminal_security",
        solved: false,
        consume_key: true,
        requiredItems: ["Bionic Eye", "Key Card"],
        messages: {
          noBionicEyeNoKeyCard:
            "Hmmmm it looks like this security terminal requires both an optic scanner and a keycard!",
          bionicEyeNoKeyCard:
            "The eye scanner lights up green but it looks like this has two layers of security!",
          noBionicEyeKeyCard: "The terminal won't open without a keycard",
          success:
            "The terminal allowed access and it looks like some of the lasers went off…",
          opticalScannerPosition: {
            top: "200px",
            left: "580px",
            width: "125px",
            height: "100px",
          },
          cardScannerPosition: {
            top: "340px",
            left: "580px",
            width: "125px",
            height: "100px",
          },
        },
      },
    },
  },
];

export const room2StartObjects = [
  {
    id: "electricalPanel",
    position: { top: "410px", left: "910px", width: "180px", height: "350px" },
    title: "Electrical Panel",
    content: {
      text: "The room is dark. This electrical panel seems to be missing some connections...",
      puzzle: {
        type: "wire_puzzle",
        solved: false,
        consume_key: false,
        id: "wire_puzzle_1",
        hint: "Match the colored wires to restore power",
      },
    },
  },
];

export const room2MiddleObjects = [
  {
    id: "statueBase",
    position: { top: "440px", left: "610px", width: "105px", height: "100px" },
    title: "Statue Base",
    key: "Security Clearance",
    hint: "The statue appears to have a panel on the bottom but it is sealed tight and locked out by the security system.",
    content: {
      text: "",
      image: "",
      puzzle: {},
    },
  },
  {
    id: "rightDisplayCase",
    position: { top: "320px", left: "1150px", width: "130px", height: "270px" },
    title: "Right Display Case",
    content: {
      text: "",
      image: "puzzles/paper_on_right_wall.png",
      puzzle: {
        type: "auto_collect",
        solved: false,
        id: "paper_clue",
        reward: inventoryItems["Paper Clue"],
      },
    },
  },
  {
    id: "painting",
    position: { top: "310px", left: "10px", width: "140px", height: "270px" },
    title: "Painting",
    hiddenBy: inventoryItems["Paper Clue"],
    content: {
      text: "",
      image: "puzzles/BigBen.png",
    },
  },
  {
    id: "keyPad",
    position: { top: "530px", left: "910px", width: "60px", height: "90px" },
    title: "Keypad",
    content: {
      text: "",
      puzzle: {
        type: "4 digit code",
        id: "keypad_puzzle",
        code: "1200",
        solved: false,
        reward: inventoryItems["Security Clearance"],
      },
    },
  },
];

export const room2EndObjects = [
  {
    id: "lockedBoxDisplayCase",
    position: { top: "420px", left: "230px", width: "110px", height: "90px" },
    title: "Left Display Case",
    content: {
      text: "",
      image: "puzzles/display_case.png",
      puzzle: {
        type: "locked_box",
        solved: false,
        key: "Safe Key",
        consume_key: true,
        id: "puzzle1_box",
        position: {
          top: "315px",
          left: "150px",
          width: "235px",
          height: "180px",
        },
        hint: "You need a key to open this box.",
        reward: inventoryItems["Cipher"],
      },
    },
  },
];

export const roomData = {
  0: {
    videoSrc: "rooms/start_page.mp4",
    transitionVideoSrc: "",
    objects: [],
    remove_item: [],
  },
  1: {
    videoSrc: "rooms/Room1.mp4",
    transitionVideoSrc: "rooms/Room1Transition.mp4",
    objects: room1Objects,
    remove_item: [inventoryItems["Cipher"]],
  },
  2: {
    videoSrc: "rooms/Room2Start.png",
    transitionVideoSrc: "",
    objects: room2StartObjects,
    remove_item: [],
  },
  3: {
    videoSrc: "rooms/Room2Middle.png",
    transitionVideoSrc: "rooms/Room2MiddleEndTransition.mp4",
    objects: room2MiddleObjects,
    remove_item: [],
  },
  4: {
    videoSrc: "rooms/Room2End.png",
    transitionVideoSrc: "",
    objects: room2EndObjects,
    remove_item: [],
  },
};
