export const inventoryItems = {
  "Safe Key": { name: "Safe Key", imageSrc: "items/key.png" },
  Cipher: {
    name: "Cipher",
    imageSrc: "items/note.png",
    detailImageSrc: "items/cipher_decoder.png",
  },
  "Bionic Eye": {
    name: "Bionic Eye",
    imageSrc: "items/bionic_eye.png",
  },
  Crowbar: {
    name: "Crowbar",
    imageSrc: "items/crowbar.png",
  },
  "Key Card": {
    name: "Key Card",
    imageSrc: "items/key_card.png",
  },
  "Mysterious Piece": {
    name: "Mysterious Piece",
    imageSrc: "items/mysterious_piece.png",
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
        key: null,
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
