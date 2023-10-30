import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load = (async ({ locals, url }) => {
	const session = await locals.auth.validate();

	if (!session?.user) {
		throw redirect(302, `/auth/login?next=${url.pathname}`);
	}

	const favourites = await prisma.product.findMany({
		where: {
			users: {
				some: {
					id: session.user.userId
				}
			}
		},
		include: {
			category: true,
			featuredImage: true,
			variants: {
				include: {
					images: true
				}
			}
		}
	});

	return {
		favourites
	};
}) satisfies PageServerLoad;
