function formReset() {
    $('title').text('Доска объявлений');
    $('form').each(function () {this.reset()});
    $('input[type=submit]').val('Подать объявление');
}

function showExp(exp) {
    $('input[name=id]').val(exp.id);
    var show = $('input[name=id]').val();
    $('form .clear_form').each(function () {
        var name = $(this).attr('name');
        $(this).val(exp[name]);
    });
    $('form input.price').val(exp.price);
    $('form input.set_form, form select.set_form').val([
        exp.private,
        exp.allow_mails,
        exp.location_id,
    ]);
    $('select[name=category_id]').val(exp.category_id);
    // присвоение чеков и селектов
    $('input[type=submit]').val('Изменить объявление');
    $('input[type=submit]').attr('formaction', 'index.php?id=' + show);
    $('title').text('Объявление - ' + exp.title);
}

function show_alert(status, text) {
    switch (status) {
        case 'success':
            $('#container').removeClass('alert-danger').addClass('alert-success');
            break;
        case 'error':
            $('#container').removeClass('alert-success').addClass('alert-danger');
            break;
    }
    $('#container-info').html(text);
    $('#container').fadeIn('slow');
}

function click_Del(btn) {
    var tr = $(btn).closest('tr');
    var id = tr.attr('data-id');
    var show = $('input[name=id]').val();
    $.getJSON('ajax.php?delete=' + id,
            function (response) {
                var text = response.message;
                if (response.status == 'success') {
                    tr.fadeOut('slow', function () {

                        if (id == show) {
                            formReset();
                            show = '';
                        }
                        $(this).remove();
                        if ($('tbody tr').html() == null) {
                            $('#board').hide('slow');
                            $('#alert_board').show('slow', function () {
                            })
                        }
                    });
                }
                show_alert(response.status, text);
            }
    );
}

function click_Show(exp) {
    var tr = $(exp).closest('tr');
    var id = tr.attr('data-id');
    $.getJSON('ajax.php?show=' + id,
            function (response) {
                formReset();
                showExp(response);
            });
}

function addExpOnTable(place, row, new_exp) {
    if (new_exp) {
        place.prepend(row);
        var tr = $(place).find('tr');
    } else {
        place.before(row);
        var tr = $(place).prev(place);
    }
    tr.fadeIn('fast');
}

$('tbody').on('click', 'a[name=show]', function () {
    click_Show(this);
});

$('tbody').on('click', 'a[name=delete]', function () {
    click_Del(this);
});

$(document).ready(function () {
    if ($('tbody tr').html() == null) {
        $('#board').hide();
        $('#alert_board').show();
    }

    $('input.cancel').on('click', function () {
        formReset();
    });

    function showResponse(response) {
        if (response.status == 'success') {
            var row = $(response.row);
            row.attr('style', 'display: none');
            row.attr('data-id', response.id);
            if (!response.newExp) {
                var tr = $('tbody tr[data-id=' + response.id + ']');
                tr.fadeOut('fast', function () {
                    addExpOnTable(tr, row, false);
                    tr.remove();
                });
            } else {
                var tr = $('tbody');
                addExpOnTable(tr, row, true);
                $('#board').show('slow');
                $('#alert_board').hide('slow');
            }
        }
        show_alert(response.status, response.message);
    }
    var options = {
        //target: '#container-info', // target element(s) to be updated with server response 
        //beforeSubmit:  showRequest,  // pre-submit callback 
        success: showResponse, // post-submit callback 

        // other available options: 
        url: 'ajax.php?add=1', // override for form's 'action' attribute 
        //type:      type        // 'get' or 'post', override for form's 'method' attribute 
        dataType: 'json', // 'xml', 'script', or 'json' (expected server response type) 
        //clearForm: true, // clear all form fields after successful submit 
        resetForm: true, // reset the form after successful submit 

        // $.ajax options can be used here too, for example: 
        //timeout:   3000 
    };

    // bind form using 'ajaxForm' 
    $('form.form-horizontal').ajaxForm(options);
});


