$(function () {
    //strike-through functionallity(with 'onclick' because the li is dynamic(it will be created later))
    $('ul').on('click', 'li', function () {
        $(this).toggleClass('done');
    });
    //delete
    $('ul').on('click', 'span', function (event) {
        //stopping the other function on click
        event.stopPropagation();

        $(this).parent().fadeOut(200, function () {
            $(this).remove();
        });
    });
    //add
    $('input').keypress(function (event) {
        if (event.which === 13) {
            let task = $('input').val();
            if (task) {
                $('ul').append('<li><span class="delete"><i class="fas fa-trash-alt"></i></span>' + task + '</li>');
            }
            else {
                alert("Write a task")
            }
            $('input').val('');
        }
    })
    //toggle the input form(with 'click' because the element is static(created in html))
    $('#plus').click(function () {
        $('input').fadeToggle();
    });
});