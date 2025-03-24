
var currentHour = $(".currentHour");
var noteHour = $(".note");
var planner = $("#planner");

var time = dayjs();
var currentHourInt = dayjs().hour();

var updateTime = function() {
    time = dayjs().format("hh:mm:ss A");
    var day = dayjs().format("dddd, MMMM D YYYY");
    
    currentHour.text(time + "  " + day);
}


updateTime();
setInterval(updateTime, 1000); // Update every second



console.log(currentHourInt);

var createTimeBlock = function(hour) {
    
    for (var i = 0; i < 23; i++) {
        var hour12 = i % 12;  // This will give values from 0 to 11
        var suffix = (i < 12) ? "AM" : "PM"; // Determines AM or PM

        var hourBlock = $("<div>");
        hourBlock.addClass("row note");
        hourBlock.attr("data-hour", i);

        var hourLabel = $("<div>");
        hourLabel.addClass("col-12");
        
        // hour header
        var hourHeader = $("<h2>");
        if (i < 9 && i !== 0) {
            hourHeader.text("0" + hour12 + ":00 " + suffix);
        } else if (i === 12 || i === 0) {
            hourHeader.text("12:00 " + suffix);
        }else {
            hourHeader.text(hour12 + ":00 " + suffix);
        }
        hourLabel.append(hourHeader);

        // hour text
        var hourText = $("<textarea>");
        hourText.addClass("col-12 form-floating");
        hourText.attr("placeholder", "Leave your note here");

        hourLabel.append(hourText);
        hourBlock.append(hourLabel);
        planner.append(hourBlock);
        
        if (i < currentHourInt) {
            hourBlock.addClass("past");
        } else if (i === currentHourInt) {
            hourBlock.addClass("present");
        } else {
            hourBlock.addClass("future");
        }
   
    }
}

createTimeBlock(currentHourInt)