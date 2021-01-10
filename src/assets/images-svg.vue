<template>

	<div>

		<!-- Arrow Down -->
		<svg
			v-if="name==='arrow-down'"
			version="1.0"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 2560 2560"
			preserveAspectRatio="xMidYMid meet"
		>
			<g
				id="layer101"
				fill="#a5a5a5"
				stroke="none"
			>
				<path d="M637 1702 l-637 -637 0 -413 c0 -226 3 -412 8 -412 4 0 291 284 637 630 l630 630 635 -635 c349 -349 638 -635 643 -635 4 0 7 186 7 413 l0 412 -643 643 -642 642 -638 -638z" />
			</g>

		</svg>

		<!-- Arrow Up -->
		<svg
			v-if="name==='arrow-up'"
			version="1.0"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 2560 2560"
			preserveAspectRatio="xMidYMid meet"
		>
			<g
				id="layer101"
				fill="#a5a5a5"
				stroke="none"
			>
				<path d="M0 1920 l0 -415 643 -643 642 -642 638 638 637 637 -2 415 -3 415 -638 -635 -637 -635 -640 640 -640 640 0 -415z" />
			</g>

		</svg>

	</div>

</template>

<script>
export default {

	props: {

		name: String
	}

}
</script>

<style scoped>
.icon-button:hover svg g {
	fill: #505050;
}

button:disabled:hover svg g,
button:disabled svg g {
	fill: var(--text-light);
}

.small-icon svg {
	width: 20px;
	height: 20px;
}
.medium-icon svg {
	width: 40px;
	height: 40px;
}
.big-icon svg {
	width: 60px;
	height: 60px;
}
</style>