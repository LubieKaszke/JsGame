var NewHelper = {
	newButton: function (x, y, key, callback, onInputOverEvent = null, anchorX = 0.5, anchorY = 0.5) {
		var button = game.add.button(x, y, key, callback, this, 0, 1, 2, 3);

		button.anchor.setTo(anchorX, anchorY);

		return button;
	},

	newText: function (x, y, text, fontSize = 16, anchorX = 0.5, anchorY = 0.5, alignment = "center", textColor = "white", strokeColor = "white", strokeSize = 0) {
		var text = game.add.text(x, y, text, { font: fontSize + "px Autour One", fill: textColor, align: alignment, stroke: strokeColor, strokeThickness : strokeSize });

		text.anchor.setTo(anchorX, anchorY);

		return text;
	}
};