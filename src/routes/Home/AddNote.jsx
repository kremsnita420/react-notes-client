import { useSession } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AddNote() {
	const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/notes`;
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [subject, setSubject] = useState('');
	const [submitted, setSubmitted] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');
	const [error, setError] = useState('');
	const { session } = useSession();
	const [user, setUser] = useState('');

	const addNote = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(baseUrl, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					title,
					description,
					userId: user,
					subject,
				}),
			});

			if (response.ok) {
				setSubmitted(true);
				setTitle('');
				setDescription('');
			} else {
				console.log('Failed to submit data.');
			}
		} catch (error) {
			setError(error);
		} finally {
			setSubmitted(false);
			setSuccessMessage('Note added successfully');
			setTimeout(() => {
				setSuccessMessage('');
			}, 3000);
		}
	};

	useEffect(() => {
		setUser(session.user.id);
	}, [session.user.id]);

	return (
		<div>
			<Link style={{ marginBottom: '16px' }} to='/' className='back-button'>
				👈 back
			</Link>

			<form onSubmit={addNote}>
				<div className='single-note'>
					<div>
						<input
							type='text'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder='Title'
							className='title'
							required
						/>
					</div>

					<div>
						<input
							type='text'
							value={subject}
							onChange={(e) => setSubject(e.target.value.toLowerCase())}
							placeholder='Subject(todo, shopping, chore,...)'
							className='subject'
						/>
					</div>

					<div>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
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
		</div>
	);
}

export default AddNote;
