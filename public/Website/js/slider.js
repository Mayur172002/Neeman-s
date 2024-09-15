(function() {
    let sliderat = 0;

    const sliderrr = document.querySelector('.slider-container');
    const prevbtn = document.getElementById('prev');
    const nextbtn = document.getElementById('next');

    function moveSlider() {
        sliderrr.style.transform = `translateX(-${sliderat * 100}%)`;
    }
    if (prevbtn && nextbtn) { // Check if elements exist
        prevbtn.addEventListener('click', () => {
            if (sliderat == 0) return;
            --sliderat;
            moveSlider();
            if(sliderat === 0){
                prevbtn.classList.add('swiper-button-disabled')
            }
            nextbtn.classList.remove('swiper-button-disabled');
        });

        nextbtn.addEventListener('click', () => {
            if (sliderat == 7) return;
            ++sliderat;
            moveSlider();
            if(sliderat === 7){
                nextbtn.classList.add('swiper-button-disabled')
            }
            else{
                nextbtn.classList.remove('swiper-button-disabled')
            }
            prevbtn.classList.remove('swiper-button-disabled');
        });
    } else {
        console.error('Slider buttons not found in the DOM.');
    }
})();

(function() {
    let sliderat_secound = 0;

    const sliderrr_secound = document.querySelector('.slider-container_secound ');
    const prevbtn_secound = document.getElementById('prev_secound');
    const nextbtn_secound = document.getElementById('next_secound');

    function moveSlider_secound() {
        sliderrr_secound.style.transform = `translateX(-${sliderat_secound * 100}%)`;
    }
    if (prevbtn_secound && nextbtn_secound) { // Check if elements exist
        prevbtn_secound.addEventListener('click', () => {
            if (sliderat_secound == 0) return;
            --sliderat_secound;
            moveSlider_secound();
            if(sliderat_secound === 0){
                prevbtn_secound.classList.add('swiper-button-disabled')
            }
            nextbtn_secound.classList.remove('swiper-button-disabled');
        });

        nextbtn_secound.addEventListener('click', () => {
            if (sliderat_secound == 6) return;
            ++sliderat_secound;
            moveSlider_secound();
            if(sliderat_secound === 6){
                nextbtn_secound.classList.add('swiper-button-disabled')
            }
            else{
                nextbtn_secound.classList.remove('swiper-button-disabled')
            }
            prevbtn_secound.classList.remove('swiper-button-disabled');
        });
    } else {
        console.error('Slider buttons not found in the DOM.');
    }
})();



// function changeSortText(newText) {
//     document.querySelector('.btn-text').textContent = newText;
// }

/* Auto slider */
$('#searchToggle').click(function (e) {
    e.preventDefault(); // Prevent the default action (e.g., form submission)
    $('#searchBar').slideToggle();
    $('#searchBar input').focus();
});

$('#closeSearch').click(function (e) {
    e.preventDefault(); // Prevent default action
    $('#searchBar').slideUp();
});

/* Loader */
const loaderBar = document.querySelector('.loader-bar1');
const rangeLoader = document.querySelector('.range-loader1');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const documentHeight = document.body.scrollHeight;
    const windowHeight = window.innerHeight;

    const scrollableHeight = documentHeight - windowHeight;
    const scrollPercentage = (scrollY / scrollableHeight) * 100;
   try {
       loaderBar.style.width = scrollPercentage + '%';
   } catch(error) {
    console.log(error);
   }
    try {
        if (scrollY > 360) {
            rangeLoader.style.display = 'block';
        } else {
            rangeLoader.style.display = 'none';
        }
    }
    catch (error){
    console.log(error);
    
    }
 
});