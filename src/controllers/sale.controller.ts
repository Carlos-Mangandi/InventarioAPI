import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { error } from "console";
import { json } from "stream/consumers";
import { Like } from "typeorm";
import { Customer } from "../models/Customer";
import { Sale } from "../models/Sale";

const saleRepository = AppDataSource.getRepository("Sale");

class SaleController {
  static createSale = async (req: Request, resp: Response) => {
    const { amount, unitPrice, total, customerId, productId } = req.body;
    const customerRepository = AppDataSource.getRepository("Customer");
    const productRepository = AppDataSource.getRepository("Product");
    let existingCustomer;
    let existingProduct;
    try {
      if (customerId) {
        existingCustomer = await customerRepository.findOne({
          where: { id: customerId },
        });
        if (!existingCustomer) {
          return resp.json({
            ok: false,
            message: `Sale whit ID '${customerId} does not exist`,
          });
        }
      }

      if (productId) {
        existingProduct = await productRepository.findOne({
          where: { id: productId },
        });
        if (!existingProduct) {
          return resp.json({
            ok: false,
            message: `Sale whit ID '${productId} does not exist`,
          });
        }
      }

      const sale = new Sale();

      sale.amount = amount,
      sale.unitPrice = unitPrice,
      sale.product = existingProduct;
      sale.customer = existingCustomer;

      sale.total = amount * unitPrice;

      sale.customer = existingCustomer;
      sale.product = existingProduct;

      await saleRepository.save(sale);

      return resp.json({
        ok: true,
        STATUS_CODE: 200,
        message: "Sale was create with successfully",
      });
    } catch (error) {
      return resp.json({
        ok: false,
        STATUS_CODE: 500,
        message: `error = ${error.message}`,
      });
    }
  };

  static getSales = async (req: Request, resp: Response) => {
    const total = req.query.total || "";
    const customer = req.query.customer || "";

    console.log(req.query);
    try {
      const sales = await saleRepository.find({
        where: {
          state: true,
          total: Like(`%${total}%`),
          customer: { name: Like(`%${customer}%`) },
        },
        relations: { customer: true },
      });
      return sales.length > 0
        ? resp.json({
            ok: true,
            STATUS_CODE: 200,
            message: "list of sales",
            sales,
          })
        : resp.json({ ok: false, message: "Not found", sales });
    } catch (error) {
      return resp.json({
        ok: false,
        STATUS_CODE: 500,
        message: `error = ${error.message}`,
      });
    }
  };

  static byIdSale = async (req: Request, resp: Response) => {
    const id = parseInt(req.params.id);
    try {
      const sale = await saleRepository.findOne({
        where: { id, state: true },
      });
      return sale
        ? resp.json({
            ok: true,
            sale,
          })
        : resp.json({
            ok: false,
            message: "The id don't exist",
          });
    } catch (error) {
      return resp.json({
        ok: false,
        STATUS_CODE: 500,
        message: `error = ${error.message}`,
      });
    }
  };

  static deleteSale = async (req: Request, resp: Response) => {
    const id = parseInt(req.params.id);
    try {
      const sale = await saleRepository.findOne({
        where: { id, state: true },
      });
      if (!sale) {
        return resp.json({
          ok: false,
          StatusCode: 404,
          message: `Not Found`,
        });
      }

      sale.state = false;

      await saleRepository.save(sale);

      return resp.json({
        ok: true,
        STATUS_CODE: 200,
        message: "Sale was delete",
      });
    } catch (error) {
      return resp.json({
        ok: false,
        STATUS_CODE: 500,
        message: `error => ${error.message}`,
      });
    }
  };

  static updateSale = async (req: Request, resp: Response) => {
    const id = parseInt(req.params.id);
    const { amount, unitPrice } = req.body;
    try {
      const sale = await saleRepository.findOne({
        where: { id, state: true },
      });

      if (!unitPrice) {
        throw new Error("Not Found");
      }
      if(!amount){
        throw new Error("Not Found")
      }

      sale.unitPrice = unitPrice;
      sale.amount = amount

      sale.total = amount * unitPrice;

      await saleRepository.save(sale);
      return resp.json({
        ok: true,
        STATUS_CODE: 200,
        message: "Sale was updated",
        sale,
      });
    } catch (error) {
      return resp.json({
        ok: false,
        STATUS_CODE: 500,
        message: `error = ${error.message}`,
      });
    }
  };
}

export default SaleController;
