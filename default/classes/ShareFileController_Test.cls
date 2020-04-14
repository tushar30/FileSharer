@isTest
private class ShareFileController_Test {
    static testMethod void unitTest(){ 
        ContentVersion contentVer = new ContentVersion();
        contentVer.ContentLocation = 'S';
        contentVer.Description='0000000';
        contentVer.PathOnClient = 'TestLogo.png'; 
        contentVer.Title = 'TestLogo.png';
        contentVer.VersionData = EncodingUtil.base64Decode('test');
        insert contentVer;

        Id conDocumentId = [SELECT ContentDocumentId FROM ContentVersion WHERE Id =:contentVer.Id].ContentDocumentId;
        Account acc = new Account(name = 'Test Record');
        insert acc;

        Test.startTest();
            ShareFileController.shareFile(acc.Id, 'V', conDocumentId);
            System.assertEquals([SELECT ID FROM ContentDocumentLink WHERE ContentDocumentId =: conDocumentId].size(), 2);

            //negative test exception cover
            ShareFileController.shareFile(acc.Id, 'V', conDocumentId);
        Test.stopTest();
    }
}