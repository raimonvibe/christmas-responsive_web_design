/*
	Seasonal theme switcher.
	Classic and Holly come from christmas-responsive_web_design
	(string lights + hover snowflakes). Holly also remaps the palette.
	Ethereal is the year-round Hyperspace look.
*/
(function () {
	'use strict';

	var KEY = 'rv-theme';
	var THEMES = ['christmas', 'holly', 'ethereal'];
	var LABELS = {
		christmas: 'Classic',
		holly: 'Holly',
		ethereal: 'Default'
	};
	var NEXT = {
		christmas: 'holly',
		holly: 'ethereal',
		ethereal: 'christmas'
	};
	var LIGHTS_SRC = 'assets/images/christmas-lights.svg';

	function currentTheme() {
		var theme = document.documentElement.getAttribute('data-theme');
		return THEMES.indexOf(theme) !== -1 ? theme : 'christmas';
	}

	function isFestive(theme) {
		return theme === 'christmas' || theme === 'holly';
	}

	function persist(theme) {
		try {
			localStorage.setItem(KEY, theme);
		} catch (err) {
			/* private mode / blocked storage */
		}
	}

	function apply(theme) {
		if (THEMES.indexOf(theme) === -1) theme = 'christmas';
		document.documentElement.setAttribute('data-theme', theme);
		persist(theme);
		syncLights(theme);
		updateToggle(theme);
		document.dispatchEvent(new CustomEvent('rv-theme-change', { detail: { theme: theme } }));
	}

	function syncLights(theme) {
		var existing = document.getElementById('Christmas_Lights');
		if (!isFestive(theme)) {
			if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
			return;
		}
		if (existing) return;

		fetch(LIGHTS_SRC)
			.then(function (response) {
				if (!response.ok) throw new Error('lights missing');
				return response.text();
			})
			.then(function (markup) {
				if (!isFestive(currentTheme())) return;
				if (document.getElementById('Christmas_Lights')) return;
				var wrap = document.createElement('div');
				wrap.innerHTML = markup.trim();
				var svg = wrap.querySelector('svg');
				if (!svg) return;
				svg.setAttribute('aria-hidden', 'true');
				svg.setAttribute('focusable', 'false');
				document.body.insertBefore(svg, document.body.firstChild);
			})
			.catch(function () {
				/* lights are decorative */
			});
	}

	function iconFor(theme) {
		if (theme === 'holly') return '🌿';
		if (theme === 'ethereal') return '✦';
		return '🎄';
	}

	function updateToggle(theme) {
		var button = document.querySelector('.rv-theme-toggle');
		if (!button) return;
		var next = NEXT[theme];
		button.setAttribute('data-theme-current', theme);
		button.setAttribute('aria-label', 'Theme: ' + LABELS[theme] + '. Activate to switch to ' + LABELS[next] + '.');
		button.title = 'Theme: ' + LABELS[theme] + ' — click for ' + LABELS[next];
		button.querySelector('.rv-theme-toggle__icon').textContent = iconFor(theme);
		button.querySelector('.rv-theme-toggle__label').textContent = LABELS[theme];
	}

	function buildToggle() {
		if (document.querySelector('.rv-theme-toggle')) return;

		var button = document.createElement('button');
		button.type = 'button';
		button.className = 'rv-theme-toggle';
		button.innerHTML =
			'<span class="rv-theme-toggle__icon" aria-hidden="true"></span>' +
			'<span class="rv-theme-toggle__label"></span>';
		button.addEventListener('click', function () {
			apply(NEXT[currentTheme()]);
		});
		document.body.appendChild(button);
		updateToggle(currentTheme());
	}

	function init() {
		buildToggle();
		syncLights(currentTheme());
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
