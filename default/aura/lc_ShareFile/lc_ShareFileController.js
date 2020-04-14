({
    init: function(component, event, helper) {        
        var currentURL = window.location.pathname;
        var urlStart = component.get("v.urlStart");
        var urlEnd = component.get("v.urlEnd");

        if(!currentURL.includes(urlStart) || !currentURL.includes(urlEnd)) {
            try {
                component.find('notifLib').showNotice({
                    "variant": "error",
                    "header": "You are not on File detail page",
                    "message": "Please go to File detail page to use this action."
                });
              }
              catch(err) {
                  alert('Please go to File detail page to use this action.')
              }
              return;
        }

        var startIndex = currentURL.indexOf(urlStart) + urlStart.length;
        var endIndex = currentURL.indexOf('/',startIndex);
        var fileId = currentURL.substring(startIndex,endIndex);
        component.set("v.fileId",fileId);
    },

    closeQA : function(component, event, helper) {
		$A.get("e.force:closeQuickAction").fire();
	}
})
