import Link from 'next/link'

export default class extends React.Component {
	static async getInitialProps({ query }) {
		let idChannel = query.id;
		let [reqChannel, reqSeries, reqAudios] = await Promise.all([
			fetch(`https://api.audioboom.com/channels/${idChannel}`),
			fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`),
			fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`),
		])

		let dataChannel = await reqChannel.json();
    let channel = dataChannel.body.channel;
    
		let dataAudios = await reqAudios.json();
    let audioClips = dataAudios.body.audio_clips;

		let dataSeries = await reqSeries.json();
    let series = dataSeries.body.channels;
    
    return { channel, audioClips, series };
	}
	render() {
		const { channel, audioClips, series } = this.props;
		return (
			<div>
				<header>Podcats</header>
        <h1>{ channel.title }</h1>

        <h2>Series</h2>
        { series.map((serie) => (
          <div>{ serie.title }</div>
        ))}

        <h2>Ultimos Podcasts</h2>
        { audioClips.map((clip) => (
					<Link href={`/podcast?id=${clip.id}`} prefetch key={clip.id}>
						<a className='posdcast'>
							<h3>{ clip.title }</h3>
							<div className="meta">
								{ Math.ceil(clip.duration / 60) } minutes
							</div>
						</a>
					</Link>
        ))}

				<style jsx>{`
					header {
						color: #fff;
						background: #8756ca;
						padding: 15px;
						text-align: center;
					}
					.channel {
						display: block;
						border-radius: 3px;
						box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
						margin-bottom: 0.5em;
					}
					.channels {
						display: grid;
						grid-gap: 15px;
						padding: 15px;
						grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
					}
					.channel img {
						width: 100%;
					}
					h1 {
						font-weight: 600;
						padding: 15px;
					}
					h2 {
						padding: 5px;
						font-size: 0.9em;
						font-weight: 600;
						margin: 0;
						text-align: center;
					}
				`}</style>

				<style jsx global>{`
					body {
            margin: 0
            font-family: system-ui;
            background: white;
					}
				`}</style>
			</div>
		);
	}
}
