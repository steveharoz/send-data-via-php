function showFinished() {
	$('#sending').fadeOut().promise().done(() => $('#finished').fadeIn());
	$('#subjectID').text(experiment.subjectID);
}
function showError(message) {
	$('#sending').fadeOut().promise().done(() => $('#error').fadeIn());
	$('#errorMessage').text(message);
}

function cleanDataBeforeSending (experimentResults) {
	// compute duration (you need to set duration to performance.now() when the experiment starts)
	experimentResults.duration = performance.now() - experimentResults.duration;

    // shallow copy
    cleanedExperiment = jQuery.extend({}, experimentResults);
    // drop unneeded properties
    delete cleanedExperiment.metadataThatWeDontNeed;
	
	return cleanedExperiment;
}

function sendJSON(experimentResults, experimentName = "myexperiment", subjectID, experimentDate, quickCheckInfo=100, callback) {
	// show size of block data
	console.log("block size (bytes): " + encodeURIComponent(JSON.stringify(experimentResults, null, " ")).length);

	// put the parameters in the url
	var parameters = '?' +
		'study=' + encodeURIComponent(experimentName) + '&' +
		'subjectID=' + encodeURIComponent(subjectID) + '&' +
		'date=' + encodeURIComponent(experimentDate) + '&' +
		'accuracy=' + encodeURIComponent(quickCheckInfo);

	console.log('server/save-json.php' + parameters);

	// send
	fetch('server/save-json.php' + parameters, {
		method: 'POST',
		headers: {"content-type": "application/json"},
		body: JSON.stringify(experimentResults, null, " ")
	})
	.then(response => response.text())
	.then(response => {
		console.log(response)
		if (response.endsWith("Yay Success!"))
			callback();
		else
			showError(response);
	});
}