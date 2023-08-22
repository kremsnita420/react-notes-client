import { useSession } from '@clerk/clerk-react';
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';

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
	var filteredList = useMemo(getFilteredCategory, [selectedCategory, data]);
	// console.log(uniqueSubjects);
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
					{' '}
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
					<ul className='notes'>
						{filteredList.map((item) => (
							<li key={item._id}>
								<Link to={`/note/${item._id}`}>
									<h2>{item.title}</h2>
									{item.subject && (
										<h4 className='single-subject'>{item.subject}</h4>
									)}
									<p>
										{item.description.length > 100
											? `${item.description.substring(0, 100)}...`
											: item.description}
									</p>
								</Link>
							</li>
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
