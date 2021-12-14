import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [detailInfo, setDetailInfo] = useState([]);

  const { id } = useParams();
  const getMovie = async () => {
    const json = await (await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json();
    setDetailInfo(json.data.movie);
    setLoading(false);
  }
  useEffect(() => {
    getMovie();
  }, []);

  console.log(detailInfo);

  return (
    <div>
      <h1>Detail</h1>
      { loading ? ( <h2>Loading..</h2> ) : (
        <div>
          <div key={detailInfo.id}>
            <img src={detailInfo.medium_cover_image} alt="detaiImg" />
            <h2>{ detailInfo.title }</h2>
            <p>{ detailInfo.summary }</p>
            <ul>
              {detailInfo.genres.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </div>
        </div>
      ) }
    </div>
  );
 }

export default Detail;
