"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfiles = void 0;
async function getProfiles(req, res) {
    res.json([
        {
            id: 1,
            title: 'Администратор',
        },
        {
            id: 2,
            title: 'Эксперт',
        },
        {
            id: 3,
            title: 'Клиент',
        },
    ]);
}
exports.getProfiles = getProfiles;
