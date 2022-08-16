
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
async function getAllCourses() {
    let courses = await fetch("http://localhost:3000/courses")
        .then((courses) => courses.json())
        .catch(err => console.log(err));
    return courses;
}

async function filterCourses() {
    let filter = document.getElementById("search-id").value.toUpperCase();
    function myFunction(e1) {
        return e1.title.toUpperCase().includes(filter);
    }
    let courses = allCourses.filter(myFunction);
    displayCourses(courses);
}

function handlingFormSubmit() {
    let form = document.getElementById('search-form');
    form.addEventListener('submit', (Event) => {
        Event.preventDefault();
    })
}

async function getCategories(cat) {
    let url = "http://localhost:3000/" + cat;
    let courses = await fetch(url).then((courses) => courses.json()).catch(err => console.log(err));
    displayCourses(courses);
}

let allCourses;
getAllCourses().then(courses => { displayCourses(courses); allCourses = courses; });
handlingFormSubmit();

