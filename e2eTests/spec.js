// spec.js
describe('Protractor Demo App', function () {
    beforeEach(function () {
        global.isAngularSite(false);
        browser.get('http://localhost:8000/index.html');
    });
    /**
     * Before this test you must build project with gulp
     * but build process already don`t work (
     * for that you must write "gulp" in command window on project catalog and push Enter
     */

    it('should have', function () {
        browser.sleep(3000);
        element(by.id('searchField')).sendKeys("some reach text");
        element(by.css('.button')).click();
        element(by.id('submitButton')).click();
        expect(true).toEqual(true);
    });

    it('Should have 4 button', function () {
        var button = element.all(by.css('.button'));
        expect(button.count()).toBe(4);
    });

    it('Should have search field', function () {
        var search = element.all(by.id('searchField'));
        expect(search.count()).toBe(1);
    });
});