game.MainMenu = function (game) { };

game.MainMenu.prototype = {
	create: function () {
		this.stage.backgroundColor = "#2448a0";
		this.world.setBounds(this.game.width, this.game.height);

		this.MainMenu = this.add.group();
		this.settingsMenu = this.add.group();

		this.createMenu();
		this.switchWindow(0);
	},

	createMenu: function () {
		var buttonHeight = 100;
		var offset = 100;

		var mainMenu = ["Start gry", "Ustawienia", "Informacje"];
		var settings = ["Zmień głośność", "Czyść postęp"];
		var info = "Info Text";
		var back = "Powrót";

		var mmCallbacks = [function () { this.state.start("Gameplay"); }, function () { this.switchWindow(1); }, function () { this.switchWindow(2); }];
		var smCallbacks = [this.changeVolume, this.reserProgress];

		for (var m = 0; m < mainMenu.length; m++) {
			var button = NewHelper.newButton(this.game.width * 0.5, this.game.height * 0.5 + (buttonHeight * m) - offset, "Button", mmCallbacks[m], this);
			var text = NewHelper.newText(button.x, button.y, mainMenu[m]);

			this.MainMenu.add(button);
			this.MainMenu.add(text);
		}

		for (var m = 0; m < settings.length; m++) {
			var button = NewHelper.newButton(this.game.width * 0.5, this.game.height * 0.5 + (buttonHeight * m) - offset, "Button", smCallbacks[m], this);
			var text = NewHelper.newText(button.x, button.y, mainMenu[m]);

			this.settingsMenu.add(button);
			this.settingsMenu.add(text);
		}

		this.infoText = newHelper.newText(this.game.width * 0.5, this.game.height * 0.5, info);

		this.backButton = newHelper.newButton(this.game.width * 0.5, this.game.height - offset, "Button", function () { this.switchWindow(0); }, this, true, null, 0.5, 0);
		this.backText = newHelper.newText(this.backButton.x, this.backButton.y + (buttonHeight + 0.5), back, true, 20);
	},

	switchWindow: function (id) {
		this.mainMenu.setAll("visible", id === 0);
		this.settingsMenu.setAll("visible", id === 1);

		this.infoText.visible = (id === 2);
		this.backButton.visible = this.backText.visible = (id != 0);
	},

	changeVolume: function () {
	},

	resetProgress: function () {

	},

	update: function (game) {

	}
};