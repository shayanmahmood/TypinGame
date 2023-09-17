const typingText = document.querySelector(".typing-text p"),
    inpField = document.querySelector(".input-feild"),
    cpmTag = document.querySelector(".cpm span"),
    wpmTag = document.querySelector(".wpm span"),
    timeTag = document.querySelector(".time span b"),
    btn_reset = document.querySelector(".btn-reset"),
    bodyTxt = document.querySelector(".body_text"),
    misTag = document.querySelector(".mistake span");


let timer,
    maxTime = 60,
    timeLeft = maxTime;
charaIndex = 0,
    mistake = 0,
    isTyping = 0;

function randomParagraph() {
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = " ";
    paragraphs[3].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
    typingText.querySelectorAll("span")[0].classList.add("active");
}

function initTyping() {
   document.querySelector(".wrapper-ico").style.opacity = "1";
    let character = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charaIndex];
    if (charaIndex < character.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null) {
            charaIndex--;
            if (character[charaIndex].classList.contains("incorrect")) {
                mistake--;
                bodyTxt.innerHTML = "Good";
            }
            character[charaIndex].classList.remove("correct", "incorrect");
        }
        else {
            if (character[charaIndex].innerHTML == typedChar) {
                character[charaIndex].classList.add("correct");
            }
            else {
                mistake++;
                character[charaIndex].classList.add("incorrect");
                bodyTxt.innerHTML = "Oh-n0";
            }
            charaIndex++;
        }
        misTag.innerHTML = mistake;
        if (misTag.innerHTML > 10){
            bodyTxt.innerHTML = "Stay Focus";
        }
        character.forEach(span => span.classList.remove("active"));
        character[charaIndex].classList.add("active");
        cpm = charaIndex - mistake;
        cpmTag.innerHTML = cpm;
        if (cpmTag.innerHTML < 16){
         bodyTxt.innerHTML = "Made By Shayan";
         bodyTxt.style.fontSize = "16px";
        }
        let wpm = Math.round((((charaIndex - mistake) / 5) / (maxTime - timeLeft)) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        wpmTag.innerHTML = wpm;
        // console.log(character[charaIndex], typedChar);
    }
    else {
        clearInterval(timer);
        inpField.innerHTML = "";
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerHTML = timeLeft;
    }
    else {
        clearInterval(timer);
    }
}

function reset() {
    randomParagraph();
    maxTime = 60,
    timeLeft = maxTime,
    charIndex = 0,
    isTyping = 0,
    mistake = 0;
   
    timeTag.innerHTML = timeLeft;
    misTag.innerHTML  = mistake;
    wpmTag.innerHTML = 0;
    cpmTag.innerHTML = 0;
    
    inpField.value = "";
    clearInterval(timer);
}

randomParagraph();
inpField.addEventListener("input", initTyping);
btn_reset.addEventListener("click", reset);