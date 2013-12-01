var myScroll;
function loaded() {
    myScroll = new iScroll('wrapper', {zoom: true});
    myScroll.options.onBeforeScrollStart = function(e) {
        var target = e.target;

        while (target.nodeType != 1) target = target.parentNode;
        if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA'){
            e.preventDefault();
            return true;
        }
    }
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);




var serverUrl = "http://localhost:8080/SecureYourGroovyScript";
//var serverUrl = "http://dslprez.cloudfoundry.com";
//var serverUrl = "http://vast-escarpment-3640.herokuapp.com";
function submitForm(input, output) {
    var url = serverUrl + "/console/execute?=";
    $.post(url, {
        content : input
    }, function(data) {
        var value = "";
        if (data.stacktrace === "" || data.stacktrace.buffer !== undefined) {
            value = data.result;
        } else {
            value = data.stacktrace;
        }
        $(output).text(value);
        $('#next').click();
    });
}

var editor10 = new dslPrez.editor("editor10");
function editor10TurtleSend() {
    var value = editor10.getValue();
    value += "import groovy.lang.Script;\nimport org.codehaus.groovy.control.CompilerConfiguration\n";
    value += "import org.codehaus.groovy.control.customizers.ASTTransformationCustomizer;\nimport groovy.transform.TypeChecked\n";
    value += "import groovy.transform.TimedInterrupt;\nimport org.codehaus.groovy.control.customizers.SecureASTCustomizer\n"
    submitForm(value, "#output10");
}


var keymap10 = {
    "Ctrl-S": editor10TurtleSend,
    "Cmd-S": editor10TurtleSend
};
editor10.addKeyMap(keymap10);




