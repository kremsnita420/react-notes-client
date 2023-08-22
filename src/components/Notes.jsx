import { useSession } from '@clerk/clerk-react';
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import SingleNote from './SingleNote';

const Notes = () => {
	const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/notes`;
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const { session } = useSession();
	const subjects = data.map((s) => s.subject);
	const uniqueSubjects = [...new Set(subjects)].sort();
	const [selectedCategory, setSelectedCategory] = useState();
	// Avoid duplicate function calls with useMemo
	let filteredList = useMemo(getFilteredCategory, [selectedCategory, data]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(baseUrl);

				if (!response.ok) {
					throw new Error('Failed to fetch data!');
				}

				const fetchData = await response.json();
				const filteredData = fetchData.filter(
					(d) => d.userId === session.user.id
				);
				setData(filteredData);
				setIsLoading(false);
			} catch (error) {
				setError('Error fetching data');
				setIsLoading(false);
			}
		};
		fetchData();
	}, [baseUrl, session.user.id]);

	function handleCategoryChange(event) {
		setSelectedCategory(event.target.value);
	}

	// Function to get filtered list
	function getFilteredCategory() {
		// Avoid filter when selectedCategory is null
		if (!selectedCategory) {
			return data;
		}
		return data.filter((item) => item.subject === selectedCategory);
	}

	return (
		<div>
			{isLoading && <Spinner />} {error && <p>{error}</p>}
			{data && (
				<>
					<button className='add-note-button'>
						<Link to={`/add-note`}>
							<span>+</span>
						</Link>
					</button>
					<div className='subjects'>
						<label htmlFor='Filter'>Filter by label</label>
						<select
							onChange={handleCategoryChange}
							className='single-subject'
							name='subject'
							id='subject'>
							{uniqueSubjects.map((subject, i) => (
								<option value={subject} key={`subject-${i}`}>
									{subject}
								</option>
							))}
							<option value=''>Please select</option>
						</select>
					</div>
					<ul
						className={`${
							filteredList.length === 1
								? ' notes notes-1'
								: filteredList.length === 2
								? ' notes notes-2'
								: 'notes notes-3'
						}`}>
						{filteredList.map((item) => (
							<SingleNote key={item._id} item={item} />
						))}
					</ul>
				</>
			)}
			{data.length === 0 && !error && (
				<p className='text-center'>Add some notes</p>
			)}
			{error && <p className='error-message'>{error}</p>}
		</div>
	);
};

export default Notes;
