import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import urlConfig from '../../url-config';

const PDFMake = {};
/**
 * Returns the instance to make pdfs
 */
PDFMake.make = () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    return pdfMake;
};

/**
 * Download PDF
 * 
 * @param { Object } pdfMake PdfMake
 * @param { Object } docDefinition Doc definition
 */
PDFMake.download = (pdfMake, docDefinition) => {
    pdfMake.createPdf(docDefinition).download();
};

/**
 * Open PDF in browser
 * 
 * @param { Object } pdfMake PdfMake
 * @param { Object } docDefinition Doc definition
 */
PDFMake.open = (pdfMake, docDefinition) => {
    pdfMake.createPdf(docDefinition).open();
};

/**
 * Print PDF
 * 
 * @param { Object } pdfMake PdfMake
 * @param { Object } docDefinition Doc definition
 */
PDFMake.print = (pdfMake, docDefinition) => {
    pdfMake.createPdf(docDefinition).print();
};

/**
 * Generate docDefinition for PDFMake
 * 
 * @param { Object } username Name of the username who belongs this progress
 * @param { number } height User's height
 * @param { Array } userProgress Array of user progress
 */
PDFMake.docDefinitionUserProgress = (username, height, progresses, chartImage) => {
  const date = new Date();
  const formatDate = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;

    return {
        header: {
          columns: [
            { 
              text: `Fecha: ${formatDate}`,
              alignment: 'right',
              style: 'header',
            }
          ]
        },
      
        footer: {
          columns: [
            {
              text: 'Nutrition Care Application',
              alignment: 'left',
              style: 'footer',
            }
          ]
        },
        
        content: [
          {
            alignment: 'justify',
            columns: [
              {
                width: 150,
                image: urlConfig.logo_base64
              },
              {
                style: 'reportTitleCont',
                text: [
                  { text: 'NOMBRE DE REPORTE:\n', bold: true },
                  { text: 'Resumen de progreso.\n\n' },

                  { text: 'DATOS DE USUARIO\n', bold: true },
                  { text: `ID: ${username.id}.\n` },
                  { text: `Nombre: ${username.name}.\n` },
                  { text: `Email: ${username.email}.\n` },
                  { text: `Altura: ${height} cm.\n` },  
                ]
              }
            ]
          },
          {
            // Optional
            layout: 'lightHorizontalLines',
            style: 'tableStyle',            
            table: {
              // How many rows will be trated as headers
              headerRows: 1,
              // Widths of headers
              widths: [ 30, 70, 70, 100, 100, '*' ],
              body: [
                // Headers
                [ 
                  { text: 'ID', bold: true },
                  { text: 'Peso', bold: true },
                  { text: '% de Grasa', bold: true },
                  { text: 'Kg de Músculo', bold: true },
                  { text: 'Kg de Grasa', bold: true },
                  { text: 'Fecha', bold: true },
                ],
                // Rows
                ...progresses.map( (progress, i) => 
                  [ 
                    { text: progress.id, fillColor: i % 2 == 0 ? '#EBEBEB' : null },
                    { text: `${progress.weight.toFixed(2)} Kg`, fillColor: i % 2 == 0 ? '#EBEBEB': null },
                    { text: `%${progress.fat_percentage.toFixed(2)}`, fillColor: i % 2 == 0 ? '#EBEBEB': null },
                    { text: `${progress.muscle_kilogram.toFixed(2)} Kg`, fillColor: i % 2 == 0 ? '#EBEBEB': null },
                    { text: `${progress.fat_kilogram.toFixed(2)} Kg`, fillColor: i % 2 == 0 ? '#EBEBEB': null },
                    { text: progress.progress_date, fillColor: i % 2 == 0 ? '#EBEBEB': null }
                  ]
                ),
              ],
            }
          },
          {
            width: '500',
            margin: [0, 30, 0, 0],
            image: chartImage,
          }
        ],
        styles: {
          header: {
            fontSize: 12,
            bold: true,
            margin: [10, 10, 10, 10]
          },
          footer: {
            fontSize: 12,
            bold: false,
            color: 'gray',
            margin: [10, 10, 10, 10]
          },
          userData: {
            margin: [0, 50, 0, 10]
          },
          reportTitleCont: {
            margin: [100, 0, 0, 0]
          },
          tableStyle: {
            margin: [0, 35, 0, 0]
          }
        }
    };
};


/**
 * 
 * @param { Object } 
 * @param { number } 
 * @param { Array } 
 */
PDFMake.docDefinitionFoods = ({ foods, chartImage, reportName }) => {
  const date = new Date();
  const formatDate = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;

    return {
        header: {
          columns: [
            { 
              text: `Fecha: ${formatDate}`,
              alignment: 'right',
              style: 'header',
            }
          ]
        },
      
        footer: {
          columns: [
            {
              text: 'Nutrition Care Application',
              alignment: 'left',
              style: 'footer',
            }
          ]
        },
        
        content: [
          {
            alignment: 'justify',
            columns: [
              {
                width: 150,
                image: urlConfig.logo_base64
              },
              {
                style: 'reportTitleCont',
                text: [
                  { text: `\n\n\n` },
                  { text: 'NOMBRE DE REPORTE:\n', bold: true },
                  { text: `${reportName}.\n\n` },
                ]
              }
            ]
          },
          {
            // Optional
            layout: 'lightHorizontalLines',
            style: 'tableStyle',            
            table: {
              // How many rows will be trated as headers
              headerRows: 1,
              // Widths of headers
              widths: [ 30, 'auto', 60, 80, 60, 50 ],
              body: [
                // Headers
                [ 
                  { text: 'ID', bold: true },
                  { text: 'Descripción', bold: true },
                  { text: 'Proteínas', bold: true },
                  { text: 'Carbohídratos', bold: true },
                  { text: 'Grasas', bold: true },
                  { text: 'Calorías', bold: true },
                ],
                // Rows
                ...foods.map( (food, i) => 
                  [ 
                    { text: food.id, fillColor: i % 2 == 0 ? '#EBEBEB' : null },
                    { text: food.description, fillColor: i % 2 == 0 ? '#EBEBEB': null },
                    { text: `${food.proteins} gr`, fillColor: i % 2 == 0 ? '#EBEBEB': null },
                    { text: `${food.carbohydrates} gr`, fillColor: i % 2 == 0 ? '#EBEBEB': null },
                    { text: `${food.fats} gr`, fillColor: i % 2 == 0 ? '#EBEBEB': null },
                    { text: food.calories, fillColor: i % 2 == 0 ? '#EBEBEB': null }
                  ]
                ),
              ],
            }
          },
          {
            width: '500',
            margin: [0, 30, 0, 0],
            image: chartImage,
          }
        ],
        styles: {
          header: {
            fontSize: 12,
            bold: true,
            margin: [10, 10, 10, 10]
          },
          footer: {
            fontSize: 12,
            bold: false,
            color: 'gray',
            margin: [10, 10, 10, 10]
          },
          userData: {
            margin: [0, 50, 0, 10]
          },
          reportTitleCont: {
            margin: [100, 0, 0, 0]
          },
          tableStyle: {
            margin: [0, 35, 0, 0]
          }
        }
    };
};

export default PDFMake;
