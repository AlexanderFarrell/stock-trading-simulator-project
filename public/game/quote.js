import {ElementBuilder, GetIdDiv} from "../helper/view_helper.js";

export function GetQuoteElement(ticker){
    let element = GetIdDiv('Quote', ['GameView']);
    element.innerHTML = '';

    element.innerHTML = '<h1>Quote</h1>';

    let container = document.createElement('div');
    container.innerHTML = "Loading...";//GetQuote(ticker);

    GetQuote(ticker)
        .then(data => {
            container.innerHTML = '';
            RenderQuotes(data, container, ticker);
        })
        .catch(err => {
            console.error(err);
            container.innerHTML = "Error getting data!";
        })

    element.appendChild(container);
    return element;
}

export function RenderQuotes(quoteData, container, ticker){
    //Did we find a quote?
    if (quoteData.chart.result.length > 0){
        quoteData.chart.result.forEach(singleQuoteData => {
            container.appendChild(GetSingleQuoteElement(singleQuoteData, ticker));
        })
    } else {
        //We should display that no results were found!
        container.innerHTML = `No results were found for ticker: ${ticker}`;
    }
}

export function GetSingleQuoteElement(quote, ticker){
    let container = new ElementBuilder()
        .withClass('Quote')
        .build();
    
    container.appendChild(GetMetadataElement(quote));
    
    GetInfoElement(ticker, container)
    
    return container;
}

function GetMetadataElement(quote){
    let metadata = quote.meta;
    
    let symbol = new ElementBuilder()
        .withInnerHtml(metadata.symbol)
        .withClass('Symbol')
        .build();
    
    let price = new ElementBuilder()
        .withInnerHtml(`${metadata.regularMarketPrice} ${metadata.currency}`)
        .withClass('Price')
        .build();
    
    let element = new ElementBuilder()
        .withClass('MetadataQuote')
        .build();
    
    element.appendChild(symbol);
    element.appendChild(price);
    
    return element;
}

//v2.0
function GetChartElement(quote){

}

async function GetInfoElement(ticker, parent){
    try {
        let container = new ElementBuilder()
            .withClass("TickerCategory")
            .withInnerHtml("Loading information...")
            .build();
        parent.appendChild(container);
        
        let data_raw = await GetTickerModule(ticker, 'assetProfile');
        let data = data.quoteSummary.result[0].assetProfile;
        console.log(data);
        
        container.innerHTML = '';
        
        let website = data.website;
        delete data.website;
        
        let companyOfficers = data.companyOfficers;
        delete data.companyOfficers;
        
        
    
        for (const [key, value] of Object.entries(data)) {
            let property = new ElementBuilder()
                .withClass("Property")
                .withInnerHtml(`${key}: ${value}`)
                .build();
            
            container.appendChild(property);
        }
        
        return container;
    } catch (e) {
        parent.innerHTML = '';
        console.error(e);
        parent.appendChild(new ElementBuilder()
            .withInnerHtml('Error retrieving module')
            .withClass('Error')
            .build())
    }
    
    /*let symbol = new ElementBuilder()
        .withInnerHtml(metadata.symbol)
        .withClass('Symbol')
        .build();
    
    let price = new ElementBuilder()
        .withInnerHtml(`${metadata.regularMarketPrice} ${metadata.currency}`)
        .withClass('Price')
        .build();
    
    let element = new ElementBuilder()
        .withClass('MetadataQuote')
        .build();
    
    element.appendChild(symbol);
    element.appendChild(price);
    
    return element;*/
}

async function GetQuote(ticker){
    try {
        let url = `/quote/${ticker}`;
        console.log(url);
        
        let dataRaw = await fetch(url);
        console.log(dataRaw);
        return await dataRaw.json();
    } catch (e) {
        throw new Error(e.message);
    }
}

async function GetTickerModule(ticker, module){
    try {
        let url = `/ticker/${ticker}/detail/${module}`;
        console.log(url);
        
        let dataRaw = await fetch(url);
        console.log(dataRaw);
        return await dataRaw.json();
    } catch (e) {
        throw new Error(e.message);
    }
}