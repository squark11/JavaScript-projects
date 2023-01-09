    const slider = document.querySelector(".slider");
    const nextBtn = document.querySelector(".next-btn");
    const prevBtn = document.querySelector(".prev-btn");
    const slides = document.querySelectorAll(".slide");
    const slideIcons = document.querySelectorAll(".slide-icon");
    const pauseBtn = document.querySelector(".pause");
    const numberOfSlides = slides.length;
    var slideNumber = 0;

    //image slider next button
    nextBtn.addEventListener("click", () => {
        slides.forEach((slide) => {
            slide.classList.remove("active");
        });
        slideIcons.forEach((slideIcon) => {
            slideIcon.classList.remove("active");
        });

        slideNumber++;

        if (slideNumber > (numberOfSlides - 1)) {
            slideNumber = 0;
        }

        slides[slideNumber].classList.add("active");
        slideIcons[slideNumber].classList.add("active");
        clearInterval(playSlider);
        repeater();
    });

    //image slider previous button
    prevBtn.addEventListener("click", () => {
        slides.forEach((slide) => {
            slide.classList.remove("active");
        });
        slideIcons.forEach((slideIcon) => {
            slideIcon.classList.remove("active");
        });

        slideNumber--;

        if (slideNumber < 0) {
            slideNumber = numberOfSlides - 1;
        }

        slides[slideNumber].classList.add("active");
        slideIcons[slideNumber].classList.add("active");
        clearInterval(playSlider);
        repeater();
    });


    // Javascript for image slider manual navigation
    var manualNav = function (manual) {
        slides.forEach((slide) => {
            slide.classList.remove('active');

            slideIcons.forEach((slideIcon) => {
                slideIcon.classList.remove('active');
            });
        });

        slides[manual].classList.add('active');
        slideIcons[manual].classList.add('active');
        clearInterval(playSlider);
        repeater();
    }

    slideIcons.forEach((slideIcon, i) => {
        slideIcon.addEventListener("click", () => {
            manualNav(i);
            slideNumber = i;
        });

    });


    //image slider autoplay
    var playSlider;

    var repeater = () => {
        playSlider = setInterval(function () {
            slides.forEach((slide) => {
                slide.classList.remove("active");
            });
            slideIcons.forEach((slideIcon) => {
                slideIcon.classList.remove("active");
            });

            slideNumber++;

            if (slideNumber > (numberOfSlides - 1)) {
                slideNumber = 0;
            }

            slides[slideNumber].classList.add("active");
            slideIcons[slideNumber].classList.add("active");
        }, 4000);
        pauseBtn.innerHTML = "pause";
    }
    repeater();

    //stop/start the image slider autoplay click pause
    pauseBtn.addEventListener("click", () => {
        if (pauseBtn.innerHTML == "pause") {
            pauseBtn.innerHTML = "play";
            clearInterval(playSlider);
        } else {
            repeater();
        }
    })
