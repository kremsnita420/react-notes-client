import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SingleNote = ({ item }) => {
	return (
		<li>
			<Link to={`/note/${item._id}`}>
				<h2>{item.title}</h2>
				{item.subject && <h4 className='single-subject'>{item.subject}</h4>}
				<p>
					{item.description.length > 100
						? `${item.description.substring(0, 100)}...`
						: item.description}
				</p>
			</Link>
		</li>
	);
};

SingleNote.propTypes = {
	item: PropTypes.object,
};

export default SingleNote;
