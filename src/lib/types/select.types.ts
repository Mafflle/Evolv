import type { OrderStatus } from '@prisma/client';

export type Option = {
	value: string | OrderStatus;
	label: string;
};
