<script lang="ts">
	import type { ProductWithRelations } from '../types/products.types';
	import { formatCurrency } from '../utils';

	export let product: ProductWithRelations;
</script>

<div class="flex flex-col gap-2 items-start mx-auto w-full rounded h-full">
	<div class="w-full overflow-hidden rounded h-[300px] relative">
		{#if product.variants[0].discountPrice}
			<div
				class=" absolute right-3 top-3 z-10 bg-epurple border-epurple text-white font-semibold shadow-sm px-2 py-1 text-xs rounded-full"
			>
				{Math.round(100 - (product.variants[0].discountPrice / product.variants[0].price) * 100)}%
				Off!!
			</div>
		{/if}
		<a href="/category/{product.category?.slug}/product/{product.slug} ">
			<img
				class="rounded w-full h-full object-cover transition-all duration-300 hover:scale-125"
				src={product.featuredImage.url}
				alt=""
			/>
		</a>
	</div>
	<div class="flex flex-col items-start w-full gap-2">
		<div class="w-full flex justify-between items-center">
			<a
				href="/category/{product.category?.slug}/product/{product.slug}"
				class="lg:text-lg line-clamp-1 text-left font-medium font-work-sans max-w-[70%] overflow-clip hover:underline"
			>
				{product.name}
			</a>
			<a
				href="/category/{product.category?.slug}"
				class="bg-elightpurple/20 px-2 py-1 text-xs rounded-full hover:bg-elightpurple/40 hover:underline"
				>{product.category?.name}</a
			>
		</div>

		<div class="flex justify-between w-full items-center">
			<p class="lg:text-base text-sm">
				{#if product.variants[0].discountPrice}
					<span class="line-through italic text-xs"
						>{formatCurrency(product.variants[0].price)}</span
					>
				{/if}
				{formatCurrency(product.variants[0].discountPrice ?? product.variants[0].price)}
			</p>
			<button class="hover:text-black text-transparent">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="#111111"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
					/>
				</svg>
			</button>
		</div>
	</div>
</div>

<style>
</style>
