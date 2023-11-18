import prisma from '$lib/server/prisma';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const orders = await prisma.order.findMany({
		include: {
			items: {
				include: {
					variant: {
						include: {
							images: true,
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

	return { orders };
};
