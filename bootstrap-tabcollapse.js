!function ($) {

    "use strict";

    function accordionGroupTemplate(parentId, $heading){
        var tabSelector = $heading.attr('data-target'),
            active = $heading.parent().is('.active');

        if (!tabSelector) {
            tabSelector = $heading.attr('href');
            tabSelector = tabSelector && tabSelector.replace(/.*(?=#[^\s]*$)/, ''); //strip for ie7
        }

        var $tabContent = $(tabSelector),
            groupId = $tabContent.attr('id') + '-collapse';


        return '<div class="accordion-group">' +
            '   <div class="accordion-heading">' +
            '       <a class="accordion-toggle" data-toggle="collapse" data-parent="#' + parentId + '" href="#' + groupId + '">' +
            '           ' + $heading.html() +
            '       </a>' +
            '   </div>' +
            '   <div id="' + groupId + '" class="accordion-body collapse ' + (active ? 'in' : '') + '">' +
            '       <div class="accordion-inner">' +
            '           ' + $tabContent.html() +
            '       </div>' +
            '   </div>' +
            '</div>';
    }

    function accordionTemplate(id, $headings){
        var accordionTemplate = '<div class="accordion visible-phone" id="' + id +'">';
        $headings.each(function(){
            var $heading = $(this);
            accordionTemplate += accordionGroupTemplate(id, $heading);
        });
        accordionTemplate += '</div>';
        return accordionTemplate;
    }


    /* TAB-COLLAPSE PLUGIN DEFINITION
     * ===================== */

    $.fn.tabCollapse = function ( option ) {
        return this.each(function () {
            var $this = $(this),
                $headings =  $this.find('li:not(.dropdown) [data-toggle="tab"], li:not(.dropdown) [data-toggle="pill"]');
            var accordionHtml = accordionTemplate($this.attr('id') + '-accordion', $headings);
            $('.container').append(accordionHtml);
            $this.addClass('hidden-phone');
            $this.find('+ .tab-content').addClass('hidden-phone');
        })
    };

}(window.jQuery);