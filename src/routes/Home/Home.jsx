import Notes from '../../components/Notes';

const Home = () => {
	return (
		<div className='notes-wrapper'>
			<h1>Home</h1>
			<h3>React notes website and Vite</h3>
			<p>
				Add notes fort tasks that need to be finished, or create shopping list,
				etc.
			</p>

			<Notes />
		</div>
	);
};

export default Home;
