const BASE_URL = 'https://flask-wol-api.herokuapp.com/wol';

function errorHandler(obj) {
    $('#messages').text("")
    JSON.parse(obj.responseText).message.forEach(element => {
        $('#messages').append("<p class='error'>"+element+"</p>")
    });
}

function successHandler(obj) {
    $('#messages').text("")
    JSON.parse(obj).message.forEach(element => {
        $('#messages').append("<p class='success'>"+element+"</p>")
    });
}

$(document).ready(function() {
    $('main').css('margin-top', $('header').height() + 'px');
    console.log($('header').height())

    $('#classic-wol-form').submit(function(event) {
        event.preventDefault();
        data = {
            'mac-address': $(this).find('input[name="mac-address"]').val(),
            'ip-or-hostname': $(this).find('input[name="ip-or-hostname"]').val(),
            'port': $(this).find('input[name="port"]').val(),
            'secureon': CryptoJS.SHA1($(this).find('input[name="secureon"]').val()).toString().substring(0, 6),
        };
        console.log(data.secureon)
        $.ajax({
            type: "POST",
            url: `${BASE_URL}/wake`,
            data: data,
            success: successHandler,
            error: errorHandler,
        })
    })

    $('#preset-wol-form').submit(function(event) {
        event.preventDefault();
        data = {
            'name': $(this).find('input[name="name"]').val(),
            'secureon': CryptoJS.SHA1($(this).find('input[name="secureon"]').val()).toString().substring(0, 6),
        };
        console.log(data.secureon)
        $.ajax({
            type: "POST",
            url: `${BASE_URL}/wakepreset`,
            data: data,
            success: successHandler,
            error: errorHandler,
        })
    })

    $('#create-preset-form').submit(function(event) {
        event.preventDefault();
        data = {
            'name': $(this).find('input[name="name"]').val(),
            'mac-address': $(this).find('input[name="mac-address"]').val(),
            'ip-or-hostname': $(this).find('input[name="ip-or-hostname"]').val(),
            'port': $(this).find('input[name="port"]').val(),
            'secureon': CryptoJS.SHA1($(this).find('input[name="secureon"]').val()).toString().substring(0, 6),
        };
        console.log(data.secureon)
        $.ajax({
            type: "POST",
            url: `${BASE_URL}/add`,
            data: data,
            success: successHandler,
            error: errorHandler,
        })
    })
})