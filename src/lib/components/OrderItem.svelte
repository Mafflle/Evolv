<script lang="ts">
	import type { orderWithItems } from '../types/order.type';
	import { formatCurrency } from '../utils';

	export let orderItem: any;
	export let order: orderWithItems;
</script>

<div class="grid grid-cols-1 w-64 bg-white shadow rounded-md overflow-hidden">
	<figure class=" max-h-[200px] relative w-full">
		<div
			class="badge {orderItem.variant.product.category?.name === 'Jeans'
				? 'badge-primary text-black'
				: 'badge-ghost'} absolute right-3 top-4"
		>
			{orderItem.variant.product.category?.name}
		</div>
		<img
			class="w-full aspect-square h-full object-cover"
			src={orderItem.variant.product.featuredImage.url}
			alt={orderItem.variant.product.name}
		/>
	</figure>
	<div class=" pb-8 pt-1 px-2 grid grid-cols-1 gap-2">
		<div class="flex justify-between">
			<h2 class="line-clamp-1 text-lg font-work-sans text-black font-medium">
				{orderItem.quantity} x {orderItem.variant.product.name}
			</h2>
		</div>

		<div class="flex justify-between items-center w-full">
			<p class="flex items-center gap-1 text-gray-400">
				<span class="capitalize text-xs font-semibold">{order.status}</span>
				<iconify-icon icon="material-symbols:pending-outline" />
			</p>
			<p class="text-sm font-medium">
				{orderItem.variant.discountPrice
					? formatCurrency(orderItem.variant.discountPrice)
					: formatCurrency(orderItem.variant.price)}
			</p>
		</div>
		<!-- <div class="card-actions j">
													<div class="">Qty: </div>
												</div> -->
	</div>
</div>
