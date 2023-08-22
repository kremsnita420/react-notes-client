import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import FormElement from '../../components/FormElement';

function UpdateNote() {
	const { id } = useParams();
	const navigate = useNavigate();
	const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/notes/${id}`;
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [subject, setSubject] = useState('');
	const [submitted, setSubmitted] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [successMessage, setSuccessMessage] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(baseUrl);
				setIsLoading(true);
				if (!response.ok) {
					throw new Error('Failed to fetch data.');
				}

				const data = await response.json();
				setTitle(data.title);
				setSubject(data.subject);
				setDescription(data.description);
			} catch (error) {
				setError('Error updating note. Please try again later.');
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, [baseUrl]);

	const updateNote = async (e) => {
		e.preventDefault();

		try {
			setSubmitted(true);
			const response = await fetch(baseUrl, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					title,
					subject,
					description,
				}),
			});

			if (response.ok) {
				setSubmitted(true);
				setSuccessMessage('Note updated successfully');
				setTimeout(() => {
					setSuccessMessage(null);
				}, 3000);
				setSubmitted(false);
				navigate('/');
			} else {
				console.log('Failed to submit data.');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const removeNote = async (e) => {
		e.preventDefault();

		try {
			if (window.confirm('Do you want do delete this note?')) {
				const response = await fetch(baseUrl, {
					method: 'DELETE',
				});

				if (response.ok) {
					navigate('/');
				}
			}
		} catch (error) {
			setError(error);
		}
	};

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
			<div className='breadcrump-nav'>
				<Link to='/' className='back-button'>
					👈 back
				</Link>

				<button onClick={removeNote} className='delete'>
					❌ Remove
				</button>
			</div>

			{isLoading ? (
				<Spinner />
			) : (
				<FormElement
					handleSetDescription={handleSetDescription}
					handleSetTitle={handleSetTitle}
					handleSetSubject={handleSetSubject}
					noteType={updateNote}
					successMessage={successMessage}
					submitted={submitted}
					error={error}
					title={title}
					subject={subject}
					description={description}
				/>
			)}
		</div>
	);
}

export default UpdateNote;
