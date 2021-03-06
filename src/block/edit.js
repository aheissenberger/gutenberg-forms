import React, { useEffect } from "react";
import Inspector from "./Inspector";
import TemplateBuilder from "./components/templateBuilder";
const { InnerBlocks, RichText, BlockControls, BlockIcon } = wp.blockEditor;
const { Button, Toolbar, Tooltip } = wp.components;

const { getBlock } = wp.data.select("core/editor");
const { serialize } = wp.blocks;
const { __ } = wp.i18n;

function edit(props) {
	const {
		submitLabel,
		buttonSetting: { alignment },
		buttonSetting,
		templateBuilder,
		template,
		id
	} = props.attributes;

	useEffect(() => {
		props.setAttributes({ id: "submit-" + props.clientId });
	}, []);

	const handleButtonLabel = label => {
		props.setAttributes({ submitLabel: label });
	};

	return [
		<Inspector data={props} />,
		<BlockControls>
			<Toolbar>
				<Tooltip text={__(templateBuilder ? "Form Builder" : "Email Builder")}>
					<Button
						onClick={() => {
							props.setAttributes({ templateBuilder: !templateBuilder });
						}}
					>
						<BlockIcon
							icon={templateBuilder ? "feedback" : "email"}
							showColors
						/>
					</Button>
				</Tooltip>
			</Toolbar>
		</BlockControls>,
		!templateBuilder ? (
			<div className={`cwp-form ${props.className}`}>
				<InnerBlocks
					template={[
						["cwp/name", {}],
						["cwp/email", {}],
						["cwp/message", {}]
					]}
					templateLock={false}
					renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
				/>
				<div className={`cwp-submit ${alignment}`}>
					<button
						className="cwp-submit-btn"
						style={{
							backgroundColor: buttonSetting.backgroundColor,
							color: buttonSetting.color
						}}
					>
						<RichText
							tag="span"
							value={submitLabel}
							onChange={handleButtonLabel}
						/>
					</button>
				</div>
			</div>
		) : (
			<div className="cwp-form">
				<TemplateBuilder data={props} />
			</div>
		)
	];
}

export default edit;
