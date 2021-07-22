// Issue:    Due to CORS, we cannot request from Yahoo Finance client side, as it appears to not return an
//           Access-Control-Allowed-Origin header to let the browser approve of the response.
//
// Solution: Use the server as a somewhat proxy. Get the same JSON data back we would have if Yahoo Finance supported
//           the Access-Control-Allowed-Origin header and process the JSON client-side completely.
//
// How it differs from being a true proxy:
//
// 1. The routes are slightly different. The server does not function as a true proxy, which would
//    take the actual original URL. Purely for security of the server, I've chosen to have custom routes so the server
//    is not allowed to make arbitrary requests to arbitrary URLs.
//
// 2. The parameters taken into the server are sanitized. They already should be in the sanitized state when it gets
//    there. I don't process the input anyway beyond what the client side JavaScript should have done. The sanitizing
//    is just for security of the server.
//
// I have included the url values which would have been used if the library supported CORS.



/// Gets data on the current price of the stock.
export async function GetPrice(ticker){
	return await GetModule(ticker, 'price');
	
	/*return await GetJsonFromExternalSource(
		`https://query2.finance.yahoo.com/v10/finance/quoteSummary/${ticker}?modules=price`
	);*/
}

// Gets the chart data and other meta data for the stock.
export async function GetChartData(ticker){
	return await GetJsonFromExternalSource(`/ticker/${ticker}`);
	
	/*return await GetJsonFromExternalSource(
		`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}`
	);*/
}

// Gets a module, such as the income statement, SEC filings, etc. from Yahoo Finance.
export async function GetModule(ticker, moduleName){
	return await GetJsonFromExternalSource(`/ticker/${ticker}/detail/${moduleName}`);
	
	/*return await GetJsonFromExternalSource(
		`https://query2.finance.yahoo.com/v10/finance/quoteSummary/${ticker}?modules=${detail}`
	);*/
}

// Helper function for getting a JSON from a url, then turning it into a JSON. Throws if unsuccessful.
async function GetJsonFromExternalSource(url){
	try {
		let dataRaw = await fetch(url);
		return await dataRaw.json();
	} catch (e) {
		console.error(e);
		throw new Error("Unable to retrieve data from server.");
	}
}