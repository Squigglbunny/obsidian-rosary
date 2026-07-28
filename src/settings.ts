import { App, PluginSettingTab, Setting } from 'obsidian';
import MyPlugin from './main';
export type MysteryType = 'joyful' | 'sorrowful' | 'glorious' | 'luminous';
export type SundayMode = 'auto' | 'manual';

export interface MyPluginSettings {
	// ...your existing fields...
	thursdayMystery: MysteryType;       // Luminous is common practice; Joyful is traditional
	sundayMode: SundayMode;
	manualSundayMystery: MysteryType;
	mySetting: string;
}

export const DEFAULT_SETTINGS: MyPluginSettings = {
	// ...your existing defaults...
	thursdayMystery: 'luminous',
	sundayMode: 'auto',
	manualSundayMystery: 'glorious',
	mySetting: 'default',
};


export class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Settings #1')
			.setDesc("It's a secret")
			.addText((text) =>
				text
					.setPlaceholder('Enter your secret')
					.setValue(this.plugin.settings.mySetting)
					.onChange(async (value) => {
						this.plugin.settings.mySetting = value;
						await this.plugin.saveSettings();
					}),
			);
		new Setting(containerEl)
			.setName('Thursday mystery')
			.setDesc('Traditional is Joyful; common modern practice is Luminous.')
			.addDropdown((dropdown) =>
				dropdown
					.addOption('joyful', 'Joyful')
					.addOption('luminous', 'Luminous')
					.setValue(this.plugin.settings.thursdayMystery)
					.onChange(async (value) => {
						this.plugin.settings.thursdayMystery = value as MysteryType;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(containerEl)
			.setName('Sunday mystery')
			.setDesc('Auto follows the liturgical calendar (Advent/Christmas → Joyful, Lent → Sorrowful, otherwise → Glorious). Manual lets you fix it.')
			.addDropdown((dropdown) =>
				dropdown
					.addOption('auto', 'Auto (liturgical calendar)')
					.addOption('manual', 'Manual')
					.setValue(this.plugin.settings.sundayMode)
					.onChange(async (value) => {
						this.plugin.settings.sundayMode = value as SundayMode;
						await this.plugin.saveSettings();
						this.display(); // refresh to show/hide the manual picker
					}),
			);

		if (this.plugin.settings.sundayMode === 'manual') {
			new Setting(containerEl)
				.setName('Manual Sunday mystery')
				.addDropdown((dropdown) =>
					dropdown
						.addOption('joyful', 'Joyful')
						.addOption('sorrowful', 'Sorrowful')
						.addOption('glorious', 'Glorious')
						.addOption('luminous', 'Luminous')
						.setValue(this.plugin.settings.manualSundayMystery)
						.onChange(async (value) => {
							this.plugin.settings.manualSundayMystery = value as MysteryType;
							await this.plugin.saveSettings();
						}),
				);
		}
	}
}
