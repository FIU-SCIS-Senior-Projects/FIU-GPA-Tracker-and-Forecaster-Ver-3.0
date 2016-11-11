var node;
var xmlString;
var xmFormatted;
var fileName;
var xmlDoc;
var i = 0;
var greatestId = 0;

$(document).ready(function() {
     start();
});

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
     alert('Submit base data first');
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
    node = this.parentNode;
    $('#rootBucketAddition').remove();
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
 	var quantity = $('#quantity').val();
 	var quantification = $('#quantification').val();

        if(description == "" || allRequired == "" || quantity == "" || quantification == "") {
          alert ("Empty Fields");
        } else {

        $($.parseXML('<bucket id="' + greatestId + '"></bucket>')).find("bucket").appendTo(main);
        bucket = $(xmlDoc).find('bucket').last();
        $($.parseXML('<data></data>')).find("data").appendTo(bucket);
        var data = $(xmlDoc).find('data').last();

        $($.parseXML('<description>' + description + '</description>')).find("description").appendTo(data);
        $($.parseXML('<allRequired>' + allRequired + '</allRequired>')).find("allRequired").appendTo(data);
        $($.parseXML('<quantity>' + quantity + '</quantity>')).find("quantity").appendTo(data);
        $($.parseXML('<quantification>' + quantification + '</quantification>')).find("quantification").appendTo(data);

        xmlString = new XMLSerializer().serializeToString(xmlDoc);
        xmlFormatted = formatXml(xmlString);
        //alert(xmlFormatted);

        var div = '';
        div += '<tr class="odd" role="row">';
    	div += '   <td class="sorting_1">' + description + '</td>';
        div += '   <td>' + allRequired + '</td>';
        div += '   <td>' + quantity + '</td>';
        div += '   <td>' + quantification +'</td>';
        div += '</tr>';

        $('#rows').append(div);
        $('#rootBucketAddition').dialog("close");
        $('#rootBucketAddition').remove();

       
        //for each element in xml dom
        $(xmlDoc).each(function() {
           currId = $(this).attr("greatestId");
           if (currId > greatestId) {
             greatestId = currId
           }
        });
       greatestId ++;

      $('#parentTableRoot tbody tr td').off();
      $('#parentTableRoot tbody tr td').on('click', rowClickHandler);
       
    }
    });

}


function rowClickHandler(){
    node = this.parentNode;
    var open= false;

    try{
        if($(node).next().children().first().hasClass("ui-state-highlight"))
            open=true;
    }catch(err){
        alert(err);
    }

    if (open){
        //This row is already open - close it
       $('.myclass').remove();
       $('#courseTable').remove();
       $('#childTable').remove();
       
    } else {
        if ($(node).next().hasClass("myclass")) {
            $('#rootDetails').remove();
         } 
        else {if (!$(node).next().hasClass("myclass")) {
           addRootButtons();
        }}
        
        $(xmlDoc).find('bucket').each(function() {
           $(this).children().each(function() {
             if($(this).prop("tagName") == "bucket") {
               $('.myclass').remove();
               updateChildTable();
           }
          });
        });

        $(xmlDoc).find('bucket').each(function() {
           $(this).children().each(function() {
             if($(this).prop("tagName") == "course") {
               $('.myclass').remove();
               updateCourseTable();
           }
          });
        });
    }
  
}

function rowClickHandler2(){
    node = this.parentNode;
    var open= false;

    try{
        if($(node).next().children().first().hasClass("ui-state-highlight"))
            open=true;
    }catch(err){
        alert(err);
    }

    if (open){
       //This row is already open - close it
       $('.childClass').remove();
       $('#childCourseTable').remove();
       //$('#childTable').remove();

    }else{
       if ($(node).next().hasClass("childClass")) {
            $('#childDetails').remove();
         } else {
             if (!$(node).next().hasClass("childClass")) {
             addChildButtons();
           }
        }
        //updateChildCourseTable();
        //update child course table
    }
  
}

function addRootButtons()
{
    var div = '';
    div += '<tr class="myclass" id="rootDetails">';
    div += '<td class="myclass" colspan="4">';
    div += '  <div id="rootButtons">';
    div += '    <div class="buttonDetails">';
    div += '        <button id="addChild" class="rootButton">Add Child Bucket</button><br>';
    div += '        <button id="addCourse" class="rootButton">Add Course</button><br>';
    div += '    </div>';
    div +=   '</div>';
    div += '</td>';
    div += '</tr>';
    $('#rows').append(div);
  
    $('#addChild').click(function(){
      addChild();
    });

   $('#addCourse').click(function(){    
      addCourse();
   });
}

function addChildButtons()
{
    var div = '';
    div += '<tr class="childClass" id="childDetails">';
    div += '<td class="ui-state-highlight" colspan="4">';
    div += '  <div id="childButtons">';
    div += '    <div class="buttonDetails">';
    div += '        <button id="addChild" class="rootButton">Add Child Bucket</button><br>';
    div += '        <button id="addCourse" class="rootButton">Add Course</button><br>';
    div += '    </div>';
    div +=   '</div>';
    div += '</td>';
    div += '</tr>';
    $('#childrenRows').append(div);
  
    $('#addChild').click(function(){
      i++;
      addChild();
    });

   $('#addCourse').click(function(){    
      addChildCourse();
   });
}

function addChild()
{
    //node = this.parentNode;
    $('#childBucketAddition').remove();
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
 	var quantity = $('#quantity').val();
 	var quantification = $('#quantification').val();

        if(description == "" || allRequired == "" || quantity == "" || quantification == "") {
           alert ("Empty Fields");
        } else {

        bucket = $(xmlDoc).find('bucket').first();
        $($.parseXML('<bucket></bucket>')).find("bucket").appendTo(bucket);
        bucket = $(xmlDoc).find('bucket').last();
        $($.parseXML('<data></data>')).find("data").appendTo(bucket);
        var data = $(xmlDoc).find('data').last();

        $($.parseXML('<description>' + description + '</description>')).find("description").appendTo(data);
        $($.parseXML('<allRequired>' + allRequired + '</allRequired>')).find("allRequired").appendTo(data);
        $($.parseXML('<quantity>' + quantity + '</quantity>')).find("quantity").appendTo(data);
        $($.parseXML('<quantification>' + quantification + '</quantification>')).find("quantification").appendTo(data);
        
        xmlString = new XMLSerializer().serializeToString(xmlDoc);
        xmlFormatted = formatXml(xmlString);
        //alert(xmlFormatted);

        updateChildTable();

    $('#childBucketAddition').dialog("close");
     $('#childBucketAddition').remove();   
    //$('#parentTableChild tbody tr td').off();
    //$('#parentTableChild tbody tr td').on('click', rowClickHandler2);
       
    
    //$('#parentTableRoot tbody tr td').off();
    //$('#parentTableRoot tbody tr td').on('click', rowClickHandler);
    }
    });
}

function updateChildTable() {

   $('.child').remove();
   $('#childTable').remove();
   $('.myclass').remove();
   var id = 0;


      var div = '';
      div += '<tr id="childTable" class="ui-state-highlight">';
      div += '<td class="ui-state-highlight" colspan="4">';
      div += '   <div id="child_wrapper" class="dataTables_wrapper no-footer">';
      div += '      <table id="parentTableChild" class="dataTable no-footer" role="grid" aria-describedby="parentTableChild_info" style="width: 100%;" width="100%" border="1">';
      div += '         <thead>';
      div += '          <tr role="row">';
      div += '             <th class="sorting_asc" tabindex="0" aria-controls="courses" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Description: activate to sort column descending">Description</th>';
      div += '             <th class="sorting" tabindex="0" aria-controls="courses" rowspan="1" colspan="1" aria-label="All Required: activate to sort column ascending">All Required</th>';
      div += '             <th class="sorting" tabindex="0" aria-controls="courses" rowspan="1" colspan="1" aria-label="Quantity: activate to sort column ascending">Quantity</th>';
      div += '             <th class="sorting" tabindex="0" aria-controls="courses" rowspan="1" colspan="1" aria-label="Quantification: activate to sort column ascending">Quantification</th>';
      div += '          </tr>';
      div += '         </thead>';     
      div += '         <tbody id="childrenRows">';
      div += '         </tbody>';
      div += '      </table>';
      div += '   </div>';
      div += '</td>';
      div += '</tr>';  

    //$('#rows').append(div);  
   
    var divRow;
    
    $(xmlDoc).find('bucket').each(function() {

       $(this).children().each(function() {

         if($(this).prop("tagName") == "bucket") {
          $(this).children().each(function() {

            if($(this).prop("tagName") == "data") {
               
               
               divRow = $(
               '<tr id="childTable" class="ui-state-highlight">'+
               '<td class="ui-state-highlight" colspan="4">'+
               '   <div id="child_wrapper" class="dataTables_wrapper no-footer">'+
               '      <table id="parentTableChild" class="dataTable no-footer" role="grid" aria-describedby="parentTableChild_info" style="width: 100%;" width="100%" border="1">'+
               '         <thead>'+
               '          <tr role="row">'+
               '             <th class="sorting_asc" tabindex="0" aria-controls="courses" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Description: activate to sort column descending">Description</th>'+
               '             <th class="sorting" tabindex="0" aria-controls="courses" rowspan="1" colspan="1" aria-label="All Required: activate to sort column ascending">All Required</th>'+
               '             <th class="sorting" tabindex="0" aria-controls="courses" rowspan="1" colspan="1" aria-label="Quantity: activate to sort column ascending">Quantity</th>'+
               '             <th class="sorting" tabindex="0" aria-controls="courses" rowspan="1" colspan="1" aria-label="Quantification: activate to sort column ascending">Quantification</th>'+
               '          </tr>'+
               '         </thead>'+     
               '         <tbody>'+
               '            <tr id="childTable" class="ui-state-highlight">'+
               '            <td class="ui-state-highlight" colspan="4">'+
               '            <div id="child_wrapper" class="dataTables_wrapper no-footer">'+
               '            <table class="dataTable no-footer" role="grid" aria-describedby="parentTableChild_info" style="width: 100%;" width="100%" border="1">'+
               '             <thead id="header' + id +'">'+
               '             </thead>'+
               '             <tbody>'+
               '               <tr class="child" role="row">'+
               '                 <td class="sorting_1">' + $(this).find('description').text() + '</td>'+
               '                 <td>' + $(this).find('allRequired').text() + '</td>'+
               '                 <td>' + $(this).find('quantity').text() + '</td>'+
               '                 <td>' + $(this).find('quantification').text() +'</td>'+
               '               </tr>'+
               '             </tbody>'+
               '            </table>'+
               '           </div>'+
               '          </td>'+
               '         </tr>'+
               '      </tbody>'+
               '      </table>'+
               '   </div>'+
               '</td>'+
               '</tr>');
            
              // divHeader = $('<tr role="row">'+
                //             '<th class="sorting_asc" tabindex="0" aria-controls="courses" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Description: activate to sort column descending">Description</th>'+
                  //           '<th class="sorting" tabindex="0" aria-controls="courses" rowspan="1" colspan="1" aria-label="All Required: activate to sort column ascending">All Required</th>'+
                    //         '<th class="sorting" tabindex="0" aria-controls="courses" rowspan="1" colspan="1" aria-label="Quantity: activate to sort column ascending">Quantity</th>'+
                      //       '<th class="sorting" tabindex="0" aria-controls="courses" rowspan="1" colspan="1" aria-label="Quantification: activate to sort column ascending">Quantification</th>'+
                        //     '</tr>');
                
                   //if (i == 0) {
                      //$("#childrenRows").append(divRow);  
                   //}
                   
                   //if (i > 0) {
                     //j = i - 1;
                    // $("#rows").append(divHeader);
                     $("#rows").append(nestDeep(i));
                    //} 
                 
             }
          });
         }
      });
     });
    
     
       function nestDeep(count) {
          return count > 0 
                ? divRow.append(nestDeep(count - 1)) 
                : divRow;
          //id++;
      }

      
      addRootButtons();

   $('#parentTableChild tbody tr td').off();
   $('#parentTableChild tbody tr td').on('click', rowClickHandler2);

}

function addCourse()
{
   //$('#rootDetails').remove();
   $('#courseAddition').remove();
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

        bucket = $(xmlDoc).find('bucket').first();
        $($.parseXML('<course></course>')).find("course").appendTo(bucket);
        var course = $(xmlDoc).find('course').last();
        $($.parseXML('<courseID>' + courseID + '</courseID>')).find("courseID").appendTo(course);
        $($.parseXML('<courseName>' + courseName + '</courseName>')).find("courseName").appendTo(course);
        $($.parseXML('<credits>' + credits + '</credits>')).find("credits").appendTo(course);
        $($.parseXML('<courseDescription>' + courseDesc + '</courseDescription>')).find("courseDescription").appendTo(course);
        $($.parseXML('<minGrade>' + minGrade + '</minGrade>')).find("minGrade").appendTo(course);
        
        xmlString = new XMLSerializer().serializeToString(xmlDoc);
        xmlFormatted = formatXml(xmlString);
        //alert(xmlFormatted);

        updateCourseTable();
        

        $('#courseAddition').dialog("close");
        $('#courseAddition').remove();
    //$('#parentTableChild tbody tr td').off();
    //$('#parentTableChild tbody tr td').on('click', rowClickHandler2);

    //$('#parentTableRoot tbody tr td').off();
    //$('#parentTableRoot tbody tr td').on('click', rowClickHandler);
     }
    });

}

function updateCourseTable() {

   $('.course').remove();
   $('#courseTable').remove();

   var div = '';
   div += '<tr id="courseTable" class="ui-state-highlight">';
   div += '<td class="ui-state-highlight" colspan="4">';
   div += '   <div id="courses_wrapper" class="dataTables_wrapper no-footer">';
   div += '    <table id="courses" class="dataTable no-footer" role="grid" aria-describedby="courses_info">';
   div += '       <thead>';
   div += '          <tr role="row">';
   div += '             <th class="sorting_asc" tabindex="0" aria-controls="courses" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Course ID: activate to sort column descending">Course ID</th>';
   div += '             <th class="sorting" tabindex="0" aria-controls="courses" rowspan="1" colspan="1" aria-label="Course Name: activate to sort column ascending">Course Name</th>';
   div += '             <th class="sorting" tabindex="0" aria-controls="courses" rowspan="1" colspan="1" aria-label="Credits: activate to sort column ascending">Credits</th>';
   div += '             <th class="sorting" tabindex="0" aria-controls="courses" rowspan="1" colspan="1" aria-label="Course Description: activate to sort column ascending">Course Description</th>';
   div += '             <th class="sorting" tabindex="0" aria-controls="courses" rowspan="1" colspan="1" aria-label="Minimum Grade: activate to sort column ascending">Minimum Grade</th>'; 
   div += '          </tr>';
   div += '       </thead>';     
   div += '       <tbody id="coursesRows">';
   div += '       </tbody>';
   div += '    </table>';
   div += '   </div>';
   div += '</td>';
   div += '</tr>';

   $('.myclass').remove();
   $('#rows').append(div);

   $(xmlDoc).find('bucket').each(function() {
      $(this).children().each(function() {
         if($(this).prop("tagName") == "course") {
          //$(this).each(function() {

                var divRow = '';
                divRow += '   <tr class="course" role="row">';
                divRow += '        <td class="sorting_1">' + $(this).find('courseID').text() + '</td>';
                divRow += '        <td>' + $(this).find('courseName').text() + '</td>';
                divRow += '        <td>' + $(this).find('credits').text() + '</td>';
                divRow += '        <td>' + $(this).find('courseDesc').text() + '</td>';
                divRow += '        <td>' + $(this).find('minGrade').text() + '</td>';
                divRow += '   </tr>';

               $('#coursesRows').append(divRow);
               
          //});
         }
      });
    });
    addRootButtons();

   $('#parentTableChild tbody tr td').off();
   $('#parentTableChild tbody tr td').on('click', rowClickHandler2);
}

function addChildCourse()
{
   //$('#rootDetails').remove();
   $('#childCourseAddition').remove();

   var div = '';
    div += '     <div id="childCourseAddition" title="Add Course">';
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
    div += '         <button type="button" id="subChildCourse">Submit</button>';
    div += '   </div>';

   $('#tabs').append(div);

    $('#childCourseAddition').dialog({
        modal: true,
        width: "500px",
        close: function( event, ui ) {
            $('#childCourseAddition').remove();
        }
    });
   

   $('#subChildCourse').click(function(){
        

        var courseID = $('#courseID').val();
        var courseName = $('#courseName').val();
 	var credits = $('#credits').val();
 	var courseDesc = $('#courseDesc').val();
        var minGrade = $('#minGrade').val();
  
        var course;
        if(courseID == "" || courseName == "" || credits == "" || courseDesc == "" || minGrade == "") {
           alert ("Empty Fields");
        } else {

        bucket = $(xmlDoc).find('bucket').last();
        $($.parseXML('<course></course>')).find("course").appendTo(bucket);
        
        $(bucket).find('course').each(function() {
    
              course = $(this);
        });
     
    
        $($.parseXML('<courseID>' + courseID + '</courseID>')).find("courseID").appendTo(course);
        $($.parseXML('<courseName>' + courseName + '</courseName>')).find("courseName").appendTo(course);
        $($.parseXML('<credits>' + credits + '</credits>')).find("credits").appendTo(course);
        $($.parseXML('<courseDescription>' + courseDesc + '</courseDescription>')).find("courseDescription").appendTo(course);
        $($.parseXML('<minGrade>' + minGrade + '</minGrade>')).find("minGrade").appendTo(course);
        
        xmlString = new XMLSerializer().serializeToString(xmlDoc);
        xmlFormatted = formatXml(xmlString);
        //alert(xmlFormatted);

        updateChildCourseTable();
        

        $('#childCourseAddition').dialog("close");
        $('#childCourseAddition').remove();
    //$('#parentTableChild tbody tr td').off();
    //$('#parentTableChild tbody tr td').on('click', rowClickHandler2);

    //$('#parentTableRoot tbody tr td').off();
    //$('#parentTableRoot tbody tr td').on('click', rowClickHandler);
     }
    });

}

function updateChildCourseTable() {

   $('.childCourse').remove();
   //$('#courseTable').remove();

   var div = '';
   div += '<tr id="childCourseTable" class="ui-state-highlight">';
   div += '<td class="ui-state-highlight" colspan="4">';
   div += '   <div id="courses_wrapper" class="dataTables_wrapper no-footer">';
   div += '    <table id="courses" class="dataTable no-footer" role="grid" aria-describedby="courses_info">';
   div += '       <thead>';
   div += '          <tr role="row">';
   div += '             <th class="sorting_asc" tabindex="0" aria-controls="courses" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Course ID: activate to sort column descending">Course ID</th>';
   div += '             <th class="sorting" tabindex="0" aria-controls="courses" rowspan="1" colspan="1" aria-label="Course Name: activate to sort column ascending">Course Name</th>';
   div += '             <th class="sorting" tabindex="0" aria-controls="courses" rowspan="1" colspan="1" aria-label="Credits: activate to sort column ascending">Credits</th>';
   div += '             <th class="sorting" tabindex="0" aria-controls="courses" rowspan="1" colspan="1" aria-label="Course Description: activate to sort column ascending">Course Description</th>';
   div += '             <th class="sorting" tabindex="0" aria-controls="courses" rowspan="1" colspan="1" aria-label="Minimum Grade: activate to sort column ascending">Minimum Grade</th>'; 
   div += '          </tr>';
   div += '       </thead>';     
   div += '       <tbody id="childCoursesRows">';
   div += '       </tbody>';
   div += '    </table>';
   div += '   </div>';
   div += '</td>';
   div += '</tr>';

   $('.childClass').remove();
   $('.myclass').remove();
   $('#childrenRows').append(div);

   $(xmlDoc).find('bucket').each(function() {
      $(this).children().each(function() {
         if($(this).prop("tagName") == "course" && $(this).parent().parent().prop("tagName") == "bucket") {

                var divRow = '';
                divRow += '   <tr class="childCourse" role="row">';
                divRow += '        <td class="sorting_1">' + $(this).find('courseID').text() + '</td>';
                divRow += '        <td>' + $(this).find('courseName').text() + '</td>';
                divRow += '        <td>' + $(this).find('credits').text() + '</td>';
                divRow += '        <td>' + $(this).find('courseDesc').text() + '</td>';
                divRow += '        <td>' + $(this).find('minGrade').text() + '</td>';
                divRow += '   </tr>';

               $('#childCoursesRows').append(divRow);
         }
      });
    });
    //$('#childrenRows').append(div);
    addChildButtons()
    addRootButtons();


   $('#parentTableChild tbody tr td').off();
   $('#parentTableChild tbody tr td').on('click', rowClickHandler2);
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

