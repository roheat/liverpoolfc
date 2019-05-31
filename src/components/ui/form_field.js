import React from 'react';

const FormField = ({ id, formdata, change }) => {
	
	const showError = () => {
		let errorMessage = (
			<div className="error_label">
				{
					formdata.validationMessage && !formdata.valid ?
						formdata.validationMessage
					: null
				}
			</div>
		);

		return errorMessage;
	}

	const renderTemplate = () => {
		let formTemplate = null;

		switch(formdata.element) {
			case 'input':
				formTemplate = (
					<div>
						{
							formdata.showLabel ?
							<div className="label_input">
								{formdata.config.label}
							</div>
							:null
						}
						<input 
							{...formdata.config}
							value={formdata.value}
							onChange={(event) => change({event, id})}
						/>
						{showError()}
					</div>
				)
				break;
			case 'select':
				formTemplate = (
					<div>
						{
							formdata.showLabel ?
							<div className="label_input">
								{formdata.config.label}
							</div>
							:null
						}
						<select
							value={formdata.value}
							onChange={(event) => change({event, id})}
						>
						<option value="">Select an option</option>
						{
							formdata.config.options.map(option => (
								<option key={option.key} value={option.key}>
									{option.value}
								</option>
							))
						}
						</select>
					</div>
				)
				break;
			default: formTemplate = null;
		}

		return formTemplate;
	}

	return (
		<div>
			{renderTemplate()}
		</div>
	);
};

export default FormField;