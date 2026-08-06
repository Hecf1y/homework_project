//gmail//
const emailValidation = /^[a-zA-Z0-9._%+-]{3,}@gmail\.com$/i;

const checkMailBtn = document.getElementById("gmail_button")
const gmailInput = document.getElementById("gmail_input")
const gmailResult = document.getElementById("gmail_result")

console.log(checkMailBtn);


checkMailBtn.onclick = () => {
    if (emailValidation.test(gmailInput.value)) {
        gmailResult.innerHTML = "OK"
        gmailResult.style.color = "green"
    }
    else {
        gmailResult.innerHTML = "NE OK"
        gmailResult.style.color = "red"
    }
}

//красный квадрат//
const parentBlock = document.querySelector('.parent_block');
const childBlock = document.querySelector('.child_block');

let position = 0;
const step = 3;
const maxPosition = parentBlock.offsetWidth - childBlock.offsetWidth;

function move() {
    position += step;

    if (position >= maxPosition) {
        childBlock.style.left = maxPosition + 'px';
        return;
    }
    childBlock.style.left = position + 'px';

    requestAnimationFrame(move);
}

move();