var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		document.getElementById("tableBody").innerHTML = xmlhttp.responseText;
	}
}
xmlhttp.open("GET", "getCourse.php", true);
xmlhttp.send();


$(document).ready(function() {
    $('#addCourseTable').DataTable();
} );
