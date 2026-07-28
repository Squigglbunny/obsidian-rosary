import {
	Editor,
	MarkdownView,
	MarkdownFileInfo,
	Modal,
	Notice,
	Plugin,
	TFile,
	addIcon,
} from 'obsidian';
import {
	DEFAULT_SETTINGS,
	MyPluginSettings,
	SampleSettingTab,
} from './settings';
import { getLiturgicalSeason } from './liturgical';
import { MysteryType } from './settings';

const MYSTERY_FILE: Record<MysteryType, string> = {
	joyful: 'Jesus Christ/Prayer/The Joyful Mysteries.md',
	sorrowful: 'Jesus Christ/Prayer/The Sorrowful Mysteries.md',
	glorious: 'Jesus Christ/Prayer/The Glorious Mysteries.md',
	luminous: 'Jesus Christ/Prayer/The Luminous Mysteries.md',
};

function getTodaysMystery(settings: MyPluginSettings): MysteryType {
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
	settings!: MyPluginSettings;

	async onload() {
		await this.loadSettings();

		// add custom svg icon
		addIcon('pray', '<svg xmlns="http://www.w3.org/2000/svg"  viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" stroke - width="2" stroke - linecap="round" stroke - linejoin="round" > <path d="M2 15v-5c0-1.1.5-2 1.5-3l3.09-3.25c1.059-1.12 2.932-.674 3.373.802A2 2 0 0 1 9.5 6.5l-3.4 4.2L6 14v-2c0-1.54 1.667-2.502 3-1.732A2 2 0 0 1 10 12v3c0 .6-.2 1.1-.6 1.4l-4.9 5.1M22 15v-5c0-1.1-.5-2-1.5-3l-3.09-3.25c-1.059-1.12-2.932-.674-3.373.802A2 2 0 0 0 14.5 6.5l3.4 4.2.1 3.3v-2c0-1.54-1.667-2.502-3-1.732A2 2 0 0 0 14 12v3c0 .6.2 1.1.6 1.4l4.9 5.1" /> </svg>')
		addIcon('rosary', '<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a2 2 0 0 1-2-2m4 0a2 2 0 0 1-2 2m-2-9a2 2 0 0 1 2-2m-2 6a2 2 0 0 1-2-2m2 5v-3m2-6a2 2 0 0 1 2 2m0 0a2 2 0 0 1 2 2m-2 2v3m2-5a2 2 0 0 1-2 2m-6-2a2 2 0 0 1 2-2"/><circle cx="12" cy="8.5" r="2"/><circle cx="16" cy="7" r="2"/><circle cx="19" cy="4" r="2"/><circle cx="5" cy="4" r="2"/><circle cx="8" cy="7" r="2"/></svg>')
		addIcon('rosary2','<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 11.5a2 2 0 0 1 4 0m-4 1v-1m0 1H9m1 4H9m1 3.5v-3.5m4-5v1m0 0h1m-1 4V20m0 0a2 2 0 0 1-4 0m5-7.5a2 2 0 0 1 0 4m0 0h-1m6.5-13.823A2 2 0 1 1 17.264 3M6.737 3A2 2 0 1 1 3.5 2.675M9 16.5a2 2 0 0 1 0-4"/><circle cx="12" cy="7.5" r="2"/><circle cx="16" cy="6.5" r="2"/><circle cx="8" cy="6.5" r="2"/></svg>')
		//addIcon('guadaloupe','<svg version="1.0" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 512 512" stroke="currentColor" ><path d="M251.2 2.2c-1.1 1.3-3.7 4.2-5.7 6.5-2.2 2.6-6.4 5.6-10.3 7.5-6 3-7.5 3.3-15.7 3.3-7.7 0-9.8-.4-14.9-2.8-3.2-1.5-6.8-2.7-8-2.7-3.8 0-6.3 3.8-6.9 10.7-1.4 16.8-14.6 30.6-31.4 32.8-8.6 1.1-8.8 1.5-8.8 15.2 0 10.6-.3 12.3-2.6 17.3-4.8 10-12.7 16.7-24.1 20.3-.9.3-2.4 1.7-3.3 3-1.3 2-1.4 3.4-.4 9.8 1 6.3.9 8.4-.5 13.9-3 11.7-10.6 20.3-21.7 24.6-8.9 3.4-10.1 8.2-4 15.7 10.9 13.1 10.9 32 .1 45.1-5.2 6.3-5.2 8.9 0 15.2 10.9 13.2 10.7 32.1-.3 45.6-2.1 2.5-3.7 5.6-3.7 6.9 0 1.4 1.9 4.9 4.1 7.9 2.3 3 4.8 7 5.5 8.7 3.1 7.2 11.1 8.2 14.1 1.7 1.6-3.3 1.6-3.5-2.1-10.8l-3.7-7.5 3-5.3c4-7.1 6.1-15.6 6.1-24.8 0-9.1-1.7-15.8-6.1-24-2.9-5.5-3.1-6.4-1.9-8.3 5.4-8.5 8-17.5 8-27.7-.1-9-1.2-14.5-4.7-21.8-1.8-3.9-2.3-5.7-1.4-6 2.6-.9 11.3-8.5 14.2-12.5 7.1-9.6 11.8-24.6 10.6-33.7-.4-3.5-.3-3.7 4.6-6.5 14.6-8.2 24.1-23.3 25.4-40.5l.6-7.7 4.6-1.2c13.9-3.7 27.2-16.7 32.3-31.6 1.4-4.2 2.1-5 4-4.8 12 1.3 19 1.4 24 .4 7.1-1.5 16-5.9 21.6-10.6l4.2-3.7 4.2 3.7c5.6 4.7 14.5 9.1 21.6 10.6 5 1 12 .9 24-.4 1.9-.2 2.6.6 4 4.8 5.1 15 18.4 27.9 32.5 31.7l4.7 1.2V76c.2 14.3 5.9 20.8 13.2 15.1 2.4-1.9 2.5-2.2 2.4-16.1-.1-16.3-.2-16.4-8.9-17.5C336.3 55.2 322 39.6 322 23c0-4.5-3.2-9-6.5-9-1.2 0-4.9 1.2-8.1 2.7-5.1 2.4-7.2 2.8-14.9 2.8-8.2 0-9.7-.3-15.7-3.3-4.9-2.4-8.2-5-12.4-9.7-6.3-7.3-9.6-8.3-13.2-4.3"/><path d="M245.1 48.1c-7.1 1.2-21.6 6.1-28.8 9.8-8.7 4.4-14.7 10.2-18.5 17.9-3.1 6.2-3.3 7.4-3.7 18.9-.3 13.6 1.1 34 3.6 51.1 1.6 11 1.6 11.2-.4 13.5-8 8.8-19 30.4-23.1 45.4l-2.7 9.8L171 315l-.5 100.5-2.1-3c-1.2-1.7-3.3-5.3-4.7-8.1-3.5-6.9-5.2-8.4-9.3-8.4-5.3 0-7.4 2.8-7.4 9.9 0 19.5 8.9 45.3 21.4 61.8l5.4 7.2-3.6 1.2c-2.1.6-4.7 1.7-5.9 2.5-2 1.3-2.3 1.1-4.3-2-3.7-6-13.4-14.2-19.8-16.7l-5.9-2.3-.5-9c-.9-15.2-8.1-28.8-19.9-37.3-2.8-1.9-4.8-4.1-4.5-4.7 5.2-11.7 6-14.5 6.4-23.7.5-11-1.1-17.9-6-27l-3-5.5 3.1-5.5c4-7.2 4.1-11.9.4-14.9-1.9-1.5-3.5-1.9-5.3-1.5-3.5.9-4.8 2.2-7.5 7.4-1.3 2.5-3.7 6.3-5.4 8.5-3.9 4.9-3.9 7.3 0 12.2 5.7 7.2 8.2 13.3 8.7 21.5.6 9.9-1.4 16.6-7.3 24.4-2.5 3.3-4.5 6.9-4.5 8.1 0 3.2 3.3 6.7 7.6 8.3 13.1 4.7 22.3 17.9 22.4 32.1 0 3.6-.4 7.9-.9 9.6-1.2 4.4.9 9.1 4.6 10 12.6 2.8 16.5 4.7 21.7 10.4 6.1 6.8 6.4 8.1 3.1 15s-2.9 10.4 1.7 12.9c4.2 2.4 7.6.6 11.6-6.2 8.2-14 21.9-17.5 35.2-8.8 22.3 14.5 49 20.6 74.6 17 15.8-2.2 31.8-8.2 45.4-17 13.3-8.7 27-5.2 35.2 8.8 4 6.8 7.4 8.6 11.6 6.2 4.6-2.5 5-6 1.7-12.9s-3-8.2 3.1-15c5.2-5.7 9.1-7.6 21.7-10.4 3.8-.9 5.8-5.6 4.5-10.4-.6-2-.8-6.8-.6-10.6.7-13.4 8-24 20.4-29.8 10.8-5 11.7-8.3 4.9-17.3-5.9-7.8-7.9-14.5-7.3-24.4.5-8.2 3-14.3 8.7-21.5 3.9-4.9 3.9-7.3 0-12.2-5.7-7.2-8.2-13.3-8.7-21.5-.6-9.9 1.4-16.6 7.3-24.4 2.5-3.3 4.5-7 4.5-8.4 0-1.3-1.6-4.4-3.7-6.9-11-13.5-11.2-32.4-.3-45.6 2.4-2.8 4-5.9 4-7.4 0-1.4-1.8-4.8-4.1-7.8-5.6-7.2-7.9-13.9-7.9-22.4 0-8.6 2.7-16.2 8.1-22.7 6.1-7.5 4.9-12.3-4-15.7-11.3-4.3-18.8-13-21.8-25-1.4-5.9-1.5-7.9-.5-13.9 1.1-6 1-7.3-.3-9.4-.9-1.3-2.4-2.7-3.3-3s-5-2-8.9-3.9c-8.7-4.1-11.6-3.8-14.1 1.3-1.5 3.1-1.5 3.7-.1 6.1.8 1.5 3.7 4 6.5 5.7 4.9 2.9 5.1 3.2 4.7 6.6-1.2 9 3.5 24 10.6 33.6 2.9 4 11.6 11.6 14.2 12.5.9.3.4 2.1-1.4 6-3.5 7.4-4.7 12.8-4.7 21.8 0 10.8 2.3 18.7 8 27.7 1.2 1.9 1 2.8-1.9 8.3-4.4 8.2-6.1 14.9-6.1 24 0 9.2 2.1 17.7 6.1 24.9l3.1 5.3-3 5.7c-4.4 8.2-6.2 15.4-6.2 24.6 0 9.3 1.8 16.5 6.2 24.6l3 5.5-3 5.5c-4.9 8.8-6.5 15.8-6 26.8.4 9.2 1.2 12 6.4 23.7.3.6-1.7 2.8-4.5 4.7-11.8 8.5-19 22.1-19.9 37.4-.2 5.1-.9 9.3-1.4 9.3s-3.4 1.2-6.4 2.6c-6.1 2.9-15.2 10.8-18.4 15.9-2 3.2-2.3 3.4-4.3 2.1-1.2-.8-3.8-1.9-5.9-2.5l-3.6-1.2 5.3-7.1c12.6-16.7 21.5-42.4 21.5-61.9 0-7.1-2.1-9.9-7.4-9.9-4.3 0-5.6 1.3-10.1 9.8-1.9 3.7-4.4 7.8-5.4 9.1-1.8 2.3-1.8 2.3-2.5-7-.3-5.2-2.6-20-5-32.9l-4.4-23.5 5.3-31.5c13.3-79 14.4-113.3 4.6-136.4-3-6.8-8.7-8.8-12.9-4.3-2.8 3-2.8 5 .3 14.1 3.3 9.8 4.8 25.1 4 40.1-1.4 25.1-8.2 75.5-9.7 71.9-.4-1.1-4.1-20.3-8.3-42.8s-8.4-42.9-9.5-45.3c-2.8-6.3-6.5-10.7-12.5-14.8-3.5-2.5-5.6-4.7-5.9-6.4-.3-1.4-4.4-26.5-9.1-55.6-4.6-29.2-9.1-55.1-9.9-57.7-1.7-5.8-5.4-12.1-9.6-16.7-1.7-1.8-2.9-3.5-2.7-3.8.8-.8 10.2 1.8 13.3 3.8 4.8 2.9 9.3 8.5 12.5 15.4 2.3 4.9 3.8 12.2 8.4 40.4 3 18.9 6 35 6.6 35.8 2 2.3 13.9 10.3 16.4 10.9 1.9.5 3.2-.1 5.5-2.4 1.6-1.7 3-4 3-5.2 0-2.2-4-6.7-9.3-10.5-2.7-2-2.9-2.7-7.8-33-5.4-33.8-7.1-40.4-12.8-49.2-7.4-11.4-17.6-18.3-29.8-20.3-6.6-1.1-7.7-1.1-15.2.1m-6.8 22.8c4.3 1.7 9.9 7.4 12.3 12.6 3.7 7.8 3.4 8.8-2.3 8-5.3-.8-12.7-3.7-13.7-5.4-1.2-2-6.9-1.2-10.7 1.5-3.5 2.4-9.2 4.3-13.1 4.4-2.6 0-2.3-3.7.8-9.8 2.7-5.5 6.8-9.2 11.9-11 3.8-1.3 11.6-1.5 14.8-.3m-2.5 33c3.1 1.1 8.9 2.3 12.9 2.6 8.2.9 7.2-.8 9.9 16l1.5 9.9-2.3 1.9c-3.7 2.9-16 8.7-18.7 8.7-4.2 0-10.9-3.9-15.6-9.2-4.9-5.5-10.9-17-12-23-.7-3.6-.7-3.7 3.2-4.2 2.9-.5 12.5-3.3 15.1-4.5.1 0 2.8.8 6 1.8m-10 50.6 5.2 2.6-.1 8.7v8.7l-4.9 3.7-4.9 3.7-1.5-5.2c-2.2-7.6-5.3-21.4-6.1-27.2l-.7-5 3.8 3.7c2.2 2 6.3 4.8 9.2 6.3m40.6 17.5c1.9 11.8 3.3 21.6 3.2 21.8-.2.2-2.1-.2-4.3-.8-2.7-.9-4.5-2.3-6.3-5.2-1.4-2.2-4.9-6.2-7.7-8.8l-5.3-4.9v-16.6l8.3-4c4.5-2.2 8.3-3.8 8.4-3.5.2.3 1.8 10.2 3.7 22m-59.1 15.3 3.5 10.8-2.4 5.5c-1.3 3-3.4 8.7-4.6 12.7-2 6.8-2.2 9.8-2.7 53.2-.7 52.2-.1 48.9-9.3 56.9l-5.3 4.6-.3-54.2c-.3-59.7-.1-61.7 5.9-78.1 2.5-7 10.8-23.1 11.5-22.4.1.1 1.8 5.1 3.7 11m36.2 4.9c5.2 6.2 5.3 7.6 1 18.4-2 5.2-4 9.4-4.4 9.4-1.2 0-12.1-18.7-12.1-20.8 0-1.7 8.9-11.2 10.6-11.2.7 0 2.9 1.9 4.9 4.2m28.3 18.2c15.8 4.6 18.2 7.7 22.1 28.2 3.2 17.5 3.7 16.8-8.5 13.4-11.3-3.1-23.6-9.6-32.3-17l-2.4-2 4.6-9.8c2.5-5.3 4.9-10.9 5.2-12.5.9-3.3 1-3.3 11.3-.3m-45.9 15.9 5.2 7.8-3 3.7c-1.6 2-5 5.7-7.5 8.2l-4.6 4.4v-10.2c0-10.2 2.5-24.2 4-22.5.4.4 3.1 4.3 5.9 8.6m37.1 33.2 9 4.6v22.4c0 21.2.1 22.6 2 24.5 3 3 8.3 2.7 10.9-.6 2-2.5 2.1-4 2.1-22.6v-20l2.8.6c1.5.2 4.3.7 6.3 1.1l3.7.6 2.2 12.2c1.3 6.7 6.6 35.5 12 63.9 5.3 28.5 9.5 51.8 9.4 51.8s-7.1-3.2-15.5-7c-9.9-4.5-16.4-8.1-18.1-10l-2.8-3v-44.2l-3-3c-2.5-2.4-3.6-2.9-5.8-2.4-6 1.5-6.2 2.5-6.2 28 0 22.1.1 23.3 2.4 28.1 2.8 6.2 8.9 11.8 16.2 15l5.4 2.4-.2 24.3-.3 24.2-6 1.9c-24.4 7.4-54.7 5.8-79.2-4.4-13.3-5.6-11.6-5.9 30.6-5.9 33.7 0 34.9-.1 37.5-2.1 3.3-2.6 3.5-7.3.4-10.6l-2.1-2.3h-60.6l-.3-35c-.3-34.5-.3-35-2.5-37.1-2.7-2.8-7.7-2.9-10.3-.3-1.9 1.8-2 3.8-2 37.2-.1 26.1-.4 35.5-1.3 36.3-.7.5-2.5 1.9-4.2 2.9-1.6 1.1-3.7 2.5-4.7 3.2-1.3.9-2 .9-3.2-.1-1.4-1.2-1.6-6.1-1.6-41.6v-40.3l2.6-3.2c1.5-1.7 5.9-5.5 9.9-8.5 8.4-6.3 12-10.6 14.8-17.9 1.8-4.4 2.1-8 2.5-27.6l.4-22.5 8.8-9.1c4.8-5.1 10.4-11.2 12.5-13.7l3.8-4.5 6.4 4.8c3.5 2.7 10.4 6.9 15.3 9.5m62.4 160.8c1.4 11.8 1.2 12.1-5.6 17-3.5 2.4-6.9 4.7-7.5 5.1-1 .6-1.3-3-1.3-16.3v-17l6.9 3 6.8 3.1zm-140.9 29.9c12.4 9 29.3 16.1 46.4 19.5 10.8 2.1 37.3 2.4 48.1.4 21.8-3.9 41.1-12.9 57.5-27 3.3-2.7 6.1-4.8 6.3-4.6.3.2-1.4 3.8-3.7 8-26.7 49.6-87.3 65.2-134.8 34.9-6.4-4.1-17.8-14.8-23.1-21.7-3.9-5.1-12.2-19.3-12.2-21.1 0-.5 1.9.8 4.3 2.8 2.3 2 7.4 5.9 11.2 8.8"/></svg>')
		// modified from < a href = "https://www.flaticon.com/free-icons/catholic" title = "catholic icons" > Catholic icons created by Magnific - Flaticon < /a>

		// This creates an icon in the left ribbon.
		this.addRibbonIcon('rotate-cw', "Open today's rosary", () => {
			this.openTodaysRosary();
		});

		// Command (so you can bind a hotkey, or run via command palette)
		this.addCommand({
			id: 'open-todays-rosary',
			name: "Open today's rosary",
			callback: () => this.openTodaysRosary(),
		});


		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Status bar text');

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'open-modal-simple',
			name: 'Open modal (simple)',
			callback: () => {
				new SampleModal(this.app).open();
			},
		});
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'replace-selected',
			name: 'Replace selected content',
			editorCallback: (
				editor: Editor,
				_ctx: MarkdownView | MarkdownFileInfo,
			) => {
				editor.replaceSelection('Sample editor command');
			},
		});
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: 'open-modal-complex',
			name: 'Open modal (complex)',
			checkCallback: (checking: boolean) => {
				// Conditions to check
				const markdownView =
					this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					// If checking is true, we're simply "checking" if the command can be run.
					// If checking is false, then we want to actually perform the operation.
					if (!checking) {
						new SampleModal(this.app).open();
					}

					// This command will only show up in Command Palette when the check function returns true
					return true;
				}
				return false;
			},
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(activeDocument, 'click', (_evt: MouseEvent) => {
			new Notice('Click');
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		//this.registerInterval(
		//	window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000),
		//);
	}
	
	async openTodaysRosary() {
		const mystery = getTodaysMystery(this.settings);
		const path = MYSTERY_FILE[mystery];

		const file = this.app.vault.getAbstractFileByPath(path);

		if (file instanceof TFile) {
			await this.app.workspace.getLeaf(true).openFile(file);
		} else {
			new Notice(`Rosary file not found: ${path}`);
		}
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			(await this.loadData()) as Partial<MyPluginSettings>,
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleModal extends Modal {
	onOpen() {
		const { contentEl } = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}
