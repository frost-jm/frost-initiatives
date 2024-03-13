// EditorComponent.js
import { useState } from 'react';
import JoditEditor from 'jodit-react';
import { Box } from '@mui/material';

const Editor = () => {
	const [content, setContent] = useState('');

	const config = {
		placeholder: 'Input an abstract/description regarding your initiative',
		buttons: [
			{
				name: 'bold',
				iconURL: './assets/editor/editor-bold.svg',
			},
			{
				name: 'italic',
				iconURL: './assets/editor/editor-italic.svg',
			},
			{
				name: 'underline',
				iconURL: './assets/editor/editor-underline.svg',
			},
			{
				name: 'ol',
				iconURL: './assets/editor/editor-list.svg',
			},
			{
				name: 'ul',
				iconURL: './assets/editor/editor-bullet.svg',
			},
			{
				name: 'image',
				iconURL: './assets/editor/editor-upload.svg',
			},
			{
				name: 'link',
				iconURL: './assets/editor/editor-link.svg',
			},
		],
		toolbarAdaptive: false,
		uploader: {
			insertImageAsBase64URI: true,
		},
	};

	const handleChange = (newContent) => {
		setContent(newContent);
		console.log('new', newContent);
	};

	return (
		<Box
			sx={{
				'jodit-wysiwyg': {
					color: '#1D244F',
				},
				'.jodit-popup__content': {
					fontFamily: 'Figtree-Regular',
				},
				'.jodit-toolbar-button button': {
					height: '32px',
					minWidth: '32px',
				},
				'.jodit-toolbar-editor-collection .jodit-toolbar-button': {
					margin: '0',
				},
				'.jodit-container:not(.jodit_inline)': {
					background: 'transparent',
					border: 'none',
				},
				'.jodit-toolbar__box:not(:empty)': {
					borderTop: '1px solid #E9EDEE',
					background: 'transparent',
					borderBottom: '1px solid #E9EDEE',
					padding: '12px 0 12px 52px',
				},

				'.jodit-toolbar-button .jodit-icon': {
					width: '24px',
					height: '24px',
				},
				'.jodit-status-bar': {
					display: 'none',
				},
			}}
		>
			<JoditEditor
				value={content}
				config={config}
				onChange={handleChange}
			/>
		</Box>
	);
};

export default Editor;
