import * as cheerio from 'cheerio';

async function getHtml(url) {

    try {
        console.log(`Fetching...\nURL: ${url}`);
        const response = await fetch(url);

        if(!response.ok){
            throw new Error(`Could not fetch`);
        }        
        const html = await response.text();
        return html;


    } catch(error) {
        console.error(error);
    }
}

const getTable = (html) => {
    const $ = cheerio.load(html);
    const table = $('#listado > table:nth-child(3) > tbody');
    const rows = table.children('tr');

    const tableData = []

    if ($(rows).length === 0) return null;

    rows.each((index, element) => {

        if (!(index === 0)){
            
            const rowElements = $(element).children('td'); 
            const rowData = {};
                        
            rowData['salida'] = $(rowElements[0]).text();
            rowData['llegada'] = $(rowElements[1]).text();
            rowData['servicio'] = $(rowElements[2]).text();
            rowData['distancia'] = $(rowElements[3]).text();
            rowData['empresa'] = $(rowElements[4]).text();            
            rowData['notas'] = $(rowElements[6]).text();
            rowData['periodicidad'] = [];            

            const periodicidadElement = $(rowElements[5]).find('tr');

            periodicidadElement.each((index, element) => {                

                if (index % 2 === 0) {
                    rowData['periodicidad'].push({'text': $(element).text(), 'data': null})
                } else {
                    const days = [];
                    const allDays = $(element).find('td');
                    allDays.each((index, element) => {
                        const day = $(element).attr('class').includes('SI') ? true : false;
                        days.push(day);
                    });                  
                    rowData['periodicidad'][rowData['periodicidad'].length - 1].data = days;                 
                }
            })
            tableData.push(rowData);  
        };
})
return JSON.stringify(tableData)
}

export const scrap = async (origenId, destinoId) => {
    const url = `http://estacionautobuses.es/en/index.php?option=com_estacionautobuses&view=buscador&task=buscarhorarios&Itemid=101&origen=${origenId}&destino=${destinoId}&fechaida=00/00/0000&fechavuelta=00/00/0000&criterio=directo`;
    return getHtml(url).then(html => getTable(html));
} 







