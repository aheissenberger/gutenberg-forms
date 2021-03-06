import React, { useEffect } from "react";
import {
	FormToggle,
	Toolbar,
	PanelRow,
	PanelBody,
	ResizableBox
} from "@wordpress/components";
import {
	getFieldName,
	extract_id,
	getEncodedData
} from "../../block/misc/helper";

import $ from "jquery";
const {
	InspectorControls,
	BlockControls,
	BlockIcon,
	RichText
} = wp.blockEditor;

function edit(props) {
	const handleChange = e => {
		let message = e.target.value;

		props.setAttributes({ message });
	};

	const handleRequired = () => {
		const { isRequired } = props.attributes;

		props.setAttributes({ isRequired: !isRequired });
	};

	const handleLabel = label => {
		props.setAttributes({ label });
	};

	const {
		message,
		isRequired,
		label,
		id,
		height,
		field_name
	} = props.attributes;
	useEffect(() => {
		if (field_name === "") {
			props.setAttributes({
				field_name: getFieldName("message", props.clientId)
			});
			props.setAttributes({
				id:
					props.clientId +
					"__" +
					getEncodedData("message", props.clientId, isRequired)
			});
		} else if (field_name !== "") {
			props.setAttributes({
				id:
					extract_id(field_name) +
					"__" +
					getEncodedData("message", extract_id(field_name), isRequired)
			});
		}
	}, []);

	return [
		!!props.isSelected && (
			<InspectorControls>
				<PanelBody title="Field Settings" initialOpen={true}>
					<PanelRow>
						<h3 className="cwp-heading">Required</h3>
						<FormToggle
							label="Required"
							checked={isRequired}
							onChange={handleRequired}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
		),
		!!props.isSelected && <BlockControls></BlockControls>,
		<div className={`cwp-message cwp-field ${props.className}`}>
			{!!props.isSelected && (
				<div className="cwp-required">
					<h3>Required</h3>
					<FormToggle checked={isRequired} onChange={handleRequired} />
				</div>
			)}
			{!props.isSelected && isRequired && (
				<div className="cwp-required cwp-noticed">
					<h3>Required</h3>
				</div>
			)}
			<div className="cwp-field-set">
				<RichText tag="label" value={label} onChange={handleLabel} />
				<ResizableBox
					size={{
						height,
						width: "100%"
					}}
					showHandle={true}
					minHeight="50"
					enable={{
						top: false,
						right: false,
						bottom: true,
						left: false,
						topRight: false,
						bottomRight: false,
						bottomLeft: false,
						topLeft: false
					}}
					onResizeStop={(event, direction, elt, delta) => {
						props.setAttributes({
							height: parseInt(height + delta.height, 10)
						});
					}}
				>
					<textarea
						value={message}
						style={{ height: height }}
						onChange={handleChange}
					/>
				</ResizableBox>
			</div>
		</div>
	];
}

export default edit;
