var arr = [
	['400852668', 'New Mexico', 'Albuquerque, NM', '12/19/2015 2:00 PM', 'Arizona', '', 'New Mexico', ''],
	['400852684', 'Las Vegas', 'Las Vegas, NV', '12/19/2015 3:30 PM', 'BYU', '', 'Utah', '22'],
	['400852685', 'Camellia', 'Montgomery, AL', '12/19/2015 5:30 PM', 'Ohio', '', 'Appalachian State', ''],
	['400852683', 'Cure', 'Orlando, FL', '12/19/2015 7:00 PM', 'San Jose State', '', 'Georgia state', ''],
	['400852686', 'New Orleans', 'New Orleans, LA', '12/19/2015 9:00 PM', 'Arkansas state', '', 'Louisiana Tech', ''],
	['400852687', 'Miami Beach', 'Miami, FL', '12/21/2015 2:30 PM', 'Western Kentucky', '', 'South Florida', ''],
	['400852708', 'Potato', 'Boise, ID', '12/22/2015 3:30 PM', 'Akron', '', 'Utah State', ''],
	['400852709', 'Boca Raton', 'Boca Raton, FL', '12/22/2015 7:00 PM', 'Toledo', '', 'Temple', ''],
	['400852710', 'Poinsettia', 'San Diego, CA', '12/23/2015 4:30 PM', 'Boise State', '', 'Northern Illinois', ''],
	['400852711', 'Go Daddy', 'Mobile, AL', '12/23/2015 8:00 PM', 'Georgia Southern', '', 'Bowling Green', ''],
	['400852713', 'Bahamas', 'Nassau', '12/24/2015 12:00 PM', 'Middle Tennessee', '', 'Western Michigan', ''],
	['400852714', 'Hawaii', 'Honolulu, HI', '12/24/2015 8:00 PM', 'San Diego State', '', 'Cincinnati', ''],
	['400852715', 'St. Petersburg', 'Saint Petersburg, FL', '12/26/2015 11:00 AM', 'Connecticut', '', 'Marshall', ''],
	['400852716', 'Sun', 'El Paso, TX', '12/26/2015 2:00 PM', 'Miami', '', 'Washington state', ''],
	['400852717', 'Heart of Dallas', 'Dallas, TX', '12/26/2015 2:20 PM', 'Washington', '', 'Southern Miss', ''],
	['400852718', 'Pinstripe', 'New York, NY', '12/26/2015 3:30 PM', 'Indiana', '', 'Duke', ''],
	['400852719', 'Independence', 'Shreveport, LA', '12/26/2015 5:45 PM', 'Tulsa', '', 'Virginia Tech', ''],
	['400852720', 'Foster Farms', 'Santa Clara, CA', '12/26/2015 9:15 PM', 'UCLA', '', 'Nebraska', ''],
	['400852721', 'Military', 'Annapolis, MD', '12/28/2015 2:30 PM', 'Pittsburgh', '', 'Navy', '21'],
	['400852722', 'Quick Lane', 'Detroit, MI', '12/28/2015 5:00 PM', 'Central Michigan', '', 'Minnesota', ''],
	['400852723', 'Armed Forces', 'Fort Worth, TX', '12/29/2015 2:00 PM', 'California', '', 'Air Force', ''],
	['400852724', 'Russell Athletic', 'Orlando, FL', '12/29/2015 5:30 PM', 'North Carolina', '10', 'Baylor', '17'],
	['400852725', 'Arizona', 'Tucson, AZ', '12/29/2015 7:30 PM', 'Nevada', '', 'Colorado State', ''],
	['400852726', 'Texas', 'Houston, TX', '12/29/2015 9:00 PM', 'LSU', '20', 'Texas Tech', ''],
	['400852727', 'Birmingham', 'Birmingham, AL', '12/30/2015 12:00 PM', 'Auburn', '', 'Memphis', ''],
	['400852728', 'Belk', 'Charlotte, NC', '12/30/2015 3:30 PM', 'North Carolina State', '', 'Mississippi State', ''],
	['400852729', 'Music City', 'Nashville, TN', '12/30/2015 7:00 PM', 'Texas A&M', '', 'Louisville', ''],
	['400852730', 'Holiday', 'San Diego, CA', '12/30/2015 10:30 PM', 'USC', '25', 'Wisconsin', ''],
	['400852731', 'Peach', 'Atlanta, GA', '12/31/2015 12:00 PM', 'Houston', '18', 'Florida State', '9'],
	['400852733', 'Orange', 'Miami, FL', '12/31/2015 4:00 PM', 'Oklahoma', '4', 'Clemson', '1'],
	['400852732', 'Cotton', 'Arlington, TX', '12/31/2015 8:00 PM', 'Michigan State', '3', 'Alabama', '2'],
	['400852734', 'Outback', 'Tampa, FL', '1/1/2016 12:00 PM', 'Northwestern', '13', 'Tennessee', '23'],
	['400852735', 'Citrus', 'Orlando, FL', '1/1/2016 1:00 PM', 'Michigan', '14', 'Florida', '19'],
	['400852736', 'Fiesta', 'Glendale, AZ', '1/1/2016 1:00 PM', 'Notre Dame', '8', 'Ohio State', '7'],
	['400852737', 'Rose', 'Pasadena, CA', '1/1/2016 5:00 PM', 'Stanford', '6', 'Iowa', '5'],
	['400852738', 'Sugar', 'New Orleans, LA', '1/1/2016 8:30 PM', 'Oklahoma State', '16', 'Ole Miss', '12'],
	['400852739', 'Tax Slayer', 'Jacksonville, FL', '1/2/2016 12:00 PM', 'Penn State', '', 'Georgia', ''],
	['400852740', 'Liberty', 'Memphis, TN', '1/2/2016 3:20 PM', 'Kansas State', '', 'Arkansas', ''],
	['400852741', 'Alamo', 'San Antonio, TX', '1/2/2016 6:45 PM', 'Oregon', '15', 'TCU', '11'],
	['400852742', 'Cactus', 'Phoenix, AZ', '1/2/2016 10:45 PM', 'West Virginia', '', 'Arizona State', ''],

	['400852743', 'National Championship', 'Glendale, AZ', '1/11/2016 5:30 PM', 'Alabama', '2', 'Clemson', '1', true],
	['400852743', 'National Championship', 'Glendale, AZ', '1/11/2016 5:30 PM', 'Michigan State', '3', 'Clemson', '1', true],
	['400852743', 'National Championship', 'Glendale, AZ', '1/11/2016 5:30 PM', 'Oklahoma', '4', 'Alabama', '2', true],
	['400852743', 'National Championship', 'Glendale, AZ', '1/11/2016 5:30 PM', 'Oklahoma', '4', 'Michigan State', '3', true]
]



function Bowl(gameId, name, location, date, name1, rank1, name2, rank2, playoff){
	return {
		name: name,
		teams: [
			{name: name1, rank: rank1, score: null},
			{name: name2, rank: rank2, score: null}
		],
		gameId: gameId.toString(),
		date: moment(date, 'MM/DD/YYYY h:mm A').toDate(),
		location: location,
		status: '',
		playoff: !!playoff,
		started: false,
		finished: false,
		picks: {}
	}
}

if (Bowls.find().count() == 0){
	arr.forEach(function (bowl){
		Bowls.insert(Bowl.apply(Bowl,bowl));
	});
}