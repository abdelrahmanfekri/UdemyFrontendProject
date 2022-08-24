
/**
 * @description function to display courses in its section with id display courses and add event listener for carousel buttons
 * @param {*} courses 
 * @return void
 */

async function displayCourses(courses) {
    document.getElementById('display-courses').innerHTML = "";
    let flag = true;
    for (let idx in courses) {
        let course = courses[idx];
        let l = 1;
        let rating = "";
        while (l++ < Number(course.rating)) {
            rating += '<i class="fa fa-star"></i>';
        }
        let cls = "carousel-item";
        if (flag) {
            cls = "carousel-item active";
            flag = false;
        }
        let template = `<div class="${cls}">
        <div class="card">
          <img class="card-img-top" src="${course.image}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${course.title}</h5>
            <p class="card-text">${course.headline}</p>
            <div style="color: darkorange">
              <span
                style="font-size: 20px; color: rgb(248, 165, 23)">${parseFloat(course.rating).toFixed(1)}</span>
              ${rating}
              <span style="color: darkgray">(56665)</span>
            </div>
            <div>
              <span> price :</span>
              <b id="course-price">${course.price}</b>
            </div>
          </div>
        </div>
      </div>`;
        document.getElementById('display-courses').innerHTML += template;
    }
    var cardCarousel = document.querySelector("#display-courses");
    if (window.matchMedia("(min-width:700px)").matches) {
        var carousel = new bootstrap.Carousel(cardCarousel, {
            interval: false,
        })
        var carouselWidth = Number(document.getElementById("display-courses").scrollWidth);
        var cardWidth = Number(document.getElementsByClassName("carousel-item")[0].clientWidth);
        var scrollPosition = 0;
        console.log(cardWidth);
        console.log(carouselWidth);
        document.getElementById("display-courses").scroll({ left: scrollPosition, behavior: 'smooth' });
        document.getElementById("carousel-right").addEventListener('click', function () {
            console.log("rightClicked");
            if (scrollPosition < carouselWidth - cardWidth * 3) {
                scrollPosition += cardWidth;
                console.log("scrollPosition", scrollPosition);
                document.getElementById("display-courses").scroll({ left: scrollPosition, behavior: 'smooth' });
            }
        });
        document.getElementById("carousel-left").addEventListener('click', function () {
            console.log("leftClicked");
            if (scrollPosition > 0) {
                scrollPosition -= cardWidth;
                console.log("scrollPosition", scrollPosition);
                document.getElementById("display-courses").scroll({ left: scrollPosition, behavior: 'smooth' });
            }
        });
    }
    else {
        cardCarousel.classList.add("slide")
    }
}
/**
 * @description Get all courses from json-server in file called data_res in courses key
 * @returns courses
 */

async function getAllCourses() {
    let courses = await fetch("https://api.npoint.io/6b0e60db284f71ad6a57/courses")
        .then((courses) => courses.json())
        .catch(err => console.log(err));
    return courses;
}

/**
 * @description function add as onclick listener for submit 
 * button in the search form to filter courses then call 
 * function display courses to display courses in it's section
 */

async function filterCourses() {
    let filter = document.getElementById("search-id").value.toUpperCase();
    function myFunction(e1) {
        return e1.title.toUpperCase().includes(filter);
    }
    let courses = allCourses.filter(myFunction);
    displayCourses(courses);
}
/**
 * @description Prevent the default event in submitting the form in search bar
 */

function handlingFormSubmit() {
    let form = document.getElementById('search-form');
    form.addEventListener('submit', (Event) => {
        Event.preventDefault();
    })
}
/**
 * @description the function called when we click a link in categories section it 
 * take parameter cat represent category then it fetch it's data from the json server
 * then it call display courses
 * @param {*} cat 
 */

async function getCategories(cat) {
    let url = "https://api.npoint.io/6b0e60db284f71ad6a57/" + cat;
    let courses = await fetch(url).then((courses) => courses.json()).catch(err => console.log(err));
    displayCourses(courses);
}

let allCourses;
getAllCourses().then(courses => { displayCourses(courses); allCourses = courses; });
handlingFormSubmit();