// =========================
// PROJECT FILTER
// =========================

const filterButtons = document.querySelectorAll(".filter-buttons button");
const designCards = document.querySelectorAll(".design-card");


// =========================
// CATEGORY IMAGE GALLERY
// =========================

const categoryDetails = document.getElementById("categoryDetails");
const categoryTitle = document.getElementById("categoryTitle");
const categoryDescription = document.getElementById("categoryDescription");
const categoryImages = document.getElementById("categoryImages");


// Images for each category

const categoryCollections = {

    living: [
        "images/living1.avif",
        "images/living2.avif",
        "images/living3.avif",
        "images/living4.avif",
        "images/living5.avif"
    ],

    bedroom: [
        "images/bedroom1.avif",
        "images/bedroom2.avif",
        "images/bedroom3.avif",
        "images/bedroom4.avif",
        "images/bedroom5.avif"
    ],

    kitchen: [
        "images/kitchen1.avif",
        "images/kitchen2.avif",
        "images/kitchen3.avif",
        "images/kitchen4.avif",
        "images/kitchen5.avif"
    ],
    bathroom: [
        "images/bathroom1.avif",
        "images/bathroom2.avif",
        "images/bathroom3.avif",
        "images/bathroom4.avif",
        "images/bathroom5.avif"
    ],

    office: [
        "images/office1.avif",
        "images/office2.avif",
        "images/office3.avif",
        "images/office4.avif",
        "images/office5.avif"
    ]

};


// Category names

const categoryNames = {

    living: "Living Room",
    bedroom: "Bedroom",
    kitchen: "Kitchen",
    bathroom:"Bathroom",
    office: "Office"

};


// =========================
// FUNCTION TO SHOW 5 IMAGES
// =========================

function showCategory(category) {

    categoryTitle.textContent = categoryNames[category];

    categoryDescription.textContent =
        `Explore our ${categoryNames[category].toLowerCase()} designs.`;

    categoryImages.innerHTML = "";

    categoryCollections[category].forEach((image, index) => {

        const imageCard = document.createElement("div");

        imageCard.classList.add("category-image-card");

        const img = document.createElement("img");

        img.src = image;

        img.alt =
            `${categoryNames[category]} design ${index + 1}`;

        // Design label
        const label = document.createElement("div");

        label.classList.add("category-image-label");

        label.textContent =
            `${categoryNames[category]} Design ${index + 1}`;

        // Click image to open popup
        img.addEventListener("click", () => {

            openImagePopup(image, category);

        });

        imageCard.appendChild(img);

        imageCard.appendChild(label);

        categoryImages.appendChild(imageCard);

    });

    categoryDetails.classList.add("show");

    // Scroll to category images
    setTimeout(() => {

        const position =
            categoryDetails.getBoundingClientRect().top +
            window.pageYOffset -
            100;

        window.scrollTo({
            top: position,
            behavior: "smooth"
        });

    }, 100);

}
// =========================
// IMAGE POPUP
// =========================

function openImagePopup(image, category) {

    let currentIndex = categoryCollections[category].indexOf(image);

    const popup = document.createElement("div");

    popup.classList.add("image-popup");

    popup.innerHTML = `
        <button class="image-popup-close">&times;</button>

        <button class="image-popup-arrow image-popup-prev">
            &#10094;
        </button>

        <img class="popup-image" src="${image}" alt="Interior design">

        <button class="image-popup-arrow image-popup-next">
            &#10095;
        </button>
    `;

    document.body.appendChild(popup);

    document.body.style.overflow = "hidden";


    const popupImage = popup.querySelector(".popup-image");

    const closeButton =
        popup.querySelector(".image-popup-close");

    const previousButton =
        popup.querySelector(".image-popup-prev");

    const nextButton =
        popup.querySelector(".image-popup-next");


    // =========================
    // SHOW IMAGE
    // =========================

    function showImage() {

        popupImage.src =
            categoryCollections[category][currentIndex];

        popupImage.alt =
            `${categoryNames[category]} design ${currentIndex + 1}`;

    }


    // =========================
    // NEXT IMAGE
    // =========================

    nextButton.addEventListener("click", function () {

        currentIndex++;

        if (currentIndex >= categoryCollections[category].length) {
            currentIndex = 0;
        }

        showImage();

    });


    // =========================
    // PREVIOUS IMAGE
    // =========================

    previousButton.addEventListener("click", function () {

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex =
                categoryCollections[category].length - 1;
        }

        showImage();

    });


    // =========================
    // CLOSE POPUP
    // =========================

    closeButton.addEventListener("click", function () {

    popup.remove();

    document.body.style.overflow = "";

    document.removeEventListener(
        "keydown",
        handleKeyboard
    );

});

    // =========================
    // CLICK OUTSIDE IMAGE
    // =========================

    popup.addEventListener("click", function (event) {

    if (event.target === popup) {

        popup.remove();

        document.body.style.overflow = "";

        document.removeEventListener(
            "keydown",
            handleKeyboard
        );

    }

});


    // =========================
    // KEYBOARD
    // =========================

    document.addEventListener("keydown", handleKeyboard);

    function handleKeyboard(event) {

        if (event.key === "ArrowRight") {
            nextButton.click();
        }

        if (event.key === "ArrowLeft") {
            previousButton.click();
        }

        if (event.key === "Escape") {

            popup.remove();

            document.body.style.overflow = "";

            document.removeEventListener(
                "keydown",
                handleKeyboard
            );

        }

    }

}
// =========================
// CLOSE CATEGORY GALLERY
// =========================

const categoryClose = document.getElementById("categoryClose");

categoryClose.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    categoryDetails.classList.remove("show");

    document.getElementById("projects").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});
// =========================
// PROJECT FILTER
// =========================

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active class

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });


        // Add active class

        button.classList.add("active");


        // Get selected category

        const filter = button.dataset.filter;


        // =========================
        // ALL
        // =========================

        if (filter === "all") {

            // Show all main cards

            designCards.forEach(card => {

                card.style.display = "block";

            });


            // Hide 5-image section

            categoryDetails.classList.remove("show");

            return;
        }


        // =========================
        // CATEGORY
        // =========================

        designCards.forEach(card => {

            if (card.dataset.category === filter) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });


        // Show all 5 images

        showCategory(filter);

    });

});


// =========================
// CLICK ON PROJECT CARD
// =========================

designCards.forEach(card => {

    card.addEventListener("click", () => {

        const category = card.dataset.category;

        showCategory(category);

    });

});


// =========================
// CONTACT FORM
// =========================

const contactForm = document.querySelector(".contact form");
const successMessage = document.getElementById("successMessage");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();


    // Show success message

    successMessage.classList.add("show");


    // Clear form

    contactForm.reset();


    // Hide message after 4 seconds

    setTimeout(() => {

        successMessage.classList.remove("show");

    }, 4000);

});


// =========================
// SCROLL REVEAL
// =========================

const revealElements = document.querySelectorAll(
    ".projects, .services, .about, .contact, .design-card, .service"
);


const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },
    {
        threshold: 0.15
    }
);


revealElements.forEach(element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


// =========================
// MOBILE MENU
// =========================

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");


menuToggle.addEventListener("click", () => {

    mainNav.classList.toggle("active");

});


// Close menu after clicking navigation link

const navLinks = mainNav.querySelectorAll("a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        mainNav.classList.remove("active");

    });

});


// =========================
// DARK MODE
// =========================

const themeToggle = document.getElementById("themeToggle");


// Check saved theme

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    themeToggle.textContent = "☀️";

} else {

    themeToggle.textContent = "🌙";

}


// Toggle theme

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");


    const isDarkMode =
        document.body.classList.contains("dark-mode");


    if (isDarkMode) {

        themeToggle.textContent = "☀️";

        localStorage.setItem("theme", "dark");

    } else {

        themeToggle.textContent = "🌙";

        localStorage.setItem("theme", "light");

    }

});


// =========================
// CONSULTATION BUTTON
// =========================

const consultButton = document.querySelector(".consult-btn");

consultButton.addEventListener("click", () => {

    document.getElementById("contact").scrollIntoView({
        behavior: "smooth"
    });

});

