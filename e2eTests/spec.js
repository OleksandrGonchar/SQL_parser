// spec.js
describe('Protractor Demo App', function() {
    beforeEach(function(){
        global.isAngularSite(false);
        browser.get('http://localhost:8000/index.html');
    });
    /**
     * Before this test you must build project with gulp
     * for that you must write "gulp" in command window on project catalog and push Enter
     */

    it('should have', function() {
        //element(by.id('quick_pass')).sendKeys("").click();
        //element(by.id('l_msg')).click();
        element(by.css('.wrapper'))//.sendKeys(protractor.Key.TAB);
        browser.sleep(3000);
        expect(true).toEqual(true);
    });
});