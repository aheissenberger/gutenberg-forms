import { isEmpty } from "lodash";
import { strip_tags } from "../../block/misc/helper";

function save(props) {
	const { isRequired, options, label, id } = props.attributes;

	const getLabel = () => {
		const { label, isRequired } = props.attributes;

		const required = "<span>(Required)</span>";

		const required_label = label + " " + required;

		if (isRequired) {
			return required_label;
		}

		return label;
	};

	return (
		<div className="cwp-radio cwp-field">
			<div className={`cwp-radio-set ${isRequired ? "required-radio" : ""}`}>
				{!isEmpty(label) && (
					<label dangerouslySetInnerHTML={{ __html: getLabel() }}></label>
				)}
				{options.map((radio, index) => {
					return (
						<div className="cwp-radio-option">
							<input
								aria-label={strip_tags(label)}
								id={id.concat(index.toString())}
								name={id}
								data-rule="false"
								data-required="false"
								value={radio.label}
								data-cwp-field="true"
								type="radio"
								checked={radio.checked}
							/>
							<label for={id.concat(index.toString())}>{radio.label}</label>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default save;
