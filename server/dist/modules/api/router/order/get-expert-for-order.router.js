"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpertForOrder = void 0;
const Expert_model_1 = require("../../../database/model/user/profiles/Expert.model");
const bad_request_error_1 = require("../../../error/http/bad-request.error");
async function getExpertForOrder(req, res) {
    if (!req.params.order_id)
        return (0, bad_request_error_1.BadRequestError)(res);
    const result = await Expert_model_1.Expert.query(`
		SELECT e.id, u.name FROM auth.expert e
		JOIN business.order o on o."expertId" = e.id
		JOIN auth.user u on e."userId" = u.id
		WHERE o.id = ${req.params.order_id}
	`);
    res.json(result[0]);
}
exports.getExpertForOrder = getExpertForOrder;
