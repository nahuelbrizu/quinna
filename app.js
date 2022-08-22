/* slider */

const next = document.querySelector(".next");
const prev =document.querySelector(".prev");
const imgContainer = document.querySelector(".container-image");
const img = imgContainer.querySelectorAll("img");

let currentImg = 0;
let interval;
let scrollDirection = true;

const theme_checkbox = document.getElementById("theme-checkbox");
const theme = localStorage.getItem("theme");

if (theme) {
    document.documentElement.setAttribute("data_theme", "dark")
    if (theme === "dark") {
        theme_checkbox.checked = true;
    }
}

theme_checkbox.addEventListener("change", function (){
    if (this.checked){
        document.documentElement.setAttribute("data-theme", "dark" );
        localStorage.setItem("theme", "dark");
    } else {
        document.documentElement.removeAttribute("data-theme");
        localStorage.removeItem("theme")
    }
});




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
    if (currentImg >= img.length -1  && goingRight){
        scrollDirection = false;
    } else if (currentImg <= 0 && !goingRight){
        scrollDirection = true;
    }
    imgContainer.style.transform = `translateX(-${(currentImg) * 40}em)`;
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


const animated_bgs = document.querySelectorAll(".animated-bg");
const animated_bgs_texts = document.querySelectorAll(".animated-bg-text");

setTimeout(getData, 2300);

function getData() {
    animated_bgs.forEach( bg => bg.classList.remove('animated-bg'))
    animated_bgs_texts.forEach( bg => bg.classList.remove('animated-bg-text'))
}


const testimonial = document.querySelector('.testimonial')
const userImage = document.querySelector('.user-image')
const username = document.querySelector('.username')
const role = document.querySelector('.role')

const testimonials = [
    {
        name: 'juana azurduy',
        position: 'saraza',
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6',
        text: "me encanta su sonido... me eriza los pezones !!",
    },
    {
        name: 'June Cha',
        position: 'Musica En Progreso',
        photo: 'https://randomuser.me/api/portraits/women/44.jpg',
        text: 'el sonido es buenisimo y su acabado me encata',
    },
    {
        name: 'Roberta ',
        position: 'musica',
        photo: 'https://randomuser.me/api/portraits/women/68.jpg',
        text:
            "me gusta el aRTE Y las campanas.. me gusta el aire de tus campanadas. ",
    },
    {
        name: 'Renee Sims',
        position: 'baterista',
        photo: 'https://randomuser.me/api/portraits/women/65.jpg',
        text:
            "es buenisimo los super recomiendo.",
    },
    {
        name: 'Jonathan Nunfiez',
        position: 'Graphic Designer',
        photo: 'https://randomuser.me/api/portraits/men/43.jpg',
        text:
            "excelente sonido me en can ta  ",
    },
    {
        name: 'Sasha Ho',
        position: 'Accountant',
        photo:
            'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?h=350&auto=compress&cs=tinysrgb',
        text:
            "me gusta el aRTE Y las campanas.. me gusta el aire de tus  campanadas.",
    },
    {
        name: 'Veeti Seppanen',
        position: 'Director',
        photo: 'https://randomuser.me/api/portraits/men/97.jpg',
        text:
            "excelente sonido me encanta  ",
    },
]

let idx = 1

function updateTestimonial() {
    const { name, position, photo, text } = testimonials[idx]

    testimonial.innerHTML = text
    userImage.src = photo
    username.innerHTML = name
    role.innerHTML = position

    idx++

    if (idx > testimonials.length - 1) {
        idx = 0
    }
}

setInterval(updateTestimonial, 10000)





const btnForm = document.getElementById("btn-form");

document.getElementById("form").addEventListener('submit', function (e){
    e.preventDefault();
    btnForm.value = 'Enviando...';

    const serviceId = 'default_service';
    const templateId = 'template_i8ftxu7';

    emailjs.sendForm(serviceId, templateId, this)
        .then( () => {
            btnForm.value = 'Send Email';
            alert('Mensaje enviado!');
        }, (err) => {
         btnForm.value = 'Send Email';
         alert(JSON.stringify(err))
    });
});
