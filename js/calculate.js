/* this function changes the mug image to represent the colour that the user has selected.
   the ID passed in is the ID of the selected colour tile. a colour value is stored in a 
   hidden input in the markup, which ensures that the form can submit the selection. the 
   function returns false as it is called from an anchor tag, this false ensures that no
   link is followed. the soul purpose of the anchor tag is to call this function and get a
   value into the selectColor hidden input. this function changes the image to the correct
   colour.
*/
function changeColor(id) {
	var el = document.getElementById("selectColor");
	
	if (id == "blueTile") {
		el.value = "blue";
	}
	else if (id == "greenTile") {
		el.value = "green";
	}
	else if (id == "orangeTile") {
		el.value = "orange";
	}
	else if (id == "redTile") {
		el.value = "red";
	}
	else if (id == "yellowTile") {
		el.value = "yellow";
	}
	else {
		el.value = "black";
	}
	
	document.getElementById("imgMug").src = "./images/mug_" + el.value + ".png";
	document.getElementById("selectSize").focus();
	return false;
}

/* this function is called if the user resets the form. it gives focus to the first
   element in the form, the blue tile, and changes the mug image to the default one
*/
function cleanUp() {
	document.getElementById("blueTile").focus();
	document.getElementById("imgMug").src = "./images/mug_blank.png";
}

/* this function sums up all the selected mug options and displays the total back on
   the form. it first checks if the selectSize has been selected and if not warns the
   user and returns. if the mandatory size has been selected then the total is calculated
   by parsing the price from each element, summing them up and the final value is then 
   displayed.
*/
function calculateTotal() {
	if (document.getElementById("selectSize").value == "") {
		document.getElementById("selectSize").focus();
	}
	else {
		var price = parsePriceFrom("selectSize");
		price += parsePriceFrom("selectUpgrade");
		price += parsePriceFrom("selectAddons");
		price += parsePriceFrom("selectSupplier");
		document.getElementById("displayPrice").value = "€" + price.toFixed(2); // print prise with 2 decimal places
		return;
	}
	alert("You need to supply a colour and size for your mug!");
}

/* this function parses a price from a string by searching for a € symbol. if a price exists
   it is returned as a float and if no price was found 0 is returned
*/
function parsePriceFrom(id) {
	var el = document.getElementById(id);
	var text = el.options[el.selectedIndex].text; // this retrieves the selected text from a drop-down list
	var index = text.indexOf("€"); // what we are looking for
	
	if (index == -1) { // -1 indicates that the € symbol is not present
		return +0; // unary '+' ensures a number is returned
	}
	else {
		return parseFloat(text.substring(index + 1)); // return everything after the € symbol
	}
}

/* this function validates the form before allowing submission. false is returned if validation fails
   and therefore the form does not submit. it will fail if the mug colour has not been selected and it
   will fail if the total price has not been calculated. the size must also be selected but the browser
   takes care of this by making that element 'required'. if validation passes the function does not
   return anything, and this allows the form to submit
*/
function validate() {
	if (document.getElementById("selectColor").value == "blank") {
		alert("You must select a colour for your mug!");
		document.getElementById("blueTile").focus();
		return false;
	}
	if (document.getElementById("displayPrice").value == "€0.00") {
		alert("Please total up your order before submitting!");
		return false;
	}
}