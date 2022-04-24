import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faXmark } from '@fortawesome/free-solid-svg-icons';
import Popup from '../common/Popup';

function Youtube() {
	const key = 'AIzaSyB81cXmxoWdzbYs8QZUlN_LQskZFT_Xqoo';
	const playListId = 'PLMaY0ixOiyljR7EsFnCk9HPiR7eNsI6Yd';
	const num = 10;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playListId}&maxResults=${num}`;
	const pop = useRef(null);

	const [items, setItems] = useState([]);
	const [index, setIndex] = useState(0);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		axios.get(url).then((json) => {
			console.log(json.data.items);
			setItems(json.data.items);
			setLoading(true);
		});
	}, []);

	return (
		<>
			<Layout name={'Youtube'} num={'02'}>
				{items.map((item, idx) => {
					const date = item.snippet.publishedAt;
					let tit = item.snippet.title;
					if (tit.length > 39) tit = tit.substr(0, 39) + '...';

					return (
						<article
							key={idx}
							onClick={() => {
								setIndex(idx);
								pop.current.open();
							}}>
							<div className='thumb'>
								<div className='crop'>
									<img src={item.snippet.thumbnails.high.url} />
								</div>
								<FontAwesomeIcon icon={faCirclePlay} />
							</div>

							<div className='con'>
								<h2>{tit}</h2>
								<p>{date.split('T')[0]}</p>
							</div>
						</article>
					);
				})}
			</Layout>

			<Popup ref={pop}>
				{loading && (
					<iframe
						src={
							'https://www.youtube.com/embed/' +
							items[index].snippet.resourceId.videoId
						}
						frameBorder='0'></iframe>
				)}
				<span onClick={() => pop.current.close()}>
					<FontAwesomeIcon icon={faXmark} />
				</span>
			</Popup>
		</>
	);
}

export default Youtube;
