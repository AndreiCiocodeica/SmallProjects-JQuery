$('#add-btn').on('click', function () {
    let val = $('input').val();
    if (val !== '') {
        //create new li element
        var newElem = $('<li></li>').text(val);
        //append li element a button X
        $(newElem).append('<button class="remove-btn">X</button>');
        //append li to ol list
        $('#my-list').append(newElem);
        //clear input
        $('input').val('');
        //add event to new added remove btn
        $('.remove-btn').on('click', function () {
            $(this).parent().remove();
        });
    }
});

