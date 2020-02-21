let personQuoted = "";

function displayQuote(){
    let quoteBranchDecider = Math.round(Math.random());

    let quoteBlock = document.getElementById("quote");

    if (quoteBranchDecider === 0){
        quoteBlock.innerText = "hi";
        personQuoted = "Kanye"
    }
    else {
        quoteBlock.innerText = "test";
        personQuoted = "Trump";
    }

}

function checkQuote(e, answer){
    console.log(e);
    e.preventDefault();

    if (answer === personQuoted){
        console.log("correct");
    }

    displayQuote();
}

function startGame(e) {
    e.preventDefault();

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

    console.log(personQuoted);

    document.getElementById("kanyeButton").addEventListener('click', checkQuote(event, "kanye"));
    document.getElementById("donaldButton").addEventListener('click', checkQuote(event, "Trump"));

}


document.getElementById("startGame").addEventListener('click', startGame);