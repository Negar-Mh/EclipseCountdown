document.addEventListener('DOMContentLoaded', () => {

    // --- Color Chip Selector ---
    const colorChips = document.querySelectorAll('.color-chip');
    colorChips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Remove active class from all chips
            colorChips.forEach(c => c.classList.remove('active'));
            // Add active class to the clicked chip
            chip.classList.add('active');
        });
    });

    // --- Mouse-Following Glow Effect ---
    const appContainer = document.getElementById('app-container');
    appContainer.addEventListener('mousemove', (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        // Calculate position of the mouse relative to the container
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Apply the effect using a pseudo-element's properties or by manipulating a background gradient
        appContainer.style.setProperty('--mouse-x', `${x}px`);
        appContainer.style.setProperty('--mouse-y', `${y}px`);
    });

    // --- Product Image 3D Tilt Effect ---
    const productGallery = document.querySelector('.product-gallery');
    const productImage = document.querySelector('.product-image');

    productGallery.addEventListener('mousemove', (e) => {
        const rect = productGallery.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element.
        const y = e.clientY - rect.top;  // y position within the element.

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5; // Max rotation 5 degrees
        const rotateY = ((x - centerX) / centerX) * 5; // Max rotation 5 degrees

        productImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        productImage.style.transition = 'transform 0.1s linear';
    });

    productGallery.addEventListener('mouseleave', () => {
        productImage.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        productImage.style.transition = 'transform 0.5s ease';
    });

    // --- Add to Cart Button ---
    const addToCartButton = document.querySelector('.add-to-cart-btn');
    if (addToCartButton) {
        const buttonText = addToCartButton.querySelector('span');
        const originalText = buttonText.textContent;

        addToCartButton.addEventListener('click', () => {
            buttonText.textContent = 'Added!';
            setTimeout(() => {
                buttonText.textContent = originalText;
            }, 2000); // Revert back after 2 seconds
        });
    }

    // --- Prevent Page Jump on Header Links ---
    const headerLinks = document.querySelectorAll('header a');
    headerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
        });
    });
});
