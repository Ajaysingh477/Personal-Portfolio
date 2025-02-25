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
// Blog Posts
const blogGrid = document.getElementById('blog-posts');
const mediumFeedURL = "https://medium.com/feed/@rathoresinghajay963";
const apiKey = "7i7dhwzvvcy9gkvpaaje6feqrkuxtlhio9er3qeh";

async function fetchMediumPosts() {
    try {
        console.log("Fetching Medium Posts...");

        const cacheBuster = Math.random().toString(36).substring(7); // Unique cache-busting string
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(mediumFeedURL)}&api_key=${apiKey}&count=10&_=${cacheBuster}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (!data || data.status !== "ok") {
            throw new Error("Failed to fetch Medium posts");
        }

        blogGrid.innerHTML = ""; // Clear previous blog posts

        data.items.forEach(post => {
            console.log("Processing Post:", post.title, post);

            const blogCard = document.createElement("div");
            blogCard.className = "blog-card";

            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = post.content;

            // **Extract first valid image**
let imgTag = tempDiv.querySelector("figure img") || tempDiv.querySelector("img");
let imageUrl = imgTag ? imgTag.src : "";

// **Ignore Medium's tracking pixel images (_stat URLs)**
if (!imageUrl || imageUrl.includes("medium.com/_/stat")) {
    console.log("Using thumbnail for:", post.title);
    imageUrl = post.thumbnail && post.thumbnail.trim() !== "" 
               ? post.thumbnail 
               : "https://via.placeholder.com/300x200?text=No+Image"; // Fallback image
}

            // **If no image found, extract manually using regex**
            if (!imageUrl || imageUrl.trim() === "") {
                const encodedContent = post.content;
                const regex = /<img.*?src="(.*?)"/; // Extracts first <img> tag src
                const match = encodedContent.match(regex);
                if (match && match[1]) {
                    imageUrl = match[1];
                }
            }

            // **If image URL is still empty, use a default fallback**
            if (!imageUrl || imageUrl.trim() === "") {
                imageUrl = "https://via.placeholder.com/300x200?text=No+Image";
            }

            // **Prevent broken images from Medium’s CDN**
            const safeImageUrl = `"${imageUrl}" onerror="this.onerror=null; this.src='https://via.placeholder.com/300x200?text=No+Image';"`;

            // **Fix blog link issue (forcing correct link if Medium’s RSS is outdated)**
            let blogLink = post.link; // Default link from API

            if (post.guid.includes("5e2a7d614b6a")) {  
                blogLink = "https://medium.com/@rathoresinghajay963/not-impressed-just-expecting-it-unless-its-truly-new-8086641dd406"; 
            }

            console.log("Final Blog Link:", blogLink);
            console.log("Extracted Image URL:", imageUrl);

            // **Prevent text overflow in cards**
            blogCard.style.overflow = "hidden";
            blogCard.style.wordWrap = "break-word";

            // **Populate blog card**
            blogCard.innerHTML = `
                <img src=${safeImageUrl} alt="${post.title}" class="blog-image">
                <h3>${post.title}</h3>
                <p>${tempDiv.textContent.trim().substring(0, 150)}...</p>
                <p class="blog-date">${new Date(post.pubDate).toDateString()}</p>
                <div class="project-links">
                    <a href="${blogLink}" target="_blank" class="btn primary">Read More</a>
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
