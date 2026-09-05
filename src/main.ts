import {
	Editor,
	MarkdownView,
	MarkdownFileInfo,
	Modal,
	Notice,
	Plugin,
	TFile,
	addIcon,
	normalizePath,
} from 'obsidian';
import {
	DEFAULT_SETTINGS,
	DailyRosarySettings,
	DailyRosarySettingTab,
} from './settings';
import { getLiturgicalSeason } from './liturgical';
import { MysteryType } from './settings';

// Filenames only — the folder they live in is user-configurable (settings.mysteryFolder).
const MYSTERY_FILE: Record<MysteryType, string> = {
	joyful: 'The Joyful Mysteries.md',
	sorrowful: 'The Sorrowful Mysteries.md',
	glorious: 'The Glorious Mysteries.md',
	luminous: 'The Luminous Mysteries.md',
};

function getMysteryPath(settings: DailyRosarySettings, mystery: MysteryType): string {
	const folder = settings.mysteryFolder.trim().replace(/\/+$/, ''); // strip trailing slash(es)
	const filename = MYSTERY_FILE[mystery];
	return normalizePath(folder ? `${folder}/${filename}` : filename);
}

function getTodaysMystery(settings: DailyRosarySettings): MysteryType {
	const day = new Date().getDay(); // 0 = Sunday

	switch (day) {
		case 1: return 'joyful';      // Monday
		case 2: return 'sorrowful';   // Tuesday
		case 3: return 'glorious';    // Wednesday
		case 4: return settings.thursdayMystery; // Thursday: Joyful or Luminous
		case 5: return 'sorrowful';   // Friday
		case 6: return settings.thursdayMystery === 'luminous' ? 'joyful' : 'glorious'; // Saturday
		case 0: default: {
			if (settings.sundayMode === 'manual') return settings.manualSundayMystery;
			const season = getLiturgicalSeason();
			if (season === 'advent' || season === 'christmas') return 'joyful';
			if (season === 'lent') return 'sorrowful';
			return 'glorious';
		}
	}
}
//import {
//	PRAY_ICON,
//} from "/constants";

// Remember to rename these classes and interfaces!

export default class RosaryPlugin extends Plugin {
	settings!: DailyRosarySettings;

	async onload() {
		await this.loadSettings();

		// add custom svg icon
		addIcon('rosary_old', '<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a2 2 0 0 1-2-2m4 0a2 2 0 0 1-2 2m-2-9a2 2 0 0 1 2-2m-2 6a2 2 0 0 1-2-2m2 5v-3m2-6a2 2 0 0 1 2 2m0 0a2 2 0 0 1 2 2m-2 2v3m2-5a2 2 0 0 1-2 2m-6-2a2 2 0 0 1 2-2"/><circle cx="12" cy="8.5" r="2"/><circle cx="16" cy="7" r="2"/><circle cx="19" cy="4" r="2"/><circle cx="5" cy="4" r="2"/><circle cx="8" cy="7" r="2"/></svg>')
		addIcon('rosary','<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 11.5a2 2 0 0 1 4 0m-4 1v-1m0 1H9m1 4H9m1 3.5v-3.5m4-5v1m0 0h1m-1 4V20m0 0a2 2 0 0 1-4 0m5-7.5a2 2 0 0 1 0 4m0 0h-1m6.5-13.823A2 2 0 1 1 17.264 3M6.737 3A2 2 0 1 1 3.5 2.675M9 16.5a2 2 0 0 1 0-4"/><circle cx="12" cy="7.5" r="2"/><circle cx="16" cy="6.5" r="2"/><circle cx="8" cy="6.5" r="2"/></svg>')
		
		// This creates an icon in the left ribbon.
		this.addRibbonIcon('rosary', "Open today's rosary", () => {
			this.openTodaysRosary();
		});

		// Command (so you can bind a hotkey, or run via command palette)
		this.addCommand({
			id: 'open-todays',
			name: "Open today's rosary",
			callback: () => this.openTodaysRosary(),
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new DailyRosarySettingTab(this.app, this));

	}
	
	async openTodaysRosary() {
		const mystery = getTodaysMystery(this.settings);
		const path = getMysteryPath(this.settings, mystery);

		const file = this.app.vault.getAbstractFileByPath(path);

		if (file instanceof TFile) {
			await this.app.workspace.getLeaf(true).openFile(file);
		} else {
			new Notice(`Rosary file not found: ${path}. Check the "Mysteries folder" setting.`);
		}
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			(await this.loadData()) as Partial<DailyRosarySettings>,
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

