/* slider */

const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const imgContainer = document.querySelector(".container-image");
const img = imgContainer.querySelectorAll("img");

/* slider video */

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
    if (currentImg >= img.length -1  && goingRight){
        scrollDirection = false;
    } else if (currentImg <= 0 && !goingRight){
        scrollDirection = true;
    }
    imgContainer.style.transform = `translateX(-${(currentImg) * 40}em)`;
}


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
    slide.addEventListener('mouseup',touchEnd)
    slide.addEventListener('mousemove', touchMove)
    slide.addEventListener('mouseleave', touchEnd)
})
window.addEventListener('resize', setPositionByIndex)

window.oncontextmenu = function (event) {
    event.preventDefault();
    event.stopPropagation()
    return false
}

function getPositionX(event){
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
}

function touchStart(index){
    return function (event) {
        currentIndex = index
        startPos = getPositionX(event)
        isDragging = true
        animationID = requestAnimationFrame(animation)
        container.classList.add('grabbing')
    }
}

function touchMove(event){
    if (isDragging){
        const currentPosition = getPositionX(event)
        currenTranslate = prevTranslate + currentPosition - startPos
    }
}

function touchEnd(){
    cancelAnimationFrame(animationID)
    isDragging = false
    const movedBy = currenTranslate - prevTranslate
    container.classList.add('grab')

    if (movedBy < -100 && currentIndex < slider.length -1) currentIndex += 1
    if (movedBy > 100 && currentIndex > 0) currentIndex -= 1
    setPositionByIndex()
    container.classList.remove('grabbing')
}

function animation(){
    setSliderPosition()
    if (isDragging) requestAnimationFrame(animation)
}

function setPositionByIndex(){
    prevTranslate = currenTranslate
    setSliderPosition()
}

function  setSliderPosition(){
    container.style.transform = `translateX(${currenTranslate}px)`
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
        text: "me encanta su sonido !!",
    },
    {
        name: 'June Cha',
        position: 'Musica En Progreso',
        photo: 'https://randomuser.me/api/portraits/women/44.jpg',
        text: 'el sonido es buenisimo y su acabado me encata..',
    },
    {
        name: 'Roberta ',
        position: 'musica',
        photo: 'https://randomuser.me/api/portraits/women/68.jpg',
        text:
            "Lorem ipsum dolor sit amet, consectertertur adipisicing elit. ",
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
            "Lorem ipsum dolor sit amet, consectertertur adipisicing elit. ",
    },
    {
        name: 'Sasha Ho',
        position: 'Accountant',
        photo:
            'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?h=350&auto=compress&cs=tinysrgb',
        text:
            "Lorem ipsum dolor sit amet, consectertertur adipisicing elit.",
    },
    {
        name: 'Veeti Seppanen',
        position: 'Director',
        photo: 'https://randomuser.me/api/portraits/men/97.jpg',
        text:
            "Lorem ipsum dolor sit amet, consectertertur adipisicing elit.",
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

if (typeof slideshow === 'object') {
    let styles = document.createElement('link');
    styles.rel="stylesheet";
    styles.href="slideshow.css";
    document.head.appendChild(styles);
    const out = document.querySelector('.slideshow-info');
    const wrapper = document.querySelector('.slideshow-wrapper');
    const next = document.querySelector('#slideshow-next');
    const prev = document.querySelector('#slideshow-prev');
    const autoplay = document.querySelector('#slideshow-autoplay');
    let hash = 'counter' + slideshow.folder;
    let counter = localStorage.getItem(hash)||0;
    let autoincrease = slideshow.autoplay === 'no' ? false : true;
    let restart = slideshow.endless === 'no' ? false : true;
    let first = false;
    let last = false;
    let timeout = false;
    let speed = slideshow.speed || 3000;
    let all = slideshow.media.length

    function validatecounter() {
        autoplay.innerHTML = autoincrease ? "▶️" : '⏸';
        if (restart) {
            if (counter < 0) counter = all - 1;
            counter = counter % all;
        } else {
            if (counter <= 0) {
                counter = 0;
            }
            if (counter === all) counter = all - 1;
        }
        if (!restart) {
            first = counter === 0;
            last = counter === all - 1;
            if (counter === 0) {
                prev.classList.add('hidden');
            } else {
                prev.classList.remove('hidden');
            }
            if (counter === all - 1) {
                next.classList.add('hidden');
                autoplay.classList.add('hidden');
            } else {
                next.classList.remove('hidden');
                autoplay.classList.remove('hidden');
            }
        }

        localStorage.setItem(hash,counter);
        show();
    }
    function show() {
        clearTimeout(timeout);
        out.innerHTML = `${slideshow.media[counter]} ${counter+1}/${all}`;
        wrapper.innerHTML = '';
        wrapper.dataset.loaded = 'false';

        if(slideshow.media[counter].endsWith('.mp4')) {
            wrapper.style.backgroundImage = ``;
            let vid = document.createElement('video');
            vid.setAttribute('loop','true');
            vid.setAttribute('autoplay','true');
            vid.setAttribute('src', slideshow.folder + slideshow.media[counter]);
            if (wrapper.dataset.loaded === 'false') {
                vid.addEventListener('canplaythrough', ev => {
                    wrapper.appendChild(vid);
                    loaded();
                },{passive:true});
            }
        } else {
            wrapper.innerHTML = ' ';
            let url = slideshow.folder + slideshow.media[counter];
            let i = new Image();
            i.src = url;
            i.onload = function() {
                wrapper.style.backgroundImage = `url(${url})`;
                loaded();
            }
        }
    }
    function loaded() {
        wrapper.dataset.loaded = 'true';
        if (autoincrease && !last) {
            timeout = window.setTimeout(function(){
                counter++;
                validatecounter();
            },speed);
        }
    }
    function nextSlide() {
        if(!last) {
            counter++;
            autoincrease = false;
            validatecounter();
        }
    };
    function prevSlide() {
        if(!first) {
            counter--;
            autoincrease = false;
            validatecounter();
        }
    };
    function toggleAuto() {
        autoincrease = !autoincrease;
        validatecounter();
    };
    next.addEventListener('click', nextSlide);
    prev.addEventListener('click', prevSlide);
    autoplay.addEventListener('click',toggleAuto);
    document.addEventListener('keyup', ev => {
        ev.preventDefault();
        if (ev.key === "ArrowRight") { nextSlide(); }
        if (ev.key === "ArrowUp") { history.back(); }
        if (ev.key === "ArrowLeft") { prevSlide(); }
        if (ev.key === " ") { toggleAuto(); }
    });
    validatecounter();
} else {
    console.error('define el objeto slideshow');
    document.body.innerHTML = "⚠️ Can't find slideshow object"
}



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
