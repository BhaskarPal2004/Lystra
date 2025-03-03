import Buyer from "../../models/buyerModel.js";
import Seller from "../../models/sellerModel.js";
import { SUCCESS_CODE, NOT_FOUND_CODE, INTERNAL_SERVER_ERROR_CODE, BAD_REQUEST_CODE } from "../../config/constant.js";

export const createUserReport = async (req, res) => {
    try {
        const reporterId = req.userId;
        const { userId, message } = req.body;
        let isReported = false;

        const buyer = await Buyer.findById(userId);
        const seller = await Seller.findById(userId);

        if (!buyer && !seller) {
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "User not found"
            });
        }

        if (reporterId === userId) {
            return res.status(BAD_REQUEST_CODE).json({
                success: false,
                message: "You cannot report yourself"
            });
        }

        const reports = buyer ? buyer.reports : seller.reports;
        reports.forEach((report) => {
            if (report.reporterId.toHexString() === reporterId) {
                isReported = true;
            }
        });

        if (isReported) {
            return res.status(BAD_REQUEST_CODE).json({
                success: false,
                message: "You have already reported this user"
            });
        }

        const report = { reporterId, message };
        if (buyer) {
            buyer.reports.push(report);
            await buyer.save();
        } else {
            seller.reports.push(report);
            await seller.save();
        }

        return res.status(SUCCESS_CODE).json({
            success: true,
            message: "Report submitted successfully",
        });

    } catch (err) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: err.message,
        });
    }
};