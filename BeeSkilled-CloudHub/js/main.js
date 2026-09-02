console.log("BeeSkilled CloudHub loaded successfully.");


// Highlight current page

const currentPage =
    window.location.pathname.split("/").pop() || "index.html";


document.querySelectorAll(".navbar nav a").forEach(link => {

    const linkPage =
        link.getAttribute("href");

    if (linkPage === currentPage) {

        link.classList.add("active");

    }

});