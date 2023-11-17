import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { error } from "console";
import { json } from "stream/consumers";
import { Like } from "typeorm";
import { Customer } from "../models/Customer";
import { Sale } from "../models/Sale";
import { SaleDetail } from "../models/SaleDetails";

const saleDetailsRepository = AppDataSource
.getRepository("SaleDetail");

class SaleDetailsController {
    static createDetail = async (req: Request, resp: Response) => {
        const { amount, unitPrice, subTotal, saleId, productId } = req.body;
        const saleRepository = AppDataSource.getRepository("Sale");
        const productRepository = AppDataSource.getRepository("Product");

        let existingSale;
        let existingProduct;
        try {
        if (saleId) {
            existingSale = await saleRepository.findOne({
            where: { id: saleId },
            });
            if (!existingSale) {
            return resp.json({
                ok: false,
                message: `Sale Details whit ID '${saleId} does not exist`,
            });
            }
        }
        if(productId){
            existingProduct = await productRepository.findOne({
                where: {id: productId},
            });
            if(!existingProduct){
                return resp.json({
                    ok: false,
                    message:`Sale Details whit ID '${productId} does not exist`
                });
            }
        }

        const details = new SaleDetail();

        details.amount = amount,
        details.unitPrice = unitPrice,
        details.sale = existingSale,
        details.product = existingProduct

        //multiplicación
        details.subTotal = amount * unitPrice;

        details.sale = existingSale;
        details.product = existingProduct;

        await saleDetailsRepository.save(details);

        return resp.json({
            ok: true,
            STATUS_CODE: 200,
            message: "Sale details was create with successfully",
        });
        } catch (error) {
        return resp.json({
            ok: false,
            STATUS_CODE: 500,
            message: `error = ${error.message}`,
        });
        }
    };

    static getDetails = async (req: Request, resp: Response) => {
        try {
          const details = await saleDetailsRepository.find({
            where: { 
                state: true
            },
          });
          return details.length > 0
            ? resp.json({
                ok: true,
                STATUS_CODE: 200,
                message: "list of details",
                details,
              })
            : resp.json({ ok: false, message: "Not found", details });
        } catch (error) {
          return resp.json({
            ok: false,
            STATUS_CODE: 500,
            message: `error = ${error.message}`,
    
          });
        }
      };
}

export default SaleDetailsController
