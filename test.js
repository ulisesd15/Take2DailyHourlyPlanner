var showTimeBlock = function(min, max) {
    for (var i = min; i < max; i++) {
        var container = $(`.note[data-hour='${i}']`);
        if (container.hasClass('no-show')) {
            container.removeClass('no-show').addClass('show');
        } else {
            // Optionally handle the case where the container does not have 'no-show'
            console.log(`Container for hour ${i} is already visible.`);
        }
    }
};

var createTimeBlock = function(min, max) {
    for (var i = min; i < max; i++) {
        var hour12 = i % 12;  // This will give values from 0 to 11
        var suffix = (i < 12) ? 'AM' : 'PM'; // Determines AM or PM

        var hourBlock = $('<div>');
        hourBlock.addClass('row note no-show');
        hourBlock.attr('data-hour', i);

        var hourLabel = $('<div>');
        hourLabel.addClass('col-12 d-flex column-gap-4 align-items-center');  // Flex container for vertical centering

        // hour header
        var hourHeader = $('<h2>');
        hourHeader.addClass('text-start hourHeader');
        if (i < 9 && i !== 0) {
            hourHeader.text('0' + hour12 + ':00 ' + suffix);
        } else if (i === 12 || i === 0) {
            hourHeader.text('12:00 ' + suffix);
        } else {
            hourHeader.text(hour12 + ':00 ' + suffix);
        }

        // hour text
        var hourText = $('<textarea>');
        hourText.addClass('col-8 form-floating');
        hourText.attr('placeholder', 'Leave your note here');

        var submitButton = $('<button>');
        submitButton.addClass('button btn-dark col-3');
        submitButton.attr('type', 'button');
        submitButton.text('Save');

        hourBlock.append(hourHeader);
        hourLabel.append(hourText);
        hourLabel.append(submitButton);
        hourBlock.append(hourLabel);
        planner.append(hourBlock);

        // Set the class based on the current hour
        if (i < currentHourInt) {
            hourBlock.addClass('past');
        } else if (i === currentHourInt) {
            hourBlock.addClass('present');
        } else {
            hourBlock.addClass('future');
        }
    }
};





{/* <div class="container-fluid">
    <h1 class="text-center mb-4">24-Hour Planner</h1>

    <div class="d-flex align-items-center gap-3">
        <!-- Current Hour (Left Side) -->
        <p class="currentHour mb-0">Current Time: 12:00 PM</p>

        <!-- Sliders -->
        <section class="range-slider">
            <span class="rangeValues"></span>
            <input value="5" min="0" max="23" step="1" type="range">
            <input value="18" min="1" max="24" step="1" type="range">
        </section>

        <!-- Time and Date Inputs (Right Side) -->
        <div class="d-flex flex-column">
            <input type="time" class="form-control mb-2">
            <input type="date" class="form-control">
        </div>
    </div>
</div> */}
