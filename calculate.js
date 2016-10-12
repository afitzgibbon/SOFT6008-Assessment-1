function changeColor() {
	var selectedColour = document.getElementById("selectColour").value;
	
	if (selectedColour == "" || selectedColour == null)
		selectedColour = "blank";

	document.getElementById("imgMug").src = "./images/mug_" + selectedColour + ".png";
}

function cleanUp() {
	document.getElementById("selectColour").focus();
	document.getElementById("imgMug").src = "./images/mug_blank.png";
}

function calculateTotal() {
	if (document.getElementById("selectColour").value == "") {
		//alert("You need to select a colour for your mug!");
		document.getElementById("selectColour").focus();
	}
	else if (document.getElementById("selectSize").value == "") {
		//alert("You need to select a size for your mug!");
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

function parsePriceFrom(id) {
	var el = document.getElementById(id);
	var text = el.options[el.selectedIndex].text;
	var index = text.indexOf("€");
	
	if (index == -1) {
		return +0; // unary '+' ensures a number is returned
	}
	else {
		return parseFloat(text.substring(index + 1));
	}
}

function validate() {
	if (document.getElementById("displayPrice").value == "€0.00") {
		alert("Please total up your order before submitting!");
		return false;
	}
}