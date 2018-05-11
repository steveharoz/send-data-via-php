function sendJSON(experimentResults, experimentName = "myexperiment", subjectID, experimentDate, quickCheckInfo=100, callbackSuccess, callbackError) {
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
			callbackSuccess();
		else
			callbackError("Failed to upload<br><br>" + JSON.stringify(experimentResults, null, " "));
	});
}