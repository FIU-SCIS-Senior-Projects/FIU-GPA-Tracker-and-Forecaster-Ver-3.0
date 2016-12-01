var node;
var xmlString;
var xmFormatted;
var fileName;
var xmlDoc;
var i = 0;
var greatestId = 0;
var parentTableRoot = null;
var rootData = [];
var childData = [];
var courseData = [];

$(document).ready(function() {
     start();
});

 function addRootButtons(oTable, nTr) {
     var aData = oTable.fnGetData(nTr);
     var id = removeSpace(aData[0]);
     var sOut = '';
     sOut += '<div id="itemDetails' + id + '">';
     sOut += '	<div class="buttonColumnDetails">';
     sOut += '		<button id="addChild' + id + '">Add Child Bucket</button>';
     sOut += '		<button id="addCourse' + id + '">Add Course</button>';
     sOut += '	</div>';
     sOut += '</div>';
     return sOut;
}

function addChildBuckets(oTable, nTr) {
     var aData = oTable.fnGetData(nTr);
     var id = removeSpace(aData[0]);
     var sOut = '';
     sOut += '<table id ="childBucketsDT' + id + '">';
     sOut += '<thead><tr><th></th><th></th><th></th><th></th></tr></thead>';
     sOut += '<tbody>';
     sOut += '<div id="itemDetails' + id + '">';
     sOut += '	<div class="buttonColumnDetails">';
     sOut += '		<button id="addChild' + id + '">Add Child Bucket</button>';
     sOut += '		<button id="addCourse' + id + '">Add Course</button>';
     sOut += '	</div>';
     sOut += '</div>';
     sOut += '</tbody></table>';

     return sOut;
}

function addCourses(oTable, nTr) {
     var aData = oTable.fnGetData(nTr);
     var id = removeSpace(aData[0]);
     var sOut = '';
     sOut += '<table id ="coursesDT' + id + '">';
     sOut += '<thead><tr><th></th><th></th><th></th><th></th><th></th></tr></thead>';
     sOut += '<tbody>';
     sOut += '<div id="itemDetails' + id + '">';
     sOut += '	<div class="buttonColumnDetails">';
     sOut += '		<button id="addChild' + id + '">Add Child Bucket</button>';
     sOut += '		<button id="addCourse' + id + '">Add Course</button>';
     sOut += '	</div>';
     sOut += '</div>';
     sOut += '</tbody></table>';

     return sOut;
}

function start() {

var xml = [
   '<main>',
   '</main>' ].join('');
  
xmlDoc = $.parseXML(xml); // Creates xml dom
var main = $(xmlDoc).find('main');
var bucket;

$('#subProgData').click(function(){
      subProgData();
      alert("Submitted successfully!");
   });
     
$('#addRootBtn').click(function(){
    if($(xmlDoc).find('programName').prop("tagName") == "programName") {
       addRootBucket();
    }
    else {
     alert('Submit program data first');
    }
   });

$('#generateXMLBtn').click(function(){
       toXmlFile();
   });


//$('#parentTableRoot tbody tr td').off();
//$('#parentTableRoot tbody tr td').on('click', rowClickHandler);

function subProgData()
{
   var progName = $('#progName').val();
   var minGPA = $('#minGPA').val();
   var actDate = $('#actDate').val();
   var progType = $('#progType').val();

   if(progName == "" || minGPA == "" || actDate == "" || progType == "") {
     alert ("Empty Fields");
   } else {

   fileName = progName + '.xml';
 
   $($.parseXML('<programName>' + progName + '</programName>')).find("programName").appendTo(main);
   $($.parseXML('<minGPA>' + minGPA + '</minGPA>')).find("minGPA").appendTo(main);
   $($.parseXML('<activeDate>' + actDate + '</activeDate>')).find("activeDate").appendTo(main);
   $($.parseXML('<programType>' + progType + '</programType>')).find("programType").appendTo(main);
 
   xmlString = new XMLSerializer().serializeToString(xmlDoc);
   xmlFormatted = formatXml(xmlString);
   //alert(xmlFormatted);
   }
}

function addRootBucket()
{  
    if(parentTableRoot != null)parentTableRoot.fnDestroy();
    node = this.parentNode;
    var div = '';
    // Data entry form
    div += '     <div id="rootBucketAddition" title="Add Root Bucket">';
	div += '         <table>';
	div += '             <thead>';
	div += '                 <tr>';
        div += '                     <td>Description:</td>' ;
	div += '                     <td><input type="text" id="description"></td>';
	div += '                 </tr>';
	div += '                 <tr>';
	div += '                     <td>All Required:</td>';
	div += '                     <td><input type="text" id="allRequired"></td>';
	div += '                 </tr>';
        div += '                 <tr>';
        div += '                     <td>Quantity:</td>' ;
	div += '                     <td><input type="text" id="quantity"></td>';
	div += '                 </tr>';
        div += '                 <tr>';
        div += '                     <td>Quantification:</td>' ;
	div += '                     <td><input type="text" id="quantification"></td>';
	div += '                 </tr>';
	div += '             </thead>';
	div += '         </table>';
    div += '         <button type="button" id="subRoot">Submit</button>';
    div += '   </div>';

   $('#tabs').append(div);

    $('#rootBucketAddition').dialog({
        modal: true,
        width: "500px",
        close: function( event, ui ) {
            $('#rootBucketAddition').remove();
        }
    });

   $('#subRoot').click(function(){
        var description = $('#description').val();
        var allRequired = $('#allRequired').val();
        if (allRequired == "yes" || allRequired == "Yes")
           var allRequiredNum = "1";
        else
           var allRequiredNum = "0";
 	var quantity = $('#quantity').val();
 	var quantification = $('#quantification').val();

        if(description == "" || allRequired == "" || quantity == "" || quantification == "") {
          alert ("Empty Fields");
        } else {

        $($.parseXML('<bucket id="' + description + '"></bucket>')).find("bucket").appendTo(main);
        bucket = $(xmlDoc).find('bucket').last();
        $($.parseXML('<data></data>')).find("data").appendTo(bucket);
        var data = $(xmlDoc).find('data').last();

        $($.parseXML('<description>' + description + '</description>')).find("description").appendTo(data);
        $($.parseXML('<allRequired>' + allRequiredNum + '</allRequired>')).find("allRequired").appendTo(data);
        $($.parseXML('<quantity>' + quantity + '</quantity>')).find("quantity").appendTo(data);
        $($.parseXML('<quantification>' + quantification + '</quantification>')).find("quantification").appendTo(data);

        xmlString = new XMLSerializer().serializeToString(xmlDoc);
        xmlFormatted = formatXml(xmlString);

        rootData.push([description, allRequired, quantity, quantification]);
         
        //alert(xmlFormatted);
        //var parentTableRoot = null;
        parentTableRoot = $('#parentTableRoot').dataTable({
                     "aaData": rootData,
                     "aoColumns": [{
                          "sTitle": "Description"
                          }, {
                          "sTitle": "All Required"
                          }, {
                          "sTitle": "Quantity"
                          }, {
                          "sTitle": "Quantification"
                          }],
                      order: [1, "asc"],
                      columnDefs: [{
                      sortable: false,
                      targets: [0]
                 }],
                 "bJQueryUI": true,
                 "fixedColumns": true,
                 "retrieve": true,
                 "iDisplayLength": 25
       });

        $('#rootBucketAddition').dialog("close");
        $('#rootBucketAddition').remove();


      $('#parentTableRoot tbody tr td').off();
      $('#parentTableRoot tbody tr td').on('click', clickRoot);
       
    }
    });

   function clickRoot() {

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
           parentTableRoot.fnClose(nTr);
           $(nTr).css("color", "");
       } else {

           var x = 0;
           var h;
           var element;
           var parent;

           for (h = 0; h < childData.length; h++) {
               element = childData[h];
               parent = element[0];
               if (parent == parentTableRoot.fnGetData(nTr)[0]) {
                   x = 1;
               }
           }

           if (x) {
               //children found

               openChildBuckets(nTr, parentTableRoot);

               var aData = parentTableRoot.fnGetData(nTr);
               var htmlid = removeSpace(aData[0]);
               $("#addChild" + htmlid).button();
               $("#addCourse" + htmlid).button();
               $("#addChild" + htmlid).click(function () {
                   addChild(parentTableRoot, nTr);
               });
               $("#addCourse" + htmlid).click(function () {
                   addCourse(parentTableRoot, nTr);
               });

           }
           else {
               //no children found
               var y = 0;

               for (h = 0; h < courseData.length; h++) {
                   element = courseData[h];
                   parent = element[0];
                   if (parent == parentTableRoot.fnGetData(nTr)[0]) {
                       y = 1;
                   }
               }
               if (y) {

                   openCourses(nTr, parentTableRoot);

                   var aData = parentTableRoot.fnGetData(nTr);
                   var htmlid = removeSpace(aData[0]);
                   $("#addChild" + htmlid).button();
                   $("#addCourse" + htmlid).button();
                   $("#addChild" + htmlid).click(function () {
                       addChild(parentTableRoot, nTr);
                   });
                   $("#addCourse" + htmlid).click(function () {
                       addCourse(parentTableRoot, nTr);
                   });

               }
               else {
                   parentTableRoot.fnOpen(nTr, addRootButtons(parentTableRoot, nTr), "ui-state-highlight");
                   var aData = parentTableRoot.fnGetData(nTr);
                   var htmlid = removeSpace(aData[0]);
                   $("#addChild" + htmlid).button();
                   $("#addCourse" + htmlid).button();
                   $("#addChild" + htmlid).click(function () {
                       addChild(parentTableRoot, nTr);
                   });
                   $("#addCourse" + htmlid).click(function () {
                       addCourse(parentTableRoot, nTr);
                   });
               }

           }


       }
   }
      

   function openChildBuckets(nTr, oTable) {
       var aData = oTable.fnGetData(nTr);
       var htmlid = removeSpace(aData[0]);
       var bucket = htmlid;
       oTable.fnOpen(nTr, addChildBuckets(oTable, nTr), "ui-state-highlight");
       var childBucketsDT = null;
       var h;
       var element;
       var parent;
       var childrenData = [];
       var rest;      

      for(h = 0; h < childData.length; h++) {
        element = childData[h];
        parent = element[0];
        rest = element[1];
        if (parent == aData[0])
        {
           childrenData.push(rest);
        } 
      }
       childBucketsDT = $('#childBucketsDT' + bucket).dataTable({
                             "aaData": childrenData,
                             "aoColumns": [{
                                 "sTitle": "Description"
                             }, {
                                 "sTitle": "All Required"
                             }, {
                                 "sTitle": "Quantity"
                             }, {
                                 "sTitle": "Quantification"
                             }],

                             "bAutoWidth": false,
                             "sPaginationType": "full_numbers",
                             "retrieve": true
                      });
        $('#childBucketsDT' + bucket + ' tbody tr td').off();
        $('#childBucketsDT' + bucket + ' tbody tr td').on('click', clickChild);

      function clickChild() {

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
               childBucketsDT.fnClose(nTr);
               $(nTr).css("color", "");
           } else {
               var aData = childBucketsDT.fnGetData(nTr);
               var x = 0;

               $(xmlDoc).find('bucket').each(function() {
                  if ($(this).attr("id") == aData[0]) {
                     $(this).children().each(function() {
                        if($(this).prop("tagName") == "bucket") {
                          x = 1;
                        }
                      });    
                  }
               });
               if (x) {
                  //children found
             
                  openChildBuckets(nTr, childBucketsDT); 

                  var aData = childBucketsDT.fnGetData(nTr);
                  var htmlid = removeSpace(aData[0]);
                  $("#addChild" + htmlid).button();
                  $("#addCourse" + htmlid).button();
                  $("#addChild" + htmlid).click(function() {
                     addChild(childBucketsDT, nTr);
                  });
                 $("#addCourse" + htmlid).click(function() {
                     addCourse(childBucketsDT, nTr);
                 });  
              
               }
               else {
                  //no children found
                  var y = 0;
                  $(xmlDoc).find('bucket').each(function() {
                     if ($(this).attr("id") == childBucketsDT.fnGetData(nTr)[0]) {
                      $(this).children().each(function() {
                        if($(this).prop("tagName") == "course") {
                          y = 1;
                        }
                      });
                     }              
                   });         
                   if (y) {
                     openCourses(nTr, childBucketsDT); 

                     var aData = childBucketsDT.fnGetData(nTr);
                     var htmlid = removeSpace(aData[0]);
                     $("#addChild" + htmlid).button();
                     $("#addCourse" + htmlid).button();
                     $("#addChild" + htmlid).click(function() {
                        addChild(childBucketsDT, nTr);
                     });
                     $("#addCourse" + htmlid).click(function() {
                       addCourse(childBucketsDT, nTr);
                     });  

                   }  
                   else {
                      childBucketsDT.fnOpen(nTr, addRootButtons(childBucketsDT, nTr), "ui-state-highlight");
                      var aData = childBucketsDT.fnGetData(nTr);
                      var htmlid = removeSpace(aData[0]);
                      $("#addChild" + htmlid).button();
                      $("#addCourse" + htmlid).button();
                      $("#addChild" + htmlid).click(function() {
                         addChild(childBucketsDT, nTr);
                      });
                      $("#addCourse" + htmlid).click(function() {
                         addCourse(childBucketsDT, nTr);
                      });  
                   }

                 }  
               }
        }
        
   }

   function openCourses(nTr, oTable) {
       var aData = oTable.fnGetData(nTr);
       var htmlid = removeSpace(aData[0]);
       var bucket = htmlid;
       oTable.fnOpen(nTr, addCourses(oTable, nTr), "ui-state-highlight");
       var coursesDT = null;
       var h;
       var element;
       var parent;
       var coursesData = [];
       var rest;      

      for(h = 0; h < courseData.length; h++) {
        element = courseData[h];
        parent = element[0];
        rest = element[1];
        if (parent == aData[0])
        {
           coursesData.push(rest);
        } 
      }

       coursesDT = $('#coursesDT' + bucket).dataTable({
                             "aaData": coursesData,
                             "aoColumns": [{
                                 "sTitle": "Course ID"
                             }, {
                                 "sTitle": "Course Name"
                             }, {
                                 "sTitle": "Credits"
                             }, {
                                 "sTitle": "Course Description"
                             }, {
                                 "sTitle": "Minimum Grade"
                             }],

                             "bAutoWidth": false,
                             "sPaginationType": "full_numbers",
                             "retrieve": true
                      });

        
   }






function addChild(oTable, nTr)
{
    //if(childTableDT != null)childTableDT.fnDestroy();
    
    var div = '';
    // Data entry form
    var div = '';
    div += '     <div id="childBucketAddition" title="Add Child Bucket">';
	div += '         <table>';
	div += '             <thead>';
	div += '                 <tr>';
        div += '                     <td>Description:</td>' ;
	div += '                     <td><input type="text" id="description"></td>';
	div += '                 </tr>';
	div += '                 <tr>';
	div += '                     <td>All Required:</td>';
	div += '                     <td><input type="text" id="allRequired"></td>';
	div += '                 </tr>';
        div += '                 <tr>';
        div += '                     <td>Quantity:</td>' ;
	div += '                     <td><input type="text" id="quantity"></td>';
	div += '                 </tr>';
        div += '                 <tr>';
        div += '                     <td>Quantification:</td>' ;
	div += '                     <td><input type="text" id="quantification"></td>';
	div += '                 </tr>';
	div += '             </thead>';
	div += '         </table>';
    div += '         <button type="button" id="subChild">Submit</button>';
    div += '   </div>';

   $('#tabs').append(div);

   $('#childBucketAddition').dialog({
        modal: true,
        width: "500px",
        close: function( event, ui ) {
            $('#childBucketAddition').remove();
        }
    });

   $('#subChild').click(function(){
        var description = $('#description').val();
        var allRequired = $('#allRequired').val();
        if (allRequired == "yes" || allRequired == "Yes")
           var allRequiredNum = "1";
        else
           var allRequiredNum = "0";
 	var quantity = $('#quantity').val();
 	var quantification = $('#quantification').val();

        if(description == "" || allRequired == "" || quantity == "" || quantification == "") {
           alert ("Empty Fields");
        } else {

           $(xmlDoc).find('bucket').each(function() {
           if ($(this).attr("id") == oTable.fnGetData(nTr)[0]) {
              var bucket = $(this);

              $($.parseXML('<bucket id="' + description + '"></bucket>')).find("bucket").appendTo(bucket);

              $(xmlDoc).find('bucket').each(function() {
              if ($(this).attr("id") == description) {
                 bucket = $(this);
                 $($.parseXML('<data id="' + description + '"></data>')).find("data").appendTo(bucket);

                 $(xmlDoc).find('data').each(function() {
                 if ($(this).attr("id") == description) {
                    var data = $(this);
                    $($.parseXML('<description>' + description + '</description>')).find("description").appendTo(data);
                    $($.parseXML('<allRequired>' + allRequiredNum + '</allRequired>')).find("allRequired").appendTo(data);
                    $($.parseXML('<quantity>' + quantity + '</quantity>')).find("quantity").appendTo(data);
                    $($.parseXML('<quantification>' + quantification + '</quantification>')).find("quantification").appendTo(data);
                 }
                 });
              }
              });

           }
        });
          
        xmlString = new XMLSerializer().serializeToString(xmlDoc);
        xmlFormatted = formatXml(xmlString);
        //alert(xmlFormatted);
          
        var parent = [oTable.fnGetData(nTr)[0]];
        childData.push([parent,[description, allRequired, quantity, quantification]]);

        //addChildBuckets(nTr, childBucketTableDT);

        $('#childBucketAddition').dialog("close");
        $('#childBucketAddition').remove();   
    }
    });
}

} //addRootBucket closing bracket


function addCourse(oTable, nTr)
{
   var div = '';
    div += '     <div id="courseAddition" title="Add Course">';
	div += '         <table>';
	div += '             <thead>';
	div += '                 <tr>';
        div += '                     <td>Course ID:</td>' ;
	div += '                     <td><input type="text" id="courseID"></td>';
	div += '                 </tr>';
	div += '                 <tr>';
	div += '                     <td>Course Name:</td>';
	div += '                     <td><input type="text" id="courseName"></td>';
	div += '                 </tr>';
        div += '                 <tr>';
        div += '                     <td>Credits:</td>' ;
	div += '                     <td><input type="text" id="credits"></td>';
	div += '                 </tr>';
        div += '                 <tr>';
        div += '                     <td>Course Description:</td>' ;
	div += '                     <td><input type="text" id="courseDesc"></td>';
	div += '                 </tr>';
        div += '                 <tr>';
        div += '                     <td>Minimum Grade:</td>' ;
	div += '                     <td><input type="text" id="minGrade"></td>';
	div += '                 </tr>';           
	div += '             </thead>';
	div += '         </table>';
    div += '         <button type="button" id="subCourse">Submit</button>';
    div += '   </div>';

   $('#tabs').append(div);

    $('#courseAddition').dialog({
        modal: true,
        width: "500px",
        close: function( event, ui ) {
            $('#courseAddition').remove();
        }
    });
   

   $('#subCourse').click(function(){
        

        var courseID = $('#courseID').val();
        var courseName = $('#courseName').val();
 	var credits = $('#credits').val();
 	var courseDesc = $('#courseDesc').val();
        var minGrade = $('#minGrade').val();

        if(courseID == "" || courseName == "" || credits == "" || courseDesc == "" || minGrade == "") {
           alert ("Empty Fields");
        } else {

           $(xmlDoc).find('bucket').each(function() {
              if ($(this).attr("id") == oTable.fnGetData(nTr)[0]) {

                 var bucket = $(this);
                 $($.parseXML('<course id="' + courseID + '"></course>')).find("course").appendTo(bucket);

                 $(xmlDoc).find('course').each(function() {
                   if ($(this).attr("id") == courseID) {
                     var course = $(this);
                     $($.parseXML('<courseID>' + courseID + '</courseID>')).find("courseID").appendTo(course);
                     $($.parseXML('<courseName>' + courseName + '</courseName>')).find("courseName").appendTo(course);
                     $($.parseXML('<credits>' + credits + '</credits>')).find("credits").appendTo(course);
                     $($.parseXML('<courseDescription>' + courseDesc + '</courseDescription>')).find("courseDescription").appendTo(course);
                     $($.parseXML('<minGrade>' + minGrade + '</minGrade>')).find("minGrade").appendTo(course);
                   }
                 });
                 
              }
           });

           xmlString = new XMLSerializer().serializeToString(xmlDoc);
           xmlFormatted = formatXml(xmlString);
           //alert(xmlFormatted);

           var parent = [oTable.fnGetData(nTr)[0]];
           courseData.push([parent, [courseID, courseName, credits, courseDesc, minGrade]]);
        

        $('#courseAddition').dialog("close");
        $('#courseAddition').remove();
    
     }
    });

}


}

function toXmlFile()
{
	$.ajax({
        type: 'POST',
        url: 'testDriver.php',
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

function removeSpace(string) {
     var substrings = string.split(" ");
     string = "";
     for (var i = 0; i < substrings.length; i++) {
         string = string.concat(substrings[i]);
     }
     return string;
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

