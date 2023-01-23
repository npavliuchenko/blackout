document.addEventListener('DOMContentLoaded', function() {


	var myGroup = localStorage.getItem('myGroup') || 3;
	const timeLabelTemplate = "%starthour:00 - %endhour:00";
	const days = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"]; // use 1..7 indexes for compatibility with Date
	const dataClass = {
		'*': "off",
		'?': "hz",
		'_': "on",
	};

	const data = [
		// coding used: * - power off, _ - power on, ? - grey zone
		// empty elements are to shift indexes to match Date days and DTEK groups indexing
		[], // group 0 (does not exist)
		[	"",	// group 1
		    //12345678901234567890123
			"****__???****__???****__", // 1 = Пн / Mon
			"???****__???****__???***", // 2 = Вт / Tue
			"*__???****__???****__???", // 3 = Ср / Wed
			"****__???****__???****__", // 4 = Чт / Thu
			"???****__???****__???***", // 5 = Пт / Fri
			"*__???****__???****__???", // 6 = Сб / Sat
			"****__???****__???****__", // 7 = Нд / Sun
		], 
		[	"",	// group 2
		    //12345678901234567890123
			"???****__???****__???***", // 1 = Пн / Mon
			"*__???****__???****__???", // 2 = Вт / Tue
			"****__???****__???****__", // 3 = Ср / Wed
			"???****__???****__???***", // 4 = Чт / Thu
			"*__???****__???****__???", // 5 = Пт / Fri
			"****__???****__???****__", // 6 = Сб / Sat
			"???****__???****__???***", // 7 = Нд / Sun
		],
		[	"",	// group 3
		    //12345678901234567890123
			"*__???****__???****__???", // 1 = Пн / Mon
			"****__???****__???****__", // 2 = Вт / Tue
			"???****__???****__???***", // 3 = Ср / Wed
			"*__???****__???****__???", // 4 = Чт / Thu
			"****__???****__???****__", // 5 = Пт / Fri
			"???****__???****__???***", // 6 = Сб / Sat
			"*__???****__???****__???", // 7 = Нд / Sun
		],
	];

	const selector = document.getElementById('selector');

	/**
	 * Generate row labels from template
	 * @param hour - int 0..23 = start of time interval
	 * @returns string
	 */
	function generateTimeLabel(hour) {
		const twodigits = (x) => (x > 9 ? "" : "0") + x;
		return timeLabelTemplate
			.replace("%starthour", twodigits(hour))
			.replace("%endhour", twodigits(hour + 1));
	}

	/**
	 * Main function
	 * generates HTML to be placed into the table
	 */
	function generateTable() {
		let text = "";
		const now = new Date();
		const container = document.getElementsByTagName("tbody")[0];
		const timeContainer = document.getElementById("now");
		const dayNow = now.getDay() ? now.getDay() : 7; // sunday 0 -> 7
		const hourNow = now.getHours();

		console.log('Updating', now);

		// loop over rows - hours
		for (let ih = 0; ih < 24; ih++) {

			text += "<tr>";
			text += "<th>" + generateTimeLabel(ih) + "</th>";

			// loop over columns - days
			for (let id = 1; id < 8; id++) {
				let isToday = dayNow === id;
				let isNow = hourNow === ih;
				let className = dataClass[data[myGroup][id][ih]]
							  + " " + (isToday ? "today" : "") 
							  + " " + (isNow ? "now" : "");
				// console.log("day " + id + " / hour " + ih + " => ", data[myGroup][id], iconsMap[data[myGroup][id][ih]]);
				text += "<td class='" + className + "'></td>"
			}

			text += "</tr>";
		}

		container.innerHTML = text;
		timeContainer.innerHTML = now.toLocaleTimeString();
	}

	/**
	 * get group number from input and draw table
	 */
	function groupUpdate() {
		myGroup = parseInt(selector.value)
		localStorage.setItem('myGroup', myGroup);
		console.log("rendering group", myGroup);

		generateTable();	
	}


	// handle group selector
	selector.value = myGroup.toString();
	selector.addEventListener("change", groupUpdate);

	// Run Lola run !
	groupUpdate();
	// setInterval(groupUpdate, 15000); //@TODO: redraw only highlights ?
});