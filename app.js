

/* slider */

const next = document.querySelector(".next");
const prev =document.querySelector(".prev");
const imgContainer = document.querySelector(".container-image");
const img = document.querySelectorAll("img");


let currentImg = 0;
let interval;
let scrollDirection = true;

next.addEventListener("click", () => {
  clearInterval(interval);
  if (currentImg >= img.length - 1){
      scrollDirection = false;
  }else {
      updateImg(true);
      scrollDirection = true;
  }
  interval = setInterval(() => {
      updateImg(scrollDirection);
  }, 3000);
});

prev.addEventListener("click", () => {
    clearInterval(interval);
    if (currentImg <= img.length - 1){
        updateImg(false);
    } else {
        scrollDirection = false;
    }
    interval = setInterval(() => {
        updateImg(scrollDirection);
    }, 3000)
});

interval = setInterval(() => {
    updateImg(scrollDirection);
}, 2000)

function updateImg(goingRight) {
    if (goingRight){
        currentImg++;
    }
    if (!goingRight){
        currentImg--;
    }
    if (currentImg >= img.length - 1  && goingRight){
        scrollDirection = false;
    } else if (currentImg <= 0 && !goingRight){
        scrollDirection = true;
    }
    imgContainer.style.transform = `translateX(-${(currentImg - 1) * 40}em)`;
}


const container = document.querySelector(".string-img-container");
const cards = document.querySelector(".cards");
let isPressedDown = false;
let cursorXSpace;
container.addEventListener("mousedown", (e) => {
    isPressedDown = true;
    cursorXSpace = e.offsetX - cards.offsetLeft;
    container.style.cursor = "grabbing";
});

container.addEventListener("mouseup", () => {
    container.style.cursor = "grab";
});

window.addEventListener("mouseup", () => {
    isPressedDown = false;
});
container.addEventListener("mousemove", (e) => {
    if (!isPressedDown) return;
    e.preventDefault();
    cards.style.left =`${e.offsetX - cursorXSpace}px`;
    boundCards();
});
function boundCards() {
    const container_rect = container.getBoundingClientRect();
    const cards_rect = cards.getBoundingClientRect();

    if (parseInt(cards.style.left) > 0) {
        cards.style.left = 0;
    } else  if (cards_rect.right < container_rect.right) {
        cards.style.left = `-${cards_rect.width - container_rect.width}px`;
    }
}

