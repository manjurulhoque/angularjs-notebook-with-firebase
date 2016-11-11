$(function () {
    $('.fa').on('click', function () {
        var effect = $(this).data('effect');
        $(this).closest('.single')[effect]();
    })
});
