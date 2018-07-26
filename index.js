const webdriver = require('selenium-webdriver');
const capabilities = require('./browsers2.json');

//const capabilities = require('./browsers.json');
const timeout = 15000;
console.log(process.env.BROWSERSTACK_USERNAME);

capabilities.forEach(capabilty => {
    capabilty['browserstack.user'] = process.env.BROWSERSTACK_USERNAME;
    capabilty['browserstack.key'] = process.env.BROWSERSTACK_KEY;


    var driver = new webdriver.Builder().
    usingServer('http://hub-cloud.browserstack.com/wd/hub').
    withCapabilities(capabilty).
    build();

    driver.get('http://js-download.prebid.org/ldoce').then(function(){

        // wait for ads. 
        setTimeout(()=>{ 
            driver.findElement(webdriver.By.xpath('//*[@id="google_ads_iframe_/19968336/prebid_doi_0__container__"]')).then(()=>{
                driver.quit();
            });
        },
        timeout);
    });
})