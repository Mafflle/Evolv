import { Prisma } from '@prisma/client';

const orderWithItems = Prisma.validator<Prisma.OrderFindManyArgs>()({
	include: {
		items: {
			include: {
				variant: {
					include: {
						product: {
							include: {
								category: true,
								featuredImage: true
							}
						}
					}
				}
			}
		}
	}
});

export type orderWithItems = Prisma.OrderGetPayload<typeof orderWithItems>;
