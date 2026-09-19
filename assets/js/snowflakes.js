/**
 * Snowflake hover effect from christmas-responsive_web_design.
 * Only active on the Classic and Holly themes.
 */
(function () {
	'use strict';

	var SELECTOR = 'button, .button, input[type="submit"], input[type="reset"], a.button, .icons a, a.icon, #sidebar nav a';
	var attached = [];
	var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	function festive() {
		var theme = document.documentElement.getAttribute('data-theme');
		return theme === 'christmas' || theme === 'holly';
	}

	function createSnowflake(button) {
		var buttonRect = button.getBoundingClientRect();
		var snowflake = document.createElement('div');

		snowflake.className = 'snowflake';
		snowflake.textContent = '❄';
		snowflake.setAttribute('aria-hidden', 'true');
		snowflake.style.left = (buttonRect.left + Math.random() * buttonRect.width) + 'px';
		snowflake.style.top = (buttonRect.top - 20) + 'px';
		snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
		snowflake.style.opacity = String(Math.random() * 0.5 + 0.5);

		document.body.appendChild(snowflake);

		window.setTimeout(function () {
			snowflake.style.top = (buttonRect.bottom + 20) + 'px';
			snowflake.style.left = (buttonRect.left + Math.random() * buttonRect.width) + 'px';
			snowflake.style.opacity = '0';
		}, 50);

		window.setTimeout(function () {
			if (snowflake.parentNode) snowflake.parentNode.removeChild(snowflake);
		}, 2100);
	}

	function burst(button) {
		if (!festive() || reduced) return;
		if (button.closest('.rv-theme-toggle, .rv-tour-launcher, .rv-tour')) return;
		for (var i = 0; i < 5; i++) {
			window.setTimeout(createSnowflake.bind(null, button), i * 200);
		}
	}

	function onEnter(event) {
		burst(event.currentTarget);
	}

	function detach() {
		attached.forEach(function (el) {
			el.removeEventListener('mouseenter', onEnter);
		});
		attached = [];
	}

	function attach() {
		detach();
		if (!festive() || reduced) return;
		document.querySelectorAll(SELECTOR).forEach(function (el) {
			el.addEventListener('mouseenter', onEnter);
			attached.push(el);
		});
	}

	function init() {
		attach();
		document.addEventListener('rv-theme-change', attach);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}

	window.addEventListener('load', attach);
})();
