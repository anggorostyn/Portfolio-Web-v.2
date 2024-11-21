// Add class bg-navbar-dark on navbar scroll
const header = document.querySelector('.navbar');
window.onscroll = function () {
    const top = window.scrollY;
    if (top >= 100) {
        header.classList.remove('bg-navbar-light'); 
        header.classList.add('bg-navbar-dark'); 
        header.classList.remove('navbar-light'); 
        header.classList.add('navbar-dark'); 
    } else {
        header.classList.add('bg-navbar-light'); 
        header.classList.remove('bg-navbar-dark'); 
        header.classList.add('navbar-light'); 
        header.classList.remove('navbar-dark'); 
    }
};

// Collapse navbar after clicks on small devices
const navLinks = document.querySelectorAll('.nav-item');
const menuToggle = document.getElementById('navbar_supported_content');

navLinks.forEach((nav) => {
    nav.addEventListener('click', () => {
        new bootstrap.Collapse(menuToggle).toggle();
    });
});

$(document).ready(function() {
    renderServices();
})

//service section
// Function to render services
function renderServices() {
    $.getJSON('/api/services', function(data) {
        const servicesContainer = document.getElementById('services-container');
        let html = ''; 
        data.forEach(service => {
            html += `
                <div class="col-lg-4 mt-4">
                    <div class="card services-text">
                        <div class="card-body">
                            <i class="${service.icon} services-icon"></i>
                            <h4 class="card-title mt-3">${service.title}</h4>
                            <p class="card-text mt-3">${service.description}</p>
                        </div>
                    </div>  
                </div>
            `;
        });
        servicesContainer.innerHTML = html;
    })
}

//portofolio section
const portfolioData = [
    {
        "title" : "Design",
        "description": "Check out this portfolio and see how we can collaborate to create impressive work together!",
        "image": "image/design1.png",
        "link": "https://www.behance.net/anggorosetyo"
    },
    {
        "title": "App",
        "description": "check it out and experience its ease and advantages! Feel free to leave feedback, I'm ready to keep improving and delivering the best!",
        "image": "image/app.png",
        "link": "https://github.com/anggorostyn"
    },
    {
        "title": "Data Visualization",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        "image": "image/datavisual.png",
        "link": "https://www.linkedin.com/pulse/mengambil-data-cuaca-dengan-python-dan-openweathermap-setyo-nugroho--tnidc/?trackingId=rju5oJyyRVKIsnTnPcS%2BzA%3D%3D"
    },
    {
        "title": "Photo",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        "image": "image/poto.png",
        "link": "https://www.instagram.com/anggorostyn/"
    },
    {
        "title": "Drawing",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        "image": "image/drawing.png",
        "link": "https://www.behance.net/anggorosetyo"
    },
    {
        "title": "Video",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        "image": "image/video.png",
        "link": "https://www.youtube.com/@anggorosetyonugroho3937"
    }
];

// Function to render porfolios
function renderPortfolios() {
    const portfolioContent = document.getElementById("portfolioContent");

    portfolioData.forEach(item => {
        const portfolioItem = `
            <div class="col-lg-4 mt-4">
                <div class="card">
                    <img class="card-img-top" src="${item.image}" alt="${item.title}" style="width:100%">
                    <div class="card-body">
                        <h4 class="card-title">${item.title}</h4>
                        <p class="card-text">${item.description}</p>
                        <div class="text-center">
                            <a href="${item.link}" class="btn btn-success">Learn more</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        portfolioContent.innerHTML += portfolioItem;
    });
}

// Insert the portfolio items dynamically
document.addEventListener("DOMContentLoaded", renderPortfolios);



