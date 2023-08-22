import Notes from '../../components/Notes';

const Home = () => {
	return (
		<div className='notes-wrapper'>
			<h1>Handy notes</h1>
			<p>
				Add notes for tasks that need to be finished, or create shopping list,
				etc.
			</p>

			<Notes />
		</div>
	);
};

export default Home;
