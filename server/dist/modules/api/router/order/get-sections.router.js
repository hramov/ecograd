"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSections = exports.OrderTypes = void 0;
const bad_request_error_1 = require("../../../error/http/bad-request.error");
const not_found_error_1 = require("../../../error/http/not-found.error");
var OrderTypes;
(function (OrderTypes) {
    OrderTypes[OrderTypes["\u041E\u0431\u044A\u0435\u043A\u0442 \u043A\u0430\u043F\u0438\u0442\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0441\u0442\u0440\u043E\u0438\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u0430"] = 1] = "\u041E\u0431\u044A\u0435\u043A\u0442 \u043A\u0430\u043F\u0438\u0442\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0441\u0442\u0440\u043E\u0438\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u0430";
    OrderTypes[OrderTypes["\u041B\u0438\u043D\u0435\u0439\u043D\u044B\u0439 \u043E\u0431\u044A\u0435\u043A\u0442"] = 2] = "\u041B\u0438\u043D\u0435\u0439\u043D\u044B\u0439 \u043E\u0431\u044A\u0435\u043A\u0442";
})(OrderTypes = exports.OrderTypes || (exports.OrderTypes = {}));
const LINEAR_SECTIONS_COUNT = 10;
const CAP_SECTIONS_COUNT = 12;
function getSections(req, res) {
    const exp_type = parseInt(req.params.exp_type);
    const object_type = parseInt(req.params.object_type);
    if (!exp_type)
        return (0, bad_request_error_1.BadRequestError)(res);
    if (!object_type && (exp_type == 2 || exp_type == 3))
        return (0, bad_request_error_1.BadRequestError)(res);
    const object_section_linear = [
        { code: '1', title: 'Пояснительная записка' },
        {
            code: '2',
            title: 'Проект полосы отвода',
        },
        {
            code: '3',
            title: 'Технологические и конструктивные решения линейного объекта. Искусственные сооружения',
        },
        {
            code: '4',
            title: 'Здания, строения и сооружения, входящие в инфраструктуру линейного объекта',
        },
        { code: '5', title: 'Проект организации строительства' },
        {
            code: '6',
            title: 'Проект организации работ по сносу (демонтажу) линейного объекта',
        },
        { code: '7', title: 'Мероприятия по охране окружающей среды' },
        {
            code: '8',
            title: 'Мероприятия по обеспечению пожарной безопасности',
        },
        { code: '9', title: 'Смета на строительство' },
        {
            code: '10',
            title: 'Иная документация в случаях, предусмотренных федеральными законами',
        },
    ];
    const object_section_cap = [
        {
            code: '1',
            title: 'Схема планировочной организации земельного участка',
        },
        {
            code: '2',
            title: 'Схема планировочной организации земельного участка',
        },
        {
            code: '3',
            title: `Архитектурные решения`,
        },
        {
            code: '4',
            title: `Конструктивные и объемно-планировочные решения`,
        },
        {
            code: '5',
            title: `Сведения об инженерном оборудовании, о сетях инженерно-технического обеспечения, перечень инженерно-технических мероприятий, содержание технологических решений`,
            sub: [
                {
                    code: '5.1',
                    title: 'подраздел Система электроснабжения',
                },
                {
                    code: '5.2',
                    title: 'подраздел Система водоснабжения',
                },
                {
                    code: '5.3',
                    title: 'подраздел Система водоотведения',
                },
                {
                    code: '5.4',
                    title: 'подраздел Отопление, вентиляцияи кондиционирование воздуха, тепловые сети',
                },
                {
                    code: '5.5',
                    title: 'подраздел Сети связи',
                },
                {
                    code: '5.6',
                    title: 'подраздел Система газоснабжения',
                },
                {
                    code: '5.7',
                    title: 'подраздел Технологические решения',
                },
            ],
        },
        {
            code: '6',
            title: `Проект организации строительства`,
        },
        {
            code: '7',
            title: `Проект организации работ по сносу или демонтажу объектов капитального строительства`,
        },
        {
            code: '8',
            title: `Перечень мероприятий по охране окружающей среды`,
        },
        {
            code: '9',
            title: 'Мероприятия по обеспечению пожарной безопасности',
        },
        {
            code: '10',
            title: `Мероприятия по обеспечению доступа инвалидов`,
        },
        {
            code: '11',
            title: `Смета на строительство объектов капитального строительства`,
        },
        {
            code: '12',
            title: 'Иная документация в случаях, предусмотренных федеральными законами',
        },
    ];
    const exp_sections = [
        {
            code: getRiiSectionCode(exp_type, object_type, 1),
            title: 'Отчет по инженерно-геодезическим изысканиям',
        },
        {
            code: getRiiSectionCode(exp_type, object_type, 2),
            title: 'Отчет по инженерно-геологическим изысканиям',
        },
        {
            code: getRiiSectionCode(exp_type, object_type, 3),
            title: 'Отчет по инженерно-гидрометеорологическим изысканиям',
        },
        {
            code: getRiiSectionCode(exp_type, object_type, 4),
            title: 'Отчет по инженерно-экологическим изысканиям',
        },
        {
            code: getRiiSectionCode(exp_type, object_type, 5),
            title: 'Отчет по инженерно-геотехническим изысканиям',
        },
        {
            code: getRiiSectionCode(exp_type, object_type, 6),
            title: 'Отчет по геотехническим исследованиям',
        },
        {
            code: getRiiSectionCode(exp_type, object_type, 7),
            title: 'Отчет по обследованию состояния грунтов оснований зданий и сооружений',
        },
        {
            code: getRiiSectionCode(exp_type, object_type, 8),
            title: 'Отчет по локальному мониторингу компонентов окружающей среды',
        },
        {
            code: getRiiSectionCode(exp_type, object_type, 9),
            title: 'Отчет по поиску и разведке подземных вод для целей водоснабжения',
        },
        {
            code: getRiiSectionCode(exp_type, object_type, 10),
            title: 'Отчет по разведке грунтовых строительных материалов',
        },
        {
            code: getRiiSectionCode(exp_type, object_type, 11),
            title: 'Отчет по локальному обследования загрязнения грунтов и грунтовых вод',
        },
    ];
    if (exp_type == 1) {
        res.json(exp_sections);
    }
    else if (exp_type == 2) {
        if (object_type == 1) {
            res.json(object_section_cap);
        }
        else if (object_type == 2) {
            res.json(object_section_linear);
        }
        else {
            return (0, not_found_error_1.NotFoundError)(res, 'object_type');
        }
    }
    else if (exp_type == 3) {
        if (object_type == 1) {
            res.json([...object_section_cap, ...exp_sections]);
        }
        else if (object_type == 2) {
            res.json([...object_section_linear, ...exp_sections]);
        }
        else {
            return (0, not_found_error_1.NotFoundError)(res, 'object_type');
        }
    }
    else {
        return (0, not_found_error_1.NotFoundError)(res, 'exp_type');
    }
}
exports.getSections = getSections;
function getRiiSectionCode(exp_type, object_type, arrange = 0) {
    if (exp_type == 1)
        return String(arrange);
    if (exp_type == 2)
        return 0;
    if (exp_type == 3) {
        if (object_type == 1) {
            return String(CAP_SECTIONS_COUNT + arrange);
        }
        else if (object_type == 2) {
            return String(LINEAR_SECTIONS_COUNT + arrange);
        }
    }
}
