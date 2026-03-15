import {test, expect} from '../fixtures/baseFixture.js';
import {LoginPage} from '../Pages/LoginPage.js'
import { ResultsPage } from '../Pages/ResultsPage.js';

let searchData = [
    {searchKey: 'macbook', resultCount: 3},
    {searchKey: 'imac', resultCount: 1},
    {searchKey: 'samsung', resultCount: 2},
    {searchKey: 'canon', resultCount: 1},
    {searchKey: 'Logitech', resultCount: 0},
];

for(let search of searchData) {
    test(`Verify Product Search of ${search.searchKey}`, async ({homePage}) => {
    
    const resultsPage: ResultsPage = await homePage.doSearch(search.searchKey);
    let searchResultsCount = await resultsPage.getSearchResultsCount();
    expect(searchResultsCount).toBe(search.resultCount);
})
}