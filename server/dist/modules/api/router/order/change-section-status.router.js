"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeSectionStatus = void 0;
const Section_model_1 = require("../../../database/model/order/Section.model");
const bad_request_error_1 = require("../../../error/http/bad-request.error");
const not_found_error_1 = require("../../../error/http/not-found.error");
async function changeSectionStatus(req, res) {
    const section_id = req.params.section_id;
    const status = req.body.new_status;
    if (!section_id || !status)
        return (0, bad_request_error_1.BadRequestError)(res);
    const section = await Section_model_1.Section.findOneBy({ id: parseInt(section_id) });
    if (!section) {
        return (0, not_found_error_1.NotFoundError)(res, 'section', 'Cannot find section with id ' + section_id);
    }
    section.status = status;
    console.log(section);
    await section.save();
    res.json({
        message: 'Successfully updated section with status ' + status,
    });
}
exports.changeSectionStatus = changeSectionStatus;
