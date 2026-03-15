import { test, expect, Page } from '@playwright/test';

test('Cascading Dropdown', async ({ page }) => {

    await page.goto('https://ej2.syncfusion.com/demos/drop-down-list/cascading', {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });
    
    const countryDropdown = page.locator('span[aria-labelledby="country_hidden"]');
    const stateDropdown = page.locator('span[aria-labelledby="state_hidden"]');
    const cityDropdown = page.locator('span[aria-labelledby="city_hidden"]');

    await expect(countryDropdown).toBeEnabled();
    await countryDropdown.click();
    await page.locator("li:text('United States')").click();

    await expect(stateDropdown).toBeEnabled();
    await stateDropdown.click();
    await page.locator("li:text('Washington')").click();

    await expect(cityDropdown).toBeEnabled();
    await cityDropdown.click();
    await page.locator("li:text('Pasco')").click();

    await page.waitForTimeout(3000);
    await expect(cityDropdown).toContainText('Pasco');
});

test('Auto-suggest dropdown validation', async ({ page }) => {
    await page.goto('https://www.w3schools.com/howto/howto_js_autocomplete.asp', {
        waitUntil: "domcontentloaded",
        timeout: 60000
    });
    let cityFound = false;
    const expectedCity = 'United States of America';
    const autoSuggestInput = page.locator("input#myInput");

    await autoSuggestInput.click();
    autoSuggestInput.fill('United');

    const suggestions = page.locator("//div[@id='myInputautocomplete-list']/div[normalize-space(.)]");
    
    await expect(suggestions.first()).toBeVisible();
    const suggestionsTexts = await suggestions.allInnerTexts();
    for(const text of suggestionsTexts){
        if(text.trim() === expectedCity){
            cityFound = true;
            break;
        }
    }
    expect(cityFound).toBeTruthy();
    for(let i=0; i<suggestionsTexts.length; i++){
        if(suggestionsTexts[i].trim() === expectedCity){
            await suggestions.nth(i).click();
            break;
        }
    }
    await expect(autoSuggestInput).toHaveValue(expectedCity);
    await page.waitForTimeout(1500);
});

test('Custom select dropdown validation', async ({ page }) => {
    await page.goto('https://www.w3schools.com/howto/howto_custom_select.asp', {
        waitUntil: "domcontentloaded",
        timeout: 60000
    });
    
    const expectedItem = 'Volvo';
    const customSelect = page.locator("div.select-selected");

    await customSelect.click();

    const options = page.locator("div.select-items div");
    await expect(options.first()).toBeVisible();

    let itemFound = false;
    const count = await options.count();

    for(let i=0; i<count; i++){
        const option = options.nth(i);
        const text = (await option.textContent())?.trim();
        if(text === expectedItem){
            itemFound = true;
            await option.click();
            break;
        }
    }
    /* expect(cityFound).toBeTruthy();
    for(let i=0; i<suggestionsTexts.length; i++){
        if(suggestionsTexts[i].trim() === expectedCity){
            await suggestions.nth(i).click();
            break;
        }
    } */
    expect(itemFound).toBe(true);
   
    expect(customSelect).toHaveText(expectedItem);
    
});

test('Validate the selected value of a select dropdown I', async ({ page }) => {

    page.on("framenavigated", async () => {
        const acceptCookies = page.getByText("Allow all");
        if (await acceptCookies.isVisible()) {
            await acceptCookies.click();
        }
    });
    await page.goto('https://www.orangehrm.com/en/contact-sales');

    // How do you validate the selected value of a select dropdown?
    const countryDropdown = page.locator("select#Form_getForm_Country");
    await countryDropdown.selectOption({ label: 'India' });
    const selectedOption = await countryDropdown.inputValue();
    expect(selectedOption).toBe('India');
});

test('Validate the selected value of a select dropdown II', async ({ page }) => {

    page.on("framenavigated", async () => {
        const acceptCookies = page.getByText("Allow all");
        if (await acceptCookies.isVisible()) {
            await acceptCookies.click();
        }
    });
    await page.goto('https://www.orangehrm.com/en/contact-sales', {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });
    
    const countryDropdown = page.locator("select#Form_getForm_Country");
    const selectedOption = await countryDropdown.inputValue();
    expect(selectedOption).toBe("");
});

test('Validate all the dropdown options', async ({ page }) => {

    page.on("framenavigated", async () => {
        const acceptCookies = page.getByText("Allow all");
        if (await acceptCookies.isVisible()) {
            await acceptCookies.click();
        }
    });
    await page.goto('https://www.orangehrm.com/en/contact-sales');
    
    const countryDropdown = page.locator("select#Form_getForm_Country");
    const countryOptions = await countryDropdown.locator("option").allInnerTexts();
    const actualOptions = countryOptions.map(country => country.trim());

    const expectedOptions = ["Country", "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antigua and Barbuda", "Argentina", "Armenia",
        "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
        "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "Brunei Darussalam",
        "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad",
        "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Cook Islands", "Costa Rica", "Cote D'Ivoire",
        "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador",
        "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland",
        "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar",
        "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-bissau", "Guyana", "Haiti",
        "Heard and Mc Donald Islands", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
        "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "North Korea", "South Korea",
        "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
        "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
        "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Moldova", "Monaco", "Montenegro", "Mongolia", "Morocco",
        "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua",
        "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama",
        "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania",
        "Russian Federation", "Rwanda", "St Kitts and Nevis", "St Lucia", "St Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal",
        "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia",
        "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tajikistan",
        "Tanzania", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands",
        "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela",
        "Vietnam", "Virgin Islands", "Western Sahara", "Yemen", "Zambia", "Zimbabwe", "South Sandwich Islands", "St Helena", "St Pierre and Miquelon", "Vatican City",
        "Wallis and Futuna Islands", "Zaire"
    ]
    expect(actualOptions).toEqual(expectedOptions);
});

test('Validate no duplicate options exist', async ({ page }) => {

    page.on("framenavigated", async () => {
        const acceptCookies = page.getByText("Allow all");
        if (await acceptCookies.isVisible()) {
            await acceptCookies.click();
        }
    });
    await page.goto('https://www.orangehrm.com/en/contact-sales');
    
    const countryDropdown = page.locator("select#Form_getForm_Country");
    const countryOptions = await countryDropdown.locator("option").allInnerTexts();
    const actualOptions = countryOptions
                          .map(country => country.trim())
                          .filter(option => option !== 'Country');

    const uniqueOptions = new Set(actualOptions);
    expect(uniqueOptions.size).toEqual(actualOptions.length);
});

test('Validate sorting order', async ({ page }) => {

    page.on("framenavigated", async () => {
        const acceptCookies = page.getByText("Allow all");
        if (await acceptCookies.isVisible()) {
            await acceptCookies.click();
        }
    });
    await page.goto('https://www.orangehrm.com/en/contact-sales', {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });
    
    const countryDropdown = page.locator("select#Form_getForm_Country");
    const countryOptions = await countryDropdown.locator("option").allInnerTexts();
    const actualOptions = countryOptions
                          .map(country => country.trim())
                          .filter(option => option !== 'Country');

    const sortedOptions = [...actualOptions].sort((a, b) => a.localeCompare(b));
    expect(actualOptions).toEqual(sortedOptions);
});