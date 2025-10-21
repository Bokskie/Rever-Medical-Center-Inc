document.addEventListener('DOMContentLoaded', function() {
    // Get the button
    let scrollToTopBtn = document.getElementById("scrollToTopBtn");

    // When the user scrolls down 200px from the top of the document, show the button
    window.onscroll = function() {
        scrollFunction();
    };

    function scrollFunction() {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            scrollToTopBtn.classList.add("show");
        } else {
            scrollToTopBtn.classList.remove("show");
        }
    }

    // When the user clicks on the button, scroll to the top of the document
    scrollToTopBtn.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});