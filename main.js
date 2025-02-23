// Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Form Validation
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Reset error messages
        document.querySelectorAll('.error-message').forEach(error => {
            error.style.display = 'none';
        });

        // Validate name
        const name = document.getElementById('name');
        if (!name.value.trim()) {
            showError(name, 'Name is required');
            isValid = false;
        }

        // Validate email
        const email = document.getElementById('email');
        if (!email.value.trim()) {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }

        // Validate subject
        const subject = document.getElementById('subject');
        if (!subject.value.trim()) {
            showError(subject, 'Subject is required');
            isValid = false;
        }

        // Validate message
        const message = document.getElementById('message');
        if (!message.value.trim()) {
            showError(message, 'Message is required');
            isValid = false;
        }

        if (isValid) {
            // Simulate form submission
            alert('Message sent successfully!');
            contactForm.reset();
        }
    });
}

function showError(input, message) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Blog Posts
const blogGrid = document.getElementById('blog-posts');

const mediumFeedURL = "https://medium.com/feed/@rathoresinghajay963"; // Your RSS feed
const apiKey = "7i7dhwzvvcy9gkvpaaje6feqrkuxtlhio9er3qeh"; // Your API key

async function fetchMediumPosts() {
    try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(mediumFeedURL)}&api_key=${apiKey}&count=10`);
        const data = await response.json();

        if (data.status !== "ok") throw new Error("Failed to fetch Medium posts");

        blogGrid.innerHTML = ""; // Clear previous blog posts

        data.items.forEach(post => {
            const blogCard = document.createElement("div");
            blogCard.className = "blog-card";

            // Extract first image
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = post.content;
            const imgTag = tempDiv.querySelector("img");
            let imageUrl = imgTag ? imgTag.src : "default-placeholder.jpg";

            // Remove image from content
            if (imgTag) imgTag.remove();

            // Extract clean text content
            const cleanText = tempDiv.textContent.trim().substring(0, 150) + "..."; // Limit to 150 chars

            // Populate blog card
            blogCard.innerHTML = `
                <img src="${imageUrl}" alt="${post.title}" class="blog-image">
                <h3>${post.title}</h3>
                <p>${cleanText}</p>
                <p class="blog-date">${new Date(post.pubDate).toDateString()}</p>
                <div class="project-links">
                    <a href="${post.link}" target="_blank" class="btn primary">Read More</a>
                </div>
            `;

            blogGrid.appendChild(blogCard);
        });
    } catch (error) {
        console.error("Error fetching Medium posts:", error);
    }
}

// Fetch and display Medium blog posts
fetchMediumPosts();
