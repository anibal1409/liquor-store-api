import * as fs from 'fs';
import * as moment from 'moment';
import * as path from 'path';
import * as pdf from 'pdf-creator-node';

import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { Customer } from '../repositories/customers/entities';
import {
  Sale,
  SaleProduct,
} from '../repositories/sales/entities';
import { ReportsResponseDto } from './dto';
import { CustomAssetsPathFolder } from './types/config';

@Injectable()
export class ReportsService {
  // constructor(
  //   private publicationsService: PublicationsService,
  //   private configurationService: ConfigurationService
  // ) {}
  // async generateReport(reportsDto: ReportsDto): Promise<ReportsResponseDto> {
  //   const dataPublications = await this._getPublicationsData(reportsDto);

  //   const _config = await this.configurationService.getAllConfig();
  //   const _imgPath = _config.imagePath;

  //   let currentImg = '';

  //   if (!_imgPath.includes(DefaultImgOrgName)) {
  //     currentImg = (await this.configurationService.getConfigResponse())
  //       .imageUrl;
  //   }

  //   const _dateRange = reportsDto.dateRange || 'Todas';

  //   const _utcDate = new Date();

  //   const generateDate = new Date(
  //     _utcDate.getTime() - _utcDate.getTimezoneOffset() * 60000
  //   );

  //   const _pdfName = `Reporte_publicaciones_${generateDate
  //     .toISOString()
  //     .slice(0, -5)
  //     .replace('T', '_')
  //     .replace(/:/g, '-')}`;

  //   const document: DocumentOptions = {
  //     html: htmlTemplate,
  //     data: {
  //       publications: dataPublications,
  //       date: generateDate.toLocaleDateString('es'),
  //       dateRange: _dateRange,
  //       imgSystem: 'http://localhost:3333/api/public/midbrand.png',
  //       imgOrg: currentImg,
  //     },
  //     path: `${CustomAssetsPathFolder}/${_pdfName}.pdf`,
  //     type: '',
  //   };

  //   const pageOptions = {
  //     format: 'letter',
  //     orientation: 'portrait',
  //     border: '10mm',
  //     footer: {
  //       height: '10mm',
  //       contents: {
  //         default:
  //           '<span style="color: #444; font-size: 0.5rem">{{page}}/{{pages}}</span>',
  //       },
  //     },
  //   };

  //   try {
  //     const _resp = await pdf.create(document, pageOptions);
  //     console.log(`Reporte generado! Guardado en ${_resp.filename}`);
  //     return { reportUrl: `http://localhost:3333/api/public/${_pdfName}.pdf` };
  //   } catch (error) {
  //     console.log(error);
  //     throw new InternalServerErrorException();
  //   }
  // }

  async generatePdf(
    customer: Customer,
    sale: Sale,
    products: SaleProduct[],
  ): Promise<ReportsResponseDto> {
    const templateHtml = fs.readFileSync(
      path.resolve('./templates/template.html'),
      'utf8',
    );

    const _utcDate = new Date();

    const generateDate = new Date(
      _utcDate.getTime() - _utcDate.getTimezoneOffset() * 60000
    );

    const _pdfName = `nota_de_entrega_${generateDate
      .toISOString()
      .slice(0, -5)
      .replace('T', '_')
      .replace(/:/g, '-')}`;

    const options = {
      format: 'letter',
      orientation: 'portrait',
      border: '10mm',
      footer: {
        height: '10mm',
        contents: {
          default: `<table class="footer">
                    <tbody>
                      <tr>
                        <td>
                          Generado el ${moment().format('DD/MM/YYYY HH:mm')}
                        </td>
                        <td class="right">
                          <span>{{page}}/{{pages}}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>`,
        },
      },
      childProcessOptions: {
        env: {
          OPENSSL_CONF: '/dev/null',
        },
      },
    };

    const document = {
      html: templateHtml,
      data: {
        customer: customer,
        sale: {
          ...sale,
          date: moment(sale.date).format('DD/MM/YYYY HH:mm'),
        },
        products: products,
        date: moment().format('DD/MM/YYYY HH:mm'),
        imgSystem: 'http://localhost:3333/public/logo.png',
        companyName: process.env.COMPANY_NAME,
        companyDocument: process.env.COMPANY_DOCUMENT,
        companyAddress: process.env.COMPANY_ADDRESS,
      },
      path: `${CustomAssetsPathFolder}/${_pdfName}.pdf`,
      type: '',
    };

    try {
      const _resp = await pdf.create(document, options);
      console.log(`Reporte generado! Guardado en ${_resp.filename}`);
      return {
        reportUrl: `http://localhost:3333/public/${_pdfName}.pdf`,
        name: _pdfName,
        // buffer: pdfBuffer,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }


  async generateReport(
    sales: Sale[],
    total: number,
    start: string,
    end: string,
  ): Promise<ReportsResponseDto> {
    const templateHtml = fs.readFileSync(
      path.resolve('./templates/report.html'),
      'utf8',
    );

    const _utcDate = new Date();

    const generateDate = new Date(
      _utcDate.getTime() - _utcDate.getTimezoneOffset() * 60000
    );

    const _pdfName = `reporte_de_ventas_${generateDate
      .toISOString()
      .slice(0, -5)
      .replace('T', '_')
      .replace(/:/g, '-')}`;

    const options = {
      format: 'letter',
      orientation: 'portrait',
      border: '10mm',
      footer: {
        height: '10mm',
        contents: {
          default: `<table class="footer">
                    <tbody>
                      <tr>
                        <td>
                          Generado el ${moment().format('DD/MM/YYYY HH:mm')}
                        </td>
                        <td class="right">
                          <span>{{page}}/{{pages}}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>`,
        },
      },
      childProcessOptions: {
        env: {
          OPENSSL_CONF: '/dev/null',
        },
      },
    };

    const document = {
      html: templateHtml,
      data: {
        sales: sales,
        date: moment().format('DD/MM/YYYY HH:mm'),
        imgSystem: 'http://localhost:3333/public/logo.png',
        total,
        companyName: process.env.COMPANY_NAME,
        companyDocument: process.env.COMPANY_DOCUMENT,
        companyAddress: process.env.COMPANY_ADDRESS,
        start,
        end,
      },
      path: `${CustomAssetsPathFolder}/${_pdfName}.pdf`,
      type: '',
    };

    try {
      const _resp = await pdf.create(document, options);
      console.log(`Reporte generado! Guardado en ${_resp.filename}`);
      return {
        reportUrl: `http://localhost:3333/public/${_pdfName}.pdf`,
        name: _pdfName,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
