var xmlString;
var xmFormatted;
var xmlDoc;
var fileName;

$(document).ready(function() {
     start();
});

function start() {

var xml = [
   '<main>',
   '</main>' ].join('');
  
xmlDoc = $.parseXML(xml);
var main = $(xmlDoc).find('main');
var bucket;

$('#subBaseData').click(function(){
   
      subBaseData();
   });

$('#addTakenBtn').click(function(){
    if($(xmlDoc).find('userName').prop("tagName") == "userName") {
       addTakenCourse();
     }
     else {
     alert('Submit base data first');
    }
   });

$('#addIPBtn').click(function(){
    if($(xmlDoc).find('userName').prop("tagName") == "userName") {
       addIPCourse();
     }
     else {
     alert('Submit base data first');
    }
   });

$('#generateXMLBtn').click(function(){
       toXmlFile();
   });

$('#ImportFile').click(function(){
       importFile();
   });

function subBaseData()
{
   var firstName = $('#firstName').val();
   var lastName = $('#lastName').val();
   var userID = $('#userID').val();
   var userName = $('#userName').val();
   var email = $('#email').val();
   var major = $('#major').val();
   var date = $('#declaredDate').val();
   var gpa = $('#gpa').val();
  
   if(firstName == "" || lastName == "" || userID == "" || userName == "" || email == "" || major == "" || date == "" || gpa == "") {
     alert ("Empty Fields");
   } else {


   fileName = userName + '.xml';

   $($.parseXML('<baseData name="baseData"></baseData>')).find("baseData").appendTo(main);
   var baseData = $(xmlDoc).find('baseData').last();
   
   $($.parseXML('<firstName>' + firstName + '</firstName>')).find("firstName").appendTo(baseData);
   $($.parseXML('<lastName>' + lastName + '</lastName>')).find("lastName").appendTo(baseData);
   $($.parseXML('<userID>' + userID + '</userID>')).find("userID").appendTo(baseData);
   $($.parseXML('<userName>' + userName + '</userName>')).find("userName").appendTo(baseData);
   $($.parseXML('<email>' + email + '</email>')).find("email").appendTo(baseData);
   $($.parseXML('<majorName>' + major + '</majorName>')).find("majorName").appendTo(baseData);
   $($.parseXML('<declaredDate>' + date + '</declaredDate>')).find("declaredDate").appendTo(baseData);
   $($.parseXML('<gpa>' + gpa + '</gpa>')).find("gpa").appendTo(baseData);
 
   xmlString = new XMLSerializer().serializeToString(xmlDoc);
   xmlFormatted = formatXml(xmlString);
   //alert(xmlFormatted);
   }
}

function addTakenCourse()
{
    var div = '';
    div += '     <div id="takenAddition" title="Add Taken Course">';
	div += '         <table>';
	div += '             <thead>';
	div += '                 <tr>';
        div += '                     <td>Bucket:</td>' ;
	div += '                     <td><input type="text" id="bucket"></td>';
	div += '                 </tr>';
	div += '                 <tr>';
	div += '                     <td>Course ID:</td>';
	div += '                     <td><input type="text" id="courseID"></td>';
	div += '                 </tr>';
        div += '                 <tr>';
        div += '                     <td>Grade:</td>' ;
	div += '                     <td><input type="text" id="grade"></td>';
	div += '                 </tr>';
        div += '                 <tr>';
        div += '                     <td>Credits:</td>' ;
	div += '                     <td><input type="text" id="credits"></td>';
	div += '                 </tr>';
	div += '                 <tr>';
        div += '                     <td>Semester:</td>' ;
	div += '                     <td><input type="text" id="semester"></td>';
	div += '                 </tr>';
	div += '                 <tr>';
        div += '                     <td>Year:</td>' ;
	div += '                     <td><input type="text" id="year"></td>';
	div += '                 </tr>';
	div += '             </thead>';
	div += '         </table>';
    div += '         <button type="button" id="subTaken">Submit</button>';
    div += '   </div>';

   $('#dialog').append(div);

    $('#takenAddition').dialog({
        modal: true,
        width: "500px",
        close: function( event, ui ) {
            $('#takenAddition').remove();
        }
    });

   $('#subTaken').click(function(){
        var bucket = $('#bucket').val();
        var courseID = $('#courseID').val();
 	var grade = $('#grade').val();
 	var credits = $('#credits').val();
	var semester = $('#semester').val();
	var year = $('#year').val();

        if(bucket == "" || courseID == "" || grade == "" || credits == "" || semester == "" || year == "") {
          alert ("Empty Fields");
        } else {

        $($.parseXML('<courseTaken></courseTaken>')).find("courseTaken").appendTo(main);
        var courseTaken = $(xmlDoc).find('courseTaken').last();

        $($.parseXML('<bucket>' + bucket + '</bucket>')).find("bucket").appendTo(courseTaken);
        $($.parseXML('<courseID>' + courseID + '</courseID>')).find("courseID").appendTo(courseTaken);
        $($.parseXML('<grade>' + grade + '</grade>')).find("grade").appendTo(courseTaken);
        $($.parseXML('<credits>' + credits + '</credits>')).find("credits").appendTo(courseTaken);
	$($.parseXML('<semester>' + semester + '</semester>')).find("semester").appendTo(courseTaken);
	$($.parseXML('<year>' + year + '</year>')).find("year").appendTo(courseTaken);

        xmlString = new XMLSerializer().serializeToString(xmlDoc);
        xmlFormatted = formatXml(xmlString);
        //alert(xmlFormatted);
	
	updateTakenTable();
	
        $('#takenAddition').dialog("close");
     }
    });

}

function updateTakenTable() {

        $('.taken').remove();

        $(xmlDoc).find('courseTaken').each(function() {
        var div = '';
        div += '<tr class="taken" role="row">';
    	div += '   <td class="sorting_1">' + $(this).find('bucket').text() + '</td>';
        div += '   <td>' + $(this).find('courseID').text() + '</td>';
        div += '   <td>' + $(this).find('grade').text() + '</td>';
        div += '   <td>' + $(this).find('credits').text() +'</td>';
	div += '   <td>' + $(this).find('semester').text() +'</td>';
	div += '   <td>' + $(this).find('year').text() +'</td>';
        div += '</tr>';

        $('#takenRows').append(div);

        });
}

function addIPCourse() {

	var div = '';
        div += '     <div id="IPAddition" title="Add In Progress Course">';
	div += '         <table>';
	div += '             <thead>';
	div += '                 <tr>';
        div += '                     <td>Bucket:</td>' ;
	div += '                     <td><input type="text" id="bucket"></td>';
	div += '                 </tr>';
	div += '                 <tr>';
	div += '                     <td>Course ID:</td>';
	div += '                     <td><input type="text" id="courseID"></td>';
	div += '                 </tr>';
        div += '                     <td>Credits:</td>' ;
	div += '                     <td><input type="text" id="credits"></td>';
	div += '                 </tr>';
	div += '                 <tr>';
        div += '                     <td>Semester:</td>' ;
	div += '                     <td><input type="text" id="semester"></td>';
	div += '                 </tr>';
	div += '                 <tr>';
        div += '                     <td>Year:</td>' ;
	div += '                     <td><input type="text" id="year"></td>';
	div += '                 </tr>';
	div += '             </thead>';
	div += '         </table>';
        div += '         <button type="button" id="subIP">Submit</button>';
        div += '   </div>';

   $('#dialog').append(div);

    $('#IPAddition').dialog({
        modal: true,
        width: "500px",
        close: function( event, ui ) {
            $('#IPAddition').remove();
        }
    });

   $('#subIP').click(function(){
        var bucket = $('#bucket').val();
        var courseID = $('#courseID').val();
 	var credits = $('#credits').val();
	var semester = $('#semester').val();
	var year = $('#year').val();

        if(bucket == "" || courseID == "" || credits == "" || semester == "" || year == "") {
          alert ("Empty Fields");
        } else {

        $($.parseXML('<courseIP></courseIP>')).find("courseIP").appendTo(main);
        var courseIP = $(xmlDoc).find('courseIP').last();

        $($.parseXML('<bucket>' + bucket + '</bucket>')).find("bucket").appendTo(courseIP);
        $($.parseXML('<courseID>' + courseID + '</courseID>')).find("courseID").appendTo(courseIP);
        $($.parseXML('<credits>' + credits + '</credits>')).find("credits").appendTo(courseIP);
	$($.parseXML('<semester>' + semester + '</semester>')).find("semester").appendTo(courseIP);
	$($.parseXML('<year>' + year + '</year>')).find("year").appendTo(courseIP);

        xmlString = new XMLSerializer().serializeToString(xmlDoc);
        xmlFormatted = formatXml(xmlString);
        //alert(xmlFormatted);
	
	updateIPTable();
	
        $('#IPAddition').dialog("close");
     }
    });

}

function updateIPTable() {


        $('.IP').remove();

        $(xmlDoc).find('courseIP').each(function() {
        var div = '';
        div += '<tr class="IP" role="row">';
    	div += '   <td class="sorting_1">' + $(this).find('bucket').text() + '</td>';
        div += '   <td>' + $(this).find('courseID').text() + '</td>';
        div += '   <td>' + $(this).find('credits').text() +'</td>';
	div += '   <td>' + $(this).find('semester').text() +'</td>';
	div += '   <td>' + $(this).find('year').text() +'</td>';
        div += '</tr>';

        $('#IPRows').append(div);

        });
}



}

function toXmlFile()
{
	$.ajax({
        type: 'POST',
        url: 'testDriverAudit.php',
        data: {
            action: 'toXmlFile',
            file: xmlFormatted
        },
        dataType: 'text',
        success: function(data) {
			if(data.length > 0){
				download(fileName, data);
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
		    alert(errorThrown);
		}
	});
	
}

function download(filename, text) {
   var pom = document.createElement('a');
   pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
   pom.setAttribute('download', filename);    
   if (document.createEvent) {
       var event = document.createEvent('MouseEvents');
       event.initEvent('click', true, true);
       pom.dispatchEvent(event);
   }
   else {
       pom.click();
   }
} 

function importFile() {
   document.getElementById("ImportFile").click();
	var control = document.getElementById("ImportFile");
	control.addEventListener("change", function(event) {
		var file = control.files[0];
		var fData = new FormData();
		fData.append('selectedfile', this.files[0]);
		var reader = new FileReader();
		reader.onload = function(event) {
			var contents = event.target.result;
			var xhr = new XMLHttpRequest;

   $.ajax({
	type: 'POST',
	url: 'testDriverAudit.php',
	data: {
		action: 'importFile',
		file: contents
		},
	dataType: 'text',
	success: function(data) {
		if(data == "true")
		{
			alert("File imported correctly!");
		}
		else
		{
			alert(data);
		}
	},
	error: function(XMLHttpRequest, textStatus, errorThrown){
		alert(errorThrown);
		}
   });

   };
		reader.onerror = function(event) {
			alert("File could not be read! Code " + event.target.error.code);
		};
		reader.readAsText(this.files[0]);
		}, false); 
}




function formatXml(xml) {
    var formatted = '';
    var reg = /(>)(<)(\/*)/g;
    xml = xml.replace(reg, '$1\r\n$2$3');
    var pad = 0;
    jQuery.each(xml.split('\r\n'), function(index, node) {
        var indent = 0;
        if (node.match( /.+<\/\w[^>]*>$/ )) {
            indent = 0;
        } else if (node.match( /^<\/\w/ )) {
            if (pad != 0) {
                pad -= 1;
            }
        } else if (node.match( /^<\w[^>]*[^\/]>.*$/ )) {
            indent = 1;
        } else {
            indent = 0;
        }

        var padding = '';
        for (var i = 0; i < pad; i++) {
            padding += '  ';
        }

        formatted += padding + node + '\r\n';
        pad += indent;
    });

    return formatted;
}







