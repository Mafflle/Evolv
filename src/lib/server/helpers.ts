import type { UserWithRelations } from '../types/user.types';
import prisma from './prisma';

export const fetchUser = async (id: string): Promise<UserWithRelations | null> => {
	const user = await prisma.user.findUnique({
		where: {
			id
		},
		include: {
			orders: {
				include: {
					items: true
				}
			},
			favourites: true
		}
	});

	return user;
};
