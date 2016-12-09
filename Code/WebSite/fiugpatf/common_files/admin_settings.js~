$(document).ready(function() {
    start();
} );

function start() {
    $('#adminSettingsDiv').html('<table cellpadding="0" cellspacing="0" border="0" class="display" id="settings"></table>');
	//$('#settingsDiv').append('<button type="button" id="ExportButton">Export Data</button>');

    $.ajax({
        type: 'POST',
        url: 'admin_settings.php',
        data: {
            action: 'prepareTable'},
        dataType: 'json',
        success: function(data) {
            currCourse = $('#settings').dataTable({
                "aaData": data,
                "aoColumns": [
                    {"sTitle": "Action"},
                    {"sTitle": ""}
                ],
                "bJQueryUI": true,
                "bAutoWidth": false,
                "sPaginationType": "full_numbers"
            });
				$('#ExportButton').click(function(){
					exportData();
				});
        }
    });
}

function exportData()
{
	$.ajax({
        type: 'POST',
        url: 'admin_settings.php',
        data: {
            action: 'exportData'},
        dataType: 'text',
        success: function(data) {
			if(data.length > 0){
				download('adminExport.sql', data);
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
