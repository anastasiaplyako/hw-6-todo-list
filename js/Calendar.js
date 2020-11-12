export let dateDeadline = null;
$(function () {
    $('input[name="birthday"]').daterangepicker({
        autoUpdateInput: false,
        locale: {
            cancelLabel: 'Clear'
        },
        singleDatePicker: true,
        minYear: parseInt(moment().format('YYYY'), 10),

    });

    $('input[name="birthday"]').on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('MM/DD/YYYY'));
        dateDeadline = picker.startDate.format('MM/DD/YYYY');
        console.log("dateDeadline = ", dateDeadline)
        //alert("You are " + picker.startDate.format('MM/DD/YYYY') + " years old!");
    });

    $('input[name="birthday"]').on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
    });

});

