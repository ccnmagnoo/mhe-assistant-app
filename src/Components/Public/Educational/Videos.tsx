import Typography from '@material-ui/core/Typography';
import './Educational.css';
interface VideoProps {
  id: string;
  title: string;
  url?: () => string;
  startAt?: number;
}

class Video implements VideoProps {
  title: string;
  startAt: number;
  id: string;
  private sizeFactor: number = 1;
  constructor(video: VideoProps) {
    this.id = video.id;
    this.title = video.title;
    this.startAt = video.startAt ?? 0;
  }
  url() {
    return `https://youtu.be/${this.id}?t=${this.startAt}`;
  }
  embed(): JSX.Element {
    return (
      <iframe
        width={560 * this.sizeFactor}
        height={315 * this.sizeFactor}
        src={`https://www.youtube.com/embed/${this.id}`}
        title={this.title}
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen={true}
      ></iframe>
    );
  }

  set size(newSize: number) {
    if (newSize > 0 && newSize < 1) {
      this.sizeFactor = newSize;
    }
  }
}

const videoResource: Video[] = [
  new Video({ title: 'El Consumo Vampiro', id: 'EQ2UQWEqsws' }),
  new Video({ title: 'El Gran Consumidor', id: 'cfVINbDXZQQ' }),
  new Video({ title: 'Cuídate del Peligro', id: 'tz8KcOnP2Dg' }),
];

export const Videos = () => {
  return (
    <>
      <Typography variant='caption' color='primary'>
        Multimedia
      </Typography>
      <section id='video-container'>
        <ul className='video-ul'>
          {videoResource.map((it) => {
            it.size = 0.95;
            return (
              <li className='video-item' id={it.id}>
                {it.embed()}
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};
