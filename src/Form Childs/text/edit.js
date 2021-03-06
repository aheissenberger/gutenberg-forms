import React, { useEffect } from "react";
import {
	FormToggle,
	Toolbar,
	PanelRow,
	PanelBody
} from "@wordpress/components";
import {
	getFieldName,
	extract_id,
	getEncodedData
} from "../../block/misc/helper";

const {
	InspectorControls,
	BlockControls,
	BlockIcon,
	RichText
} = wp.blockEditor;

function edit(props) {
	const handleChange = e => {
		let text = e.target.value;

		props.setAttributes({ text });
	};

	const handleRequired = () => {
		const { isRequired } = props.attributes;

		props.setAttributes({ isRequired: !isRequired });
	};

	const handleLabel = label => {
		props.setAttributes({ label });
	};

	const { text, isRequired, label, id, field_name } = props.attributes;
	useEffect(() => {
		if (field_name === "") {
			props.setAttributes({ field_name: getFieldName("text", props.clientId) });
			props.setAttributes({
				id:
					props.clientId +
					"__" +
					getEncodedData("text", props.clientId, isRequired)
			});
		} else if (field_name !== "") {
			props.setAttributes({
				id:
					extract_id(field_name) +
					"__" +
					getEncodedData("text", extract_id(field_name), isRequired)
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
		<div className={`cwp-text cwp-field ${props.className}`}>
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
				<input value={text} onChange={handleChange} />
			</div>
		</div>
	];
}

export default edit;
