/**
 * Snowflake Animation Effect
 * Creates falling snowflakes on button and social media icon hover
 */

(function() {
    'use strict';

    /**
     * Creates a single snowflake element that falls from top to bottom
     * @param {HTMLElement} button - The button element to attach snowflake to
     */
    function createSnowflake(button) {
        const buttonRect = button.getBoundingClientRect();
        const snowflake = document.createElement('div');

        snowflake.classList.add('snowflake');
        snowflake.textContent = '❄';
        snowflake.style.position = 'fixed';
        snowflake.style.left = `${buttonRect.left + Math.random() * buttonRect.width}px`;
        snowflake.style.top = `${buttonRect.top - 20}px`;
        snowflake.style.fontSize = `${Math.random() * 10 + 10}px`;
        snowflake.style.opacity = `${Math.random() * 0.5 + 0.5}`;
        snowflake.style.transition = 'top 2s ease-in, left 2s ease-in-out, opacity 2s ease-in';
        snowflake.style.pointerEvents = 'none';
        snowflake.style.zIndex = '10000';
        snowflake.style.color = '#ffffff';

        document.body.appendChild(snowflake);

        // Trigger animation
        setTimeout(() => {
            snowflake.style.top = `${buttonRect.bottom + 20}px`;
            snowflake.style.left = `${buttonRect.left + Math.random() * buttonRect.width}px`;
            snowflake.style.opacity = '0';
        }, 50);

        // Remove snowflake after animation completes
        setTimeout(() => {
            if (snowflake.parentNode) {
                snowflake.parentNode.removeChild(snowflake);
            }
        }, 2100);
    }

    /**
     * Creates multiple snowflakes with staggered timing
     * @param {HTMLElement} button - The button element to attach snowflakes to
     */
    function createMultipleSnowflakes(button) {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => createSnowflake(button), i * 200);
        }
    }

    /**
     * Initialize snowflake listeners on all buttons and social media icons
     */
    function initSnowflakes() {
        // Target all button elements, anchor elements with button class, sidebar nav links, and social media icons
        const buttons = document.querySelectorAll('button, .button, input[type="submit"], input[type="reset"], a.button, .icons a, a.icon, #sidebar nav a');

        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                createMultipleSnowflakes(this);
            });
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSnowflakes);
    } else {
        initSnowflakes();
    }

    // Also initialize on window load to catch dynamically added buttons
    window.addEventListener('load', initSnowflakes);

})();
