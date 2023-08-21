import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './routes/Home/Home';
import AddNote from './routes/Home/AddNote';
import UpdateNote from './routes/Home/UpdateNote';
import About from './routes/About/About';
import Header from './components/Header';
import Footer from './components/Footer';

import {
	ClerkProvider,
	SignedIn,
	SignedOut,
	RedirectToSignIn,
} from '@clerk/clerk-react';

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
	throw 'Missing Publishable Key';
}
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
function App() {
	return (
		<ClerkProvider publishableKey={clerkPubKey}>
			<SignedIn>
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
			</SignedIn>
			<SignedOut>
				<RedirectToSignIn />
			</SignedOut>
		</ClerkProvider>
	);
}

export default App;
