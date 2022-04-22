"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttachesForSection = void 0;
const Attach_model_1 = require("../../../database/model/order/Attach.model");
const bad_request_error_1 = require("../../../error/http/bad-request.error");
async function getAttachesForSection(req, res) {
    const user = req.user;
    const section_id = parseInt(req.params.section_id);
    if (!section_id)
        return (0, bad_request_error_1.BadRequestError)(res);
    const attaches = await Attach_model_1.Attach.find({
        where: { section: { id: section_id } },
        relations: ['sender'],
        order: {
            createdAt: 'desc',
        },
    });
    for await (const attach of attaches) {
        if (user.id != attach.sender.id) {
            attach.is_new = false;
            await attach.save();
        }
    }
    res.json(attaches);
}
exports.getAttachesForSection = getAttachesForSection;
