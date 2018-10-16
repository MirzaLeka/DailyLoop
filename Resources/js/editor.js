// Move caret back to 
function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
      var range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
      var textRange = document.body.createTextRange();
      textRange.moveToElementText(el);
      textRange.collapse(false);
      textRange.select();
    }
  }
  
  // Clean HTML tags using sanitize-html
  function cleanHtml() {  
    let value = $("#editor").html();
    let clean = sanitizeHtml(value, {
      allowedTags: ['div', 'blockquote', 'b', 'strong', 'i', 'em', 'ul', 'ol', 'li'],
      allowedAttributes: {
        'blockquote': ['style']
      }
    });
  
    let cleanValue = clean.trim();  
    setContent();
  }
  
  // Paste from MS Word    *CREDIT: https://gist.github.com/sbrin/6801034
  (function($) {
      $.fn.msword_html_filter = function(options) {
        let settings = $.extend( {}, options);
  
        function word_filter(editor){
          let content = editor.html();
  
          // Word comments like conditional comments etc
          content = content.replace(/<!--[\s\S]+?-->/gi, '');
  
          // Remove comments, scripts (e.g., msoShowComment), XML tag, VML content,
          // MS Office namespaced tags, and a few other tags
          content = content.replace(/<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|img|meta|link|style|\w:\w+)(?=[\s\/>]))[^>]*>/gi, '');
  
          // Convert <s> into <strike> for line-though
          content = content.replace(/<(\/?)s>/gi, "<$1strike>");
  
          // Replace nbsp entites to char since it's easier to handle
          //content = content.replace(/&nbsp;/gi, "\u00a0");
          content = content.replace(/&nbsp;/gi, ' ');
  
          // Convert <span style="mso-spacerun:yes">___</span> to string of alternating
          // breaking/non-breaking spaces of same length
          content = content.replace(/<span\s+style\s*=\s*"\s*mso-spacerun\s*:\s*yes\s*;?\s*"\s*>([\s\u00a0]*)<\/span>/gi, function(str, spaces) {
            return (spaces.length > 0) ? spaces.replace(/./, " ").slice(Math.floor(spaces.length/2)).split("").join("\u00a0") : '';
          });
  
          editor.html(content);
  
          // Parse out list indent level for lists
          $('p', editor).each(function(){
            let str = $(this).attr('style');
            let matches = /mso-list:\w+ \w+([0-9]+)/.exec(str);
            if (matches) {
              $(this).data('_listLevel',  parseInt(matches[1], 10));
            }
          });
  
          // Parse Lists
          let last_level=0;
          let pnt = null;
          $('p', editor).each(function(){
              let cur_level = $(this).data('_listLevel');
              if(cur_level != undefined){
                  let txt = $(this).text();
                  let list_tag = '<ul></ul>';
                  if (/^\s*\w+\./.test(txt)) {
                      let matches = /([0-9])\./.exec(txt);
                      if (matches) {
                          let start = parseInt(matches[1], 10);
                          list_tag = start>1 ? '<ol start="' + start + '"></ol>' : '<ol></ol>';
                      }else{
                          list_tag = '<ol></ol>';
                      }
                  }
  
                  if(cur_level>last_level){
                    if(last_level==0){
                      $(this).before(list_tag);
                      pnt = $(this).prev();
                    }else{
                      pnt = $(list_tag).appendTo(pnt);
                    }
                  }
                  if(cur_level<last_level){
                    for(let i=0; i<last_level-cur_level; i++){
                      pnt = pnt.parent();
                    }
                  }
                  $('span:first', this).remove();
                  pnt.append('<li>' + $(this).html().replace(/\d+\./g, '') + '</li>')
                  $('b:empty').remove();
                  $(this).remove();
                  last_level = cur_level;
              }else{
                  last_level = 0;
              }
          })
  
          $('[style]', editor).removeAttr('style');
          $('[align]', editor).removeAttr('align');
          $('span', editor).replaceWith(function() {return $(this).contents();});
          $('span:empty', editor).remove();
          $("[class^='Mso']", editor).removeAttr('class');
          $('p:empty', editor).remove();
        }
  
        return this.each(function() {
          let self = this;
          $(self).on('keyup paste', function(){
            
            setTimeout(function() {
               let content = $(self).html();
              (/class="?Mso|style="[^"]*\bmso-|style='[^'']*\bmso-|w:WordDocument/i.test( content )) ? word_filter( $(self) ) : cleanHtml();
            }, 400);           
          });
        });
      };
  })( jQuery )
  
  
  $(function(){  
    $('#editor').msword_html_filter(); 
  })
  
  function setContent() {
    let value = $(this).html();
    
    let el = $("#editor").get(0);
    placeCaretAtEnd(el);
  }
  
  
  //### EVENTS/ACTIONS ###//
  
  //execCommand(aCommandName, aShowDefaultUI, aValueArgument)
  function runCommand(el, commandName, arg) {  
    if (commandName === "createLink") {
      let argument = prompt("Insert link:");
      document.execCommand(commandName, false, argument);
    }else {    
      document.execCommand(commandName, false, arg);
    }  
    $("#editor").focus();
    return false;
  }
  
  // Capture wysiwyg val and assign to textarea val
  // $("#editor").keyup(function() {
  //   let value = $(this).html();
  //   $("#messageText").val(value);  
  // });
  
  // Show submitted data
  $('#submit').click(function(e) {
    e.preventDefault();
    let content = $("#editor").html().trim();
    alert("VALUE SUBMITTED: \n" + content);  
  });