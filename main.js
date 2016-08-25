'use strict';

// Pre-defined templates here that override default Neptun classes
let topNav = '<nav class="navbar navbar-default navbar-fixed-top custom-navbar"> \
  <div class="container-fluid"> \
    <div class="navbar-header"> \
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1" aria-expanded="false"> \
        <span class="sr-only">Toggle navigation</span> \
        <span class="icon-bar"></span> \
        <span class="icon-bar"></span> \
        <span class="icon-bar"></span> \
      </button> \
      <a class="navbar-brand" href="/main.aspx">Neptun</a> \
    </div> \
    <div class="collapse navbar-collapse" id="navbar-collapse-1"> \
      <ul class="nav navbar-nav" id="menuAnchor"> \
      </ul> \
      <ul class="nav navbar-nav navbar-right"> \
        <li class="dropdown"> \
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">*BS* <span class="caret"></span></a> \
          <ul class="dropdown-menu"> \
            <li><a href="#" data-toggle="modal" data-target="#userInfo">Saját info</a></li> \
            <li><a href="javascript:__doPostBack(\'upChooser$btnKollab\',\'\')">Neptun Meet Street</a></li> \
            <li><a href="#">Something else here</a></li> \
            <li role="separator" class="divider"></li> \
            <li><a href="help/Help.aspx?dic=Hallgatoi&help=c_messages_hu" target="_blank">Súgó</a></li> \
            <li><a href="main.aspx?ctrl=sitemap" target="_blank">Oldaltérkép (úgyse nyitod meg soha)</a></li> \
            <li><a href="help/hweb_hu.pdf" target="_blank">Segítség (200 oldalas felhasználói doc ami semmire nem jó)</a></li> \
            <li role="separator" class="divider"></li> \
            <li><a onclick="DoLogOut(-1);return false;" id="lbtnQuit" title="Kijelentkezés" href="javascript:__doPostBack(\'lbtnQuit\',\'\')">Kijelentkezés</a></li> \
          </ul> \
        </li> \
      </ul> \
    </div> \
  </div> \
</nav>';

let userInfoModal = '<!-- User Info Modal --> \
<div class="modal fade" id="userInfo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"> \
  <div class="modal-dialog" role="document"> \
    <div class="modal-content"> \
      <div class="modal-header"> \
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> \
        <h4 class="modal-title" id="myModalLabel">Modal title</h4> \
      </div> \
      <div class="modal-body" id="userInfoModalBody"> \
      </div> \
      <div class="modal-footer"> \
        <button type="button" class="btn btn-default" data-dismiss="modal">OK</button> \
      </div> \
    </div> \
  </div> \
</div>'
// Neptun Meet Street URL: <a id="upChooser_btnKollab" title="Neptun Meet Street" href="javascript:__doPostBack('upChooser$btnKollab','')">Neptun Meet Street</a>
// Neptun main link: <a id="upChooser_btnNeptun" title="Tanulmányi rendszer" href="javascript:__doPostBack('upChooser$btnNeptun','')">Tanulmányi rendszer</a>
// Logout link: <a onclick="DoLogOut(-1);return false;" id="lbtnQuit" title="Kijelentkezés" href="javascript:__doPostBack('lbtnQuit','')">Kijelentkezés</a>
window.onload = function() {
    if (window.jQuery) {
        // jQuery is loaded
        $('title').text('NeptunFTW')
        $('body').append(userInfoModal)
        $('body').prepend(topNav)
        $('.main_table').remove()
        let myInfo = $('#mainPageHeader').html()
        $('#mainPageHeader').remove()
        $('#userInfoModalBody').append(myInfo)

        // Loop through original menubar dropdowns
        $('#mb1 > li').each(function(i) {
          let id = $(this).attr('id')
          let innerText = document.getElementById(id).childNodes[0].nodeValue

          // Also create a JSON array of the internal li elements (dropdown items)
          let subElements = []
          $('#' + id + ' li').each(function(ii) {
            subElements.push({
              id: $(this).attr('id'),
              href: $(this).attr('targeturl'),
              text: $(this).text()
            })
          })

          // Check if the function above worked:
          // console.log(
          //   innerText,
          //   subElements
          // )

          // Add elements to menu (as a dropdown)
          let subMenuString = ''
          for (i = 0; i < subElements.length; i++) {
            let el = subElements[i]
            subMenuString += '<li><a href="' + el.href + '" id="' + el.id + '">' + el.text + '</a></li>'
          }

          let preparedElement = ' \
          <li class="dropdown"> \
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" id="' + id + '">' + innerText + ' <span class="caret"></span></a> \
            <ul class="dropdown-menu"> \
              ' + subMenuString + ' \
            </ul> \
          </li> \
          '
          $('#menuAnchor').append(preparedElement)
        })
        // Delete original menu 'thing'
        $('.top_menu_wrapper').remove()
        // This is some disturbing piece of s.:
        $('#panCloseHeader').remove()
        // Found an other thing that makes no sense at all and looks ugly as f.
        $('.footer_table').remove()

        // Make neptun great again!
        if($('#upBoxes_upRSS .GadgetHeaderPanelTitle span').text() == 'Aktualitások') {
          // Who uses "Aktualitások" ever?
          $('#upBoxes_upRSS .GadgetHeaderPanelTitle span').text('Hírek')
        }

        // Who said you can't have some fun?
        let giphyTags = ['fail', 'cat', 'funny', 'fun', 'wtf', 'sexy']
        let randomGifTag = giphyTags[Math.floor(Math.random() * giphyTags.length)];
        $.get('https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + randomGifTag, function(data) {
          console.log(data)
          $('.newsTable .TitleLeft span').text('Ezt a részt úgyse olvasod el soha')
          $('.newsTable > tbody tr:nth-child(2)').html('Ha mégis, akkor itt egy GIF:<br><img style="width: 200px;margin-left: auto;margin-right: auto; margin-top: 10px;margin-bottom: 10px;" src="' + data.data.image_url + '" />\
          <a href="https://github.com/">NeptunFTW</a> made by <a href="https://facebook.com/noxowe" target="_blank">#laszlo</a>')
        })

        $('.calendar .TodayDay').removeAttr('style')
        $('.calendar .TodayDay').attr('style', 'border: solid 1px #eeeeee !important;');

        $('.ExpandedImage').attr('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAHQklEQVR4Xu2dZ6hcRRiGn9hiiS2iGBsmIoqJKKJGEEGNvWBvWFFRLKigYsMYsaOoqIgtIsauiAa7IqioIHYRK2Lv2HvnNQNJbrI739m7Z3O+M9/8uT/uN7Mz7/vs7JyZOTMjiFS0AiOKbn00ngCgcAgCgACgcAUKb370AAFA4QoU3vzoAQKAwhUovPnRAwQAhStQePOjBwgACleg8OZHDxAAFK5A4c2PHiAAKFyBwpsfPUAAULgChTc/eoAAoHAFCm9+9AABQOEKFN786AECgMIV6E/zRwK3APcA0/pT5GBKiR5g+DqPAqYDmwH/AscAVwy/2MGUEAAMT+dlgAeBDYYUMxk4a3hFDyZ3ANC7zisAjwDjOxRxCXB86hV6/5SacwYAvQk8DngMGJvJfi1wWG8fMZhcAUB1nSekb/6YTNY/gH2Au6t/xOByBADVtJ4IPACMzmT7GdgFeLRa8YOPDgDsmk9Kj3ka9XdL3wLbA8/ai553kQGATfudgdsAPe93S58DWwGv2Yqd91EBQN6DA4GpwPyZ0PeBLYF380U2JyIA6O6FJnUuhew5Cm8k8z9pjrW2mgQAnXU6A5hikPF5YFvga0Ns40ICgDktkSaaxDnW4NYTwI7Aj4bYRoYEALPbot/564CDDG7dB+wB/GaIbWxIADDTGo3wb03P7znDbk6Q/JULbPr/A4AZDi2WnvG3MBh2JXB00+f4De34PyQAgKXT7N5GBtHOBU4zxLkJKR2A5dO8/toGx04ELjLEuQopGYBV04reahnH/gEOT4NDV+ZaKlsqAGulhRqt6XdLWtHbD7jTIqbHmBIBWB94CNBunm7pF2BX4GGPxlrrXBoAm6b9e4tnBPo+reg9bRXSa1xJAGjG7g5g4YxZXwJbAy97NbVKvUsBYF/gBmCBjDgfpkWdt6uI6Dm2BACOAi43zHm8lcz/yLOhVevedgA0aXO2QZSXUrf/lSG2VSFtBkCTNtqWnUtPpRU9DfyKS20EYD7gGuAQg5t6qWM34FdDbCtD2gbAQoBW6nY3uHU7sD/wpyG2tSFtAmDRtAdfj3C5pB7iCEDTvEWntgCwFKANGhsb3LwAONkQV0RIGwBYLq3orWNw7BTgfENcMSHeAVglreitnnFMXb3mA64qxlljQz0DsGZa0Vsp01YN8g5IL3YYZSknzCsA66UVvWUzVunxTk8Eep8v0lwU8AjAJmnAt0TG0R/SBM+T4XxnBbwBsB1wF7BIxlS9pKHHwRfD/O4KeAJgb+BGYMGMqR+nRZ03w/y8Al4A0J48bcfWNG+39E4y/4N80yNCCngAQJM25xnseiV1+18YYiMkKeABgJOMkzevpnfzA4AKeHsAQM2Jn4AKplYJ9QKA2hSDwCrOGmM9AaAmVXkM3AZ4wahDsWHeAJBRMRHUR1w9AqDmV5kK1jv89/dRs1YV5RUAmbBGWgxaOeNILAZ1EcgzAGpWleXgI4GrW/X17UNjvAMgCbQhRO/vrWvQIzaEDBGpDQCoSUum3/nYEmb4Fswa0hYA1KYqm0L1U6CfhNgUWhGYpodrW/hN6fSuXF119Kt2CsW28JxSzv6vFUN9ww811Fs7hbRjKF4MMYjlLeRC4ARDpfVq2A6AdhAVl9o0BpibeacC5xhc1c4h7SByedyroX0dQ9oOgBquwZ5u8cq1VTuIdNq3dhQVk3KitEUI6wER2kkkCLSzqIhUCgAy03pEjDaU6OdAO4xan0oCQGZaD4n6Lh0S9UzbCSgNAPkZx8TNQnWJAKj5OihSlz6umPmG66BIjR/0LkIrU6kAyEzrUbF/p8sfr28jASUDID+th0XrUmhNKl3cNghKB0B+VjkuXieOnd4mCAKAGW5WuTBCk0q6TUy9gvsUAMy0UCuJujJGB0Tn0jTgYCCujMkp5ez/VS6Nmg7sCfzurI2zVTd6gDndkyYa7B1nMPZxYCfgJ0NsI0MCgM62TAbONLj2XLo48htDbONCAoDullivjn09vZj6aeMczlQoAMg7pm1jmgTKXR79XlpJ1F83KQCwWWW9Pv6zBIF6BBcpALDbNCldLjkqk0VjAV0mrbFB41MAUM2iienIudGZbHoq0NOBnhIanQKA6vZMSCuJYzJZNT+wF3Bv9Y8YXI4AoDetx6UjasdmsmvwaLm3oLda9CFXANC7iLp0UnsKxnco4rI0mdToNYMAoHcAlFNjAd06suGQYqYYJ5GG9+l9yB0ADF9EPRXod37ztEKoKWR9+12kAKA/No1MV9UIBK0UukkBgBur6qloAFCPrm5KDQDcWFVPRQOAenR1U2oA4MaqeioaANSjq5tSAwA3VtVT0QCgHl3dlBoAuLGqnooGAPXo6qbUAMCNVfVUNACoR1c3pQYAbqyqp6IBQD26uik1AHBjVT0VDQDq0dVNqQGAG6vqqWgAUI+ubkoNANxYVU9FA4B6dHVTagDgxqp6KhoA1KOrm1IDADdW1VPRAKAeXd2U+h+G7OOB+V7lbgAAAABJRU5ErkJggg==')
        $('.CollapsableImage').attr('src', 'data:image/png;base64,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')

        // This is only because Neptun's programmers are retarded..
        $(document).on('click', 'input[type="submit"]', function() {
          setTimeout(function() {
            $('.ExpandedImage').attr('src', 'data:image/png;base64,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')
            $('.CollapsableImage').attr('src', 'data:image/png;base64,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')

          }, 100)
        })

        // Make messages table responsive
        $('#c_messages_gridMessages_grid_body_div').attr('class', 'table-responsive')
        $('#c_messages_gridMessages_bodytable').attr('class', 'table')

        // Add those ugly a** icons as function buttons (if we have that section anyway ¯\_(ツ)_/¯)
        let functionList = ' \
          <input type="button" class="gridbutton" value="Export" onclick="$(\'#c_messages_gridMessages_imexcel\').click()"> \
          <input type="button" class="gridbutton" onclick="$(\'#c_messages_gridMessages_imgprint\').click()" value="Nyomtat"> \
          <input type="button" class="gridbutton" onclick="$(\'#imgsearch\').click()" value="Keres"> \
        '
        $('.grid_functiontable_top .functionitem').append(functionList)

    } else {
        // jQuery is not loaded
        alert("JQuery Doesn't Work!");
    }
}
