// add a list of items to the content div
let items = ["hewey", "dewey", "louie"];

function addContent () {
	
	// build the html string for a <ul> list
    let items_html = "<ul>";
    for (let i=0; i < items.length; i++) {
		item = items[i];
		items_html += "<li>" + item + "</li>";
	};
	
	// using javascript
	// 1. find the content div
	// 2. modify its html attribute by adding items_html

	items_html += "</ul>";
	document.getElementById('content').innerHTML = items_html;

}

function addExtra(form) {
	function handleForm(event) { event.preventDefault(); } 
	form.addEventListener('submit', handleForm);

	items.push(form.extra.value);
	addContent();
}

function remove() {
	items.pop();
	addContent();
}