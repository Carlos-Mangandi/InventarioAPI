import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Producto } from "../models/Producto";
import { Proveedor } from "../models/Proveedor";
import { error } from "console";
import { json } from "stream/consumers";
import { Like } from "typeorm";

const productoRepository = AppDataSource.getRepository("Producto");

class ProductoController {
  //FUNCIONA
  static createProducto = async (req: Request, resp: Response) => {
    const { name, description, price, stock, proveedorId } = req.body;
    const proveedorRepository = AppDataSource.getRepository(Proveedor);
    let existingProveedor;
    try {
      if (proveedorId) {
        existingProveedor = await proveedorRepository.findOne({
          where: { id: proveedorId },
        });
        if (!existingProveedor) {
          return resp.json({
            ok: false,
            msg: `Supplier whit ID '${proveedorId} does not exist`,
          });
        }
      } else {
        if (existingProveedor?.rol && proveedorId) {
          return resp.json({
            ok: false,
            msg: "Cannot assign supplier to a regular product",
          });
        }
      }

      const product = new Producto();

      (product.name = name),
      (product.description = description),
      (product.price = price),
      (product.stock = stock),
      (product.proveedor = existingProveedor);

      await productoRepository.save(product);

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
  static getProductos = async (req: Request, resp: Response) => {
    const name = req.query.name || ""
    const proveedor = req.query.proveedor || ""

    console.log(req.query);
    try {
      const products = await productoRepository.find({
        where: { 
            state: true,             
            name: Like(`%${name}%`),
            proveedor: { name: Like(`%${proveedor}%`) } 
        },
        relations: { proveedor: true },
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
  static byIdProducto = async (req: Request, resp: Response) => {
    const id = parseInt(req.params.id);
    try {
      const product = await productoRepository.findOne({
        where: { id, state: true },
      });
      return product
        ? resp.json({
            ok: true,
            product,
          }) : resp.json({ 
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
  static deleteProducto = async (req: Request, resp: Response) => {
    const id = parseInt(req.params.id);
    try {
      const product = await productoRepository.findOne({
        where: { 
          id, 
          state: true 
        },
      });
      if (!product) {
        throw new Error("Not found");
      }
      product.state = false;
      await productoRepository.save(product);
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
  static updateProducto = async (req: Request, resp: Response) => {
    const id = parseInt(req.params.id);
    const { stock } = req.body;
    try {
      const product = await productoRepository.findOne({
        where: { id, state: true },
      });

      if (!stock) {
        throw new Error("Not Found");
      }

      product.stock = stock;
      await productoRepository.save(product);
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

export default ProductoController;
