public with sharing class ShareFileController {
    @AuraEnabled
    public static ResponseWrapper shareFile(String recordId, String shareType, String fileId) {
        ResponseWrapper rw = new ResponseWrapper();
        try {
            ContentDocumentLink contentDocLink = new ContentDocumentLink();
            contentDocLink.ContentDocumentId = fileId;
            contentDocLink.LinkedEntityId = recordId; 
            contentDocLink.ShareType = shareType; 
            insert contentDocLink;

            rw.recId = contentDocLink.Id;
            rw.isSuccess = true;
        }catch(exception ex){
            rw.isSuccess = false;
            rw.message = ex.getMessage();
        }
        return rw;
    }

    public class ResponseWrapper {
        @AuraEnabled
        public String recId;
        @AuraEnabled
        public boolean isSuccess;
        @AuraEnabled
        public String message;
    }
}