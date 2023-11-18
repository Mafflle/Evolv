<script lang="ts">
	import Tab from '$lib/components/Tab.svelte';
	import { OrderStatus } from '@prisma/client';
	import type { PageData } from './$types';
	import { formatCurrency } from '$lib/utils';
	import AdminModal from '$lib/components/AdminModal.svelte';
	import type { orderWithItems } from '$lib/types/order.type';
	import { slide } from 'svelte/transition';
	import OrderItem from '$lib/components/OrderItem.svelte';
	import { circIn } from 'svelte/easing';
	import OrderDetails from '$lib/components/OrderDetails.svelte';

	const tabItems = [
		{ label: 'All', value: 'all' },
		{ label: 'Pending', value: OrderStatus.PENDING },
		{ label: 'Confirmed', value: OrderStatus.CONFIRMED },
		{ label: 'Shipped', value: OrderStatus.SHIPPED },
		{ label: 'Delivered', value: OrderStatus.DELIVERED },
		{ label: 'Cancelled', value: OrderStatus.CANCELLED }
	];

	export let data: PageData;
	const { orders } = data;

	let currentOrder: any;
	let viewMore: boolean = false;
	const toggleModal = (order) => {
		viewMore = !viewMore;
		currentOrder = order;
	};

	$: console.log(currentOrder);

	console.log(data);
</script>

<svelte:head>
	<title>Orders - Evolv</title>
</svelte:head>

<OrderDetails open={viewMore} {currentOrder} on:close={() => (viewMore = false)} />
<div class="w-full grid grid-cols-1 gap-5">
	<Tab {tabItems} />

	<section role="table" class="w-full">
		<table class="w-full table">
			<thead>
				<tr class="font-normal">
					<th class="font-normal">Id</th>
					<th class="font-normal">Recipient</th>
					<th class="font-normal">Product(s)</th>
					<th class="font-normal">Status</th>
					<th class="font-normal">Total</th>
				</tr>
			</thead>
			<tbody class="w-full">
				{#each orders as order}
					<tr>
						<td>#{order.id.slice(15, 21)}</td>
						<td>{order.firstName} {order.lastName}</td>
						<td>
							<div class="avatar-group -space-x-6 rtl:space-x-reverse">
								{#each order.items.slice(0, 2) as item}
									<figure class="avatar">
										<div class="w-8 rounded-full">
											<img
												class="w-full h-full object-cover"
												src={item.variant.images[0].url}
												alt={item.variant.product.name}
											/>
										</div>
									</figure>
								{/each}
								{#if order.items.length > 2}
									<div class="avatar placeholder">
										<div class="w-8 bg-neutral text-neutral-content">
											<span>+{order.items.length - 2}</span>
										</div>
									</div>
								{/if}
							</div>
						</td>
						<td>
							<!-- <div
								class=" flex items-center gap-1 {order.status === OrderStatus.PENDING
									? 'text-yellow-500 '
									: order.status === OrderStatus.CONFIRMED
									? 'text-green-500 '
									: order.status === OrderStatus.DELIVERED
									? 'text-green-500 '
									: order.status === OrderStatus.CANCELLED
									? 'text-red-500 '
									: 'text-black'}"
							>
								<span class="">{order.status} </span>
								{#if order.status === OrderStatus.PENDING}
									<iconify-icon icon="material-symbols:pending-outline" />
								{:else if order.status === OrderStatus.CONFIRMED}
									<iconify-icon icon="pepicons-pencil:checkmark-outlined" />
								{:else if order.status === OrderStatus.DELIVERED}
									<iconify-icon icon="mdi:truck-check-outline" />
								{:else if order.status === OrderStatus.SHIPPED}
									<iconify-icon icon="mdi:truck-check-outline" />
								{:else if order.status === OrderStatus.CANCELLED}
									<iconify-icon icon="material-symbols:cancel-outline" />
								{/if}
							</div> -->
							<select
								class="outline-none {order.status === OrderStatus.PENDING
									? 'text-yellow-500 '
									: order.status === OrderStatus.CONFIRMED
									? 'text-green-500 '
									: order.status === OrderStatus.DELIVERED
									? 'text-green-500 '
									: order.status === OrderStatus.CANCELLED
									? 'text-red-500 '
									: 'text-black'}"
								bind:value={order.status}
								name="order-status"
								id="order-status"
							>
								{#each tabItems.slice(1, 6) as status}
									<option
										class={status.value === OrderStatus.PENDING
											? 'text-yellow-500 '
											: status.value === OrderStatus.CONFIRMED
											? 'text-green-500 '
											: status.value === OrderStatus.DELIVERED
											? 'text-green-500 '
											: status.value === OrderStatus.CANCELLED
											? 'text-red-500 '
											: 'text-black'}
										value={status.value}>{status.value}</option
									>
								{/each}
							</select>
						</td>

						<td>{formatCurrency(order.totalPrice)}</td>
						<td class=""
							><button
								on:click={() => toggleModal(order)}
								class="rounded px-3 py-2 bg-eblue text-white">View more</button
							></td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>
</div>
