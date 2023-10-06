import { useEffect, useState } from 'react';
import { coord, API } from '../get-coord-from-browser';
import styled from 'styled-components';

const City = styled.div`
	color: white;
	font-size: 22px;
`;
const Text = styled.div`
	color: white;
	font-size: 15px;
`;
const Image = styled.img`
	color: white;
	position: absolute;
	top: -10px;
	left: 125px;
`;

const WeatherPlaginConteiner = ({ className }) => {
	const [weather, setWeather] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const { lat = 55.75, lon = 37.61 } = coord;
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}&lang=ru&&units=metric`,
		)
			.then((res) => res.json())
			.then((resWeather) => {
				setWeather(resWeather);
				setIsLoading(true);
			})
			.catch((error) => {
				console.log(error);
				setIsLoading(false);
			});
	}, []);

	return (
		<>
			{isLoading && (
				<div className={className}>
					<City>{weather.name}</City>
					<Text>
						🌡{weather.main.temp.toFixed(1)}°С /💨
						{weather.wind.speed.toFixed(1)}м/с
					</Text>
					<Text>{new Date().toLocaleDateString()}г.</Text>
					<Text>{weather.weather[0].description}</Text>
					<Image
						src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
					></Image>
				</div>
			)}
		</>
	);
};

export const WeatherPlagin = styled(WeatherPlaginConteiner)`
	position: relative;
	width: 225px;
	margin: 3px;
`;
