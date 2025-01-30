const wordsWithHints = [
    // Easy words
     { word: "cat", hint: "A common household pet." },
     { word: "dog", hint: "Man's best friend." },
     { word: "sun", hint: "The center of our solar system." },
     { word: "car", hint: "A vehicle with four wheels." },
     { word: "hat", hint: "You wear it on your head." },
     { word: "pen", hint: "You use it to write." },
     { word: "book", hint: "You read it." },
     { word: "milk", hint: "A white drink, often from cows." },
     { word: "fish", hint: "Lives in water and swims." },
     { word: "cake", hint: "A sweet dessert, often for birthdays." },
   
     // Medium words
     { word: "table", hint: "You use it to place things on." },
     { word: "house", hint: "A place where you live." },
     { word: "chair", hint: "You sit on it." },
     { word: "phone", hint: "A device used to call someone." },
     { word: "clock", hint: "It tells the time." },
     { word: "light", hint: "You turn it on when it’s dark." },
     { word: "glass", hint: "You drink water from it." },
     { word: "brush", hint: "You use it to style your hair." },
     { word: "plane", hint: "It flies in the sky." },
     { word: "money", hint: "You use it to buy things." },
   
     // Tough words
     { word: "oxygen", hint: "You breathe it in to stay alive." },
     { word: "jungle", hint: "A dense forest with lots of animals." },
     { word: "puzzle", hint: "A game or problem to solve." },
     { word: "desert", hint: "A dry area with lots of sand." },
     { word: "island", hint: "Land surrounded by water." },
     { word: "bridge", hint: "It connects two places over water." },
     { word: "castle", hint: "A large building where kings live." },
     { word: "ladder", hint: "You use it to climb." },
     { word: "window", hint: "You can see through it in a wall." },
     { word: "rocket", hint: "It goes to space." },
   
     // Difficult words
     { word: "nebula", hint: "A cloud of gas in space." },
     { word: "tundra", hint: "A cold, treeless region." },
     { word: "quartz", hint: "A type of crystal or mineral." },
     { word: "harbor", hint: "A safe place for ships." },
     { word: "throne", hint: "A chair for a king or queen." },
     { word: "compass", hint: "It shows directions like north and south." },
     { word: "museum", hint: "A place where art and history are displayed." },
     { word: "sphere", hint: "A perfectly round 3D shape." },
     { word: "python", hint: "A type of snake or programming language." },
     { word: "plasma", hint: "A state of matter, like in stars." },
   
     // Very tough words
     { word: "epitome", hint: "A perfect example of something." },
     { word: "cryptic", hint: "Mysterious or hard to understand." },
     { word: "zephyr", hint: "A soft, gentle breeze." },
     { word: "serendipity", hint: "Finding something good by chance." },
     { word: "axiom", hint: "A statement accepted as true." },
     { word: "onyx", hint: "A precious black stone." },
     { word: "labyrinth", hint: "A maze with complex paths." },
     { word: "nirvana", hint: "A state of perfect happiness." },
     { word: "eclipse", hint: "When one celestial body blocks another." },
     { word: "photon", hint: "A particle of light." }
   ];
   
   const badJokes = [
     "That guess was so bad, I feel dumber just reading it.",
     "Wrong again! Maybe spellcheck could help you next time?",
     "You’re not bad at this… You’re the worst.",
     "Are you even trying? My grandma guesses better.",
     "That’s incorrect, but don’t worry—so was your life’s last decision."
   ];
   
   let currentWord = "";
   let currentHint = "";
   const selectRandomWord = () => wordsWithHints[Math.floor(Math.random() * wordsWithHints.length)];
   
   const showPopup = (message, joke) => {
     const popup = document.getElementById("popup");
     const popupMessage = document.getElementById("popupMessage");
     popupMessage.innerHTML = `${message}<b>${joke}</b>`;
     popup.style.display = "flex"; 
   };
   
   document.getElementById("closePopup").addEventListener("click", () => {
     document.getElementById("popup").style.display = "none";
   });
   
   const createWordBlocks = (word) => {
     const wordContainer = document.getElementById("wordContainer");
     wordContainer.innerHTML = "";
     word.split("").forEach(() => {
       const inputBlock = document.createElement("input");
       inputBlock.className = "letter-block";
       inputBlock.setAttribute("maxlength", "1");
       inputBlock.setAttribute("type", "text");
       wordContainer.appendChild(inputBlock);
     });
   
     const blocks = document.querySelectorAll(".letter-block");
     blocks.forEach((block, index) => {
       block.addEventListener("input", () => {
         if (block.value.length === 1 && index < blocks.length - 1) {
           blocks[index + 1].focus();
         }
       });
   
       block.addEventListener("keydown", (e) => {
         if (e.key === "Backspace" && block.value === "" && index > 0) {
           blocks[index - 1].focus();
         }
       });
     });
   };
   
   const resetGame = () => {
     const selected = selectRandomWord();
     currentWord = selected.word;
     currentHint = selected.hint;
     document.getElementById("hint").textContent = `Hint: ${currentHint}`;
     createWordBlocks(currentWord);
     document.getElementById("result").textContent = "";
   };
   
   const swapWord = () => {
     resetGame();
   };
   
   document.getElementById("submitGuess").addEventListener("click", () => {
     const blocks = document.querySelectorAll(".letter-block");
     let userGuess = "";
   
     blocks.forEach((block) => {
       userGuess += block.value.toLowerCase();
     });
   
     if (userGuess === currentWord) {
       document.getElementById("result").textContent = "🎉 Correct! You guessed it!";
       document.getElementById("result").style.color = "green";
       setTimeout(resetGame, 1000);
     } else {
       document.getElementById("result").textContent = "";
       const randomJoke = badJokes[Math.floor(Math.random() * badJokes.length)];
       showPopup(`❌ Wrong guess!`, randomJoke);
     }
   });
   
   document.getElementById("swapWord").addEventListener("click", swapWord); 
   
   resetGame(); 
   