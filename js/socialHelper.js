$(function () {

    function CountCommentsOnUrl(url, success , error) {
        var soapEnv =
            "<soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'> \
              <soap:Body>    \
                    <CountCommentsOnUrl xmlns='http://microsoft.com/webservices/SharePointPortalServer/SocialDataService'> \
                                <url>" + url + "</url> \
                     </CountCommentsOnUrl> \
              </soap:Body> \
         </soap:Envelope>";

        $.ajax({
            pageurl: url,
            url: "/_vti_bin/SocialDataService.asmx?op=CountCommentsOnUrl",
            type: "POST",
            dataType: "xml",
            data: soapEnv,
            contentType: "text/xml; charset=\"utf-8\"",
            success: function (data) {
                success($(data).find('CountCommentsOnUrlResult').text());
            },
            error: function (data)
            {
                error(data)
            }
        });
    }
   
    var socialHelper = {
        getCommentsCount: function (url, success, error) {
            CountCommentsOnUrl(url, success, error)
        }
    }

    window.socialHelper = socialHelper
});