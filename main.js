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

if (blogGrid) {
    const blogPosts = [
        {
            title: "Understanding Value: Why Some Things Are Worth More Than Others",
            excerpt: "Everything we see — money, products, skills, even social status — derives value only because humans assign it. Nature doesn't…",
            date: "14h ago",
            link: "https://medium.com/@rathoresinghajay963/understanding-value-why-some-things-are-worth-more-than-others-3ad0649371a9"
        },
        {
            title: "The Limits of Language: Why Words Will Never Be Enough",
            excerpt: "Lately, I've been thinking about something — something that, ironically, I might not even have the right words to express. That's the…",
            date: "5d ago",
            link: "https://medium.com/@rathoresinghajay963/the-limits-of-language-why-words-will-never-be-enough-e5760462c668"
        },
        {
            title: "Curiosity and Creation: How AI Will Reshape the Value of Human Work",
            excerpt: "When you look at history, there's a clear pattern: we evolve by creating new models of value, often pushing the limits of what we know and…",
            date: "Feb 5",
            link: "https://medium.com/@rathoresinghajay963/curiosity-and-creation-how-ai-will-reshape-the-value-of-human-work-d8b3e51af707"
        },
        {
            title: "The Battle for Tech Supremacy",
            excerpt: "Have you ever stopped to think about where the world is headed in terms of technology? We're living in a time where AI, quantum computing…",
            date: "Feb 2",
            link: "https://medium.com/@rathoresinghajay963/the-battle-for-tech-supremacy-why-the-worlds-future-depends-on-ai-quantum-computing-and-the-c01dc4e4d6a3"
        },
        {
            title: "The Illusion of Political Expectations",
            excerpt: "This blog stems from a realization I had after watching Nikhil Kamath's recent podcast with Narendra Modi and observing the reactions it…",
            date: "Jan 10",
            link: "https://medium.com/@rathoresinghajay963/the-illusion-of-political-expectations-a5d1547f639c"
        },
        {
            title: "India's Future: A Middle-Class Critique",
            excerpt: "India is a country rich in culture, history, and resources, but beneath the surface lies an intricate system of stagnation, inefficiency…",
            date: "Dec 20, 2024",
            link: "https://medium.com/@rathoresinghajay963/indias-future-a-middle-class-critique-of-systemic-stagnation-and-missed-potential-709e77055589"
        },
        {
            title: "The Mind: Beyond the Illusion of Control",
            excerpt: "Last night, while watching the Chanakya series, I came across a scene that left me thinking deeply. It wasn't just the dialogue, but the…",
            date: "Dec 15, 2024",
            link: "https://medium.com/@rathoresinghajay963/the-mind-beyond-the-illusion-of-control-6b10891f9d65"
        }
    ];

    

    // Render blog posts
    const blogGrid = document.getElementById('blog-posts');
    const mediumFeedURL = "https://medium.com/feed/@rathoresinghajay963"; // Your RSS feed
    
    async function fetchMediumPosts() {
        try {
            const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${mediumFeedURL}`);
            const data = await response.json();
    
            if (data.status !== "ok") throw new Error("Failed to fetch Medium posts");
    
            data.items.forEach(post => {
                const blogCard = document.createElement('div');
                blogCard.className = 'blog-card';
    
                // Extract first image from Medium content
                const tempDiv = document.createElement("div");
tempDiv.innerHTML = post.content;

// Extract only the first image
const imgTag = tempDiv.querySelector("img");
let imageUrl = imgTag ? imgTag.src : "default-placeholder.jpg";

// Remove the image from the content so it doesn't appear twice
if (imgTag) imgTag.remove();

// Extract clean text content without the image
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
    
    
}