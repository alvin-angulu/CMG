// Wait for the HTML document to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Get the game container element by its ID
    const gameContainer = document.getElementById('gameContainer');
    
    // Array containing pairs of card values. These will be the faces of the cards.
    const cardValues = ['KING', 'QUEEN', 'KNIGHT', 'QUEEN', 'JOKER', 'KNIGHT', 'JOKER', 'KING'];
    
    // An array to keep track of currently flipped cards (up to two at a time)
    let flippedCards = [];
    
    // Counter to keep track of how many matches have been found
    let matchesFound = 0;



    // Initialize the game by creating and displaying each card
    for (let value of cardValues) {
        // Create a new div element for each card
        const cardElement = document.createElement('div');
        
        // Add the 'card' class for styling and interaction
        cardElement.classList.add('card');
        
        
        // Store the card's value in a variable -> "value" for later comparison
        cardElement.dataset.value = value;
        
      
        // Add an event listener to the card for the 'click' event
        cardElement.addEventListener('click', () => {
            // Flip the card if it's not already flipped
            if (!cardElement.classList.contains('flipped')) {
                flipCard(cardElement);
            }
        });

        // Add the card element to the game container in the DOM
        gameContainer.appendChild(cardElement);
    };

    // Define the flipCard function to handle flipping a card
    function flipCard(card) {
        // Check if there are less than 2 cards currently flipped
        if (flippedCards.length < 2) {
            // Add the 'flipped' class to show the card's value
            card.classList.add('flipped');
            
            // Display the card's value
            card.textContent = card.dataset.value;
            
            // Add this card to the array of flipped cards
            flippedCards.push(card);

            // If there are two cards flipped, check for a match
            if (flippedCards.length === 2) {
              setTimeout(checkForMatch, 500);
            ///checkForMatch();
            }
        }
    }

    // Define the checkForMatch function to compare two flipped cards
    function checkForMatch() {
        // Check if the values of the two flipped cards match
        if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) {
            // Increment the match counter by 2
            matchesFound += 2;
            
            // Reset the flippedCards array for the next turn
            flippedCards = [];
            
            // Check if all matches have been found
            if (matchesFound === cardValues.length) {
               alert('Congratulations! You found all matches.');
            }
        } else {
            // If the cards do not match, flip them back over
           for(let card of flippedCards)  {
                card.classList.remove('flipped');
                card.textContent = '';
            };
            
            // Reset the flippedCards array for the next turn
            flippedCards = [];
        }
    }
});
