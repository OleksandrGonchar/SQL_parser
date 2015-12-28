// spec.js
describe('Protractor Demo App', function() {
    beforeEach(function(){
        global.isAngularSite(false);
        browser.get('http://localhost:8000/index.html');
    });
    
    it('should have', function() {
        expect(true).toEqual(true);
    });
});