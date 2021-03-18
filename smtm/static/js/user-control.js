var use_server_ip = location.hostname;
var use_server_port = 8080;

$('#user-login').submit(function(event) {
    let xhr;
    let _orgAjax = jQuery.ajaxSettings.xhr;
    jQuery.ajaxSettings.xhr = function() {
        xhr = _orgAjax();
        return xhr;
    };
    let user_data = new FormData($('form').get(0));
    let req = $.ajax({
        url: $(this).attr('action'),
        type: $(this).attr('method'),
        data: user_data,
        cache: false,
        processData: false,
        contentType: false,
    });

    if (req.status == 200) {
        var rdt_url = xhr.responseURL;
        var rdt_url = rdt_url.split('/');
        var rdt_url = rdt_url[rdt_url.length - 1];
        if (rdt_url == 'index') {
            console.log('login success');
        }
        if (rdt_url == 'returnlogin') {
            console.log('login fail');
        }
    }
})
