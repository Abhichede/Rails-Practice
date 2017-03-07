/**
 * Created by abmiro on 4/2/17.
 */


var search_for_outwards;
var totalAmount = Number($("#total-amount").text());
var totalQuantity = Number($("#total-quantity").text());
var update_total_amount;
var update_total_quantity;

update_total_amount = function () {
    $("#total-amount").replaceWith("<span id='total-amount'>"+ totalAmount +"</span>");
}
update_total_quantity = function () {
    $("#total-quantity").replaceWith("<span id='total-quantity'>"+ totalQuantity +"</span>");
}


search_for_outwards = function () {

    $("#outward-lookup-form").on('ajax:before', function (event, data, status) {
        $(".error-msg").replaceWith("<div class='col-md-4 error-msg'> </div>");
        show_spinner();
    });

    $("#outward-lookup-form").on('ajax:after', function (event, data, status) {
        hide_spinner();
    });

    $('#outward-lookup-form').on('ajax:success', function (event, data, status) {

        var flag = 0;
        var fSerialNo = "";

        $("table.outwards-table tr:gt(0)").each(function () {

            this_row = $(this);//.find('tr');

            fSerialNo = $.trim(this_row.find('td:eq(0)').html());
            var fQuantity = Number($.trim(this_row.find('td:eq(3)').html()));
            var fTradeName = $.trim(this_row.find('td:eq(1)').html());
            var fRate = Number($.trim(this_row.find('td:eq(2)').html()));

            if (data.serial_no == fSerialNo) {

                fQuantity = fQuantity + 1;
                var fVat = fQuantity * fRate;
                flag = 1;
                this_row.replaceWith("<tr id='data-row'> " +
                    " <td id='serial-no'>" + fSerialNo + "</td> " +
                    " <td>" + fTradeName + "</td> " +
                    " <td>" + fRate + "</td> " +
                    " <td>" + fQuantity + "</td> " +
                    " <td>" + fVat + "</td>" +
                    " <td> <button class='btn btn-xs btn-danger' " +
                    "id='btn-delete-single-entry'><i class='fa fa-minus'></i></button> " +
                    " <button class='btn btn-xs btn-danger' " +
                    " id='btn-delete-row'><i class='fa fa-times'></i></button> </td> " +
                    " </tr>");

                totalAmount = totalAmount + fRate;
                totalQuantity = totalQuantity + 1;
            }
        });

        if (flag != 1){


            $('#sales-table').append("<tr id='data-row'> " +
                " <td id='serial-no'>" + data.serial_no + "</td> " +
                " <td>" + data.trade_name + "</td> " +
                " <td>" + data.rate + "</td> " +
                " <td>" + 1 + "</td> " +
                " <td>"+ (data.rate * 1) +"</td> " +
                " <td> <button class='btn btn-xs btn-danger' " +
                "id='btn-delete-single-entry'><i class='fa fa-minus'></i></button> " +
                " <button class='btn btn-xs btn-danger' " +
                " id='btn-delete-row'><i class='fa fa-times'></i></button> </td> " +
                " </tr>");

            totalAmount = totalAmount + data.rate;
            totalQuantity = totalQuantity + 1;
        }

        update_total_amount();
        update_total_quantity();
        hide_spinner();
    });
    $('#outward-lookup-form').on('ajax:error', function (event, xhr, status, error) {
        $(".error-msg").replaceWith("<div class='col-md-4 error-msg'> " +
            "<strong>Not Found</strong></div>");
        show_spinner();

    });
}

$(document).ready(function () {
    search_for_outwards();

    $(document).on('click', 'button#btn-delete-row', function () { // <-- changes

            var rQuantity = Number($(this).closest('tr').find('td:eq(3)').html());
            var rAmount = Number($(this).closest('tr').find('td:eq(4)').html());

            totalQuantity = totalQuantity - rQuantity;
            totalAmount = totalAmount - rAmount;

            update_total_quantity();
            update_total_amount();

            $(this).closest('tr').remove();
            return false;
    });
    $(document).on('click', 'button#btn-delete-single-entry', function () {
        var rRate = Number($(this).closest('tr').find('td:eq(2)').html());
        var rQuantity = Number($(this).closest('tr').find('td:eq(3)').html());
        var rAmount = Number($(this).closest('tr').find('td:eq(4)').html());

        if( rQuantity > 1) {

            $(this).closest('tr').find('td:eq(3)').replaceWith("<td>" + (rQuantity - 1) + "</td>");
            $(this).closest('tr').find('td:eq(4)').replaceWith("<td>" + (rAmount - rRate) + "</td>");

        }else{
            $(this).closest('tr').remove();
        }

        totalQuantity = totalQuantity - 1;
        totalAmount = totalAmount - rRate;


        update_total_quantity();
        update_total_amount();
    });

   /* $(document).on('click', '.click-here', function () {

        $("tbody#final-data-body tr").each(function () {
            $(this).remove();
        });

        $("table.outwards-table tr:gt(0)").each(function () {


                this_row = $(this);//.find('tr');

                var fSerialNo = $.trim(this_row.find('td:eq(0)').html());
                var fQuantity = Number($.trim(this_row.find('td:eq(3)').html()));
                var fTradeName = $.trim(this_row.find('td:eq(1)').html());
                var fRate = Number($.trim(this_row.find('td:eq(2)').html()));
                var fAmount = $.trim(this_row.find('td:eq(4)').html());

                $("#final-data-body").append("<tr> " +
                    " <td>" + fSerialNo + "</td> " +
                    " <td>" + fTradeName + "</td> " +
                    " <td>" + fRate + "</td> " +
                    " <td>" + fQuantity + "</td> " +
                    " <td>" + fAmount + "</td> " +
                    " </tr>");
            });
        return true;
    }); */
});