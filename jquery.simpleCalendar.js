///////////////////////////////////////////////////////////////////////////////////////////
// Simple Calendar 1.0
// Version 1.0
// @requires jQuery v1.4.2
// 
// Copyright (c) 2011 Mark Ashley Bell
// Examples and docs at: http://markashleybell.com/jquery/jquery.simplecalendar.html
// 
// Dual licensed under the MIT and GPL licenses:
// http://www.opensource.org/licenses/mit-license.php
// http://www.gnu.org/licenses/gpl.html
///////////////////////////////////////////////////////////////////////////////////////////

(function ($) {

    function simpleCalendar(el, params) {

        var thisid = 0;
        var now = new Date();
        var thismonth = now.getMonth();
        var thisyear = now.getYear() + 1900;

        var opts = {
            id: thisid,
            month: thismonth,
            year: thisyear,
            dayClick: function () {
                alert('hello');
            }
        };

        if (params) $.extend(opts, params);

        id = parseInt(opts.id);
        month = parseInt(opts.month);
        year = parseInt(opts.year);

        var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
        var dayslong = new Array("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday");
        var daysshort = new Array("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun");

        var d = new Date();
        d.setYear(year);
        d.setDate(1);
        d.setMonth(month);

        var output = new Array();

        output.push("<table>\n");
        output.push("<colgroup>\n");
        output.push("<col id=\"MO\" />\n");
        output.push("<col id=\"TU\" />\n");
        output.push("<col id=\"WE\" />\n");
        output.push("<col id=\"TH\" />\n");
        output.push("<col id=\"FR\" />\n");
        output.push("<col id=\"SA\" />\n");
        output.push("<col id=\"SU\" />\n");
        output.push("</colgroup>\n");
        output.push("<tr>\n");
        output.push("<th colspan=\"7\" class=\"monthname\">" + months[d.getMonth()] + " " + year + "</th>\n");
        output.push("</tr>\n");

        output.push("<tr>\n");

        for (var x = 0; x < 7; x++)
            output.push("<th>" + daysshort[x] + "</th>\n");

        output.push("</tr>\n");

        var firstday = ((d.getDay() - 1) < 0) ? 6 : (d.getDay() - 1);
        var lastdate = getDaysInMonth(month, year);
        var cell = 0;
        var day = 1;

        var rows = new Array();
        var row = new Array();
        var rowcount = 1;

        while (cell < firstday) { row.push("<td>&nbsp;</td>"); cell++; }

        row.push("<td><a id=\"d" + year + "-" + (month + 1) + "-" + day + "\">" + (day++) + "</a></td>");
        cell++;

        while (cell < 7) { row.push("<td><a id=\"d" + year + "-" + (month + 1) + "-" + day + "\">" + (day++) + "</a></td>"); cell++; }

        rows.push(row.join(""));
        row.length = 0;
        cell = 0;

        while (day <= lastdate) {

            while (cell < 7) { row.push(((day <= lastdate) ? "<td><a id=\"d" + year + "-" + (month + 1) + "-" + day + "\">" + day + "</a></td>" : "<td>&nbsp;</td>")); day++; cell++; }
            rows.push(row.join(""));

            rowcount++;
            row.length = 0;
            cell = 0;

        }

        if (rowcount == 5) {

            row.length = 0;

            for (var x = 0; x < 7; x++)
                row.push("<td>&nbsp;</td>");

            rows.push(row.join(""));

        }

        output.push("<tr>" + rows.join("</tr>\n<tr>") + "</tr>\n");

        output.push("</table>\n");

        el.html(output.join(""));

        $('#' + el.attr('id') + ' td a').bind('click', opts.dayClick);
    }

    function getDaysInMonth(month, year) {

        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if ((month == 1) && (year % 4 == 0) && ((year % 100 != 0) || (year % 400 == 0)))
            return 29;
        else
            return daysInMonth[month];

    }

    // jQuery plugin initialisation
    $.fn.simpleCalendar = function (params) {

        simpleCalendar(this, params);
        return this;

    };

})(jQuery);