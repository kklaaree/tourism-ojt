import { pgTable, serial, integer, varchar, date, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import type { InferSelectModel } from 'drizzle-orm';

export const detailTypeEnum = pgEnum('detail_type', ['Updated', 'Created', 'Deleted']);

export const municipalityEnum = pgEnum('municipality_name', [
	'Abucay',
	'Bagac',
	'Balanga City',
	'Dinalupihan',
	'Hermosa',
	'Limay',
	'Mariveles',
	'Morong',
	'Orani',
	'Orion',
	'Pilar',
	'Samal'
]);

export const tourismRecords = pgTable('tourism_records', {
	id: serial('id').primaryKey(),
	establishmentName: varchar('establishment_name', { length: 256 }).notNull(),
	createdAt: timestamp('created_at')
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
	municipality: municipalityEnum('municipality').notNull(),
	detail: detailTypeEnum('detail').notNull()
});

export type getRecords = InferSelectModel<typeof tourismRecords>;
