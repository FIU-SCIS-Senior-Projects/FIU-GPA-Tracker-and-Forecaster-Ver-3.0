$(document).ready(function() {
    start();
});


function start() {
    var imageWidth = 800;

    //DOM and all content is loaded 
    $(window).ready(function() {
        //format slide text info
        function formatTextInfo() {
            if (currentSlide == 1) {
                $("#slideshowtext").replaceWith('<p id = "slideshowtext">' + currentSlide + ". When entering the current semester dashboard you will find a list of courses and the grade based on inputs." + '</p>');
            } else if (currentSlide == 2) {
                $("#slideshowtext").replaceWith('<p id = "slideshowtext">' + currentSlide + ". Any row can be clicked and a dropdown will appear show two buttons to delete or go to the assessment breakdown." + '</p>');
            } else if (currentSlide == 3) {
                $("#slideshowtext").replaceWith('<p id = "slideshowtext">' + currentSlide + ". If delete course a dialog will appear asking to confirm the deletion of the course." + '</p>');
            } else if (currentSlide == 4) {
                $("#slideshowtext").replaceWith('<p id = "slideshowtext">' + currentSlide + ". If you haven't inserted any grades for a course it will indicate that and look like the page above." + '</p>');
            } else if (currentSlide == 5) {
                $("#slideshowtext").replaceWith('<p id = "slideshowtext">' + currentSlide + ". Assessment groups can be created as shown above" + '</p>');
            } else if (currentSlide == 6) {
                $("#slideshowtext").replaceWith('<p id = "slideshowtext">' + currentSlide + ". After an assessment type is created a new tab is created for it." + '</p>');
            } else if (currentSlide == 7) {
                $("#slideshowtext").replaceWith('<p id = "slideshowtext">' + currentSlide + ". To add a grade to the assessment type hit the add grade button below and input the new grade" + '</p>');
            } else if (currentSlide == 8) {
                $("#slideshowtext").replaceWith('<p id = "slideshowtext">' + currentSlide + ". The assessment management tab will show all grades and their averages with the total running average computed at the bottom." + '</p>');
            } else if (currentSlide == 9) {
                $("#slideshowtext").replaceWith('<p id = "slideshowtext">' + currentSlide + ". To modify a grade click on it, hit modify grade and enter information." + '</p>');
            } else if (currentSlide == 10) {
                $("#slideshowtext").replaceWith('<p id = "slideshowtext">' + currentSlide + ". To delete a grade click on it, hit delete grade, and confirm." + '</p>');
            } else {}
        }

        var currentImage = 0;
        var currentSlide = currentImage + (1 * 1);
        //set slide count 
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
            $("#currentslide").replaceWith('<p id = "currentslide">' + currentSlide + "/10" + '</p>');
            formatTextInfo();
        });

        $('.slideshow-prev').click(function() {
            //decrease image counter
            currentImage--;

            //if we are at the end let set it to 0
            if (currentImage < 0) currentImage = allImages - 1;

            //calcualte and set position
            setFramePosition(currentImage);
            currentSlide = currentImage + (1 * 1);
            $("#currentslide").replaceWith('<p id = "currentslide">' + currentSlide + "/10" + '</p>');
            formatTextInfo();
        });

		$('#s2').click(function() {
		    currentImage = 0;
		    setFramePosition(currentImage);
		    currentSlide = currentImage + (1 * 1);
		    $("#currentslide").replaceWith('<p id = "currentslide">' + currentSlide + "/10" + '</p>');
		    formatTextInfo();
		});

		$('#s3').click(function() {
		    currentImage = 1;
		    setFramePosition(currentImage);
		    currentSlide = currentImage + (1 * 1);
		    $("#currentslide").replaceWith('<p id = "currentslide">' + currentSlide + "/10" + '</p>');
		    formatTextInfo();
		});

		$('#s4').click(function() {
		    currentImage = 2;
		    setFramePosition(currentImage);
		    currentSlide = currentImage + (1 * 1);
		    $("#currentslide").replaceWith('<p id = "currentslide">' + currentSlide + "/10" + '</p>');
		    formatTextInfo();
		});

		$('#s5').click(function() {
		    currentImage = 3;
		    setFramePosition(currentImage);
		    currentSlide = currentImage + (1 * 1);
		    $("#currentslide").replaceWith('<p id = "currentslide">' + currentSlide + "/10" + '</p>');
		    formatTextInfo();
		});

		$('#s6').click(function() {
		    currentImage = 4;
		    setFramePosition(currentImage);
		    currentSlide = currentImage + (1 * 1);
		    $("#currentslide").replaceWith('<p id = "currentslide">' + currentSlide + "/10" + '</p>');
		    formatTextInfo();
		});

		$('#s7').click(function() {
		    currentImage = 5;
		    setFramePosition(currentImage);
		    currentSlide = currentImage + (1 * 1);
		    $("#currentslide").replaceWith('<p id = "currentslide">' + currentSlide + "/10" + '</p>');
		    formatTextInfo();
		});

		$('#s8').click(function() {
		    currentImage = 6;
		    setFramePosition(currentImage);
		    currentSlide = currentImage + (1 * 1);
		    $("#currentslide").replaceWith('<p id = "currentslide">' + currentSlide + "/10" + '</p>');
		    formatTextInfo();
		});

		$('#s9').click(function() {
		    currentImage = 7;
		    setFramePosition(currentImage);
		    currentSlide = currentImage + (1 * 1);
		    $("#currentslide").replaceWith('<p id = "currentslide">' + currentSlide + "/10" + '</p>');
		    formatTextInfo();
		});

		$('#s10').click(function() {
		    currentImage = 8;
		    setFramePosition(currentImage);
		    currentSlide = currentImage + (1 * 1);
		    $("#currentslide").replaceWith('<p id = "currentslide">' + currentSlide + "/10" + '</p>');
		    formatTextInfo();
		});

		$('#s11').click(function() {
		    currentImage = 9;
		    setFramePosition(currentImage);
		    currentSlide = currentImage + (1 * 1);
		    $("#currentslide").replaceWith('<p id = "currentslide">' + currentSlide + "/10" + '</p>');
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
