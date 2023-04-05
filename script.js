$(function () {
    // Add a listener for click events on the save button
    $('.saveBtn').on('click', function () {
        // Find the containing time-block element and its id
        var timeBlockId = $(this).closest('.time-block').attr('id');
        // Get the user input from the textarea element
        var userInput = $(this).siblings('.description').val();
        // Save the user input in local storage using the time block id as the key
        localStorage.setItem(timeBlockId, userInput);
    });

    // Add code to apply the past, present, or future class to each time block
    var currentHour = dayjs().hour();
    $('.time-block').each(function () {
        var timeBlockId = $(this).attr('id');
        var timeBlockHour = parseInt(timeBlockId.split('-')[1]);
        if (timeBlockHour < currentHour) {
            $(this).removeClass('present future').addClass('past');
        } else if (timeBlockHour === currentHour) {
            $(this).removeClass('past future').addClass('present');
        } else {
            $(this).removeClass('past present').addClass('future');
        }
    });

    // Get any user input that was saved in localStorage and set the values of the corresponding textarea elements
    $('.time-block').each(function () {
        var timeBlockId = $(this).attr('id');
        var userInput = localStorage.getItem(timeBlockId);
        $(this).children('.description').val(userInput);
    });

    // Display the current date in the header of the page
    const currentDay = dayjs().format('dddd, MMMM D, YYYY');
    $('#currentDay').text(currentDay);
});

