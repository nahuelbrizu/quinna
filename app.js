/* slider */

const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const imgContainer = document.querySelector(".container-image");
const img = imgContainer.querySelectorAll("img");


let currentImg = 0;
let interval;
let scrollDirection = true;

// Obtener el checkbox y el valor del tema guardado en localStorage
const themeCheckbox = document.getElementById("theme-checkbox");
const savedTheme = localStorage.getItem("theme");

// Si hay un tema guardado en localStorage, establecer el tema en el documento
if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);

    // Si el tema guardado es "dark", marcar el checkbox
    if (savedTheme === "dark") {
        themeCheckbox.checked = true;
    }
}

// Agregar un event listener al checkbox para cambiar el tema
themeCheckbox.addEventListener("change", function () {
    if (this.checked) {
        // Si el checkbox está marcado, establecer el tema en "dark" y guardar en localStorage
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    } else {
        // Si el checkbox no está marcado, eliminar el tema y el valor del localStorage
        document.documentElement.removeAttribute("data-theme");
        localStorage.removeItem("theme");
    }
});

const container = document.querySelector(".cards");
slider = Array.from(document.querySelectorAll('.string-img-container'))

let isDragging = false,
    startPos = 0,
    currenTranslate,
    prevTranslate = 0,
    animationID,
    currentIndex = 0;

slider.forEach((slide, index) => {
    const slideImage = slide.querySelector('img')
    slideImage.addEventListener('dragstart', (e) => e.preventDefault())

    slide.addEventListener('touchstart', touchStart(index))
    slide.addEventListener('touchend', touchEnd)
    slide.addEventListener('touchmove', touchMove)

    slide.addEventListener('mousedown', touchStart(index))
    slide.addEventListener('mouseup', touchEnd)
    slide.addEventListener('mousemove', touchMove)
    slide.addEventListener('mouseleave', touchEnd)
})
window.addEventListener('resize', setPositionByIndex);

window.oncontextmenu = function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX

}

function touchStart(index) {
    return function (event) {
        currentIndex = index
        startPos = getPositionX(event)
        isDragging = true
        animationID = requestAnimationFrame(animation)
        container.classList.add('grabbing')
        setSliderPosition();
    }
}

function touchMove(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event)
        currenTranslate = prevTranslate + currentPosition - startPos
    } else {
        container.style.touchAction = `translateX(${currenTranslate * 4}px)`
    }
}

function touchEnd() {
    cancelAnimationFrame(animationID)
    isDragging = false
    const movedBy = currenTranslate - prevTranslate

    if (movedBy < (-100) && currentIndex < slider.length - 1) currentIndex += 1
    if (movedBy > 100 && currentIndex > 0) currentIndex -= 1
    setPositionByIndex()
    container.classList.remove('grabbing')
}

function animation() {
    setSliderPosition()
    if (isDragging) requestAnimationFrame(animation)
}

function setPositionByIndex() {
    prevTranslate = currenTranslate
    setSliderPosition();
}

function setSliderPosition() {
    container.style.transform = `translateY(${currenTranslate}px)`
}


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
            scrollDirection= false;
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
        imgContainer.style.transform = `translateX(-${(currentImg) * 40}em)`;
    }





document.addEventListener('DOMContentLoaded', () => {
    const next = document.querySelector('#slideshow-next');
    const prev = document.querySelector('#slideshow-prev');
    const vidContainer = document.querySelector(".video-container");
    const videos = vidContainer.querySelectorAll('video');
    let currentVid = 0;
    let interval;
    let scrollDirection2 = true;

    next.addEventListener("click", () => {
        clearInterval(interval);
        if (currentVid >= videos.length - 7) {
            scrollDirection2 = false;
        } else {
            updateVid(true);
            scrollDirection2 = true;
        }
        interval = setInterval(() => {
            updateVid(scrollDirection2);
        }, 3000);
    });


    prev.addEventListener("click", () => {
        clearInterval(interval);
        if (currentVid <= videos.length) {
            updateVid(false);
            scrollDirection2 = false;
        } else {
            scrollDirection2 = false;
        }
        interval = setInterval(() => {
            updateVid(scrollDirection2);
        }, 3000)
    });


    interval = setInterval(() => {
        updateVid(scrollDirection2);
    }, 3000)

    function updateVid(vidRight) {
        if (vidRight) {
            currentVid++;
        }  if (!vidRight) {
            currentVid--;
        }
        if (currentVid >= videos.length - 5  && vidRight) {
            scrollDirection2 = false;
            updateVid(false);
        } if (currentVid <= (videos.length === 0) && !vidRight) {
            scrollDirection2 = true;
        } else if (currentVid >= 10){
            scrollDirection2 = false;
        }
        vidContainer.style.transform = `translateX(-${(currentVid) * 65}%)`;
    }
})


const btnForm = document.getElementById("btn-form");

document.getElementById("form").addEventListener('submit', function (e) {
    e.preventDefault();
    btnForm.value = 'Enviando...';

    const serviceId = 'default_service';
    const templateId = 'template_i8ftxu7';

    emailjs.sendForm(serviceId, templateId, this)
        .then(() => {
            btnForm.value = 'Send Email';
            alert('Mensaje enviado!');
        }, (err) => {
            btnForm.value = 'Send Email';
            alert(JSON.stringify(err))
        });
});
