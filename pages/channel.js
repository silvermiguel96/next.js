import Link from "next/link";
import PodcastGrid from "../components/PodcastGrid";
import ChannelGrid from "../components/ChannelGrid";
import Error from "next/error";

export default class extends React.Component {
	static async getInitialProps({ query, res }) {
		let idChannel = query.id;

		try {
			let [reqChannel, reqSeries, reqAudios] = await Promise.all([
				fetch(`https://api.audioboom.com/channels/${idChannel}`),
				fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`),
				fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`)
			]);

			if (reqChannel.status >= 400) {
				res.statusCode = reqChannel.statu;
				return {
					channel: null,
					audioClips: null,
					series: null,
					statuscode: 404
				};
			}

			let dataChannel = await reqChannel.json();
			let channel = dataChannel.body.channel;

			let dataAudios = await reqAudios.json();
			let audioClips = dataAudios.body.audio_clips;

			let dataSeries = await reqSeries.json();
			let series = dataSeries.body.channels;
			return { channel, audioClips, series, statusCode: 200 };
		} catch (e) {
			return { channel: null, audioClips: null, series: null, statuscode: 503 };
		}
	}

	render() {
		const { channel, audioClips, series, statusCode } = this.props;
		if (statusCode !== 200) {
			return <Error statusCode={statusCode} />;
		}
		return (
			<div>
				<header>Podcasts</header>
				<div
					className="banner"
					style={{
						backgroundImage: `url(${channel.urls.banner_image.original})`
					}}
				/>

				<h1>{channel.title}</h1>

				{series.length > 0 && (
					<div>
						<h2>Series</h2>
						<ChannelGrid channels={series} />
					</div>
				)}

				<h2>Ultimos Podcasts</h2>
				<PodcastGrid audioClips={audioClips}></PodcastGrid>

				<style jsx>{`
					header {
						color: #fff;
						background: #8756ca;
						padding: 15px;
						text-align: center;
					}

					.banner {
						width: 100%;
						padding-bottom: 25%;
						background-position: 50% 50%;
						background-size: cover;
						background-color: #aaa;
					}

					.channels {
						display: grid;
						grid-gap: 15px;
						padding: 15px;
						grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
					}
					a.channel {
						display: block;
						margin-bottom: 0.5em;
						color: #333;
						text-decoration: none;
					}
					.channel img {
						border-radius: 3px;
						box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
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
						margin: 0;
						font-family: system-ui;
						background: white;
					}
				`}</style>
			</div>
		);
	}
}
