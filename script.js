document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('review-form');
    const reviewsList = document.getElementById('reviews-list');

    // Load reviews from localStorage
    function loadReviews() {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.forEach(review => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${review.name}</strong>: ${review.text}`;
            reviewsList.appendChild(listItem);
        });
    }

    // Save review to localStorage
    function saveReview(name, text) {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.push({ name, text });
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }

    // Handle form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const review = document.getElementById('review').value;

        if (name && review) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${name}</strong>: ${review}`;

            reviewsList.appendChild(listItem);

            saveReview(name, review);
            form.reset();
        }
    });

    // Initial load
    loadReviews();
});
