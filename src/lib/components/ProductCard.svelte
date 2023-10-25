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
			<h3
				class="lg:text-lg line-clamp-1 text-left font-medium font-work-sans max-w-[70%] overflow-clip"
			>
				{product.name}
			</h3>

			<p class="lg:text-base text-sm">
				{#if product.variants[0].discountPrice}
					<span class="line-through italic text-xs"
						>{formatCurrency(product.variants[0].price)}</span
					>
				{/if}
				{formatCurrency(product.variants[0].discountPrice ?? product.variants[0].price)}
			</p>
		</div>

		<div class="flex justify-between w-full items-center">
			<p class="bg-elightpurple/20 px-2 py-1 text-xs rounded-full">{product.category?.name}</p>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
				><path
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.5"
					d="m19.26 9.696l1.385 9A2 2 0 0 1 18.67 21H5.33a2 2 0 0 1-1.977-2.304l1.385-9A2 2 0 0 1 6.716 8h10.568a2 2 0 0 1 1.977 1.696ZM14 5a2 2 0 1 0-4 0M8.992 15h3m3 0h-3m0 0v-3m0 3v3"
				/></svg
			>
		</div>
	</div>
</div>

<style>
</style>
