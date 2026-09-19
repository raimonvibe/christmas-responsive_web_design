/*
	Apply the saved seasonal theme before first paint so the palette
	does not flash from Ethereal to Christmas on load.
*/
(function () {
	var theme;
	try {
		theme = localStorage.getItem('rv-theme');
	} catch (err) {
		theme = null;
	}
	if (theme !== 'ethereal' && theme !== 'christmas' && theme !== 'holly') {
		theme = 'christmas';
	}
	document.documentElement.setAttribute('data-theme', theme);
})();
