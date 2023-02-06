function start(){
    let w = document.createElement('div');
    w.innerHTML = '<div style = "position: fixed;top: 10px;right: 10px;"></div>';
    document.body.append(w);
    document.onselectionchange = function() {
        fetch('https://translate.googleapis.com/translate_a/single?format=text&client=gtx&sl=en&tl=ru&dt=t&q=' +  document.getSelection().toString())
            .then(response => response.json())
            .then(json => {
            var translation = "";
            if(json[0] != null)
                for(var i = 0; i < json[0].length; i++)
                    translation += json[0][i][0];
            w.innerHTML = '<div style = "position: fixed;top: 10px;right: 10px;left: 70%; background: #aef">'+ translation +'</div>';
            document.body.append(w);
		});
    };
}

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id},
        func: start
    });
});