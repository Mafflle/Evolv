import { fail, type Actions, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async () => {
	const products = await prisma.product.findMany({
		where: {
			variants: {
				some: {
					stock: {
						gte: 0
					}
				}
			}
		},
		include: {
			category: true,
			featuredImage: true,
			variants: true
		},
		orderBy: {
			createdAt: 'desc'
		}
	});

	return {
		products
	};
};

export const actions: Actions = {
	logout: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) return fail(400);
		await auth.invalidateSession(session.sessionId);
		locals.auth.setSession(null);
		throw redirect(302, '/auth/login');
	}
} satisfies Actions;
