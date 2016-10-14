$(document).ready(function() {
    

start();
 		
 
});

function start() {
		var currentImage = 0;
        var currentSlide = currentImage + (1 * 1);
    var imageWidth = 800;
    //DOM and all content is loaded 
    $(window).ready(function() {
        //format slide text info
        function formatTextInfo() {
            if (currentSlide == 1) {
                $("#slideshowtext").replaceWith(
                    '<p id = "slideshowtext">' +
                    currentSlide +
                    ". Screen Privacy is off." + '</p>');
            } else if (currentSlide == 2) {
                $("#slideshowtext").replaceWith(
                    '<p id = "slideshowtext">' +
                    currentSlide +
                    ". Screen Privacy is on." + '</p>');
            } else if (currentSlide == 3) {
                $("#slideshowtext").replaceWith(
                    '<p id = "slideshowtext">' +
                    currentSlide +
                    " Rows Have a built in dropdown menu." +
                    '</p>');
            } else if (currentSlide == 4) {
                $("#slideshowtext").replaceWith(
                    '<p id = "slideshowtext">' +
                    currentSlide +
                    ". TheCourses Taken table allows you to  Modify your grade or Delete a row." +
                    '</p>');
            } else if (currentSlide == 5) {
                $("#slideshowtext").replaceWith(
                    '<p id = "slideshowtext">' +
                    currentSlide +
                    ". Modifying grade for MAC2311." +
                    '</p>');
            } else if (currentSlide == 6) {
                $("#slideshowtext").replaceWith(
                    '<p id = "slideshowtext">' +
                    currentSlide +
                    ". MAC2311 grade modified." + '</p>');
            } else if (currentSlide == 7) {
                $("#slideshowtext").replaceWith(
                    '<p id = "slideshowtext">' +
                    currentSlide +
                    ". Deleting course MAC2311." + '</p>');
            } else if (currentSlide == 8) {
                $("#slideshowtext").replaceWith(
                    '<p id = "slideshowtext">' +
                    currentSlide +
                    ". Course MAC2311 deleted." + '</p>');
            } else if (currentSlide == 9) {
                $("#slideshowtext").replaceWith(
                    '<p id = "slideshowtext">' +
                    currentSlide +
                    ". The Courses Needed table rows also dropdown." +
                    '</p>');
            } else if (currentSlide == 10) {
                $("#slideshowtext").replaceWith(
                    '<p id = "slideshowtext">' +
                    currentSlide +
                    ". Modifying weight and relevance for COP3530." +
                    '</p>');
            } else if (currentSlide == 11) {
                $("#slideshowtext").replaceWith(
                    '<p id = "slideshowtext">' +
                    currentSlide + ". COP3530 updated." +
                    '</p>');
            } else if (currentSlide == 12) {
                $("#slideshowtext").replaceWith(
                    '<p id = "slideshowtext">' +
                    currentSlide +
                    ". Selecting the <<< option adds the course as IP, or in progress." +
                    '</p>');
            } else if (currentSlide == 13) {
                $("#slideshowtext").replaceWith(
                    '<p id = "slideshowtext">' +
                    currentSlide +
                    ". Choose from a selection of graduate programs to " +
                    '</p>');
            } else if (currentSlide == 14) {
                $("#slideshowtext").replaceWith(
                    '<p id = "slideshowtext">' +
                    currentSlide +
                    ". The options are revealed in the dropdown box." +
                    '</p>');
            } else if (currentSlide == 15) {
                $("#slideshowtext").replaceWith(
                    '<p id = "slideshowtext">' +
                    currentSlide +
                    ". Each major may have a different required GPA" +
                    '</p>');
            } else {}
        }
 //       var currentImage = 0;
  //      var currentSlide = currentImage + (1 * 1);
        //set image count 
        var allImages = $('#slideshow li img').length;
        formatTextInfo();
        //setup slideshow frame width
        $('#slideshow ul').width(allImages * imageWidth);
        //attach click event to slideshow buttons
        $('.slideshow-next').click(function() {
            //increase image counter
            currentImage++;
            //if we are at the end let set it to 0
            if (currentImage >= allImages) currentImage = 0;
            //calcualte and set position
            setFramePosition(currentImage);
            currentSlide = currentImage + (1 * 1);
            $("#currentslide").replaceWith(
                '<p id = "currentslide">' +
                currentSlide + "/15" + '</p>');
            formatTextInfo();
        });
        $('.slideshow-prev').click(function() {
            //decrease image counter
            currentImage--;
            //if we are at the end let set it to 0
            if (currentImage < 0) currentImage = allImages -
                1;
            //calcualte and set position
            setFramePosition(currentImage);
            currentSlide = currentImage + (1 * 1);
            $("#currentslide").replaceWith(
                '<p id = "currentslide">' +
                currentSlide + "/15" + '</p>');
            formatTextInfo();
        });


$('#f1').click(function() {			       		
            currentImage = 0;			
            setFramePosition(currentImage);
            currentSlide = currentImage + (1 * 1);
            $("#currentslide").replaceWith('<p id = "currentslide">' + currentSlide + "/15" + '</p>');
            formatTextInfo();
        });
$('#f2').click(function() {			       		
            currentImage = 2;			
            setFramePosition(currentImage);
            currentSlide = currentImage + (1 * 1);
            $("#currentslide").replaceWith('<p id = "currentslide">' + currentSlide + "/15" + '</p>');
            formatTextInfo();
        });
$('#f3').click(function() {			       		
            currentImage = 4;			
            setFramePosition(currentImage);
            currentSlide = currentImage + (1 * 1);
            $("#currentslide").replaceWith('<p id = "currentslide">' + currentSlide + "/15" + '</p>');
            formatTextInfo();
        });
$('#f4').click(function() {			       		
            currentImage = 6;			
            setFramePosition(currentImage);
            currentSlide = currentImage + (1 * 1);
            $("#currentslide").replaceWith('<p id = "currentslide">' + currentSlide + "/15" + '</p>');
            formatTextInfo();
        });
$('#f5').click(function() {			       		
            currentImage = 8;			
            setFramePosition(currentImage);
            currentSlide = currentImage + (1 * 1);
            $("#currentslide").replaceWith('<p id = "currentslide">' + currentSlide + "/15" + '</p>');
            formatTextInfo();
        });
$('#f6').click(function() {			       		
            currentImage =9;			
            setFramePosition(currentImage);
            currentSlide = currentImage + (1 * 1);
            $("#currentslide").replaceWith('<p id = "currentslide">' + currentSlide + "/15" + '</p>');
            formatTextInfo();
        });
$('#f7').click(function() {			       		
            currentImage = 11;			
            setFramePosition(currentImage);
            currentSlide = currentImage + (1 * 1);
            $("#currentslide").replaceWith('<p id = "currentslide">' + currentSlide + "/15" + '</p>');
            formatTextInfo();
        });
$('#f8').click(function() {			       		
            currentImage = 12;			
            setFramePosition(currentImage);
            currentSlide = currentImage + (1 * 1);
            $("#currentslide").replaceWith(
                '<p id = "currentslide">' +
                currentSlide + "/15" + '</p>');
            formatTextInfo();
        });

    });
    //calculate the slideshow frame position and animate it to the new position
    function setFramePosition(pos) {
        //calculate position
        var px = imageWidth * pos * -1;
        //set ul left position
        $('#slideshow ul').animate({
            left: px
        }, 300);
    }



}
