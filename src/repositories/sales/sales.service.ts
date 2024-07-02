import * as moment from 'moment';
// eslint-disable-next-line prettier/prettier
import {
  Between,
  Repository,
} from 'typeorm';

// eslint-disable-next-line prettier/prettier
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CrudRepository } from '../../common';
import { ReportsService } from '../../reports/reports.service';
// eslint-disable-next-line prettier/prettier
import {
  GetSalesDto,
  SaleRespondeDto,
} from './dto';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-study.dto';
// eslint-disable-next-line prettier/prettier
import {
  Sale,
  SaleProduct,
} from './entities';
import { STAGE_STUDY_VALUE } from './enums';

@Injectable()
export class SalesService implements CrudRepository<Sale> {
  constructor(
    @InjectRepository(Sale)
    private readonly repository: Repository<Sale>,
    @InjectRepository(SaleProduct)
    private readonly repositoryStudyExams: Repository<SaleProduct>,
    private readonly reportsService: ReportsService,
  ) {}

  async findValid(id: number): Promise<Sale> {
    if (!id) {
      throw new BadRequestException('ID null');
    }
    const entity = await this.repository.findOne({
      where: {
        id,
      },

      relations: ['customer', 'saleProducts', 'saleProducts.product'],
    });
    if (!entity) {
      throw new NotFoundException('Estudio no encontrado');
    }
    return entity;
  }

  async create(createDto: CreateSaleDto): Promise<SaleRespondeDto> {
    const item = await this.repository.save(createDto);
    const studyExams = createDto.saleProducts.map((saleProduct) => {
      return {
        product: {
          id: saleProduct.product.id,
        },
        sale: {
          id: item.id,
        },
        price: saleProduct.price,
        amount: saleProduct.amount,
        subtotal: saleProduct.subtotal,
      };
    });

    await this.repositoryStudyExams.save(studyExams);

    return await this.findOne(item.id);
  }

  findAll(data?: GetSalesDto) {
    console.log(data);
    const start = moment(data?.start)
      .startOf('day')
      .toDate();
    const end = moment(data?.end)
      .startOf('day')
      .toDate();

    console.log(start, end);

    return this.repository.find({
      where: {
        deleted: false,
        customer: {
          id: data?.customerId,
        },
        date: !!data?.start ? Between(start, end) : null,
        stage: data?.stage,
      },
      order: {
        date: 'DESC',
      },
      relations: [
        'customer',
        'saleProducts',
        'saleProducts.product',
        'saleProducts.product.category',
      ],
    });
  }

  async findOne(id: number): Promise<SaleRespondeDto> {
    const item = await this.findValid(id);
    return new SaleRespondeDto(item);
  }

  async update(id: number, updateDto: UpdateSaleDto): Promise<SaleRespondeDto> {
    const item = await this.repository.save({
      id,
      note: updateDto.note,
      customer: {
        id: updateDto.customer.id,
      },
      total: updateDto.total,
      date: updateDto.date,
      stage: updateDto.stage,
    });

    const studyExams = updateDto.saleProducts.map((saleProduct) => {
      return {
        id: saleProduct.id,
        product: {
          id: saleProduct.product.id,
        },
        sale: {
          id,
        },
        price: saleProduct.price,
        amount: saleProduct.amount,
        subtotal: saleProduct.subtotal,
      };
    });

    this.repositoryStudyExams.save(studyExams);

    return this.findOne(item.id);
  }

  async remove(id: number): Promise<SaleRespondeDto> {
    const item = await this.findValid(id);
    item.deleted = true;
    return new SaleRespondeDto(await this.repository.save(item));
  }

  async count(): Promise<number> {
    const startMonth = moment().startOf('month').toDate();
    const endMonth = moment().endOf('month').toDate();
    return await this.repository.count({
      where: {
        deleted: false,
        date: Between(startMonth, endMonth),
      },
    });
  }

  async generateMonthlyExamStatistics(data?: GetSalesDto): Promise<
    {
      examName: string;
      count: number;
    }[]
  > {
    // Obtener estudios realizados en el mes y año especificados
    const studies = await this.findAll(data);
    console.log('generateMonthlyExamStatistics', studies);

    // Inicializar mapa para contar la cantidad de cada tipo de examen realizado
    const examCounts = new Map<string, number>();

    // Contar la cantidad de cada tipo de examen realizado
    await Promise.all(
      studies.map(async (study) => {
        await Promise.all(
          study.saleProducts.map(async (studyExam) => {
            const examName = studyExam.product.name;
            examCounts.set(examName, (examCounts.get(examName) || 0) + 1);
          }),
        );
      }),
    );

    // Ordenar los tipos de examen por la cantidad de veces que se han realizado
    const sortedExamCounts = [...examCounts.entries()].sort(
      (a, b) => b[1] - a[1],
    );

    console.log(sortedExamCounts);

    // Convertir el mapa en un arreglo de objetos
    const examStatisticsArray = sortedExamCounts.map(([examName, count]) => ({
      examName,
      count,
    }));

    // Retorna los tipos de examen más realizados en el mes como un arreglo de objetos
    return examStatisticsArray;
  }

  async generateMonthlyExamTypeStatistics(
    data?: GetSalesDto,
  ): Promise<{ examType: string; count: number }[]> {
    try {
      // Obtener estudios realizados en el mes y año especificados
      const studies = await this.findAll(data);

      // Inicializar un mapa para almacenar la cantidad de exámenes por tipo
      const examTypeCounts = new Map<string, number>();

      // Contar la cantidad de exámenes realizados por tipo
      await Promise.all(
        studies.map(async (study) => {
          await Promise.all(
            study.saleProducts.map(async (studyExam) => {
              console.log(studyExam.product);
              const examType = studyExam.product?.category?.name;
              if (examType) {
                examTypeCounts.set(
                  examType,
                  (examTypeCounts.get(examType) || 0) + 1,
                );
              }
            }),
          );
        }),
      );

      // Convertir el mapa en un arreglo de objetos
      const examTypeStatisticsArray = Array.from(examTypeCounts.entries()).map(
        ([examType, count]) => ({
          examType,
          count,
        }),
      );

      // Retorna el arreglo con la cantidad de exámenes realizados por tipo
      return examTypeStatisticsArray;
    } catch (error) {
      // Manejar errores
      console.error('Error en generateMonthlyExamTypeStatistics:', error);
      throw error;
    }
  }

  async getPDF(id: number) {
    const item = await this.findOne(id);
    const USDollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    const saleProducts = item.saleProducts.map((saleProduct, i) => ({
      price: USDollar.format(+saleProduct.price),
      amount: saleProduct.amount,
      subtotal: USDollar.format(+saleProduct.subtotal),
      name: (saleProduct.product as any)?.name,
      index: i + 1,
      product: {
        ...saleProduct.product,
        price: USDollar.format(+saleProduct.price),
        amount: saleProduct.amount,
        subtotal: USDollar.format(+saleProduct.subtotal),
        index: i + 1,
      },
    }));
    item.total = USDollar.format(+item.total) as any;

    return this.reportsService.generatePdf(
      item.customer,
      item as any,
      saleProducts as any,
    );
  }

  async getReportSales(data: GetSalesDto) {
    let sales = await this.findAll(data);
    const USDollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    sales = sales?.map((sale, index) => ({
      index: index + 1,
      totalF: USDollar.format(+sale.total),
      date: moment().format('DD/MM/YYYY HH:mm'),
      stage: STAGE_STUDY_VALUE[sale.stage].name,
      total: sale.total,
      code: this.formatNumberToDigits(sale.id),
      products: sale.saleProducts?.reduce(
        (accumulator: number, currentValue: SaleProduct) =>
          accumulator + +currentValue.amount,
        0,
      ),
    })) as any;
    const total = sales?.reduce(
      (accumulator: number, currentValue: Sale) =>
        accumulator + +currentValue.total,
      0,
    );
    return this.reportsService.generateReport(
      sales,
      total,
      data.start,
      data.end,
    );
  }

  formatNumberToDigits(number: number) {
    return number.toString().padStart(4, '0');
  }
}
