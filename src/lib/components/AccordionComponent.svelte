<script lang="ts">
	import { slide } from 'svelte/transition';

	export let title: string | undefined;
	export let date: Date | undefined;

	let isOpen: boolean = false;

	const toggleOpen = () => {
		isOpen = !isOpen;
	};

	// change color based on order status enum
</script>

<div>
	<div class="w-full bg-white {isOpen ? 'border' : 'shadow'} rounded grid grid-cols-1 gap-14">
		<div class="p-5">
			<button
				on:click={toggleOpen}
				class="w-full {isOpen && 'border-b py-3'} flex justify-between items-center"
			>
				<h3 class="font-jakarta font-semibold text-lg">Order #{title?.slice(15, 21)}</h3>
				{#if date}
					<p class="font-jakarta text-center text-gray-500">{date.toLocaleDateString()}</p>
				{/if}
				<span
					><iconify-icon
						rotate={isOpen && '180deg'}
						width="25"
						icon="iconamoon:arrow-down-2-light"
					/></span
				>
			</button>
		</div>

		{#if isOpen}
			<div class="grid grid-cols-1 {isOpen && 'px-5'} gap-5" in:slide out:slide>
				<slot />
			</div>
			<div>
				<slot name="footer" />
			</div>
		{/if}
	</div>
</div>
