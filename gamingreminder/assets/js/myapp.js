// https://docs.djangoproject.com/en/dev/ref/csrf/#ajax
function getCookie(name) {
var cookieValue = null;
if (document.cookie && document.cookie != '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = jQuery.trim(cookies[i]);
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) == (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
        }
    }
}
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');
console.log(csrftoken);

//Ajax call
function csrfSafeMethod(method) {
// these HTTP methods do not require CSRF protection
return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
    crossDomain: false, // obviates need for sameOrigin test
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type)) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});
// End

var regionID = 0; // 0 = WorldWide / Default
var platformID = 0; // 0 = All / Default
var pageOffset = 0; // Dynamic offset / On scroll request new data
var ajaxFired = false;

$(document).on("click", ".region", function(e) {
    regionID = $(this).attr("title");
    $('#regionItems').collapse('hide');
    console.log("JQuery Click got region: " + regionID);
});

$(document).on("click", ".platform", function(e) {
    platformID = $(this).attr("title");
    $('#platformItems').collapse('hide');
    console.log("JQuery Click got platform: " + platformID);
});

// Offset always equal zero when filtering to new area or platform
$("#btnGo").click(function(){
    ajaxPost(platformID, regionID, 0);
});


// How to get
function ajaxPost(platformID, regionID, offset) {
    $.ajax({
        url: "/releases/",
        type: "POST",
        data: {
            'platformID': platformID,
            'regionID': regionID,
            'offset': offset
        },
        success: [
            function(data) {
                if (pageOffset == 0) {
                    $(".content").html(data);
                } else {
                    $(".content").append(data);
                    ajaxFired = false;
                }
            }
        ],
         error: [
             function(data){
                console.log("Error: " + eval(data));
                 ajaxFired = false;
              }
         ]
    });
}

/*
// Scroll request End
$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() == $(document).height()) {
       if (!ajaxFired) {
           pageOffset++;
           alert(pageOffset);
           ajaxPost(platformID, regionID, pageOffset);
       }
   }
});
*/





















