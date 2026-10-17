import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { cases } from './cases.mjs';
import './host.css';

const library = new URLSearchParams(location.search).get('library');
if (library !== 'reference' && library !== 'tile') throw new Error('Expected ?library=reference or ?library=tile');
const { renderCase } = await (library === 'reference' ? import('./reference') : import('./tile'));

function Fixture() {
	useEffect(() => {
		window.__kumoReference = {
			library,
			setMode(mode) {
				document.documentElement.classList.toggle('dark', mode === 'dark');
				document.documentElement.dataset.mode = mode;
			},
		};
	}, []);
	return (
		<main className="fixture-root">
			{cases.map((spec) => (
				<section key={spec.id}>
					<h2>{spec.id}</h2>
					<div data-sample={spec.id}>{renderCase(spec)}</div>
				</section>
			))}
		</main>
	);
}

createRoot(document.getElementById('root')!).render(<Fixture />);
