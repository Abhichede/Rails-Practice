/**
 * Created by abmiro on 10/2/17.
 */

var search_for_customer;
search_for_customer = function () {

    $("#customer-lookup-form").on('ajax:before', function (event, data, status) {
        $(".customer-error-msg").replaceWith("<div class='col-md-4 customer-error-msg'> </div>");
        show_spinner();
    });

    $("#customer-lookup-form").on('ajax:after', function (event, data, status) {
        hide_spinner();
    });

    $('#customer-lookup-form').on('ajax:success', function (event, data, status) {
        $('#customer-details').replaceWith("<div id='customer-details'> "+

        "<strong>Name: </strong> "+ data.name +
        "<br/><strong>Email: </strong> "+ data.email +
        "<br/><strong>Mobile: </strong> "+ data.contact +
        "<br/><strong>Address: </strong> "+ data.address +

        "</div>");
    });
    $('#customer-lookup-form').on('ajax:error', function (event, xhr, status, error) {
        $(".customer-error-msg").replaceWith("<div class='col-md-4 customer-error-msg'> " +
            "<strong>Not Found</strong></div>");
        show_spinner();

    });
}

$(document).ready(function () {
   search_for_customer();
});