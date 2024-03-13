export const toolbarOptions = {
	options: ['inline', 'list', 'image', 'link'],
	inline: {
		options: ['bold', 'italic', 'underline'],
		bold: {
			icon: './assets/editor/editor-bold.svg',
			className: 'toolbar-icon bold-icon',
		},
		italic: {
			icon: './assets/editor/editor-italic.svg',
		},
		underline: {
			icon: './assets/editor/editor-underline.svg',
		},
	},
	list: {
		options: ['unordered', 'ordered'],
		unordered: {
			icon: './assets/editor/editor-bullet.svg',
		},
		ordered: {
			icon: './assets/editor/editor-list.svg',
		},
	},
	image: {
		icon: './assets/editor/editor-upload.svg',
		urlEnabled: true,
		uploadEnabled: true,
		alignmentEnabled: true,
		uploadCallback: undefined,
		previewImage: false,
		inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
		alt: { present: false, mandatory: false },
		defaultSize: {
			height: 'auto',
			width: 'auto',
		},
	},
	link: {
		icon: './assets/editor/editor-link.svg',
		options: ['link'],
	},
};
