declare var $ :any;

export class dragNdrop {
    draggable(){
        $(function() {
            $("#dragdiv li").draggable({
                appendTo: "body",
                helper: "clone",
                cursor: "move",
                revert: "invalid"
            });
      
            initDroppable($(".dropdiv"));
            function initDroppable($elements) {
                $elements.droppable({
                    activeClass: "ui-state-default",
                    hoverClass: "ui-drop-hover",
                    accept: ":not(.ui-sortable-helper)",
      
                    over: function(event, ui) {
                        var $this = $(this);
                    },
                    drop: function(event, ui) {
                        var $this = $(this);
                        if ($this.val() == '') {
                            $this.val(ui.draggable.text());
                        } else {
                            $this.val($this.val() + " " + ui.draggable.text());
                        }
                    }
                });
            }
        });
    }
}