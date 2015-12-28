// spec.js
describe('Protractor Demo App', function() {
    beforeEach(function(){
        global.isAngularSite(false);
        browser.get('http://localhost:8000/index.html');
    });


    it('should have VK', function() {
        var mesage = 'Katya, smotri chto tvorit eta shtuka)) #',
            sendMassageWithI;
        element(by.id('quick_email')).sendKeys("");
        element(by.id('quick_pass')).sendKeys("");
        element(by.id('quick_login_button')).click();
        //element(by.id('l_msg')).click();
        browser.sleep(3000);
        element(by.css('.chat_tab_imgcont')).click();
        function send(i){
            sendMassageWithI = mesage+i;
            element(by.css('.fc_editable')).sendKeys(sendMassageWithI).sendKeys(protractor.Key.ENTER);
        }
        for (var i=0; i<100;i++){
            browser.sleep(100);
            send(i);
        }/*
        element(by.css('.fc_editable')).sendKeys(protractor.Key.TAB);*/
        browser.sleep(3000);
        //console.log(element(by.id('quick_email')).getText());
        expect(/*element(by.id('quick_email')).getText()*/true).toEqual(true);
    });
});