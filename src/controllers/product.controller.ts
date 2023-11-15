import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../models/Product";
import { Supplier } from "../models/Supplier";
import { error } from "console";
import { json } from "stream/consumers";
import { Like } from "typeorm";

const productRepository = AppDataSource.getRepository("Product");

class ProductController {
  //FUNCIONA
  static createProduct = async (req: Request, resp: Response) => {
    const { name, description, price, stock, supplierId } = req.body;
    const supplierRepository = AppDataSource.getRepository(Supplier);
    let existingSupplier;
    try {
      if (supplierId) {
        existingSupplier = await supplierRepository.findOne({
          where: { id: supplierId },
        });
        if (!existingSupplier) {
          return resp.json({
            ok: false,
            message: `Supplier whit ID '${supplierId} does not exist`,
          });
        }
      } else {
        if (existingSupplier?.rol && supplierId) {
          return resp.json({
            ok: false,
            message: "Cannot assign supplier to a regular product",
          });
        }
      }

      const product = new Product();

      (product.name = name),
      (product.description = description),
      (product.price = price),
      (product.stock = stock),
      (product.supplier = existingSupplier);

      await productRepository.save(product);

      return resp.json({
        ok: true,
        STATUS_CODE: 200,
        message: "Product was create with successfully",
      });
    } catch (error) {
      return resp.json({
        ok: false,
        STATUS_CODE: 500,
        message: `error = ${error.message}`,
      });
    }
  };

  //FUNCIONA
  static getProducts = async (req: Request, resp: Response) => {
    const name = req.query.name || ""
    const supplier = req.query.supplier || ""

    console.log(req.query);
    try {
      const products = await productRepository.find({
        where: { 
            state: true,             
            name: Like(`%${name}%`),
            supplier: { name: Like(`%${supplier}%`) } 
        },
        relations: { supplier: true },
      });
      return products.length > 0
        ? resp.json({
            ok: true,
            STATUS_CODE: 200,
            message: "list of products",
            products,
          })
        : resp.json({ ok: false, message: "Not found", products });
    } catch (error) {
      return resp.json({
        ok: false,
        STATUS_CODE: 500,
        message: `error = ${error.message}`,

      });
    }
  };

  //FUNCIONA
  static byIdProduct = async (req: Request, resp: Response) => {
    const id = parseInt(req.params.id);
    try {
      const product = await productRepository.findOne({
        where: { id, state: true },
      });
      return product
        ? resp.json({
          ok: true,
          product,
        }) 
        : resp.json({ 
          ok: false, 
          message: "The id don't exist" 
      });
    } catch (error) {
      return resp.json({
        ok: false,
        STATUS_CODE: 500,
        message: `error = ${error.message}`,
      });
    }
  };

  // FUNCIONA
  static deleteProduct = async (req: Request, resp: Response) => {
    const id = parseInt(req.params.id);
    try {
      const product = await productRepository.findOne({
        where: { id, state: true },
      });
      if (!product) {
        throw new Error("Not found");
      }
      product.state = false;
      await productRepository.save(product);
      return resp.json({
        ok: true,
        STATUS_CODE: 200,
        message: "Product was delete",
      });
    } catch (error) {
      return resp.json({
        ok: false,
        STATUS_CODE: 500,
        message: `error => ${error.message}`,
      });
    }
  };

  // FUNCIONA
  static updateProduct = async (req: Request, resp: Response) => {
    const id = parseInt(req.params.id);
    const { stock } = req.body;
    try {
      const product = await productRepository.findOne({
        where: { id, state: true },
      });

      if (!stock) {
        throw new Error("Not Found");
      }

      product.stock = stock;
      await productRepository.save(product);
      return resp.json({
        ok: true,
        STATUS_CODE: 200,
        message: "Product was updated",
        product,
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

export default ProductController;
