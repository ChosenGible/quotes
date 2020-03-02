let personQuoted = "";
let numQuoteTotal = 0;
let numQuotesUsed = 0;
let numQuotesWon = 0;

function displayQuote(){
    let quoteBranchDecider = Math.round(Math.random());

    let quoteBlock = document.getElementById("quote");

    if (quoteBranchDecider === 0){
        personQuoted = "Kanye"
        let url = "https://api.kanye.rest";
        fetch(url)
            .then(function(response){
                if (response.status != 200){
                    return {
                        text: "Error calling Kanye Api Service: " + response.statusText
                    }
                }
                return response.json();
            }).then(function(json){
                quoteBlock.innerText = json.quote;
            })
    }
    else {
        personQuoted = "Trump";
        let url = "https://www.tronalddump.io/random/quote";
        fetch(url)
            .then(function(response){
                if (response.status != 200){
                    return {
                        text: "Error calling Trump Api Service: " + response.statusText
                    }
                }

                return response.json();
            }).then(function(json){
                quoteBlock.innerText = json.value;
            });
    }

    console.log(personQuoted);

}

function displayEnding(){
    let gamePage = "";
    gamePage += "<h2> You got " + numQuotesWon + " of "  + numQuoteTotal + " quotes correct!!!</h2>";
    gamePage += "<button id='playAgain'>Play Again</button>";

    document.getElementById("page").innerHTML = gamePage;

    console.log(document.getElementById("page"));
}

function displayStart(){
    let gamePage = "";
    gamePage += '<p class="imputPrompt">How many quotes would you like to try?</p>';
    gamePage += '<select id="numQuotes">';
    gamePage += '   <option value=1>1</option>';
    gamePage += '   <option value=2>2</option>';
    gamePage += '   <option value=3>3</option>';
    gamePage += '   <option value=4>4</option>';
    gamePage += '   <option value=5>5</option>';
    gamePage += '</select>';
    gamePage += '<button id="startGame">Start Game</button>';

    document.getElementById("page").innerHTML = gamePage;
}

function checkButtons(e){
    if (e.srcElement.id === 'donaldButton') {
        checkQuote("Trump");
    }
    else if (e.srcElement.id === 'kanyeButton') {
        checkQuote("Kanye");
    }
    else if (e.srcElement.id === 'playAgain'){
        displayStart();
    }
    else if (e.srcElement.id === 'startGame'){
        startGame();
    }
}

function checkQuote(answer){
    ++numQuotesUsed;
    if (answer === personQuoted){
        console.log("correct");
        numQuotesWon += 1;
        document.getElementById("score").innerText = numQuotesWon + " / " + numQuoteTotal;
    }
    else {
        console.log("false");
    }

    if (numQuotesUsed >= numQuoteTotal){    
        console.log("game finished");
        displayEnding();
    }
    else {
        displayQuote();
    }
}

function startGameWrapper(e){
    e.preventDefault();

    startGame();
}

function startGame() {
    numQuotesWon = 0;
    numQuotesUsed = 0;
    let numQuoteSelector = document.getElementById("numQuotes");
    let numQuotes = numQuoteSelector.options[numQuoteSelector.selectedIndex].value;

    let gamePage = "";
    gamePage += "<p id='quote'></p>";
    gamePage += '<div class="answerButtons">';
    gamePage += '   <button id="donaldButton">Donald Trump</button>';
    gamePage += '   <button id="kanyeButton">Kanye West</button>';
    gamePage += '</div>';
    gamePage += '<p id=score>0 / ' + numQuotes + '</p>';

    document.getElementById("page").innerHTML = gamePage;

    displayQuote();
    numQuoteTotal = numQuotes;
}


document.getElementById("startGame").addEventListener('click', startGameWrapper);
document.getElementById("page").addEventListener('click', checkButtons);