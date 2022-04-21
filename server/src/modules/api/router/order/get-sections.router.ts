import { Request, Response } from 'express';
import { NotFoundError } from '../../../error/http/not-found.error';

export enum OrderTypes {
	'Объект капитального строительства' = 1,
	'Линейный объект' = 2,
}

export function getSections(req: Request, res: Response) {
	const type = parseInt(req.params.order_type as string);
	if (type == 1) {
		res.json([
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
		]);
	} else if (type == 2) {
		res.json([
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
		]);
	} else {
		return NotFoundError(res, 'order_type');
	}
}
