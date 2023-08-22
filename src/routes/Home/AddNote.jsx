import { useSession } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FormElement from '../../components/FormElement';

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

	const handleSetTitle = (e) => {
		setTitle(e.target.value);
	};

	const handleSetSubject = (e) => {
		setSubject(e.target.value);
	};

	const handleSetDescription = (e) => {
		setDescription(e.target.value);
	};

	return (
		<div>
			<Link style={{ marginBottom: '16px' }} to='/' className='back-button'>
				👈 back
			</Link>

			<FormElement
				noteType={addNote}
				handleSetDescription={handleSetDescription}
				handleSetTitle={handleSetTitle}
				handleSetSubject={handleSetSubject}
				addNote={addNote}
				successMessage={successMessage}
				submitted={submitted}
				error={error}
				title={title}
				subject={subject}
				description={description}
			/>
		</div>
	);
}

export default AddNote;
