import { App, PluginSettingTab, Setting, TFolder, AbstractInputSuggest } from 'obsidian';
import MyPlugin from './main';
export type MysteryType = 'joyful' | 'sorrowful' | 'glorious' | 'luminous';
export type SundayMode = 'auto' | 'manual';

export interface DailyRosarySettings {
	// ...your existing fields...
	mysteryFolder: string;              // vault-relative folder containing the mystery files
	thursdayMystery: MysteryType;       // Luminous is common practice; Joyful is traditional
	sundayMode: SundayMode;
	manualSundayMystery: MysteryType;
	mySetting: string;
}

export const DEFAULT_SETTINGS: DailyRosarySettings = {
	// ...your existing defaults...
	mysteryFolder: 'Jesus Christ/Prayer',
	thursdayMystery: 'luminous',
	sundayMode: 'auto',
	manualSundayMystery: 'glorious',
	mySetting: 'default',
};

// Offers autocomplete suggestions of existing vault folders as the user types,
// the same pattern used by core Obsidian settings (e.g. "New file location").
class FolderSuggest extends AbstractInputSuggest<TFolder> {
	getSuggestions(query: string): TFolder[] {
		const q = query.toLowerCase();
		const folders: TFolder[] = [];
		const walk = (folder: TFolder) => {
			if (folder.path.toLowerCase().contains(q)) folders.push(folder);
			for (const child of folder.children) {
				if (child instanceof TFolder) walk(child);
			}
		};
		walk(this.app.vault.getRoot());
		return folders;
	}

	renderSuggestion(folder: TFolder, el: HTMLElement): void {
		el.setText(folder.path === '' ? '/' : folder.path);
	}

	selectSuggestion(folder: TFolder): void {
		this.setValue(folder.path);
		this.close();
	}
}

export class DailyRosarySettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Mysteries folder')
			.setDesc('The vault folder containing your mystery files (e.g. "The Joyful Mysteries.md"). Start typing to see matching folders.')
			.addText((text) => {
				text
					.setPlaceholder('Jesus Christ/Prayer')
					.setValue(this.plugin.settings.mysteryFolder)
					.onChange(async (value) => {
						this.plugin.settings.mysteryFolder = value.trim();
						await this.plugin.saveSettings();
					});

				const suggest = new FolderSuggest(this.app, text.inputEl);
				suggest.onSelect(async (folder) => {
					text.setValue(folder.path);
					this.plugin.settings.mysteryFolder = folder.path;
					await this.plugin.saveSettings();
				});
			});

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
