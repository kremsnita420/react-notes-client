import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './routes/Home/Home';
import AddNote from './routes/Home/AddNote';
import UpdateNote from './routes/Home/UpdateNote';
import About from './routes/About/About';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
	return (
		<>
			<Router>
				<Header />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/add-note' element={<AddNote />} />
					<Route path='/note/:id' element={<UpdateNote />} />
					<Route path='/about' element={<About />} />
				</Routes>
				<Footer />
			</Router>
		</>
	);
}

export default App;
