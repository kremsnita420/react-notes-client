import { useSession } from '@clerk/clerk-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// import Note from './Note';

const Notes = () => {
	const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/notes`;
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const { session } = useSession();
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(baseUrl);

				if (!response.ok) {
					throw new Error('Failed to fetch data!');
				}

				const data = await response.json();
				const filteredData = data.filter((d) => d.userId === session.user.id);
				setData(filteredData);
				setIsLoading(false);
			} catch (error) {
				setError('Error fetching data');
				setIsLoading(false);
			}
		};
		fetchData();
	}, [baseUrl, session.user.id]);

	return (
		<div>
			{/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
			{isLoading && <h2>Loading...</h2>} {error && <p>{error}</p>}
			{data && (
				<ul className='notes'>
					<button className='add-note-button'>
						<Link to={`/add-note`}>
							<span>+</span>
						</Link>
					</button>
					{data.map((item) => (
						<li key={item._id}>
							<Link to={`/note/${item._id}`}>
								<h2>{item.title}</h2>
								<p>
									{item.description.length > 200
										? `${item.description.substring(0, 200)}...`
										: item.description}
								</p>
							</Link>
						</li>
					))}
				</ul>
			)}
			{!data || (!error && <p className='text-center'>Add some notes</p>)}
			{error && <p className='error-message'>{error}</p>}
		</div>
	);
};

export default Notes;
