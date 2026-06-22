// Creat an list aka array of text to display and it'll cycle through them one by one, typing and deleting each phrase in turn
const phrases = [
  "I like to develop and create ... Sometimes",
  "Software Engineer, Web Developer & A Designer",
  "Always learning something new"
];

// This remembers WHICH phrase we are on ... 0 = 1st phrase, 1 = 2nd phrase, 2 = 3rd phrase
let phraseIndex = 0;

// This remembers HOW MANY letters we have typed so far in the current phrase ... Starts at 0 meaning no letters have been typed yet
let charIndex = 0;

// This is a true/false switch — like a light switch
// false = we are currently TYPING, true = we are currently DELETING
let isDeleting = false;

// This finds the empty <span id="typewriter"> box in your HTML and grabs that element to put some input text in
const el = document.getElementById("typewriter");

function type() {
  // Grab the current phrase from our playlist using phraseIndex
  const current = phrases[phraseIndex];

  if (isDeleting) {
    // DELETING mode: --> substring(0, charIndex) means "give me the first X letters of this phrase"
    // charIndex-- means we reduce X by 1 each time, so it looks like letters are disappearing
    el.textContent = current.substring(0, charIndex--);
  } else {
    // TYPING mode: --> Same idea but charIndex++ means we INCREASE X by 1 each time
    // so it looks like letters are appearing one by one
    el.textContent = current.substring(0, charIndex++);
  }
 //Speed of deletion is faster than speed of typing, so we use a ternary operator to set the speed variable
  let speed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === current.length + 1) {
    // We'll finish typing the whole phrase! then Wait 1.8 seconds so the reader can read it, then start deleting (Buffer like effect)
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    // We'll finish deleting the whole phrase! ... Then switch back to typing mode
    isDeleting = false;

// Move to the next phrase, % makes it loop back to 0 when it reaches the end
    phraseIndex = (phraseIndex + 1) % phrases.length;

    // Small pause before typing the next phrase
    speed = 400;
  }

  // Wait X milliseconds then run type() again — this is what keeps it looping
  setTimeout(type, speed);
}

// Wait for the page to fully load before running type()
document.addEventListener("DOMContentLoaded", type);