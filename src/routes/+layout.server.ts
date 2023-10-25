import prisma from '$lib/server/prisma';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	let user = null;

	if (session?.user) {
		user = await prisma.user.findUnique({
			where: {
				id: session.user.userId
			},
			include: {
				orders: {
					include: {
						items: true
					}
				}
			}
		});
	}

	return {
		user: user
	};
};
