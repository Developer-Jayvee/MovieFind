
import "../Card/Card.css";
import { Circle } from "iconoir-react";
import NoAvailableImage from "../../assets/images/no-image-template.png";
import { useEffect, useState } from "react";
import MovieServices from "../../Services/MovieServices";
import { RotatingLines } from "react-loader-spinner";

export default function Card({ id } /* { title, posterPath, releaseYear, rating, country, genre } */) {
    const { getMovieDetails } = MovieServices();
    const [imageSrc, setImageSrc] = useState(NoAvailableImage);
    const [details, setDetails] = useState({});
    const [isImageLoading, setIsImageLoading] = useState(true);
    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await getMovieDetails(id);
                if (response) {
                    setDetails(response);
                    setImageSrc(`${import.meta.env.VITE_IMAGE_PATH}${response.poster_path}`);
                    setIsImageLoading(false)
                }
                return response;
            } catch (error) {
                setIsImageLoading(false)
            }
        }
        fetchMovieDetails();
    }, [id]);
    return (
        <>
            <div className="card">
                <div className="card-poster">
                    <RotatingLines
                        visible={isImageLoading}
                        height="96"
                        width="96"
                        color="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                    <img src={imageSrc} alt={details?.original_title} hidden={isImageLoading} />
                </div>
                <div className="card-details">
                    <p>{details?.original_title}</p>
                    <div className="movie-details">
                        <span>Movie</span>
                        <span>
                            <Circle width="8" height="8" />
                        </span>
                        <span>{details?.popularity?.toFixed(1)}</span>
                        <span>
                            <Circle width="8" height="8" />
                        </span>
                        <span>{new Date(details?.release_date).getFullYear()}</span>
                        <span>
                            <Circle width="8" height="8" />
                        </span>
                        <span>{details?.origin_country?.[0] || ''}</span>
                    </div>
                    {/* <p>{genre}</p> */}
                </div>
            </div>
        </>
    )
}