import {
  INTERNAL_SERVER_ERROR_CODE,
  NOT_FOUND_CODE,
} from "../../config/constant.js";
import { invoiceCreateFunction } from "../../helper/invoiceSetup/invoice.js";
import path from "path";
import fs from "fs";
import Order from "../../models/orderModel.js";

export const InvoiceCreation = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    if (!orderId) {
      return res.status(NOT_FOUND_CODE).json({
        success: false,
        message: "OrderId is required",
      });
    }

    const order = await Order.findById(orderId);
    
    if(!order){
        return res.status(NOT_FOUND_CODE).json({
            success: false,
            message: "Order not found",
          });
    }
    const fileName = await invoiceCreateFunction(orderId);
    const filePath = path.resolve(`./invoices/${fileName}`);

    const checkFileExists = (filePath, timeout = 5000) =>
      new Promise((resolve, reject) => {
        const startTime = Date.now();
        const interval = setInterval(() => {
          if (fs.existsSync(filePath)) {
            clearInterval(interval);
            resolve(true);
          }
          if (Date.now() - startTime > timeout) {
            clearInterval(interval);
            reject(new Error("File creation timeout"));
          }
        }, 500);
      });

    await checkFileExists(filePath);

    return res.sendFile(filePath);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      success: false,
      message: error.message,
    });
  }
};
