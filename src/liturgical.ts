// Computes the date of Easter Sunday for a given year (Anonymous Gregorian algorithm)
function getEasterDate(year: number): Date {
	const a = year % 19;
	const b = Math.floor(year / 100);
	const c = year % 100;
	const d = Math.floor(b / 4);
	const e = b % 4;
	const f = Math.floor((b + 8) / 25);
	const g = Math.floor((b - f + 1) / 3);
	const h = (19 * a + b - d - g + 15) % 30;
	const i = Math.floor(c / 4);
	const k = c % 4;
	const l = (32 + 2 * e + 2 * i - h - k) % 7;
	const m = Math.floor((a + 11 * h + 22 * l) / 451);
	const month = Math.floor((h + l - 7 * m + 114) / 31); // 3 = March, 4 = April
	const day = ((h + l - 7 * m + 114) % 31) + 1;
	return new Date(year, month - 1, day);
}

function addDays(date: Date, days: number): Date {
	const d = new Date(date);
	d.setDate(d.getDate() + days);
	return d;
}

function isBetween(date: Date, start: Date, end: Date): boolean {
	const d = stripTime(date).getTime();
	return d >= stripTime(start).getTime() && d <= stripTime(end).getTime();
}

function stripTime(date: Date): Date {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

// Advent starts on the Sunday closest to Nov 30 (i.e. the 4th Sunday before Christmas)
function getAdventStart(year: number): Date {
	const christmas = new Date(year, 11, 25);
	const dayOfWeek = christmas.getDay(); // 0 = Sunday
	// Days back to the Sunday on/before Dec 25, then back 3 more weeks
	const daysBackToSunday = dayOfWeek;
	const sundayBeforeChristmas = addDays(christmas, -daysBackToSunday);
	return addDays(sundayBeforeChristmas, -21);
}

// Baptism of the Lord (approx end of Christmas season): Sunday after Jan 6
function getChristmasSeasonEnd(year: number): Date {
	const epiphany = new Date(year, 0, 6);
	const dayOfWeek = epiphany.getDay();
	const daysToNextSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
	return addDays(epiphany, daysToNextSunday);
}

export type LiturgicalSeason = 'advent' | 'christmas' | 'lent' | 'ordinary';

export function getLiturgicalSeason(date: Date = new Date()): LiturgicalSeason {
	const year = date.getFullYear();

	// Christmas season can span two calendar years (Dec of this year -> Jan of next)
	const christmasStart = new Date(year, 11, 25);
	const christmasEndThisJan = getChristmasSeasonEnd(year);
	const christmasEndNextJan = getChristmasSeasonEnd(year + 1);

	if (isBetween(date, new Date(year, 0, 1), christmasEndThisJan)) return 'christmas';
	if (isBetween(date, christmasStart, new Date(year, 11, 31))) return 'christmas';
	if (isBetween(date, getAdventStart(year), addDays(christmasStart, -1))) return 'advent';

	const easter = getEasterDate(year);
	const ashWednesday = addDays(easter, -46);
	const holySaturday = addDays(easter, -1);
	if (isBetween(date, ashWednesday, holySaturday)) return 'lent';

	// Guard: if we're in the tail end of last year's christmas season rolling into this Jan
	if (isBetween(date, new Date(year, 0, 1), christmasEndNextJan) && date.getMonth() === 0) {
		return 'christmas';
	}

	return 'ordinary';
}
