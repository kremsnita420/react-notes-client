import PropTypes from 'prop-types';

const FormElement = ({
	noteType,
	handleSetTitle,
	handleSetSubject,
	handleSetDescription,
	successMessage,
	submitted,
	error,
	title,
	subject,
	description,
}) => {
	return (
		<form onSubmit={noteType}>
			<div className='single-note'>
				<div>
					<input
						type='text'
						value={title}
						onChange={(e) => handleSetTitle(e)}
						placeholder='Title'
						className='title'
						required
					/>
				</div>

				<div>
					<input
						type='text'
						value={subject}
						onChange={(e) => handleSetSubject(e)}
						placeholder='Subject(todo, shopping, chore,...)'
						className='subject'
					/>
				</div>

				<div>
					<textarea
						value={description}
						onChange={(e) => handleSetDescription(e)}
						placeholder='Description'
						rows='4'
						cols='50'
						className='description'></textarea>
				</div>
			</div>
			<input
				type='submit'
				value={submitted ? 'Saving note...' : '💾 Save Note'}
				disabled={!title}
			/>

			<p className='text-center'>
				{successMessage ? (
					<span className='success-message'>{successMessage}</span>
				) : (
					<span className='error-message'>{error}</span>
				)}
			</p>
		</form>
	);
};

FormElement.propTypes = {
	noteType: PropTypes.func,
	handleSetTitle: PropTypes.func,
	handleSetSubject: PropTypes.func,
	handleSetDescription: PropTypes.func,
	addNote: PropTypes.func,
	successMessage: PropTypes.string,
	title: PropTypes.string,
	subject: PropTypes.string,
	description: PropTypes.string,
	submitted: PropTypes.bool,
	error: PropTypes.string,
};

export default FormElement;
