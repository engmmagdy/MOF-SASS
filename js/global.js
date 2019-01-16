$(function () {

    //attach the search handler 
    $('.globalsearchbox').keypress(function (evt) {
        var keyCode =  String.fromCharCode(evt.keyCode);
        if (keyCode === '\r' || keyCode === '\n') {
            document.location = 'Search.aspx' + "#k=" + $(this).val();
            return false;
        }

    })
    
})