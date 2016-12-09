 $(document).ready(function() {
     start();
 });

var courseModTable;
var insertcoursephpURL = 'mod_course.php';

function sto_rowClickHandler() {

     var nTr = this.parentNode;
     var open = false;

     try {
         if ($(nTr).next().children().first().hasClass("ui-state-highlight"))
             open = true;
     } catch (err) {
         alert(err);
     }

     if (open) {
         /* This row is already open - close it */
        courseModTable.fnClose(nTr);
         $(nTr).css("color", "");
     } else {
         sto_openDetailsRow(nTr);
     }
 }

function sto_openDetailsRow(nTr) {

     courseModTable.fnOpen(nTr, sto_formatStoreManagerDetails(courseModTable, nTr), "ui-state-highlight");

     var aData = courseModTable.fnGetData(nTr);

     $("#modifyItem" + aData[0]).button();
     $("#deleteItem" + aData[0]).button();

     var divId = "#courseItemDetails" + aData[0];

     $("#modifyItem" + aData[0]).click(function() {
         $("#popCourseMod").dialog();

         $('#popCourseMod').on('dialogclose', function(event) {
             courseModTable.fnClose(nTr);
             $("#popCourseMod").remove();


         });

         (divId).empty();
         $(nTr).css("color", "#c5dbec");




     });
     $("#modSubmit").click(function() {


         nCID = $("input[name=nCID]").val();
			nName = $("input[name=nName]").val();
			nCredits = $("input[name=nCredits]").val();
      //   $('#nGrade').val(nGrade);
        sto_modCourse(divId, nTr, nName, nCID, nCredits);

       courseModTable.fnUpdate([nCID, nName, nCredits], nTr);


         $('#popCourseMod').dialog('close');
        courseModTable.fnClose(nTr);

     });
     $("#deleteItem" + aData[0]).click(function() {
         var del = confirm("Delete course?");

         if (del == true) {
             sto_deleteItem(divId, nTr);


           
             alert("Course Info for " + aData[0] + " deleted!");


            




         } else {
             courseModTable.fnClose(nTr);

         }


     });



 }
function sto_modCourse(divId, nTr, nName, nCID, nCredits) {


     // createLoadingDivAfter(divId,"Deleting Item");
     var insertcoursephpURL = 'mod_course.php';
     var aData = courseModTable.fnGetData(nTr);
     
     var name = aData[1];
     var credits = aData[2];
     var id = aData[0];
     var newCourse = nCID;
     var newName = nName;
	  var newCredits= nCredits;
	alert("New Course Details : \nCourseID:" + newCourse +"\nCourse Name:"+ newName +"Course Credits:" +newCredits);
     $.ajax({
         type: 'POST',
         url: insertcoursephpURL,
         dataType: 'json',
         data: {
             action: 'modCourse',
             modifiedName: newName,
             modifiedCourse: newCourse,
				 modifiedCredits: newCredits,
             courseID: id,
             credits: credits,
             name:name,
            
         },
         success: function(data) {

             //removeLoadingDivAfter(divId);

             if (data.success) {
                 $(nTr).css("color", "");
                 courseModTable.fnClose(nTr);
                 //courseTaken.fnDeleteRow(nTr);

             } else {

                 $(nTr).css("color", "");
                  courseModTable.fnClose(nTr);
                 alert("data.success = false");

             }




         },
         error: function(XMLHttpRequest, textStatus, errorThrown) {
             alert(errorThrown);
         }
     });

 }
function sto_deleteItem(divId, nTr) {
     // createLoadingDivAfter(divId,"Deleting Item");
     var insertcoursephpURL = 'mod_course.php';
     var aData = courseModTable.fnGetData(nTr);

     var id = aData[0];
     alert(id +" in delet_item fucion, above ajax line105")
    
     $.ajax({
         type: 'POST',
         url: insertcoursephpURL,
         dataType: 'json',
         data: {
             action: 'deleteItem',
             courseID: id

         },
         success: function(data) {

             //removeLoadingDivAfter(divId);

             if (data.success) {

                 courseModTable.fnClose(nTr);
                 courseModTable.fnDeleteRow(nTr);

                


             } else {

                 $(nTr).css("color", "");
                 courseModTable.fnClose(nTr);
                 alert("data.success = false");

             }




         },
         error: function(XMLHttpRequest, textStatus, errorThrown) {
             alert(errorThrown);
         }
     });


 }

 function sto_formatStoreManagerDetails(oTable, nTr) {
     var aData = oTable.fnGetData(nTr);
     var id = aData[0];
     var sOut = '';
     sOut += '<div id="courseItemDetails' + id + '">';
     sOut += '	<div class="buttonColumnDetails">';
     sOut += '		<button id="modifyItem' + id + '">Modify</button>';
     sOut += '		<button id="deleteItem' + id + '">Delete</button>';
     sOut += '		<div id = "popCourseMod" style = "display: none" title="Modify Grade" > ';
     //sOut += '			<p>ENTER NEW GRADE</p>';
     sOut += '			<form method = "post" name = "newcourseID">';
     sOut += '			   <label for="nCID">Course ID:</label>';
     sOut += '				<input id = "nCID" placeholder =" New Course ID" size	= "8" type="text" name="nCID"><br>';
  	  sOut += '				<label for="nName">Course Name:</label>';
     sOut += '				<input id = "nName"  placeholder =" New Course Name " size	= "8" type="text" name="nName"><br>';
	  sOut += '				<label for="nCredits">Credits:</label>';
     sOut += '				<input id = "nCredits" placeholder =" New Credits " size	= "8" type="text" name="nCredits"><br><br>';
  
     //sOut += '				<input id = "nMajor" placeholder =" New Major " size	= "8" type="text" name="nMajor"><br>';
     sOut += '				<button id = "modSubmit" type="button">Submit</button>';
     sOut += '			</form>';
     sOut += '		</div>';
     sOut += '	</div>';
     sOut += '</div>';

     return sOut;
 }


 

function start(){



$.ajax({
         type: 'POST',
         url: insertcoursephpURL,
         dataType: 'json',
         data: {
             action: 'courseMod'

         },
         success: function(data) {

     //     $('.masterCourseMod').html('<table cellpadding="0" cellspacing="0" border="1" style="width:95%" class="display" id="courseModTable"></table>');

             
           

          
             courseModTable= $('#courseModTable').dataTable({
                 "aaData": data,
                 "aaSorting": [
                     [0, "asc"]
                 ],
                 "aoColumns": [
                     //{ "bVisible": true},
                     {
                         "sTitle": "Course ID"
                     }, {
                         "sTitle": "Course Name"
                     }, {
                         "sTitle": "Credits"
                     }

                 ],


                 "bJQueryUI": true,
                 "bAutoWidth": true,
                 "sPaginationType": "full_numbers",
					  "iDisplayLength": 300
             });



             $('#courseModTable').removeAttr("style");

             $('#courseModTable tbody tr td').off();

             $('#courseModTable tbody tr td').on('click', sto_rowClickHandler);




         

             

         },
         error: function(XMLHttpRequest, textStatus, errorThrown) {
             alert(errorThrown);
         }
     });


}
