
var currentHour = $(".currentHour");
var noteHour = $(".note");
var planner = $("#planner");
var buttons = $(".button");

var time = dayjs();
var currentHourInt = dayjs().hour();

var updateTime = function() {
    time = dayjs().format("hh:mm:ss A");
    var day = dayjs().format("dddd, MMMM D YYYY");
    
    currentHour.text(time + "  " + day);
}


updateTime();
setInterval(updateTime, 1000);
// setInterval(createTimeBlock, 1000) // Update every second



var createTimeBlock = function(hour) {
    
    for (var i = 0; i < 24; i++) {
        var hour12 = i % 12;  // This will give values from 0 to 11
        var suffix = (i < 12) ? "AM" : "PM"; // Determines AM or PM

        var hourBlock = $("<div>");
        hourBlock.addClass("row note");
        hourBlock.attr("data-hour", i);

        var hourLabel = $("<div>");
        hourLabel.addClass("col-12 d-flex column-gap-4 align-items-center");  // Flex container for vertical centering
        // hour header
        var hourHeader = $("<h2>");
        hourHeader.addClass("text-start hourHeader")
        if (i < 9 && i !== 0) {
            hourHeader.text("0" + hour12 + ":00 " + suffix);
        } else if (i === 12 || i === 0) {
            hourHeader.text("12:00 " + suffix);
        }else {
            hourHeader.text(hour12 + ":00 " + suffix);
        }
        // hour text
        var hourText = $("<textarea>");
        hourText.addClass("col-8 form-floating");
        hourText.attr("placeholder", "Leave your note here");


        var submitButton = $("<button>");
        submitButton.addClass("button btn-dark col-3 ");
        submitButton.attr("type", "button");
        submitButton.text("Save");

        
        hourBlock.append(hourHeader);
        hourLabel.append(hourText);
        
        hourLabel.append(submitButton);
        hourBlock.append(hourLabel);
        planner.append(hourBlock);

        
        if (i < currentHourInt) {
            hourBlock.addClass("past");
        } else if (i === currentHourInt) {
            hourBlock.addClass("present");
        } else {
            hourBlock.addClass("future");
        }
   
        console.log(i);
    }
}


var saveMessage = function(clickEvent) {
    // Prevent the default form submission behavior
    // event.preventDefault();
    var hourBlock = $(this).closest(".note");
    // Get the data-hour attribute value
    var hour = hourBlock.attr("data-hour"); 
    // Get the value of the textarea
    var message = hourBlock.find("textarea").val(); 
    // Save the message to local storage with the hour as the key
    localStorage.setItem(hour, message); 

    // Optionally, you can provide feedback to the user
    // alert("Message saved for hour " + hour);
    console.log("Message saved for hour " + hour + ": " + message);
}

var loadMessages = function() {
    for (var i = 0; i < 24; i++) {
        var savedMessage = localStorage.getItem(i);
        if (savedMessage) {
            $(`.note[data-hour="${i}"] textarea`).val(savedMessage);
        }

    }
}


planner.on("click", ".button", saveMessage);


function getVals(){
    // Get slider values
    var parent = this.parentNode;
    var slides = parent.getElementsByTagName("input");
      var slide1 = parseFloat( slides[0].value );
      var slide2 = parseFloat( slides[1].value );
    // Neither slider will clip the other, so make sure we determine which is larger
    if( slide1 > slide2 ){ var tmp = slide2; slide2 = slide1; slide1 = tmp; }
    
    var displayElement = parent.getElementsByClassName("rangeValues")[0];
        displayElement.innerHTML = slide1 + " - " + slide2;
  }
  
  window.onload = function(){
    // Initialize Sliders
    var sliderSections = document.getElementsByClassName("range-slider");
        for( var x = 0; x < sliderSections.length; x++ ){
          var sliders = sliderSections[x].getElementsByTagName("input");
          for( var y = 0; y < sliders.length; y++ ){
            if( sliders[y].type ==="range" ){
              sliders[y].oninput = getVals;
              // Manually trigger event first time to display values
              sliders[y].oninput();
            }
          }
        }
  }



createTimeBlock(currentHourInt);
loadMessages();