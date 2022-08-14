
async function displayCourses(courses) {
    document.getElementById('display-courses').innerHTML = "";
    for(let idx in courses) {
        let course = courses[idx];
        let l = 1;
        let rating = "";
        while(l++<Number(course.rating)){
            rating+='<i class="fa fa-star"></i>';
        }
        let template = `<div class="courses-content">
        <img src=${course.image} alt="course Logo" width="100%" />
        <figcaption>
         <b> ${course.title} </b>
     </figcaption>
     <p style="font-size: 12px">${course.headline}</p>
     <div style="color: darkorange">
       <span style="font-size: 20px; color: rgb(248, 165, 23)">${parseFloat(course.rating).toFixed(1)}</span>
       ${rating}
       <span style="color: darkgray">(56665)</span>
     </div>
     <div>
       <span> price :</span>
       <b id="course-price">${course.price}</b>
     </div>
   </div>`
      document.getElementById('display-courses').innerHTML+= template;
    }
}
async function getAllCourses(){
    let courses = await fetch("http://localhost:3000/courses")
        .then((courses) => courses.json())
        .catch(err => console.log(err));
    return courses;
}

let allCourses;
getAllCourses().then(courses=>{displayCourses(courses);allCourses = courses;});

